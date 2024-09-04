package com.gamehub.backend.controller;

import com.gamehub.backend.dto.LoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gamehub.backend.service.UserService;
import com.gamehub.backend.model.User;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginDto loginDto) {
        User user = userService.getUserByEmail(loginDto.getEmail());
        if (user == null) {
            return null;
        }
        if (user.getPassword().equals(loginDto.getPassword())) {
            return user;
        }
        return null;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        User existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser != null) {
            return null;
        }
        return userService.addUser(user);
    }
}
