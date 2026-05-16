/**
 * Firebase configuration placeholder.
 *
 * This module reads environment variables exposed by Next.js
 * (prefixed NEXT_PUBLIC_*) and initialises the Firebase client SDK.
 *
 * Currently NOT wired into any logic — kept here as the canonical
 * entry point for when Auth / Firestore features are implemented.
 */

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function initFirebase(): {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
} {
  // Prevent duplicate initialisation during hot-reload in development
  if (getApps().length > 0) {
    const app = getApps()[0]!;
    return {
      app,
      auth: getAuth(app),
      db: getFirestore(app),
    };
  }

  // Do not initialise if config is missing (build-time or missing .env)
  if (!firebaseConfig.apiKey) {
    if (typeof window !== "undefined") {
      console.warn(
        "[Firebase] Missing environment variables — Firebase is not initialised."
      );
    }
    return { app: null, auth: null, db: null };
  }

  const app = initializeApp(firebaseConfig);

  return {
    app,
    auth: getAuth(app),
    db: getFirestore(app),
  };
}

export const { app, auth, db } = initFirebase();
