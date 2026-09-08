# Koye Feche Yohanis Begena — Local Web Preview

This is a clickable browser prototype for the private church learning platform:

**Koye Feche Yohanis Church | ኮዬ ፈጬ ዮሃንስ ቤተክርስትያን**

It is designed to preview the app in Firefox without Android Studio.

## Run on Windows

### Option A — Python (recommended)

1. Install Python if it is not installed.
2. Open Command Prompt or PowerShell.
3. `cd` into this folder.
4. Run:

```bash
python -m http.server 3000
```

5. Open Firefox:
   `http://localhost:3000`

### Option B — VS Code

Open this folder in VS Code and use a local server extension such as Live Server.
Then open the provided localhost URL in Firefox.

## Included in the prototype

- Amharic-first student dashboard
- Mentor dashboard
- Student / mentor role switch
- Attendance
- Assignments
- Announcements
- Lessons
- Certificates
- Virtual 10-string Begena interaction mockup
- Selamta / Tizita / Wanen preset selector
- Mekagna pitch detector UI
- Begena tuner UI
- Mezmur lyrics + meaning
- Tutor and progress screens
- Offline-ready UX concept

## Important

This is a **frontend prototype**, not the production APK.

The audio and tuner interactions are mocked in JavaScript so the UI can be reviewed quickly. Production work will connect verified pitch targets, approved lyrics, permissioned audio assets, authentication, cloud sync, and real microphone processing.

## Suggested project next step

Keep this preview open in Firefox while the Android application is built so the UI can be compared screen-by-screen.
