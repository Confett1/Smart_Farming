import {Divider} from "@mui/material";

const NotificationSettings = ( formData, handleChange ) => {
    return (
        <div className="p-4 bg-white rounded-xl shadow duration-300">
        <div className="border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700">Notification Preferences</h3>
          <p className="text-gray-500 text-sm pb-2.5">Configure how you receive notifications</p>
        </div>
        <div className="mx-2 pt-3">
          <div className="flex justify-between items-center">
            <div className="font-medium text-gray-600">
              <p>Email Notifications</p>
            <p className="font-normal text-sm">Receive notifications about important updates via email.</p>
            </div>
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={formData.email}
              onChange={handleChange}
              className="toggle-switch"
            />
          </div>
          <Divider sx={{my: 1.3}} />
          <div className="flex justify-between items-center">
            <div className="font-medium text-gray-600">
              <p>SMS Notifications</p>
            <p className="font-normal text-sm">Receive notifications about important updates via SMS.</p>
            </div>
            <input
              type="checkbox"
              id="darkMode"
              name="darkMode"
              checked={formData.SMS}
              onChange={handleChange}
              className="toggle-switch"
            />
          </div>
        </div>
      </div>
    );
};

export default NotificationSettings;