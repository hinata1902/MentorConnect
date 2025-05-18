package com.mentor_connect.controller;

import com.mentor_connect.model.Mentor;
import com.mentor_connect.repository.MentorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Enable CORS for your frontend
@RestController
@RequestMapping("/api/mentors")
public class MentorController {

    @Autowired
    private MentorRepository mentorRepository;

    @GetMapping
    public ResponseEntity<List<Mentor>> getAllMentors() {
        List<Mentor> mentors = mentorRepository.findAll();
        return new ResponseEntity<>(mentors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Mentor>> getMentorById(@PathVariable Long id) {
        Optional<Mentor> mentor = mentorRepository.findById(id);
        return ResponseEntity.of(Optional.of(mentor));
    }

    @PostMapping
    public ResponseEntity<Mentor> createMentor(@RequestBody Mentor mentor) {
        Mentor savedMentor = mentorRepository.save(mentor);
        return new ResponseEntity<>(savedMentor, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mentor> updateMentor(@PathVariable Long id, @RequestBody Mentor updatedMentor) {
        Optional<Mentor> existingMentor = mentorRepository.findById(id);
        if (existingMentor.isPresent()) {
            updatedMentor.setId(id);
            Mentor savedMentor = mentorRepository.save(updatedMentor);
            return new ResponseEntity<>(savedMentor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMentor(@PathVariable Long id) {
        if (mentorRepository.existsById(id)) {
            mentorRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}