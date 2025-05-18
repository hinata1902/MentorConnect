package com.mentor_connect.controller;

import com.mentor_connect.model.Mentee;
import com.mentor_connect.repository.MenteeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/mentees")
public class MenteeController {

    @Autowired
    private MenteeRepository menteeRepository;

    @GetMapping
    public ResponseEntity<List<Mentee>> getAllMentees() {
        List<Mentee> mentees = menteeRepository.findAll();
        return new ResponseEntity<>(mentees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mentee> getMenteeById(@PathVariable Long id) {
        Optional<Mentee> mentee = menteeRepository.findById(id);
        return mentee.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Mentee> createMentee(@RequestBody Mentee mentee) {
        Mentee savedMentee = menteeRepository.save(mentee);
        return new ResponseEntity<>(savedMentee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mentee> updateMentee(@PathVariable Long id, @RequestBody Mentee updatedMentee) {
        Optional<Mentee> existingMentee = menteeRepository.findById(id);
        if (existingMentee.isPresent()) {
            updatedMentee.setId(id);
            Mentee savedMentee = menteeRepository.save(updatedMentee);
            return new ResponseEntity<>(savedMentee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMentee(@PathVariable Long id) {
        if (menteeRepository.existsById(id)) {
            menteeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
