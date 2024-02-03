import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchEvents = async () => {
        await axios.get('http://localhost:8080/event').then((response) => {
            setEvents(response.data);
        });
    };

    const fetchUsers = async () => {
        await axios.get('http://localhost:8080/user').then((response) => {
            setUsers(response.data);
        });
    };

    useEffect(() => {
        fetchEvents();
        fetchUsers();
    }, []);

    const el = events.length;
    const ul = users.length;

    return (
        <div>
            <div className="dashboard">
                <main className="content-wrap">
                    <header className="content-head">
                        <h1>S3S Event Management System </h1>
                    </header>

                    <div className="content">
                        <section className="info-boxes">
                            <div className="info-box">
                                <div className="box-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M21 20V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1zm-2-1H5V5h14v14z" />
                                        <path d="M10.381 12.309l3.172 1.586a1 1 0 0 0 1.305-.38l3-5-1.715-1.029-2.523 4.206-3.172-1.586a1.002 1.002 0 0 0-1.305.38l-3 5 1.715 1.029 2.523-4.206z" />
                                    </svg>
                                </div>

                                <div className="box-content">
                                    <span className="big">{el}</span>
                                    No of Events
                                </div>
                            </div>

                            <div className="info-box">
                                <div className="box-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M20 10H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1zm-1 10H5v-8h14v8zM5 6h14v2H5zM7 2h10v2H7z" />
                                    </svg>
                                </div>

                                <div className="box-content">
                                    <span className="big">{ul}</span>
                                    No.of Users
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
