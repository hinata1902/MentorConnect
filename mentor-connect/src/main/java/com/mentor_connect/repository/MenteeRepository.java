package com.mentor_connect.repository;

import com.mentor_connect.model.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenteeRepository extends JpaRepository<Mentee, Long> {
// You can add custom query methods here
}