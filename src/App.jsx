import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarComponent from "./components/Sidebar";
import UserComponent from "./components/UserComponent";
import NavbarComponent from "./components/Navbar";
import { useNavigate } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="md:hidden">
        <NavbarComponent />
      </div>
      <div className="hidden md:block">
        <SidebarComponent
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
      <div
        className={`flex flex-col transition-width duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        } w-full p-4 py-1`}
      >
        <div className="relative overflow-y-auto overflow-x-auto h-full max-w-screen-4xl">
          <div className="hidden md:flex justify-end p-4">
            <UserComponent />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
