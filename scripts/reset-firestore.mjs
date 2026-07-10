import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");

const envContent = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  let value = trimmed.slice(eqIdx + 1).trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  value = value.replace(/\\n/g, "\n");
  env[key] = value;
}

if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_PRIVATE_KEY || !env.FIREBASE_CLIENT_EMAIL) {
  console.error("ERROR: Faltan credenciales de Firebase Admin SDK en .env.local");
  process.exit(1);
}

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      privateKey: env.FIREBASE_PRIVATE_KEY,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const db = getFirestore();

const COLLECTIONS = ["users", "progress", "gamification", "exam_attempts"];

async function deleteCollection(collectionName) {
  const colRef = db.collection(collectionName);
  const snapshot = await colRef.get();

  if (snapshot.empty) {
    console.log(`  ${collectionName}: ya estaba vacía (0 docs)`);
    return 0;
  }

  const batchSize = 500;
  const docs = snapshot.docs;
  let deleted = 0;

  for (let i = 0; i < docs.length; i += batchSize) {
    const batch = db.batch();
    const chunk = docs.slice(i, i + batchSize);
    for (const doc of chunk) {
      batch.delete(doc.ref);
    }
    await batch.commit();
    deleted += chunk.length;
  }

  console.log(`  ${collectionName}: ${deleted} documento(s) eliminado(s)`);
  return deleted;
}

async function main() {
  console.log("\n=== PlayQA Academy — Reset de Firestore ===\n");
  console.log(`Proyecto: ${env.FIREBASE_PROJECT_ID}`);
  console.log(`Colecciones a limpiar: ${COLLECTIONS.join(", ")}\n`);
  console.log("⚠️  Las cuentas de Firebase Auth NO serán tocadas.\n");

  let total = 0;
  for (const col of COLLECTIONS) {
    total += await deleteCollection(col);
  }

  console.log(`\n✅ Listo. ${total} documento(s) eliminado(s) en total.`);
  console.log("   Las cuentas de Auth se conservan intactas.\n");
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
