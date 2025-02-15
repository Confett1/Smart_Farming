import { NavLink } from "react-router-dom";
import bomel from '../assets/bomel.jpg';
import './Sidebar.css'


const Sidebar = () => {
    return (
        <>
        <aside className="sidebar">
          <div className="admin-profile">
            <div className="admin-avatar">
              <img src={bomel} alt="Admin" id="adminAvatar"/>
            </div>
            <span className="admin-name">Farm Admin</span>
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