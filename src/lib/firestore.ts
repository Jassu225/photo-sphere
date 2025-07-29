import admin, { ServiceAccount } from "firebase-admin";

// Initialize Firebase Admin SDK (do this once globally in a real app, e.g., in lib/firebaseAdmin.ts)
const firebaseApp = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(
          Buffer.from(
            process.env.FIREBASE_SERVICE_ACCOUNT as string,
            "base64"
          ).toString("utf-8")
        ) as ServiceAccount
      ),
      //   projectId: process.env.FIREBASE_PROJECT_ID, // Use environment variable
    })
  : admin.app();

const firestore = admin.firestore(firebaseApp);

export default firestore;
