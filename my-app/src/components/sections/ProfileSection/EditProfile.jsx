import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import API from "../../../api/api";
import { toast} from "../../../utils/toast";
import { Divider } from "@mui/material";
const EditProfile = ( {user} ) => {
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
          <form onSubmit={handleSave} className="relative mx-5  w-[screen] p-[50px] bg-white bg-opacity-13 backdrop-blur-sm border- border-white/10 rounded-md shadow-[0_0_3px_#6c746c]">
            <h3 className="text-left text-2xl font-medium text-[#45c44b] pb-2">Profile</h3>
            <Divider />
    
            {/* First Group: Account Details */}
            <div className="flex mt-3">
              <div className="w-full grid gap-2">
                <div className="w-full pr-2">
                  <label htmlFor="firstName" className="block text-xs font-normal text-[#6c746c]">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    id="firstName"
                    value={userDetails.firstName || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                    required 
                  />
                </div>
    
                <div className="w-full pr-2">
                  <label htmlFor="middleName" className="block text-xs font-normal text-[#6c746c]">Middle Name</label>
                  <input
                    type="text"
                    placeholder="Middle Name"
                    name="middleName"
                    id="middleName"
                    onChange={handleChange}
                    value={userDetails?.middleName || ''}
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                  
                  />
                </div>
    
                <div className="w-full pr-2">
                  <label htmlFor="lastName" className="block text-xs font-normal text-[#6c746c]">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    id="lastName"
                    onChange={handleChange}
                    value={userDetails.lastName || ""}
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                    required
                  />
                </div>
    
                <div className="w-full pr-2">
                  <label htmlFor="suffix" className="block text-xs font-normal text-[#6c746c]">Suffix (Jr, Sr, etc.)</label>
                  <input
                    type="text"
                    placeholder="Suffix"
                    name="suffix"
                    id="suffix"
                    onChange={handleChange}
                    value={userDetails?.suffix || '' }
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                  />
                </div>
    
                <div className="w-full pr-2">
                  <label htmlFor="birthday" className="block text-xs font-normal text-[#6c746c]">Birthday</label>
                  <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    onChange={handleChange}
                    value={userDetails.birthday || ""}
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                    required
                  />
                </div>
              </div>
    
              {/* Second Group: Profile Image */}
              <div className="w-full">
                <div className="w-full pl-2">
                  <label htmlFor="email" className="block text-xs font-normal text-[#6c746c]">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    value={userDetails.email || ""}
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                    required
                  />
                </div>
                <div className="flex-column w-full pl-2 pt-2">
                  <label htmlFor="barangay" className="block text-xs font-normal text-[#6c746c]">Address</label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Barangay"
                      name="barangay"
                      id="barangay"
                      onChange={handleChange}
                      value={userDetails.barangay || ''}
                      className="mt-1 mr-3 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Municipality"
                      name="municipality"
                      id="municipality"
                      onChange={handleChange}
                      value={userDetails.municipality || ''}
                      className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                      required
                    />
                    <input
                      type="text"
                      placeholder="City / Province"
                      name="province"
                      id="province"
                      onChange={handleChange}
                      value={userDetails.province || ''}
                      className="mt-1 ml-3 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                      required
                    />
                  </div>
                </div>
    
                <div className="w-full pl-2 pt-2">
                  <label htmlFor="phoneNumber" className="block text-xs font-normal text-[#6c746c]">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    id="phoneNumber"
                    onChange={handleChange}
                    value={userDetails.phoneNumber || ''}
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                    required
                  />
                </div>
                <div className="w-full pl-2 pt-2">
                  <label htmlFor="bio" className="block text-xs font-normal text-[#6c746c]">Bio</label>
                  <textarea
                    type="text"
                    name="bio"
                    placeholder="Bio"
                    id="bio"
                    onChange={handleChange}
                    rows={3}
                    maxLength={250}
                    value={userDetails.bio || ''}
                    className="mt-1 block w-full py-5 px-5 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                    required
                  />
                </div>
                <div className="pl-2 pt-2">
                  <label htmlFor="profileImage" className="block text-xs font-normal text-[#6c746c]">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="profileImage"
                    className="mt-1 block w-full py-3 px-3 bg-white bg-opacity-7 text-[#6c746c] text-sm font-light rounded-xl border border-gray-300 focus:outline-[#b0ffa5] focus:outline-offset-2 focus-within:border-green-400 focus:duration-50"
                  />
                </div>
              </div>
            </div>
    
            {/* Submit Button */}
            <div className="flex justify-between">
              <div className="text-xs text-center mt-6">
                <p></p>
              </div>
              <button
                type="submit"
                className="mt-[15px] w-40 py-2 border bg-[#45c44b] text-[#f0f0f0] text-sm font-semibold rounded-full cursor-pointer duration-300 hover:bg-green-400 hover:duration-300"
              >
                Save changes
              </button>
            </div>
          </form>
      );
};

EditProfile.propTypes = {
  user: PropTypes.any.isRequired
}

export default EditProfile;