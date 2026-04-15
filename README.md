# ClientFlow Pro (Expo + Supabase)

A premium **mobile app** for digital agencies to manage clients, tasks, notifications, and daily execution in one place.

## Stack
- React Native + Expo (TypeScript)
- React Navigation
- Supabase (Auth, Postgres, Realtime, Storage)
- Zustand (state + offline cache)
- NativeWind (utility-first styling)
- Moti/Reanimated (smooth transitions)

## Features Delivered
- Auth: email/password signup/login, session persistence, logout.
- Dashboard: personalized welcome, KPI cards, recent activity feed.
- Client Management: add/search/delete clients (extendable to edit).
- Task Tracker: card/column board, create/update tasks, file uploads.
- Floating Daily Panel: animated panel for today’s tasks.
- Realtime Notifications: Supabase channel listener + bell badge.
- Activity Timeline: action logs for client/task lifecycle events.
- Settings: profile preview + secure logout.
- Offline Support (basic): persisted local cache with Zustand + AsyncStorage.

## Folder Structure
```text
.
├── App.tsx
├── app.json
├── src
│   ├── components
│   │   ├── FloatingDailyPanel.tsx
│   │   ├── GlassCard.tsx
│   │   ├── GradientButton.tsx
│   │   ├── NotificationBell.tsx
│   │   ├── ScreenContainer.tsx
│   │   └── StatCard.tsx
│   ├── constants
│   │   └── theme.ts
│   ├── hooks
│   │   ├── useAuth.ts
│   │   ├── useBootstrapData.ts
│   │   └── useRealtimeNotifications.ts
│   ├── navigation
│   │   └── AppNavigator.tsx
│   ├── screens
│   │   ├── auth/AuthScreen.tsx
│   │   └── main
│   │       ├── ClientsScreen.tsx
│   │       ├── DashboardScreen.tsx
│   │       ├── SettingsScreen.tsx
│   │       └── TasksScreen.tsx
│   ├── services/supabase.ts
│   ├── store/useAppStore.ts
│   ├── styles/global.css
│   ├── types/models.ts
│   └── utils/date.ts
└── supabase/schema.sql
```

## Setup Instructions
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create Supabase project** and run schema in `supabase/schema.sql` via SQL editor.
3. **Enable Realtime** for `notifications` table in Supabase dashboard.
4. **Configure env in Expo config** (`app.json`):
   - `expo.extra.supabaseUrl`
   - `expo.extra.supabaseAnonKey`
5. **Run app**
   ```bash
   npm run start
   ```
   Then launch iOS simulator / Android emulator via Expo CLI.

## Production Hardening Checklist
- Add secure secrets management (EAS secrets / runtime env pipeline).
- Replace direct `clientId` entry with client picker modal.
- Add proper edit flows for clients/tasks.
- Add optimistic updates and retry queue for offline mutations.
- Add push notifications (Expo Notifications + Supabase functions/webhooks).
- Add unit/integration tests (Jest + React Native Testing Library + Detox).
- Add CI checks (lint/typecheck/test) + release channels.

## Notes
- UI uses dark premium palette (`#0f172a`) with neon accents.
- Architecture is scalable: modular folders, reusable components, centralized data bootstrap, and persisted store.
