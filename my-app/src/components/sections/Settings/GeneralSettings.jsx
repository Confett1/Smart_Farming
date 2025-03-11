import {Divider} from "@mui/material";
import { useState } from "react";

const GeneralSettings = ( formData ) => {
  
  const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
  const [isDarkMode, setIsDarkMode] = useState(!darkModePref);
  

  const handleDarkModeToggle = async () => {
    
      setIsDarkMode((prev) => !prev);
      localStorage.setItem('darkmode', isDarkMode);
      
      window.location.reload();
  };

  const handleChange = () => {
    console.log(isDarkMode);
    
  }

    return (
        <div className={`p-4 ${darkModePref? "bg-white" : "bg-gray-600"} rounded-xl shadow duration-300`}>
        <div className={`${darkModePref? "text-gray-700" : "text-gray-300 "} border-b border-gray-100`}>
          <h3 className="text-lg font-semibold">General Settings</h3>
          <p className=" text-sm pb-2.5">Manage your general preferences</p>
        </div>
        <div className={`${darkModePref? "text-gray-600" : "text-gray-200"} mx-2 pt-3`}>
          <div className="flex justify-between items-center">
            <div className="font-medium">
              <p>Notifications</p>
              <p className="font-normal text-sm">Receive notifications about important updates</p>
            </div>
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={formData.notification}
              onChange={handleChange}
              className="toggle-switch"
            />
          </div>
          <Divider sx={{my: 1.3}} />
          <div className={` ${darkModePref ? "text-gray-600" : "text-gray-200"} flex justify-between items-center`}>
            <div className="font-medium">
              <p>Dark Mode</p>
              <p className="font-normal text-sm">Enable dark mode for better viewing at night</p>
            </div>
            <input
              type="checkbox"
              id="darkMode"
              name="darkMode"
              checked={!darkModePref}
              onChange={handleDarkModeToggle}
              className="toggle-switch"
            />
          </div>
        </div>
      </div>
    );
};

export default GeneralSettings;