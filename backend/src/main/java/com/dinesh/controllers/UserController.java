package com.dinesh.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dinesh.models.User;
import com.dinesh.services.UserService;

@RestController
@CrossOrigin("*")
public class UserController {
	@Autowired
    private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
	    return userService.registerUser(user);  
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User user) {
	    return userService.loginUser(user);
	}

    @GetMapping("/users/all")
    public ResponseEntity<?> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/users/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }

}
