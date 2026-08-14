# MediPal — Disease & Medicine Info App

A React Native (Expo) app with:
- 🔍 Search bar for disease/symptom/medicine info
- 💬 Chatbot assistant (rule-based, upgradeable to a real LLM)
- 🕘 Search & chat history (stored in Supabase, per user)
- 🔐 Email sign in / sign up (Supabase Auth)
- ⏰ Medicine reminder alarms (local push notifications, daily repeat)

---

## 1. Run it locally

```bash
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone, or press `a` for an
Android emulator / `i` for iOS simulator.

---

## 2. Connect Supabase (auth + database)

1. Create a free project at https://supabase.com
2. Go to **Project Settings → API** and copy your **Project URL** and
   **anon public key**.
3. Open `src/config/supabase.js` and paste them in:
   ```js
   const SUPABASE_URL = "https://YOUR-PROJECT-REF.supabase.co";
   const SUPABASE_ANON_KEY = "YOUR-ANON-PUBLIC-KEY";
   ```
4. In the Supabase Dashboard, open **SQL Editor**, paste the contents of
   `supabase/schema.sql`, and run it. This creates:
   - `diseases` — your full medicine/disease dataset (beyond the bundled JSON)
   - `history` — per-user search & chat history
   - `reminders` — per-user medicine alarms
5. In **Authentication → Providers**, make sure **Email** is enabled.
   (Optional) Turn off "Confirm email" while testing, so sign-up is instant.

Once connected, sign-in/sign-up, history, and reminders all work for real,
and search results will also pull from your `diseases` table.

### Loading a bigger medicine dataset
`src/data/medicineData.json` has 5 sample entries so the app works out of
the box. To scale to "all diseases", either:
- Bulk-insert real data into the `diseases` table via the Supabase
  Table Editor or `csv` import, or
- Connect a public medical API (e.g. RxNorm, OpenFDA) inside
  `src/services/medicineService.js`.

**Important:** medical data must be handled carefully — always keep the
in-app disclaimer, and don't present the app as a replacement for a doctor.

---

## 3. Add a real chatbot (optional upgrade)

Right now the chatbot in `src/services/chatbotService.js` answers using your
local dataset (works offline, no cost). To make it a true AI chatbot:

1. Create a **Supabase Edge Function** (or any small backend) that holds
   your LLM API key server-side — never put a secret key inside the app.
2. Point `CHAT_BACKEND_URL` in `chatbotService.js` to that function's URL.
3. The function should accept `{ message }` and return `{ reply }`.

---

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: MediPal app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/medipal.git
git push -u origin main
```

(`.gitignore` already excludes `node_modules`, `.expo`, and secrets.)

---

## 5. Build an installable APK

Uses Expo's free **EAS Build** service.

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

When the build finishes, EAS gives you a download link for the `.apk`.
Update the `extra.eas.projectId` in `app.json` with the project ID EAS
generates for you during `eas build:configure`.

---

## Project structure

```
medipal/
├── App.js
├── app.json
├── package.json
├── src/
│   ├── config/supabase.js        # Supabase client
│   ├── context/AuthContext.js    # auth state (sign in/up/out)
│   ├── navigation/AppNavigator.js
│   ├── screens/
│   │   ├── SignInScreen.js
│   │   ├── SignUpScreen.js
│   │   ├── HomeScreen.js         # search
│   │   ├── MedicineDetailScreen.js
│   │   ├── ChatbotScreen.js
│   │   ├── HistoryScreen.js
│   │   ├── RemindersScreen.js    # alarms
│   │   └── ProfileScreen.js
│   ├── services/
│   │   ├── medicineService.js
│   │   ├── chatbotService.js
│   │   ├── historyService.js
│   │   └── notificationService.js
│   ├── components/
│   └── data/medicineData.json    # seed dataset
└── supabase/schema.sql           # DB tables + security policies
```

## ⚠️ Medical disclaimer
This app is for general informational purposes only and is not a substitute
for professional medical advice, diagnosis, or treatment. Keep the
in-app disclaimers intact if you publish this.
