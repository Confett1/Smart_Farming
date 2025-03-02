const Notifications = () => {
    const notifications = [
        {
            id: 1,
            icon: 'bell',
            title: 'New message from John',
            description: 'You received a new message from John.',
            time: '2 minutes ago',
            color: 'text-blue-500',
        },
        {
            id: 2,
            icon: 'check-circle',
            title: 'Task Completed',
            description: 'Your task "Finish the project" has been completed.',
            time: '10 minutes ago',
            color: 'text-green-500',
        },
        {
            id: 3,
            icon: 'exclamation-circle',
            title: 'Warning: Server Down',
            description: 'The server is down. Please take action immediately.',
            time: '30 minutes ago',
            color: 'text-yellow-500',
        },
        {
            id: 4,
            icon: 'times-circle',
            title: 'Action Required',
            description: 'Your subscription has expired. Please renew it.',
            time: '1 hour ago',
            color: 'text-red-500',
        },
        {
            id: 5,
            icon: 'info-circle',
            title: 'System Update Available',
            description: 'A new system update is available. Please update your system.',
            time: '2 hours ago',
            color: 'text-blue-500',
        },
    ];

    return (
        <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-semibold mb-6">All Notifications</h1>
            <ul>
                {notifications.map((notification) => (
                    <li
                        key={notification.id}
                        className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-50"
                    >
                        <div className="flex-shrink-0">
                            <span className={`notification-icon ${notification.color}`}>
                                <i className={`fas fa-${notification.icon}`}></i>
                            </span>
                        </div>
                        <div className="ml-4">
                            <p className="text-gray-800 font-semibold">{notification.title}</p>
                            <p className="text-gray-600">{notification.description}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
