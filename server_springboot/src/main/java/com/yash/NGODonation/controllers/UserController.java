package com.yash.NGODonation.controllers;

import com.yash.NGODonation.entity.UserEntity;
import com.yash.NGODonation.exceptions.UserNotFoundException;
import com.yash.NGODonation.service.UserService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    public UserService userService;

    @GetMapping
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public ResponseEntity<?> createNewUser(@RequestBody UserEntity user) {
        System.out.println("-----user register----");
        System.out.println(user);
        try {
            UserEntity newUser = userService.createNewUser(user);
            return ResponseEntity.ok(newUser);
        } catch (SQLIntegrityConstraintViolationException e) {
            System.out.println("--------------------------");
            System.out.println("error::::: " + e);
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Username already exists");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable("id") int id) {
        Optional<UserEntity> user = userService.getUserById(id);
        if(user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public boolean deleteUserById(@PathVariable("id") int id) {
        System.out.println(id);
        return userService.deleteUserById(id);
    }

    @PutMapping
    public UserEntity updateUser(@RequestBody UserEntity user) {
        try {
            return userService.updateUser(user);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/login")
    public UserEntity loginUser(@RequestBody UserEntity user) {
        System.out.println(user.getLoginName());
        System.out.println(user.getPassword());
        System.out.println("inside user login");
        System.out.println(user);
        UserEntity loginUser = userService.loginUser(user.getLoginName(), user.getPassword());
        if(loginUser.getUserId() != 0) return loginUser;
        else return new UserEntity();
    }
}
