import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaskCreate = () => {
  // set up form variables
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });
  
  // state for handling errors
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  // allows redirection to another page after submission
  const navigate = useNavigate();

  // function to validate the form before submission
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
      isValid = false;
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters long.";
      isValid = false;
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    // Due date validation
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required.";
      isValid = false;
    }

    // Status validation
    if (!formData.status) {
      newErrors.status = "Status is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // function to create the task
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("api/tasks", {
        ...formData,
      });

      // created task returns status code of 201
      if (response.status === 201) {
        alert("Task created successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl mb-6">Create a new task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Task title</label>
          <input
            type="text"
            className="border-0 outline-0 p-2 ring-1 ring-indigo-400 rounded-lg w-full block mt-1 focus:ring-2"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label>Task Description</label>
          <textarea
            className="border-0 outline-0 p-2 ring-1 ring-indigo-400 rounded-lg w-full block mt-1 focus:ring-2"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label>Task Due Date</label>
          <input
            type="date"
            className="border-0 outline-0 p-2 ring-1 ring-indigo-400 rounded-lg w-full block mt-1 focus:ring-2"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
          />
          {errors.dueDate && <p className="text-red-500">{errors.dueDate}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="border-0 outline-0 p-2 ring-1 ring-indigo-400 rounded-lg w-full block mt-1 focus:ring-2"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="">Click to view options</option>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
          {errors.status && <p className="text-red-500">{errors.status}</p>}
        </div>
        <button className="bg-indigo-400 text-white block w-full p-2 rounded-lg hover:bg-indigo-600 mt-2">
          Create
        </button>
      </form>
    </>
  );
};

export default TaskCreate;
