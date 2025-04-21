// loginUser.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // adjust path if needed

export default async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Firebase Auth login successful for:", user.email);
    return user;
  } catch (error) {
    console.error("Firebase Auth login failed:", error.message);
    throw error;
  }
}
