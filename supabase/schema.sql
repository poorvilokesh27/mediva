-- Run this in Supabase Dashboard -> SQL Editor

-- 1. Diseases / medicine info table (lets you store more than the bundled JSON)
create table if not exists public.diseases (
  id uuid primary key default gen_random_uuid(),
  disease text not null,
  category text,
  symptoms text[],
  medicines jsonb, -- array of {name, dosage, notes}
  precautions text,
  disclaimer text,
  created_at timestamp with time zone default now()
);

alter table public.diseases enable row level security;

-- Anyone signed in can read disease info
create policy "Allow read access to all authenticated users"
  on public.diseases for select
  using (auth.role() = 'authenticated');

-- 2. Search & chat history table (per user)
create table if not exists public.history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null check (type in ('search', 'chat')),
  content text not null,
  created_at timestamp with time zone default now()
);

alter table public.history enable row level security;

create policy "Users can view their own history"
  on public.history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own history"
  on public.history for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own history"
  on public.history for delete
  using (auth.uid() = user_id);

-- 3. Medicine reminders / alarms table (per user)
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  medicine_name text not null,
  hour int not null check (hour >= 0 and hour <= 23),
  minute int not null check (minute >= 0 and minute <= 59),
  notification_id text,
  created_at timestamp with time zone default now()
);

alter table public.reminders enable row level security;

create policy "Users can view their own reminders"
  on public.reminders for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reminders"
  on public.reminders for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own reminders"
  on public.reminders for delete
  using (auth.uid() = user_id);
