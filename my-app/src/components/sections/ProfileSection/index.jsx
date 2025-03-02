import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import userProfile from "../../../assets/images/bomel.jpg"

const Profile = () => {
  return (
    <div className="min-h-screen">
      {/* Main Profile Card */}
      <div className="max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative">
          <div className="w-full h-56 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-t-xl">
            <img
              src={userProfile}
              alt="Profile Banner"
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>

          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img
                src={userProfile}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-8 py-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Bomel Morado</h2>
          <p className="text-gray-600 text-sm">Software Developer</p>

          {/* Social Links */}
          <div className="mt-4 flex justify-center space-x-6">
            <a href="/" className="text-blue-500 hover:text-blue-700">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="/" className="text-blue-400 hover:text-blue-600">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="/" className="text-gray-800 hover:text-gray-600">
              <FaGithub className="text-2xl" />
            </a>
            <a href="/" className="text-blue-600 hover:text-blue-800">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>

        {/* User Info */}
        <div className="px-8 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Personal Info */}
            <div className="border border-gray-300 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              <div className="mt-4 text-gray-600 text-sm leading-6.5">
                <p><span className='font-semibold'>First Name:</span> Bomel</p>
                <p><span className='font-semibold'>Last Name:</span> Morado</p>
                <p><span className='font-semibold'>Email:</span> sample@example.com</p>
                <p><span className='font-semibold'>Phone:</span> +1 (234) 567-890</p>
                <p><span className='font-semibold'>Location:</span> Pambujan, Northern Samar</p>
              </div>
            </div>

            {/* About */}
            <div className="border border-gray-300 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800">About</h3>
              <div className="mt-2 text-gray-600 text-sm">
                <p>
                  I'm a software developer with a passion for building user-friendly web
                  applications. I specialize in frontend development with React and Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        {/* <div className="px-8 py-6 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h3>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-800">120</p>
              <p className="text-sm text-gray-600">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-800">50</p>
              <p className="text-sm text-gray-600">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-800">80</p>
              <p className="text-sm text-gray-600">Following</p>
            </div>
          </div>
        </div> */}

        {/* Settings & Actions */}
        {/* <div className="px-8 py-6 bg-gray-100 rounded-b-xl">
          <div className="flex justify-between">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all">
              Edit Profile
            </button>
            <button className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all">
              Logout
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
