# Firestore Deployment Guide — PlayQ Academy

This guide covers deploying the security rules and indexes defined in
`firestore.rules` and `firestore.indexes.json` to the Firebase project
connected to PlayQ Academy.

## Prerequisites

- A Firebase project already created (the one configured in `.env.local`)
- Node.js installed (v18 or later)
- The Firebase project ID handy (check Firebase Console or `.env.local`)

## 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

Verify the installation:

```bash
firebase --version
```

## 2. Log in to Firebase

```bash
firebase login
```

This opens a browser window for Google authentication. Log in with the
Google account that owns (or has access to) the Firebase project.

After login, verify the correct project is selected:

```bash
firebase projects:list
```

## 3. Initialize Firebase in the project (if not already done)

If this is the first time deploying from this machine, initialize
the Firebase configuration:

```bash
firebase init firestore
```

Answer the prompts:

| Prompt | Answer |
|---|---|
| Existing project or create new? | `Use an existing project` |
| Select the project | Choose your PlayQ Academy project |
| File for Firestore Rules | `firestore.rules` (default) |
| File for Firestore Indexes | `firestore.indexes.json` (default) |

This creates a `.firebaserc` file linking the local config to the
Firebase project.

Alternatively, you can skip `firebase init` and use the `--project`
flag to target a specific project:

```bash
firebase deploy --only firestore --project <your-project-id>
```

## 4. Deploy Security Rules only

```bash
firebase deploy --only firestore:rules
```

Expected output:
```
=== Deploying to '<project-id>'...

i  deploying firestore
i  firestore: reading firestore.rules...
✔  firestore: rules file firestore.rules compiled successfully
i  firestore: deploying rules...
✔  firestore: deployed rules in 3s

✔  Deploy complete!
```

## 5. Deploy Indexes only

```bash
firebase deploy --only firestore:indexes
```

Expected output:
```
=== Deploying to '<project-id>'...

i  deploying firestore
i  firestore: reading firestore.indexes.json...
i  firestore: deploying indexes...
✔  firestore: deployed indexes in 15s

✔  Deploy complete!
```

**Important:** Indexes can take up to **10 minutes** to finish building.
Check status in Firebase Console → Firestore → Indexes tab. A new
index shows as `Building` and transitions to `Enabled` when ready.
Queries that need the index will fail until the status is `Enabled`.

## 6. Deploy Both (Rules + Indexes)

```bash
firebase deploy --only firestore
```

This is the recommended command for production deployments — it
deploys both rules and indexes in one operation.

## 7. Verify Deployment

### Check Rules

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your PlayQ Academy project
3. Navigate to **Firestore Database** → **Rules** tab
4. You should see the rules from `firestore.rules` with a recent
   timestamp

A quick manual test: try reading a different user's `users/{uid}` 
document from the client — it should be denied by the rules.

### Check Indexes

1. Navigate to **Firestore Database** → **Indexes** tab
2. You should see two indexes:
   - `gamification` — `totalPoints` DESC
   - `exam_attempts` — `userId` ASC, `submittedAt` DESC
3. Status should be `Enabled` (wait if it shows `Building`)

## 8. Testing Rules Locally (Firebase Emulator)

The Firebase Emulator Suite lets you test security rules locally
without deploying to production. This is the recommended workflow
before every rules change.

### Install the emulators

```bash
firebase init emulators
```

Select `Firestore Emulator`. Accept the default ports.

### Start the emulators

```bash
firebase emulators:start --only firestore
```

This starts Firestore on `localhost:8080` with your security rules
loaded.

### Write a test script

Create a test file (or use the Firebase Emulator UI at
`http://localhost:4000`) and verify that:

- The leaderboard query reads all `gamification` docs successfully
- A user cannot read another user's `users/{uid}` doc
- A user cannot change their own `role` field
- A submitted exam attempt cannot be modified
- The exam history query (`exam_attempts` where userId == X) works

### Stop the emulators

Press `Ctrl+C` in the terminal running the emulator.

## 9. Troubleshooting

| Problem | Likely Cause | Solution |
|---|---|---|
| `firebase: command not found` | Firebase CLI not installed globally | Run `npm install -g firebase-tools` |
| `Authentication error` | Not logged in or wrong account | Run `firebase login` and select the correct Google account |
| `Project not found` | `.firebaserc` missing or pointing to wrong project | Run `firebase init firestore` or use `--project` flag |
| `PERMISSION_DENIED` at runtime | Rules deployed but too restrictive | Check Firebase Console → Firestore → Rules. Verify the Auth UID matches the document path. Test with emulator first. |
| Index stuck on `Building` | Normal — just wait | Composite indexes take 5-10 minutes. Check the Indexes tab. |
| Leaderboard query returns no results | Index not yet enabled | The `totalPoints` index usually auto-exists. If not, it builds within minutes. |

## 10. Summary of What Was Deployed

| File | What It Governs |
|---|---|
| `firestore.rules` | Who can read/write which collections, field-level update restrictions, status transition rules for exams |
| `firestore.indexes.json` | Composite index for leaderboard (gamification/totalPoints), composite index for exam history (exam_attempts/userId+submittedAt) |

After deployment, the Firestore database moves from **test mode** (open
read/write) to **production mode** (least privilege — only authenticated
users, only their own data, with explicit exceptions for the public
leaderboard).
