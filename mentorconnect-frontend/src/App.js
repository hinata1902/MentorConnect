import React, { useState, useEffect } from 'react';
import './styles/App.css';
import MentorList from './components/MentorList';
import MenteeList from './components/MenteeList';
import './styles/MenteeListPage.css';
import axios from 'axios';

const Home = () => <span>🏠</span>;
const UserIcon = () => <span>👤</span>;
const MessageCircle = () => <span>💬</span>;
const Settings = () => <span>⚙️</span>;
const LogOut = () => <span>🚪</span>;
const LogIn = () => <span>🔑</span>;
const UserPlus = () => <span>➕</span>;
const LayoutDashboard = () => <span>📊</span>;
const AlertCircle = () => <span>⚠️</span>;
const CheckCircle = () => <span>✅</span>;
const Loader2 = () => <div className="loader"></div>;
const OnlineStatus = ({ isOnline }) => <span className={`online-status ${isOnline ? 'online' : 'offline'}`}></span>;

const App = () => {
    const [activePage, setActivePage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const mockNotifications = [
        { id: 'n1', type: 'message', sender: 'Mona', text: 'sent you a message', timestamp: '2024-07-24T09:00:00Z', read: false },
        { id: 'n2', type: 'request', sender: 'krish', text: 'sent you a mentor request', timestamp: '2024-07-24T08:00:00Z', read: true },
        { id: 'n3', type: 'update', sender: 'System', text: 'Your profile has been updated', timestamp: '2024-07-24T07:00:00Z', read: false },
    ];

    const [notifications, setNotifications] = useState(mockNotifications);

    const mockUsers = [
        { id: '1', name: 'Neema', avatarUrl: 'https://source.unsplash.com/random/100x100/?portrait&1', isOnline: true },
        { id: '2', name: 'Suraj', avatarUrl: 'https://source.unsplash.com/random/100x100/?portrait&2', isOnline: true },

    ];

    const mockProfile = {
        name: 'Palak Srivastava',
        bio: 'Software Engineer | Mentor | Open Source Enthusiast',
        location: 'Delhi, India',
        joined: '2024-08-15',
        avatarUrl: 'https://source.unsplash.com/random/150x150/?portrait',
    };

    const mockDashboard = {
        mentorsCount: 25,
        menteesCount: 150,
        messagesCount: 50,
        activeSessions: 10,
    };

    const mockMessages = [
        { id: 'm1', sender: 'Mona', text: 'Hi Krish!', timestamp: '2024-07-24T10:00:00Z' },
        { id: 'm2', sender: 'Krish', text: 'Hello Mona!', timestamp: '2024-07-24T10:05:00Z' },
        // ... more messages
    ];

    const unreadCount = notifications.filter(n => !n.read).length;
    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);
    const markNotificationAsRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    const markAllNotificationsAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));

    // Components defined within App.js
    const Profile = () => {
        const [profile, setProfile] = useState(mockProfile);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 800);
            return () => clearTimeout(timer);
        }, []);

        return (
            <div className="card">
                <h2>Profile</h2>
                {loading ? (
                    <div>
                        <div className="skeleton avatar-skeleton"></div>
                        <div className="skeleton title-skeleton"></div>
                        <div className="skeleton text-skeleton"></div>
                        <div className="skeleton small-skeleton"></div>
                    </div>
                ) : (
                    <div className="profile-content">
                        <div className="avatar">
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt={profile.name} />
                            ) : (
                                <span className="avatar-fallback">{profile.name.substring(0, 2)}</span>
                            )}
                        </div>
                        <h3>{profile.name}</h3>
                        <p>{profile.bio}</p>
                        <p className="small-text">{profile.location}</p>
                        <p className="small-text">Joined: {new Date(profile.joined).toLocaleDateString()}</p>
                        <button>Edit Profile</button>
                    </div>
                )}
            </div>
        );
    };

    const Dashboard = () => {
        const [dashboardData, setDashboardData] = useState(mockDashboard);
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 1200);
            return () => clearTimeout(timer);
        }, []);

        return (
            <div className="dashboard-grid">
                {loading ? (
                    <>
                        <div className="skeleton card-skeleton"></div>
                        <div className="skeleton card-skeleton"></div>
                        <div className="skeleton card-skeleton"></div>
                        <div className="skeleton card-skeleton"></div>
                    </>
                ) : (
                    <>
                        <div className="card">
                            <h2>Mentors</h2>
                            <div className="large-number">{dashboardData.mentorsCount}</div>
                            <p>Total Mentors</p>
                        </div>
                        <div className="card">
                            <h2>Mentees</h2>
                            <div className="large-number">{dashboardData.menteesCount}</div>
                            <p>Total Mentees</p>
                        </div>
                        <div className="card">
                            <h2>Messages</h2>
                            <div className="large-number">{dashboardData.messagesCount}</div>
                            <p>Total Messages</p>
                        </div>
                        <div className="card">
                            <h2>Active Sessions</h2>
                            <div className="large-number">{dashboardData.activeSessions}</div>
                            <p>Currently Active Sessions</p>
                        </div>
                    </>
                )}
            </div>
        );
    };

    const Messages = () => {
        const [messages, setMessages] = useState(mockMessages);
        const [newMessage, setNewMessage] = useState('');
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 500);
            return () => clearTimeout(timer);
        }, []);

        const handleSendMessage = () => {
            if (newMessage.trim()) {
                const newMsg = {
                    id: `m${messages.length + 1}`,
                    sender: 'Mona',
                    text: newMessage,
                    timestamp: new Date().toISOString(),
                };
                setMessages([...messages, newMsg]);
                setNewMessage('');
            }
        };

        return (
            <div className="messages card">
                <h2>Messages</h2>
                {loading ? (
                    <div className="loader-container">
                        <Loader2 />
                    </div>
                ) : (
                    <div className="message-list">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message ${message.sender === 'Mona' ? 'sent' : 'received'}`}
                            >
                                <p>
                                    <strong>{message.sender}: </strong>
                                    {message.text}
                                </p>
                                <p className="message-time">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <div className="message-input">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        );
    };

    const AdminPanel = () => {
        const [users, setUsers] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            setTimeout(() => {
                setUsers(mockUsers);
                setLoading(false);
            }, 1000);
        }, []);

        const handleDeleteUser = (userId) => {
            setUsers(users.filter((user) => user.id !== userId));
        };

        if (loading) {
            return (
                <div className="loader-container">
                    <Loader2 />
                </div>
            );
        }

        if (error) {
            return (
                <div className="error">
                    <AlertCircle />
                    <span>{error}</span>
                </div>
            );
        }

        return (
            <div className="card">
                <h2>User Management</h2>
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <div className="user-list">
                        {users.map((user) => (
                            <div key={user.id} className="user-item">
                                <div className="user-info">
                                    <div className="avatar">
                                        {user.avatarUrl ? (
                                            <img src={user.avatarUrl} alt={user.name} />
                                        ) : (
                                            <span className="avatar-fallback">{user.name.substring(0, 2)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <div className="user-name">{user.name}</div>
                                        <div className={`user-status ${user.isOnline ? 'online-text' : 'offline-text'}`}>
                                            <OnlineStatus isOnline={user.isOnline} />
                                            {user.isOnline ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                </div>
                                <button className="destructive" onClick={() => handleDeleteUser(user.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="app">
            <aside className="sidebar">
                <div>
                    <h1>MentorConnect</h1>
                    <nav>
                        <button
                            className={activePage === 'home' ? 'active' : ''}
                            onClick={() => setActivePage('home')}
                        >
                            <Home /> Home
                        </button>
                        <button
                            className={activePage === 'profile' ? 'active' : ''}
                            onClick={() => setActivePage('profile')}
                        >
                            <UserIcon /> Profile
                        </button>
                        <button
                            className={activePage === 'dashboard' ? 'active' : ''}
                            onClick={() => setActivePage('dashboard')}
                        >
                            <LayoutDashboard /> Dashboard
                        </button>
                        <button
                            className={activePage === 'messages' ? 'active' : ''}
                            onClick={() => setActivePage('messages')}
                        >
                            <MessageCircle /> Messages
                            {unreadCount > 0 && (
                                <span className="badge">{unreadCount}</span>
                            )}
                        </button>
                        {isLoggedIn && (
                            <button
                                className={activePage === 'admin' ? 'active' : ''}
                                onClick={() => setActivePage('admin')}
                            >
                                <Settings /> Admin Panel
                            </button>
                        )}
                        <button
                            className={activePage === 'mentors' ? 'active' : ''}
                            onClick={() => setActivePage('mentors')}
                        >
                            <UserIcon /> Mentors
                        </button>
                        <button
                            className={activePage === 'mentees' ? 'active' : ''}
                            onClick={() => setActivePage('mentees')}
                        >
                            <UserPlus /> Mentees
                        </button>
                    </nav>
                </div>
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>
                            <LogOut /> Logout
                        </button>
                    ) : (
                        <>
                            <button onClick={handleLogin}>
                                <LogIn /> Login
                            </button>
                            <button className="secondary">
                                <UserPlus /> Signup
                            </button>
                        </>
                    )}
                </div>
            </aside>
            <main className="main">
                {activePage === 'home' && (
                    <div>
                        <h2>Welcome to MentorConnect!</h2>
                        <p>This is your personalized mentoring platform.</p>
                        {isLoggedIn && (
                            <div className="notifications">
                                <h3>Your Notifications</h3>
                                {notifications.length === 0 ? (
                                    <p>No notifications.</p>
                                ) : (
                                    <div>
                                        {notifications.filter(n => !n.read).length > 0 && (
                                            <button className="mark-all" onClick={markAllNotificationsAsRead}>
                                                Mark all as read
                                            </button>
                                        )}
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`notification ${notification.read ? 'read' : 'unread'}`}
                                            >
                                                <div>
                                                    <p>
                                                        {notification.sender} {notification.text}
                                                    </p>
                                                    <p className="notification-time">
                                                        {new Date(notification.timestamp).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                                {!notification.read && (
                                                    <button
                                                        className="mark-read"
                                                        onClick={() => markNotificationAsRead(notification.id)}
                                                    >
                                                        <CheckCircle />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {activePage === 'profile' && <Profile />}
                {activePage === 'dashboard' && <Dashboard />}
                {activePage === 'messages' && <Messages />}
                {activePage === 'admin' && <AdminPanel />}
                {activePage === 'mentors' && <MentorList />}
                {activePage === 'mentees' && <MenteeList />}
            </main>
        </div>
    );
};

export default App;