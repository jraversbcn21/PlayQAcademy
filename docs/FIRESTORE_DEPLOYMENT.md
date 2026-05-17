# Firestore Deployment Guide — PlayQ Academy

This guide covers deploying the security rules, composite indexes,
and Firebase configuration for the PlayQ Academy Firestore database.

After following this guide, the database moves from **test mode**
(open read/write) to **production mode** (least privilege — only
authenticated users, only their own data).

---

## Pre-deployment checklist

Before running any `firebase deploy` command, verify:

- [ ] Firebase CLI installed: `firebase --version`
- [ ] Logged in: `firebase login` (opens browser for Google auth)
- [ ] Correct project: check `.firebaserc` has the right project ID (find it in [Firebase Console](https://console.firebase.google.com) or via `firebase projects:list`)
- [ ] `.firebaserc` is NOT using the placeholder `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` — replace it with your actual project ID
- [ ] `firebase.json` points to the right files (`firestore.rules`, `firestore.indexes.json`)
- [ ] Both files exist at the project root and have valid content
- [ ] `.env.local` has the correct `NEXT_PUBLIC_FIREBASE_*` values for this project
- [ ] Dev server is NOT running (optional — but prevents accidental writes during rules transition)

---

## 1. Prerequisites

### Install Firebase CLI

```bash
npm install -g firebase-tools
```

Verify:

```bash
firebase --version
```

### Log in

```bash
firebase login
```

A browser opens for Google authentication. Log in with the account
that owns the Firebase project.

### Set the project ID

Edit `.firebaserc` and replace the placeholder:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

The project ID is visible in the Firebase Console URL:
`https://console.firebase.google.com/project/YOUR_PROJECT_ID/`

Verify the project is accessible:

```bash
firebase projects:list
```

---

## 2. Deploy Rules Only

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

---

## 3. Deploy Indexes Only

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

**Important:** Composite indexes take **1-10 minutes** to build.
Check status in Firebase Console → Firestore → Indexes tab.
The index shows `Building` and transitions to `Enabled` when ready.
The exam history query will fail until the composite index is `Enabled`.

---

## 4. Deploy Both (Recommended)

```bash
firebase deploy --only firestore
```

This deploys rules AND indexes in one operation. Use this for
production deployments.

---

## 5. Verify Deployment

### Rules Tab

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your PlayQ Academy project
3. Navigate to **Firestore Database** → **Rules** tab
4. Confirm the rules from `firestore.rules` are displayed with a
   recent timestamp
5. The tab should show "Production mode" (not "Test mode")

### Indexes Tab

1. Navigate to **Firestore Database** → **Indexes** tab
2. You should see two indexes:

   | Collection | Fields | Order |
   |---|---|---|
   | `gamification` | `totalPoints` | DESC |
   | `exam_attempts` | `userId`, `submittedAt` | ASC, DESC |

3. Status should show `Enabled` (not `Building`). If it shows
   `Building`, wait and refresh — this can take up to 10 minutes.

---

## 6. Post-deployment verification

Manually test that all features work end-to-end:

### Authentication flow
- [ ] Sign up a new user with email/password
- [ ] Verify the user profile document exists in Firestore (`users/{uid}`)
- [ ] Sign in with the same credentials
- [ ] Sign in with Google OAuth

### Lesson completion
- [ ] Navigate to a lesson (M1-L1 is always unlocked)
- [ ] Complete the lesson (answer quiz correctly)
- [ ] Verify the `progress/{uid}` document updated with the lesson ID
- [ ] Check `gamification/{uid}` — points should have increased by 10

### Dashboard
- [ ] Visit `/es/dashboard` — module cards should show
- [ ] Stats row should display correctly (lessons completed, points, level)
- [ ] Module progress bars should reflect completed lessons

### Leaderboard
- [ ] Visit `/es/leaderboard` — should show ranked users
- [ ] If this is the first user, you'll see just your own entry
- [ ] The query uses `gamification` collection sorted by `totalPoints DESC`

### Exam flow
- [ ] Navigate to `/es/exams`
- [ ] Start Module 1 exam
- [ ] Answer a few questions — answer saves should update the document
- [ ] Submit the exam — status should change to `submitted`
- [ ] Verify results page loads with score and explanations
- [ ] Check `exam_attempts/{attemptId}` in Firestore — `status: "submitted"`, `score` is a number

### Blocked operations (should return PERMISSION_DENIED)
- [ ] Try reading another user's `users/{uid}` document from the client — should fail
- [ ] Try updating your own `role` field — should fail (immutable)
- [ ] Try modifying a submitted exam attempt — should fail (frozen)

---

## 7. Testing Rules Locally (Firebase Emulator)

The Firebase Emulator Suite lets you test security rules locally
without deploying to production.

### Install the emulators

```bash
firebase init emulators
```

Select `Firestore Emulator`. Accept the default ports.

### Start the emulators

```bash
firebase emulators:start --only firestore
```

This starts Firestore on `localhost:8080` with your rules loaded.

### Connect the app to the emulator

In your `src/lib/firebase/config.ts`, you can point to the emulator
during development (this should be behind an env var flag):

```ts
// During local emulator testing
import { connectFirestoreEmulator } from "firebase/firestore";
if (process.env.NEXT_PUBLIC_USE_FIRESTORE_EMULATOR === "true") {
  connectFirestoreEmulator(db!, "localhost", 8080);
}
```

### Test in the Emulator UI

Open `http://localhost:4000` in your browser. The Emulator Suite
UI provides a Firestore viewer where you can manually create
documents and test that security rules reject unauthorized operations.

This is the recommended workflow BEFORE every rules change.

### Stop the emulators

Press `Ctrl+C` in the terminal running the emulator.

---

## 8. Common Errors and Fixes

| Error | Cause | Solution |
|---|---|---|
| `Missing or insufficient permissions` | User trying to access another user's data, or rules haven't propagated | Wait 30 seconds after deployment. If still failing, verify the UID matches using Firebase Auth emulator logs. |
| `The query requires an index` | Composite index for `exam_attempts` has not finished building | Go to Firebase Console → Firestore → Indexes. Wait for `Enabled` status (1-10 min). The link in the error message creates the index for you. |
| `PERMISSION_DENIED: Cloud Firestore API has not been used in project` | Cloud Firestore API is disabled for this project | Go to [GCP Console](https://console.cloud.google.com) → APIs & Services → Enable Cloud Firestore API. |
| `Failed to authenticate, have you run firebase login?` | Firebase CLI session expired or using wrong account | Run `firebase login --reauth` to force a fresh authentication. |
| `Error: Project '<id>' does not exist` | Wrong project ID in `.firebaserc` | Run `firebase projects:list` to find your project ID. Update `.firebaserc`. |
| Leaderboard shows no results | `totalPoints` index not yet enabled, or `gamification` docs don't have the field | Check Console → Indexes. If the index is `Enabled`, verify gamification docs have a `totalPoints` field. |
| Exam history query fails | Composite index missing or building | Check Console → Indexes for `exam_attempts: userId ASC, submittedAt DESC`. Wait for `Enabled` status. |

---

## 9. Rollback (Emergency)

If the deployed rules break production and you need to revert
immediately:

### Option A: Rollback via Firebase Console

1. Go to **Firebase Console** → Firestore → **Rules** tab
2. The Rules tab keeps **version history**. Click the version
   dropdown and select the previous ruleset.
3. Click **Publish** to make the old rules active immediately.

### Option B: Re-deploy previous rules

Keep a backup of the test-mode rules in the project:

```bash
# Save the current rules before deploying new ones
firebase firestore:rules > firestore.rules.backup
```

To rollback:

```bash
# Restore the backup
cp firestore.rules.backup firestore.rules
firebase deploy --only firestore:rules
```

### Option C: Restore test-mode rules manually

If all else fails, restore open read/write temporarily:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 6, 1);
    }
  }
}
```

This restores test mode until June 1, 2026. Deploy with
`firebase deploy --only firestore:rules`. Then fix the production
rules and re-deploy.

---

## 10. What Was Deployed

| File | Purpose | Key Content |
|---|---|---|
| `firestore.rules` | Access control | `isAuthenticated()`, `isOwner()`, collection-specific rules with field-level restrictions, status-transition gates for exams, default deny |
| `firestore.indexes.json` | Query performance | 2 indexes: leaderboard (`gamification.totalPoints DESC`), exam history (`exam_attempts.userId ASC + submittedAt DESC`) |
| `firebase.json` | Firebase CLI config | Points Firebase CLI to the rules and indexes files |
| `.firebaserc` | Project binding | Maps the local config to a specific Firebase project ID |

### Indexes at a Glance

| Index | Collection | Type | Fields | Used By |
|---|---|---|---|---|
| 1 | `gamification` | Single-field | `totalPoints DESC` | `fetchLeaderboard()` in `useGamification.ts:233` |
| 2 | `exam_attempts` | Composite | `userId ASC, submittedAt DESC` | `getExamHistory()` in `useExamAttempt.ts:162` |

### Rules at a Glance

| Collection | Read | Write | Special |
|---|---|---|---|
| `users/{uid}` | Owner only | Owner (create + restricted update) | `uid`, `role`, `createdAt` immutable |
| `progress/{uid}` | Owner only | Owner (create/update) | `userId` must match auth, no delete |
| `gamification/{uid}` | Any authenticated user | Owner only | Public read for leaderboard, `uid` must match on write, no delete |
| `exam_attempts/{id}` | Owner (`userId` match) | Owner (create + status-gated update) | Only `in_progress→submitted` or `in_progress→abandoned`; submitted/abandoned frozen |
| Everything else | **Denied** | **Denied** | Default catch-all |
