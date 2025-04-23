import { db, auth } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'; // This is where the magic happens

// This function retrieves all tasks for the current user from the Firestore database
export const getUserTasks = async () => {
    const user = auth.currentUser; // Get the current user
    if (!user) return []; // If no user is logged in, return an empty array
    
    const tasksRef = collection(db, 'users', user.uid, 'tasks'); // Reference to the user's tasks collection
    const snapshot = await getDocs(tasksRef); // Get all tasks for the user
    
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map through the documents and return an array of task objects
    return tasks; // Return the array of tasks
};

// This function adds a new task to the Firestore database for the current user
export const addUserTask = async (taskData) => {
    const user = auth.currentUser; // Get the current user
    if (!user) throw new Error('User not logged in'); // If no user is logged in, throw an error
    
    const tasksRef = collection(db, 'users', user.uid, 'tasks'); // Reference to the user's tasks collection
    const docRef = await addDoc(tasksRef, taskData); // Add the new task to the collection

    return { id: docRef.id, ...taskData }; // Makes sure to return the goods to us so we can see them on frontend and backend
};

// This function updates an existing task in the Firestore database for the current user
export const updateUserTask = async (taskId, updatedData) => {
    const user = auth.currentUser; // Get the current user
    if (!user) throw new Error('User not logged in'); // If no user is logged in, throw an error

    const taskRef = doc(db, 'users', user.uid, 'tasks', taskId); // Reference to the specific task document
    await updateDoc(taskRef, updatedData); // Update the task with the new data
};

// This function deletes a task from the Firestore database for the current user
export const deleteUserTask = async (taskId) => {
    const user = auth.currentUser; // Get the current user
    if (!user) throw new Error('User not logged in'); // If no user is logged in, throw an error

    const taskRef = doc(db, 'users', user.uid, 'tasks', taskId); // Reference to the specific task document
    try {
        await deleteDoc(taskRef); // Delete the task from the collection
        console.log("Task deleted successfully:", taskId);
    } catch (err) {
        console.error("Error deleting task:", err.message); // Log any errors that occur during deletion
    }
};