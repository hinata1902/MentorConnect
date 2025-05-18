package com.mentor_connect.repository;

import com.mentor_connect.model.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Long> {
    // You can add custom query methods here if needed
}