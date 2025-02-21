import { NavLink } from "react-router-dom";
import '../../../styles/Sidebar.css'
import { Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Sidebar = ({userProfile}) => {
  return (
    <>
      <aside className="sidebar">
        <div className="flex flex-col items-center">
          <div className="w-[80px] h-[80px] overflow-hidden mx-auto rounded-full border-1">
            <img src={userProfile} alt="Admin" id="adminAvatar" className="object-cover w-full h-full" />
          </div>
          <Typography
            sx={{
              fontSize: 17,
              pt: 1,
              fontWeight: '600',
              opacity: 0.9
            }}
          >
            ADMINISTRATOR
          </Typography>
          <Typography 
            sx={{
              fontSize: '15px',
              fontWeight: 100,
              opacity: 0.9
            }}
          >
            Main Admin
          </Typography>
          {/* <span className="admin-status online">Online</span> */}
        </div>
        <Divider
          sx={{
            pt: 1,
            borderColor: "#f5f5f5",
            opacity: 0.3,
            mb: -2.5
          }}
        />
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/chart" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fas fa-chart-line"></i>
            <span>Chart</span>
          </NavLink>
          <NavLink to="/waterlevel" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fas fa-water"></i>
            <span>Irrigation</span>
          </NavLink>
          <NavLink to="/records" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fas fa-history"></i>
            <span>Records</span>
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  userProfile: PropTypes.any.isRequired,
}

export default Sidebar;