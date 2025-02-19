import { NavLink } from "react-router-dom";
import userProfile from '../assets/user-profile.jpg';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <>
        <aside className="sidebar">
          <div className="flex flex-col items-center">
            <div className="w-[80px] h-[80px] overflow-hidden mx-auto rounded-full border-1">
              <img src={userProfile} alt="Admin" id="adminAvatar" className="object-cover w-full h-full"/>
            </div>
            <p className="text-xl font-semibold opacity-90">ADMINISTRATOR</p>
            <p className="text-[16px] font-thin">Main Admin</p>
            <span className="admin-status online">Online</span>
          </div>
          <nav className="sidebar-nav">
            <NavLink to="/" className={({isActive}) => (isActive ? "nav-item active" : "nav-item")}>
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/chart" className={({isActive}) => (isActive ? "nav-item active" : "nav-item")}>
              <i className="fas fa-chart-line"></i>
              <span>Chart</span>
            </NavLink>
            <NavLink to="/waterlevel" className={({isActive}) => (isActive ? "nav-item active" : "nav-item")}>
              <i className="fas fa-water"></i>
              <span>Irrigation</span>
            </NavLink>
            <NavLink to="/records" className={({isActive}) => (isActive ? "nav-item active" : "nav-item")}>
              <i className="fas fa-history"></i>
              <span>Records</span>
            </NavLink>
            <NavLink to="/settings" className={({isActive}) => (isActive ? "nav-item active" : "nav-item")}>
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </NavLink>
          </nav>
        </aside>
        </>
    );
};

export default Sidebar;