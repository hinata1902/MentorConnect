import React from 'react';
import MenteeList from './MenteeList';
import '../styles/MenteeListPage.css';

function MenteeListPage() {
  return (
    <div className="mentee-list-page page-content fade-in">
      <h2>Mentees</h2>
      <MenteeList />
    </div>
  );
}

export default MenteeListPage;