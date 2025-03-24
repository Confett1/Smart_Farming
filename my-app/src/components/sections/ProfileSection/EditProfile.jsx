import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import API from "../../../api/api";
import { toast} from "../../../utils/toast";
import { Divider } from "@mui/material";
const EditProfile = ( {user, darkModePref} ) => {
    const [userDetails, setUserdetails] = useState({
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      suffix: user.suffix,
      birthday: user.birthday,
      email: user.email,
      barangay: user.barangay,
      municipality: user.municipality,
      province: user.province,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      userId: user.userId,
      userProfile: "",
    });
    const [profileImage, setProfileImage] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false); 

    const handleFileChange = (e) => {
      setProfileImage(e.target.files[0]);
    };


    const handleChange = (e) => {
      setUserdetails({
        ...userDetails,
        [e.target.name]: e.target.value,
      });
    };

    const handleSave = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("user", new Blob([JSON.stringify(userDetails)], { type: "application/json" }));
      if (profileImage) {
        formData.append("file", profileImage);
      }

      try {
        const response = await API.post('/user/update', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const updatedProfile = response.data;
        
        localStorage.setItem('user', JSON.stringify(updatedProfile));
        console.log(JSON.parse(localStorage.getItem('user')));
        updatedProfile.userProfile = '';
        setUserdetails(updatedProfile);
        console.log(userDetails);
        setUpdateSuccess(true);
        toast("Profile updated successfully", "PROFILE CHANGE", "success");
      } catch (err) {
        console.error("Error updating profile: ", err);
        toast("Profile update failed", "", "error"); 
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }

    useEffect(() => {
      if(updateSuccess) {
        setProfileImage(null);
        setUpdateSuccess(false)
      }
    }, [updateSuccess])

    return (
      <form
      onSubmit={handleSave}
      className={`relative mx-5 w-[screen] p-[50px] ${
        !darkModePref ? "bg-gray-900 text-white border-white/20" : "bg-white text-black border-gray-300"
      } bg-opacity-13 backdrop-blur-sm border rounded-md shadow-[0_0_3px_#6c746c]`}
    >
      <h3 className={`text-left text-2xl font-medium ${
        !darkModePref ? "text-green-400" : "text-[#45c44b]"
      } pb-2`}>Profile</h3>
      <Divider />
    
      {/* First Group: Account Details */}
      <div className="flex mt-3">
        <div className="w-full grid gap-2">
          {["firstName", "middleName", "lastName", "suffix", "birthday"].map((field, index) => (
            <div key={index} className="w-full pr-2">
              <label htmlFor={field} className={`block text-xs font-normal ${
                !darkModePref ? "text-gray-300" : "text-gray-700"
              }`}>
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={field === "birthday" ? "date" : "text"}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                id={field}
                value={userDetails[field] || ""}
                onChange={handleChange}
                className={`mt-1 block w-full py-3 px-3 rounded-xl border focus:outline-green-400 focus:outline-offset-2 focus:duration-50 ${
                  !darkModePref
                    ? "bg-gray-800 text-gray-200 border-gray-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                required={field !== "middleName" && field !== "suffix"}
              />
            </div>
          ))}
        </div>
    
        {/* Second Group: Profile Image and Address */}
        <div className="w-full pl-2">
          {["email", "phoneNumber", "bio"].map((field, index) => (
            <div key={index} className="w-full pt-2">
              <label htmlFor={field} className={`block text-xs font-normal ${
                !darkModePref ? "text-gray-300" : "text-gray-700"
              }`}>
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={field === "bio" ? "textarea" : field === "email" ? "email" : "text"}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                id={field}
                value={userDetails[field] || ""}
                onChange={handleChange}
                className={`mt-1 block w-full py-3 px-3 rounded-xl border focus:outline-green-400 focus:outline-offset-2 focus:duration-50 ${
                  !darkModePref
                    ? "bg-gray-800 text-gray-200 border-gray-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                required
              />
            </div>
          ))}
    
          {/* Address */}
          <div className="flex-column w-full pt-2">
            <label className={`block text-xs font-normal ${
              !darkModePref ? "text-gray-300" : "text-gray-700"
            }`}>
              Address
            </label>
            <div className="flex">
              {["barangay", "municipality", "province"].map((field, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                  name={field}
                  id={field}
                  onChange={handleChange}
                  value={userDetails[field] || ""}
                  className={`mt-1 mx-1 block w-full py-3 px-3 rounded-xl border focus:outline-green-400 focus:outline-offset-2 focus:duration-50 ${
                    !darkModePref
                      ? "bg-gray-800 text-gray-200 border-gray-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  required
                />
              ))}
            </div>
          </div>
    
          {/* Profile Image */}
          <div className="w-full pt-2">
            <label htmlFor="profileImage" className={`block text-xs font-normal ${
              !darkModePref ? "text-gray-300" : "text-gray-700"
            }`}>
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="profileImage"
              className={`mt-1 block w-full py-3 px-3 rounded-xl border focus:outline-green-400 focus:outline-offset-2 focus:duration-50 ${
                !darkModePref
                  ? "bg-gray-800 text-gray-200 border-gray-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            />
          </div>
        </div>
      </div>
    
      {/* Submit Button */}
      <div className="flex justify-between mt-6">
        <div className="text-xs text-center"></div>
        <button
          type="submit"
          className={`w-40 py-2 border text-sm font-semibold rounded-full cursor-pointer duration-300 ${
            !darkModePref
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-[#45c44b] text-white hover:bg-green-400"
          }`}
        >
          Save changes
        </button>
      </div>
    </form>
    
      );
};

EditProfile.propTypes = {
  user: PropTypes.any.isRequired,
  darkModePref: PropTypes.bool.isRequired,
}

export default EditProfile;