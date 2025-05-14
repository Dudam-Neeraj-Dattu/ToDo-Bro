import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {

   const [tasks, setTasks] = useState([]);
   const [task, setTask] = useState("");

   const inputRef = useRef(null);

   const handleAddClick = () => {
      task.length <= 3 ? alert('Enter a valid task') : setTasks([...tasks, { id: uuidv4(), task: task, completed: false }]);
      setTask("");
      saveToLocalStorage([...tasks, { id: uuidv4(), task: task, completed: false }]);
   }

   const handleInputChange = (e) => {
      setTask(e.target.value);
   }

   const saveToLocalStorage = (tasks) => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
   }

   const handleCheckbox = (id) => () => {
      const updatedTasks = tasks.map((task) => {
         if (task.id === id) {
            return { ...task, completed: !task.completed };
         }
         return task;
      });
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
   }

   useEffect(() => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
         setTasks(JSON.parse(storedTasks));
      }
   }, []);

   const handleDelete = (id) => () => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
   }

   const handleEdit = (id) => () => {
      const taskToEdit = tasks.find((task) => task.id === id);
      setTask(taskToEdit.task);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
      inputRef.current.focus();
   }

   return (
      <div className="flex flex-col h-dvh">
         <Navbar />
         <div className="flex-grow flex flex-col items-center p-5 bg-purple-200 w-3/4 mx-auto my-5 rounded-lg max-md:w-[93.5%]">
            <div className="heading text-2xl font-bold text-center">
               <h1>Todo Bro - Let's make your tasks organised</h1>
            </div>
            <div className="addTaskContainer my-5 w-3/4 max-lg:w-full">
               <div className="addTask font-bold text-xl max-lg:text-center">
                  <h2>Add Task</h2>
               </div>
               <div className="addTaskInput flex gap-2 my-4">
                  <input ref={inputRef} value={task} onChange={handleInputChange} className="py-2 px-5 bg-white w-full rounded-xl" type="text" placeholder="Enter your task here..." />
                  <button onClick={handleAddClick} className="bg-green-800 cursor-pointer px-3 py-2 rounded-xl text-white font-bold">Add</button>
               </div>
            </div>
            <div className="tasksContainer flex-grow border-2 border-purple-800 rounded-lg w-3/4 px-5 max-lg:w-full">
               {tasks.length === 0 && <h1 className="text-center text-2xl font-bold">No tasks added yet</h1>}
               {tasks.map((task) => (
                  // <div key={task.id} className="taskContainer flex w-full  justify-between gap-5 my-5 p-5 bg-purple-300 font-medium rounded-lg hover:bg-purple-100 hover:shadow-lg hover: shadow-purple-300">
                  //    <div className="taskName flex gap-2 items-center flex-1">
                  //       <input onChange={handleCheckbox(task.id)} className="h-7 w-8 cursor-pointer" type="checkbox" name="" id="" checked={task.completed} />
                  //       <h1 className="break-words" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.task}</h1>
                  //    </div>
                  //    <div className="taskButtons flex gap-2">
                  //       <button onClick={handleEdit(task.id)} className="bg-purple-800 cursor-pointer px-3 py-2 rounded-xl"><FaEdit className="h-5 w-8 invert" /></button>
                  //       <button onClick={handleDelete(task.id)} className="bg-red-600 cursor-pointer px-3 py-2 rounded-xl"><MdDeleteForever className="h-5 w-8 invert" /></button>
                  //    </div>
                  // </div>
                  <div key={task.id} className="taskContainer grid grid-cols-[auto_1fr_auto] items-center gap-5 my-5 p-5 bg-purple-300 font-medium rounded-lg hover:bg-purple-100 hover:shadow-lg hover:shadow-purple-300">
                     {/* Checkbox */}
                     <input
                        onChange={handleCheckbox(task.id)}
                        className="h-7 w-8 cursor-pointer max-sm:h-5 max-sm:w-5"
                        type="checkbox"
                        name=""
                        id=""
                        checked={task.completed}
                     />

                     {/* Task Text */}
                     <h1
                        className="break-words"
                        style={{ textDecoration: task.completed ? 'line-through' : 'none', wordBreak: 'break-word', whiteSpace: 'normal' }}
                     >
                        {task.task}
                     </h1>

                     {/* Buttons */}
                     <div className="taskButtons flex gap-2">
                        <button
                           onClick={handleEdit(task.id)}
                           className="bg-purple-800 cursor-pointer px-3 py-2 rounded-xl max-sm:px-1 max-sm:py-1"
                        >
                           <FaEdit className="h-5 w-8 invert max-sm:h-4" />
                        </button>
                        <button
                           onClick={handleDelete(task.id)}
                           className="bg-red-600 cursor-pointer px-3 py-2 rounded-xl max-sm:px-1 max-sm:py-1"
                        >
                           <MdDeleteForever className="h-5 w-8 invert " />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <Footer />
      </div>
   )
}

export default App
