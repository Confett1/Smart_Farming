const SettingsContent = () => {
    return (
        <>
            <section className="settings-section">
                <htmlForm className="settings-htmlForm">
                    <div className="setting-group">
                        <h3>General Settings</h3>
                        <div className="setting-item">
                            <label htmlFor="notifications">Enable Notifications</label>
                            <input type="checkbox" id="notifications" name="notifications" checked></input>
                        </div>
                        <div className="setting-item">
                            <label htmlFor="dark-mode">Dark Mode</label>
                            <input type="checkbox" id="dark-mode" name="dark-mode"></input>
                        </div>

                    </div>
                    <div className="setting-group">
                        <h3>Farm Settings</h3>
                        <div className="setting-item">
                            <label htmlFor="units">Measurement Units</label>
                            <select id="units" name="units">
                                <option value="metric">Metric (°C, mm)</option>
                                <option value="imperial">Imperial (°F, in)</option>
                            </select>
                        </div>
                        <div className="setting-item">
                            <label htmlFor="data-sync">Data Sync Frequency</label>
                            <select id="data-sync" name="data-sync">
                                <option value="5">Every 5 minutes</option>
                                <option value="15">Every 15 minutes</option>
                                <option value="30">Every 30 minutes</option>
                                <option value="60">Every hour</option>
                            </select>
                        </div>

                    </div>
                    <div className="setting-group">
                        <h3>Notification Settings</h3>
                        <div className="setting-item">
                            <label htmlFor="email">Email Notifications</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email"></input>
                        </div>
                        <div className="setting-item">
                            <label htmlFor="sms">SMS Notifications</label>
                            <input type="tel" id="sms" name="sms" placeholder="Enter your phone number"></input>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Settings</button>
                </htmlForm>
            </section>
        </>
    );
};

export default SettingsContent;