"use client"

// import { useState } from "react"
import GeneralSettings from "./GeneralSettings"
// import FarmSettings from "./FarmSettings"
import SecuritySettings from "./Security"
// import NotificationSettings from "./NotificationSettings"

const SettingsContent = () => {
  // const [formData, setFormData] = useState({
  //   notifications: "",
  //   units: "metric",
  //   syncFrequency: "15",
  //   email: "",
  //   phone: "",
  //   currentPassword: "",
  //   newPassword: "",
  //   twoFactor: false,
  //   dataSharing: true,
  // })

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: type === "checkbox" ? checked : value,
  //   }))
  //   console.log(formData.darkMode);
    
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("Form submitted:", formData)
  // }

  return (
    <div>
      <div className="grid grid-cols-[1fr,1fr] gap-2.5">
        <GeneralSettings  />
        {/* <FarmSettings /> */}
        <SecuritySettings />
        {/* <NotificationSettings /> */}


        {/* Farm Settings */}
        {/* <div className="settings-card">
          <div className="m-4 border-b border-gray-100">
            <h3 className="text-lg">🚜 Farm Settings</h3>
            <p className="card-description">Configure your farm preferences</p>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="units">Measurement Units</label>
              </div>
              <select id="units" name="units" value={formData.units} onChange={handleChange} className="select-input">
                <option value="metric">Metric (°C, mm)</option>
                <option value="imperial">Imperial (°F, in)</option>
              </select>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="syncFrequency">Data Sync Frequency</label>
              </div>
              <select
                id="syncFrequency"
                name="syncFrequency"
                value={formData.syncFrequency}
                onChange={handleChange}
                className="select-input"
              >
                <option value="5">Every 5 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="30">Every 30 minutes</option>
                <option value="60">Every hour</option>
              </select>
            </div>
          </div>
        </div> */}

        {/* Security & Privacy */}
        {/* <div className="settings-card">
          <div className="m-4 border-b border-gray-100">
            <h3 className="text-lg">🔒 Security & Privacy</h3>
            <p className="card-description">Manage your security settings</p>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleChange}
                className="text-input"
              />
            </div>
            <div className="setting-item">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="text-input"
              />
            </div>
            <div className="setting-item">
              <label htmlFor="twoFactor">Two-Factor Authentication</label>
              <input
                type="checkbox"
                id="twoFactor"
                name="twoFactor"
                checked={formData.twoFactor}
                onChange={handleChange}
                className="toggle-switch"
              />
            </div>
            <div className="setting-item">
              <label htmlFor="dataSharing">Data Sharing</label>
              <input
                type="checkbox"
                id="dataSharing"
                name="dataSharing"
                checked={formData.dataSharing}
                onChange={handleChange}
                className="toggle-switch"
              />
            </div>
          </div>
        </div> */}

        {/* Notification Preferences */}
        {/* <div className="settings-card">
          <div className="m-4 border-b border-gray-100">
            <h3 className="text-lg">📧 Notification Preferences</h3>
            <p className="card-description">Configure how you receive notifications</p>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="email">Email Notifications</label>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="text-input"
              />
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="phone">SMS Notifications</label>
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="text-input"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default SettingsContent

