/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const TaskItem = ({tasks}) => {

    return(
        <>
        {
            tasks.map((task)=>(
                <div key={task.id} className="p-6 border-b">
                    <div className="mb-4 flex justify-between items-start">
                        <div>
                            <h2 className="font-bold mb-2 text-lg text-indigo-500">{task.title}</h2>
                        </div>
                    </div>
                    <p className="mb-2">{task.description}</p>
                    <p className="mb-2"><small className="text-green-400 text-xs">{task.status}</small></p>
                    <p className="mb-2" ><small className="text-gray-500 text-xs">Due on: {task.dueDate}</small></p>

                  
                    <Link to={`/task/${task.id}`}
                        className="bg-indigo-500 text-white text-sm rounded-lg px-3 py-1 mr-2">Show</Link>
                </div>
            ))
        }
        </>
    )
}

export default TaskItem;