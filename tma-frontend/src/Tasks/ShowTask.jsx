import { useState,useEffect } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import axios from "axios";
const ShowTask = () => {
    //redirect user using usenavigate hook
    const navigate = useNavigate();

    //get id from the route
    const {id} = useParams();

    //task object
    const[task,setTask] = useState(null);

    //function to obtain a task
    const getTask = async()=>{
       try{
        const resp = await axios.get(`/api/tasks/${id}`)
        if(resp.status === 200){
            setTask(resp.data);}
        }catch(err){
            console.log(err.message || 'An error occurred');
        }
    }

    //function that deletes a task
    async function handleDelete(e) {
        e.preventDefault();
        //show confirm dialog before delete is done
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if(confirmDelete){
        try {
            const resp = await axios.delete(`/api/tasks/${id}`)
            //console.log(resp.status);
            if (resp.status === 200) {
                alert("Deleted successfully");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            console.log(err.message || 'An error occurred');
        }
      }else {
        alert("Delete action was canceled.");
     }
    }

    //function to update task as completed
    async function handleComplete(e){
      e.preventDefault();
      try{
        const resp = await axios.patch(`/api/tasks/${id}/complete`);

        if(resp.status === 200){
          alert("Status updated successfully");
          //refresh the page if status is updates successfully
          window.location.reload();
        }

      }catch(error){
        alert(error.message || 'Something went wrong');
      }
    }
    
    useEffect(()=>{
        getTask()
    },[])

    return(
        <>
           {task ? (
            <div key={task.id} className="mt-4 p-4 border rounded-md border-dashed border-slate-400">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-2xl text-indigo-500">{task.title}</h2>
                  <p><small className="text-xs text-green-600">{task.status}</small></p>
                  <p><small className="text-xs text-slate-600">Created on {task.dueDate}</small></p>
                </div>
              </div>
              <p>{task.description}</p>
              {/* Link to update check if the user owns the post*/}
              <div className="flex items-center justify-end gap-4">
                <Link to={`/task/update/${task.id}`}
                className="bg-green-500 text-white text-sm rounded-lg px-3 py-1">Update</Link>
                
                
                {/* Form to delete post */}

                <form onSubmit={handleDelete}>
                    <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">Delete</button>
                </form>

                <form onSubmit={handleComplete}>
                    <button className="bg-indigo-400 text-white text-sm rounded-lg px-3 py-1 mr-2">Mark as complete</button>
                </form>
              </div>
            </div>
         ):(<p className="title">Post not found</p>)} 
        </>
    )
}

export default ShowTask;