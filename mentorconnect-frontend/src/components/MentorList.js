import React, { useState, useEffect } from 'react';
import '../styles/MentorListPage.css';
import axios from 'axios';

function MentorList() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/mentors') 
            .then((response) => {
                setMentors(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to load mentors.');
                setLoading(false);
                console.error('Error loading mentors:', error);
            });
    }, []);

    if (loading) {
        return (
            <div className="mentee-list-container"> 
                <div className="mentee-item loading">Loading mentors...</div> 
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

      if (mentors.length === 0) {
        return (
            <div className="mentee-list-container">
                <div className="mentee-list empty">No mentors found.</div>
            </div>
        );
    }

    return (
        <div className="mentee-list-container"> 
            <h1 className="mentee-list-title">Mentors</h1> 
            <ul className="mentee-list"> 
                {mentors.map((mentor) => (
                    <li key={mentor.id} className="mentee-item"> 
                        <div className="mentee-info">
                            <div className="mentee-avatar">
                                <img src={mentor.avatarUrl || "https://via.placeholder.com/80"} alt={mentor.name} />
                            </div>
                            <div className="mentee-details">
                                <h2 className="mentee-name">{mentor.name}</h2>
                                <p className="mentee-role">{mentor.specialization || 'Mentor'}</p> 
                                <p className="mentee-description">{mentor.bio || "No bio available"}</p>
                            </div>
                        </div>
                        <div className="mentee-actions">
                            <button>View Profile</button>
                            <button>Contact</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MentorList;