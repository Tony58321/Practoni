import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function resolveEmailFromUsername(username) {
  const userDoc = doc(db, "usernames", username);
  const snap = await getDoc(userDoc);

  if (!snap.exists()) {
    throw new Error("No user found with that username.");
  }

  return snap.data().email;
}
