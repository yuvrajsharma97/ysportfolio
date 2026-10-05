// Pushes the old portfolio content (src/data/seedData.ts) to Firestore.
//
// Uses the Admin SDK, so it bypasses firestore.rules. Needs a service account key:
// Firebase console → Project settings → Service accounts → Generate new private key.
// Save it as service-account.json in the project root (gitignored), then:
//
//   npm run push-content
//
// Unlike the admin panel import, this overwrites content/about and content/socials too.

import { readFileSync } from "node:fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  about,
  experience,
  projects,
  socials,
  techStack,
} from "../src/data/seedData.ts";

const keyPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ?? "service-account.json";
const serviceAccount = JSON.parse(readFileSync(keyPath, "utf8"));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const batch = db.batch();

batch.set(db.doc("content/about"), about);
batch.set(db.doc("content/socials"), socials);

const collections = [
  ["projects", projects],
  ["experience", experience],
  ["techStack", techStack],
] as const;

for (const [collectionName, entries] of collections) {
  for (const { id, ...data } of entries) {
    batch.set(db.collection(collectionName).doc(id), data);
  }
}

await batch.commit();

console.log(
  `Pushed to ${serviceAccount.project_id}: content/about, content/socials, ` +
    collections
      .map(([name, entries]) => `${entries.length} ${name}`)
      .join(", "),
);
