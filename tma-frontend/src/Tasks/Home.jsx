import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import axios from "axios";

const Home = () => {
  // State for tasks, loading, and errors
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2; // Number of tasks per page

  // Fetch tasks from the API
  useEffect(() => {
    axios
      .get("api/tasks")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An unknown error occurred");
        setLoading(false);
      });
  }, []);

  // Calculate the tasks to display on the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Total number of pages
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Handle page changes
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}

      {/* Task List */}
      <TaskItem tasks={currentTasks} />

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg mr-2"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="flex items-center justify-center text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg ml-2"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
