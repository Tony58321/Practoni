import { db, auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import Papa from "papaparse"; // Import PapaParse for CSV parsing

// Here we map the difficulty levels to the corresponding skill levels from our CSV
const skillMap = {
    beginner: ["Freshman"],
    intermediate: ["Sophomore", "Junior"],
    advanced: ["Senior"]
}

let repertoire = []; // store parsed data globally

// This function loads the CSV file and parses it into a JavaScript object using PapaParse
// It returns a promise that resolves with the parsed data
export async function getRepertoire() {
  if (repertoire.length) return repertoire;

  return new Promise((resolve, reject) => {
    // Load the CSV file from the public directory
    Papa.parse("/Trumpet Repertoire.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      // Complete callback function to handle the parsed data
      complete: (results) => {
        repertoire = results.data;
        console.log("Loaded", repertoire.length, "pieces");
        resolve(repertoire);
      },
      error: function(err) {
        console.error("Failed to load CSV:", err);
        reject(err);
      }
    });
  });
}

// This is where we get the user's difficulty level from the database
export async function getUserDifficulty() {
    const user = auth.currentUser;
    if (!user) throw new Error("No user is logged in");
  
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef); // Get the user document from Firestore
  
    if (!userDoc.exists()) {
      throw new Error("User document not found");
    }
  
    return userDoc.data().difficulty; // Return the difficulty level from the user document
  }
  

// Get random piece for given difficulty and type
export function getRandomPiece(data, difficulty, type = "Etude") {
    const levels = skillMap[difficulty?.toLowerCase()] || []; // Get the skill levels for the given difficulty
    // Filter the data based on the skill levels and type
    const filtered = data.filter(item =>
      levels.includes(item.Level) && item.Type.toLowerCase() === type.toLowerCase()
    );

    if (!filtered.length) return null; // If no pieces match the criteria, return null
    
    return filtered[Math.floor(Math.random() * filtered.length)]; // Return a random piece from the filtered data
  }