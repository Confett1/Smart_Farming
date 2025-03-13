// import { Divider } from "@mui/material";

import { useState } from "react";
import API from "../../../api/api";
import { toast } from "../../../utils/toast";


const SecuritySettings = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [passwords, setPasswords] = useState({
    id: user.userId,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  console.log(passwords);
  

  
  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangePass = async (e) => {
    e.preventDefault();

    if (!passwords.newPassword ||  !passwords.confirmNewPassword || !passwords.currentPassword) {
      toast("Please fill out all the fields", "","warning");
      return;
    }

    if (passwords.newPassword != passwords.confirmNewPassword) {
      toast("New Password doesn't match", "","warning");
      return;
    }

    try {
      const response = await API.post('/user/changePasswords', passwords);
      const toastResponse = await toast(response?.data, "Password Update", "success");
      
      if (toastResponse.isConfirmed) {
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      }
    } catch (err) {
      const toastResponse = await toast(err.response.data , "Password change error", "error");
      if (toastResponse.isConfirmed) {
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      }
    }
  }

  const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
  return (
    
    <form onSubmit={handleChangePass}>
    <div className={`${darkModePref ? "bg-white text-gray-600" : "text-gray-200 bg-gray-800"} p-4 rounded-xl shadow duration-300`}>
      <div className={ `border-b border-gray-100`}>
        <h3 className="text-lg font-semibold">Security and Privacy</h3>
        <p className="text-sm pb-2.5">Manage your security settings</p>
      </div>
      <div className={`mx-2 pt-3 ${darkModePref ? "text-gray-600" : "text-gray-200"}`}>
        <div className="flex justify-between items-center">
          <div className="font-medium">
            <p>Current Password</p>
          </div>
          <input 
          style={{backgroundColor: "white"}}
          type="password"
          placeholder="Current password"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
          id="currentPassword" 
          className={`mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50`}/>

        </div>
        <div className="flex justify-between items-center py-0.5">
          <div className="font-medium">
            <p>New Password</p>
          </div>
          <input 
          style={{backgroundColor: "white"}}
          value={passwords.newPassword}
          type="password"
          placeholder="New password"
          name="newPassword"
          onChange={handleChange}
          id="newPassword" 
          className="mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50"/>

        </div>
        <div className="flex justify-between items-center">
          <div className="font-medium ">
            <p>Confirm Password</p>
          </div>
          <input 
          style={{backgroundColor: "white"}}
          type="password"
          value={passwords.confirmNewPassword}
          placeholder="Confirm password"
          name="confirmNewPassword"
          onChange={handleChange}
          id="confirmpassword" 
          className="mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50"/>
      
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-gray-700 text-white px-6 w-86 py-3 rounded-lg hover:bg-gray-500 my-3">SUBMIT</button></div>
        </div>
    </div>
    </form>
  );
};

export default SecuritySettings;