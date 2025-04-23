import { useState, useEffect } from "react";
import "./tasks.css"; // Optional custom styling
import { getUserTasks, addUserTask, updateUserTask, deleteUserTask } from "./firebase/tasks";

// This is the bulk of the code for the task management system
// It includes the task list, adding new tasks, editing existing tasks, and deleting tasks
function PracticeTasks() {
  // Here we store the state of the tasks and the popup for adding new tasks
  const [editingTask, setEditingTask] = useState(null); // index of task being edited or null
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    frequency: ""
  });
  
  // This is the state for the task list and the popup for adding new tasks
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    frequency: ""
  });

  // This function is used to fetch the tasks from the database upon loading
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getUserTasks();
        setTasks(fetchedTasks);
      } catch (err) {
        console.error("Failed to load tasks:", err.message);
      }
    };
  
    fetchTasks();
  }, []);
  

  // This function handles the change in the input fields for adding new tasks
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // This function handles the submission of the form for adding new tasks
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await addUserTask(taskData); // Here we add the task to the database
      console.log("Task added:", newTask);
      setTasks([...tasks, newTask]); // Add the new task to the list
      setTaskData({ name: "", description: "", frequency: "" }); // Reset the form fields
      setShowPopup(false); // Close the popup
      console.log("Task being added:", taskData);
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  // This function marks a task as done by removing it from the list
  const markTaskDone = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);  // Here we filter out the task at the given index and update the state
    setTasks(updatedTasks); // Update the task list
    // TODO: Mark task as done in the database
  };
  
  // This function handles the saving of edited tasks
  // It updates the task at the given index with the new data
  const saveEdit = async () => {
  const taskToUpdate = tasks[editingTask]; // Get the task being edited

    try{
      await updateUserTask(taskToUpdate.id, editData); // Here we update the task in the database

      const updatedTasks = [...tasks]; 
      updatedTasks[editingTask] = { ...taskToUpdate, ...editData }; // Update the task in the list
      setTasks(updatedTasks);
      setEditingTask(null); // Close the modal after saving
    } catch (err) {
      console.error("Error updating task:", err.message);
    }
  };
  
  // This function handles the deletion of tasks
  // It removes the task at the given index from the list
  const deleteTask = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return; // If the user cancels, do nothing

    const taskToDelete = tasks[editingTask]; // Get the task being deleted
    try {
      await deleteUserTask(taskToDelete.id); // Here we delete the task from the database
      const updatedTasks = tasks.filter((_, index) => index !== editingTask);
      setTasks(updatedTasks);
      setEditingTask(null); // Close the modal after deletion
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };
  
  return (
    <div className="authorization-container">
      <h1 className="title">Practice Tasks</h1>

      {/* This is the popup for adding a new task*/}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
              {/* Task Name */}
              <input
                type="text"
                name="name"
                placeholder="Task Name"
                value={taskData.name}
                onChange={handleChange}
                required
              />

              {/* Task Description */}
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={taskData.description}
                onChange={handleChange}
                required
              />

              {/* Task Frequency */}
              <select
                name="frequency"
                value={taskData.frequency}
                onChange={handleChange}
                required
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Biweekly">Biweekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Custom">Custom (Coming Soon)</option>
              </select>

              <button type="submit" className="submit-btn">Save Task</button>
              <button type="button" onClick={() => setShowPopup(false)} className="cancel-btn">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* This shows the user the task list */}
      <ul className="tagline mt-4">
        {/* Here we loop through the tasks array and show them to the user*/}
        {tasks.map((task, index) => (
          task && ( // Check if task is not null or undefined 
          <li key={index} className="task-item">
          <div className="task-content">
            <strong>{task.name}</strong>
          </div>
        
        
          {/* The edit button here will open the edit modal and set the current task data */}
          <div className="task-btn-group">
            <button className="task-btn edit-btn" onClick={() => {
              setEditingTask(index); // Tracks the index of the task being edited
              setEditData(task); // Load task data into the edit form
            }}>Edit</button>
        
            <button className="task-btn done-btn" onClick={() => markTaskDone(index)}>
              Done
            </button>
          </div>
        </li>
        
        )))}

      </ul>

      {/* This is the popup for editing a task */}
      {editingTask !== null && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Edit Task</h2>

            {/* For all below, the task's values are filled and then updated as the user edits them */}
            {/* Task Name*/}
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value }) // Update the name field
              }
            />

            {/* Task Description */}
            <input
              type="text"
              name="description"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value }) // Update the description field
              }
            />

            {/* Task Frequency */}
            <select
              name="frequency"
              value={editData.frequency}
              onChange={(e) =>
                setEditData({ ...editData, frequency: e.target.value }) // Update the frequency field
              }
            >
              <option value="">Select frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Custom">Custom (Coming Soon)</option>
            </select>
            <button type="submit" className="submit-btn" onClick={saveEdit}>Save Changes</button> 
            <button type="button" className="cancel-btn" onClick={() => setEditingTask(null)}>Cancel</button>
            <button type="button" className="delete-btn" onClick={deleteTask}>Delete Task</button>
          </div>
        </div>
      )}

      <button onClick={() => setShowPopup(true)} className="authorization-btn">
        Add New Task
      </button>
    </div>
  );
}

export default PracticeTasks;
