// import { Divider } from "@mui/material";

const SecuritySettings = (formData, handleChange) => {
  const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
  return (
    <div className={`${darkModePref ? "bg-white text-gray-600" : "text-gray-200 bg-gray-800"} p-4 rounded-xl shadow duration-300`}>
      <div className={`border-b border-gray-100`}>
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
          name="currentpassword"
          onChange={handleChange}
          id="currentpassword" 
          className={`mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50`}/>

        </div>
        <div className="flex justify-between items-center py-0.5">
          <div className="font-medium">
            <p>New Password</p>
          </div>
          <input 
          style={{backgroundColor: "white"}}
          type="password"
          placeholder="New password"
          name="newpassword"
          onChange={handleChange}
          id="newpassword" 
          className="mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50"/>

        </div>
        <div className="flex justify-between items-center">
          <div className="font-medium ">
            <p>Confirm Password</p>
          </div>
          <input 
          style={{backgroundColor: "white"}}
          type="password"
          placeholder="Confirm password"
          name="confirmpassword"
          onChange={handleChange}
          id="confirmpassword" 
          className="mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50"/>

        </div>
        {/* <Divider sx={{ my: 1.3 }} /> */}
      </div>
    </div>
  );
};

export default SecuritySettings;