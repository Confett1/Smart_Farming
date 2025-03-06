import { NavLink } from "react-router-dom";
import '../../../styles/Sidebar.css'
import { Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import bomel from '../../../assets/images/bomel.jpg'
import { useEffect } from "react";

const Sidebar = ({userProfile}) => {
  useEffect(() => {
    console.log(userProfile)
  }, [userProfile])

  return (  
    <>
      <aside className="sidebar">
        <div className="flex flex-col items-center">
          <div className="w-[80px] h-[80px] overflow-hidden mx-auto rounded-full border-1">
            <img src={userProfile?.userProfile ? userProfile.userProfile : bomel} alt="Admin" id="adminAvatar" onError={(e) => { e.target.src = bomel; }} className="object-cover w-full h-full" />
          </div>
          <Typography
            sx={{
              fontSize: 17,
              pt: 1,
              fontWeight: '600',
              opacity: 0.9
            }}
          >
            {userProfile.role? (userProfile.role).toUpperCase() : ''}
          </Typography>
          <Typography 
            sx={{
              fontSize: '15px',
              fontWeight: 100,
              opacity: 0.9
            }}
          >
            {`${userProfile.firstName || ''} ${userProfile.middleName || ''} ${userProfile.lastName || ''} ${userProfile.suffix || ''}`}
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
        
        <nav className="sidebar-nav text-sm">
          <Typography fontSize={12} textAlign={'left'} sx={{opacity: 0.9, pb: 1}}>MENU</Typography>
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/chart" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
            <i className="fas fa-chart-line"></i>
            <span>Chart</span>
          </NavLink>
          {userProfile.role === "admin" && (
            <>
              <NavLink to="/control-panel" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
              <i className="fa-solid fa-sliders"></i>
              <span>Control Panel</span>
              </NavLink>
              <NavLink to="/records" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                <i className="fas fa-history"></i>
                <span>Records</span>
              </NavLink>
            </>
          ) }
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