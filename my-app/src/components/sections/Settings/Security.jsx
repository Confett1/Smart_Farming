// import { Divider } from "@mui/material";

const SecuritySettings = (formData, handleChange) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow duration-300">
      <div className="border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700">Security and Privacy</h3>
        <p className="text-gray-500 text-sm pb-2.5">Manage your security settings</p>
      </div>
      <div className="mx-2 pt-3">
        <div className="flex justify-between items-center">
          <div className="font-medium text-gray-600">
            <p>Current Password</p>
          </div>
          <input 
          type="password"
          placeholder="Current password"
          name="currentpassword"
          onChange={handleChange}
          id="currentpassword" 
          className="mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50"/>

        </div>
        <div className="flex justify-between items-center py-0.5">
          <div className="font-medium text-gray-600">
            <p>New Password</p>
          </div>
          <input 
          type="password"
          placeholder="New password"
          name="newpassword"
          onChange={handleChange}
          id="newpassword" 
          className="mt-1 block w-86 py-3 px-2 text-[#6c746c] text-sm font-normal rounded-lg border border-gray-300 focus:outline-[#d8eed5de] focus:outline-offset-2 focus-within:border-green-700 focus:duration-50"/>

        </div>
        <div className="flex justify-between items-center">
          <div className="font-medium text-gray-600">
            <p>Confirm Password</p>
          </div>
          <input 
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