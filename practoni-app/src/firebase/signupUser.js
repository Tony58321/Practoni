import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase'; // assuming db is exported from firebase.js

export default async function SignUpUser(email, password, username) {
  console.log(`Signing up: ${email} as ${username}`);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store the custom username in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email: user.email
    });

    await setDoc(doc(db, "usernames", username), {
        email: user.email
      });
      
    console.log("User signed up and stored:", user.uid);
    return user;

  } catch (error) {
    
    console.error("Signup failed:", error.message);
    throw error;
  }
}
