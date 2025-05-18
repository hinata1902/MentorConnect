import React, { useState, useEffect } from 'react';
import '../styles/MenteeListPage.css';
import axios from 'axios';

function MenteeList() {
    const [mentees, setMentees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/mentees')
            .then((response) => {
                setMentees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to load mentees.');
                setLoading(false);
                console.error('Error loading mentees:', error);
            });
    }, []);

    if (loading) {
        return (
            <div className="mentee-list-container">
                <div className="mentee-item loading">Loading mentees...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mentee-list-container">
                <div className="mentee-list-error">Error: {error}</div>
            </div>
        );
    }

    if (mentees.length === 0) {
        return (
          <div className="mentee-list-container">
            <div className="mentee-list empty">No mentees found.</div>
          </div>
        );
    }

    return (
        <div className="mentee-list-container">
            <h1 className="mentee-list-title">Mentees</h1>
            <ul className="mentee-list">
                {mentees.map((mentee) => (
                    <li key={mentee.id} className="mentee-item">
                        <div className="mentee-info">
                            <div className="mentee-avatar">
                                
                                <img src={mentee.avatarUrl || "https://via.placeholder.com/80"} alt={mentee.name} />
                            </div>
                            <div className="mentee-details">
                                <h2 className="mentee-name">{mentee.name}</h2>
                                <p className="mentee-role">{mentee.role || 'Mentee'}</p> 
                                <p className="mentee-description">{mentee.bio || "No description available."}</p>
                            </div>
                        </div>
                        <div className="mentee-actions">
                            <button>View Profile</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenteeList;