import { Link,Outlet } from "react-router-dom";
const Layout = () => {
     return (
        <>
        <header className="border-b pb-4">
            <nav className="flex items-center justify-between">
                <h1 className="font-bold text-indigo">My Tasks</h1>
                 <div>
                    <Link className="px-3 py-1 rounded-md hover:bg-indigo-600 hover:text-white" to="/">Home</Link>
                    <Link className="px-3 py-1 rounded-md hover:bg-indigo-600 hover:text-white" to="/create">New Task</Link>
                 </div>
            </nav>
        </header>
        <main className="py-8 px-2">
           {/*slot*/}
           <Outlet/>
        </main>
        
        </>
     )
}
export default Layout;