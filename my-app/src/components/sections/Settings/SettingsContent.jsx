"use client"

import { useState } from "react"

const SettingsContent = () => {
  const [formData, setFormData] = useState({
    notifications: true,
    darkMode: false,
    units: "metric",
    syncFrequency: "15",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    twoFactor: false,
    dataSharing: true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="settings-container">
      <form onSubmit={handleSubmit} className="settings-grid">
        {/* General Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>🔔 General Settings</h3>
            <p className="card-description">Manage your general preferences</p>
          </div>
          <div className="card-content">
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="notifications">Notifications</label>
                <span className="setting-description">Receive notifications about important updates</span>
              </div>
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
                className="toggle-switch"
              />
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <label htmlFor="darkMode">Dark Mode</label>
                <span className="setting-description">Enable dark mode for better viewing at night</span>
              </div>
              <input
                type="checkbox"
                id="darkMode"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleChange}
                className="toggle-switch"
              />
            </div>
          </div>
        </div>

        {/* Farm Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>🚜 Farm Settings</h3>
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
        </div>

        {/* Security & Privacy */}
        <div className="settings-card">
          <div className="card-header">
            <h3>🔒 Security & Privacy</h3>
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
        </div>

        {/* Notification Preferences */}
        <div className="settings-card">
          <div className="card-header">
            <h3>📧 Notification Preferences</h3>
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
        </div>
      </form>
    </div>
  )
}

export default SettingsContent

