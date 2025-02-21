import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './layouts/Layout'
import Home from './Tasks/Home';
import TaskCreate from './Tasks/TaskCreate';
import NoPage from "./pages/NoPage";
import ShowTask from "./Tasks/ShowTask";
import UpdateTask from "./Tasks/UpdateTask";

function App() {
  
  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<Layout/>}>
             <Route index  element={<Home/>}/>
             <Route path="*" element={<NoPage/>}/>
             <Route path="create" element={<TaskCreate/>}/>
             <Route path="/task/update/:id" element={<UpdateTask/>}/>
             <Route path="/task/:id" element={<ShowTask/>}/>
          </Route>
       </Routes>
    </BrowserRouter>
  )
}
export default App
