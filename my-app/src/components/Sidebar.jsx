import { Link } from "react-router-dom";
import bomel from '../assets/bomel.jpg';
import './Sidebar.css';

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
              <Link to="/" className="nav-item active">
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
              </Link>
              <Link to="/chart" className="nav-item">
                <i className="fas fa-chart-line"></i>
                <span>Chart</span>
              </Link>
              <Link to="/waterlevel" className="nav-item">
                <i className="fas fa-water"></i>
                <span>Irrigation</span>
              </Link>
              <Link to="/records" className="nav-item">
                <i className="fas fa-history"></i>
                <span>Records</span>
              </Link>
              <Link to="/settings" className="nav-item">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </nav>
          </aside>
        </>
    );
}

export default Sidebar;