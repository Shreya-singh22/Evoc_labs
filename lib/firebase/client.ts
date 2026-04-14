import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function getFirebaseConfig() {
  // Firebase config is hardcoded here so it works on GitHub Pages (static hosting)
  // which does not support environment variables at runtime.
  // These frontend keys are safe to expose — security is enforced by Firestore rules.
  return {
    apiKey: "AIzaSyAvAYseneeIAtFg2vivlVd75ePHRNkAG-M",
    authDomain: "evoc-labs.firebaseapp.com",
    projectId: "evoc-labs",
    storageBucket: "evoc-labs.firebasestorage.app",
    messagingSenderId: "625457400019",
    appId: "1:625457400019:web:80a683984b6e5d3d356c26",
    measurementId: "G-GX40PNNCWR",
  };
}

export function isFirebaseConfigured(): boolean {
  const c = getFirebaseConfig();
  return Boolean(
    c.apiKey &&
      c.authDomain &&
      c.projectId &&
      c.storageBucket &&
      c.messagingSenderId &&
      c.appId,
  );
}

function assertConfig(config: Record<string, string>) {
  const missing = Object.entries(config)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    throw new Error(
      `Missing Firebase env vars: ${missing.join(", ")}. Copy .env.local.example to .env.local and fill values.`,
    );
  }
}

export function getFirebaseApp(): FirebaseApp {
  const existing = getApps()[0];
  if (existing) return existing;
  const config = getFirebaseConfig();
  assertConfig(config);
  return initializeApp(config);
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp());
}

export function getFirebaseDb() {
  return getFirestore(getFirebaseApp());
}

