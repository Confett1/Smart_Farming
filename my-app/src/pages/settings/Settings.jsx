import { useEffect, useState } from 'react';
import '../../styles/Settings.css';
import PageLoader from '../../components/loader/PageLoader';
import Footer from '../../layout/main/footer';

const Settings = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <>
            <div className="dashboard">
                {/* Main Content Area */}
                <main className="content">

                    <section className="settings-section">
                        <h2>Settings</h2>
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
                                <div className="setting-item">
                                    <label htmlFor="language">Language</label>
                                    <select id="language" name="language">
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                        <option value="fr">Français</option>
                                        <option value="fr">Tagalog</option>
                                    </select>
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
                                <div className="setting-item">
                                    <label htmlFor="irrigation-threshold">Irrigation Threshold (%)</label>
                                    <div className="range-container">
                                        <input type="range" id="irrigation-threshold" name="irrigation-threshold" min="0" max="100" value="30"></input>
                                        <output htmlFor="irrigation-threshold">30%</output>
                                    </div>
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
                    <Footer />
                </main>
            </div>
            <script src="Settings.js"></script>
        </>
    );
};

export default Settings;    