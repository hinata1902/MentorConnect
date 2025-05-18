
import React from 'react';
import MentorList from './MentorList';
import '../styles/MentorListPage.css';

function MentorListPage() {
  return (
    <div className="mentor-list-page page-content fade-in">
      <h2>Mentors</h2>
      <MentorList />
    </div>
  );
}

export default MentorListPage;