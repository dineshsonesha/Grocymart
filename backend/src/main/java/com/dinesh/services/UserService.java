package com.dinesh.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dinesh.models.User;
import com.dinesh.repositories.UserRepository;
import com.dinesh.responseWrapper.MyresponseWrapper;

@Service
public class UserService {
	@Autowired
    private UserRepository userRepository;

    @Autowired
    private MyresponseWrapper responseWrapper;

    public ResponseEntity<?> registerUser(User user) {
        User savedUser = userRepository.save(user);
        responseWrapper.setMessage("User added successfully");
        responseWrapper.setData(savedUser);
        return new ResponseEntity<>(responseWrapper, HttpStatus.CREATED);
    }
    
    public ResponseEntity<?> loginUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            User getUser = existingUser.get();
            if (getUser.getPassword().equals(user.getPassword())) {
                responseWrapper.setMessage("Login successful");
                responseWrapper.setData(getUser);
                return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
            } else {
                responseWrapper.setMessage("Invalid password");
                responseWrapper.setData(null);
                return new ResponseEntity<>(responseWrapper, HttpStatus.UNAUTHORIZED);
            }
        } else {
            responseWrapper.setMessage("User not found with email " + user.getEmail());
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        responseWrapper.setMessage("List of all users");
        responseWrapper.setData(users);
        return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
    }

    public ResponseEntity<?> updateUser(Long id, User user) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User dbUser = existingUser.get();
            dbUser.setUsername(user.getUsername());
            dbUser.setEmail(user.getEmail());
            dbUser.setAddress(user.getAddress());
            dbUser.setPhoneNo(user.getPhoneNo());
            dbUser.setPassword(user.getPassword());
            User updatedUser = userRepository.save(dbUser);
            responseWrapper.setMessage("User updated successfully");
            responseWrapper.setData(updatedUser);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("User not found with ID " + id);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteUser(Long id) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            userRepository.deleteById(id);
            responseWrapper.setMessage("User deleted successfully");
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
        } else {
            responseWrapper.setMessage("User not found with ID " + id);
            responseWrapper.setData(null);
            return new ResponseEntity<>(responseWrapper, HttpStatus.NOT_FOUND);
        }
    }

}
