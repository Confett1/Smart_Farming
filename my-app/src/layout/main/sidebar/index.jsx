import { NavLink } from "react-router-dom";
import '../../../styles/Sidebar.css';
import { Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";
import bomel from '../../../assets/images/bomel.jpg';
import { useEffect } from "react";
import { Home, BarChart2, Clock, Users, Settings, Leaf } from "lucide-react";

const Sidebar = ({userProfile, darkModePref}) => {
  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);



  return (
    <aside className={`w-[260px] ${darkModePref? "bg-green-700" : "bg-green-900"} p-[20px] text-white flex flex-col fixed h-screen left-0 top-0 sidebar`}>
      {/* Decorative leaves */}
      <div className="absolute top-0 right-0 opacity-10">
        <Leaf className="w-24 h-24 text-white transform rotate-45" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-10">
        <Leaf className="w-32 h-32 text-white transform -rotate-15" />
      </div>
      <div className="absolute top-1/3 left-0 opacity-5">
        <Leaf className="w-16 h-16 text-white transform rotate-180" />
      </div>
      <div className="absolute bottom-1/4 right-0 opacity-5">
        <Leaf className="w-20 h-20 text-white transform -rotate-30" />
      </div>

      {/* Profile section */}
      <div className="relative z-10 flex flex-col items-center pt-8 pb-4">
        <div className="w-[90px] h-[90px] overflow-hidden mx-auto rounded-full border-4 border-emerald-200/30 shadow-lg">
          <img
            src={userProfile?.userProfile || defaultAvatar}
            alt="User Avatar"
            onError={(e) => {
              const target = e.target ;
              target.src = defaultAvatar;
            }}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="mt-3 text-center">
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: "600",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            {userProfile.role ? userProfile.role.toUpperCase() : ""}
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 300,
              opacity: 0.9,
              textTransform: "capitalize",
              maxWidth: "200px",
              margin: "0 auto",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {`${userProfile.firstName || ""} ${userProfile.middleName || ""} ${userProfile.lastName || ""} ${userProfile.suffix || ""}`}
          </Typography>
          <div className="flex items-center justify-center mt-1">
            <span className="h-2 w-2 rounded-full bg-green-300 mr-1.5"></span>
            <span className="text-xs text-green-100">Online</span>
          </div>
        </div>
      </div>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.1)",
          margin: "0 16px",
        }}
      />

      {/* Navigation */}
      <div className="relative z-10 px-4 py-5">
        <Typography
          fontSize={12}
          sx={{
            opacity: 0.7,
            pb: 1.5,
            pl: 1.5,
            letterSpacing: "1px",
            fontWeight: 500,
          }}
        >
          MENU
        </Typography>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded-lg transition-all duration-200 ${
                isActive ? "bg-white/15 text-white shadow-sm" : "text-white/80 hover:bg-white/10"
              }`
            }
          >
            <Home className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium custom-translate">Dashboard</span>
          </NavLink>

          <NavLink
            to="/chart"
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded-lg transition-all duration-200 ${
                isActive ? "bg-white/15 text-white shadow-sm" : "text-white/80 hover:bg-white/10"
              }`
            }
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium custom-translate">Chart</span>
          </NavLink>

          {userProfile.role === "admin" && (
            <>
              <NavLink
                to="/records"
                className={({ isActive }) =>
                  `flex items-center p-3 mb-2 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-sm" : "text-white/80 hover:bg-white/10"
                  }`
                }
              >
                <Clock className="w-5 h-5 mr-3 transform-(translateX(5px))" />
                <span className="text-sm font-medium custom-translate">Records</span>
              </NavLink>

              <NavLink
                to="/userrecords"
                className={({ isActive }) =>
                  `flex items-center p-3 mb-2 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-white/15 text-white shadow-sm" : "text-white/80 hover:bg-white/10"
                  }`
                }
              >
                <Users className="w-5 h-5 mr-3" />
                <span className="text-sm font-medium custom-translate">User Records</span>
              </NavLink>
            </>
          )}

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded-lg transition-all duration-200 ${
                isActive ? "bg-white/15 text-white shadow-sm" : "text-white/80 hover:bg-white/10"
              }`
            }
          >
            <Settings className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium custom-translate">Settings</span>
          </NavLink>
        </nav>
      </div>

      {/* Footer decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-900/50 to-transparent pointer-events-none"></div>
    </aside>
  );
};

Sidebar.propTypes = {
  userProfile: PropTypes.any.isRequired,
  darkModePref: PropTypes.any.isRequired,
}
export default Sidebar;