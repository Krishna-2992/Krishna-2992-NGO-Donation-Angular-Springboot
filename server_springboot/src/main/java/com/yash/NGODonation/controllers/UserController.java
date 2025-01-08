package com.yash.NGODonation.controllers;

import com.yash.NGODonation.entity.UserEntity;
import com.yash.NGODonation.exceptions.UserNotFoundException;
import com.yash.NGODonation.service.UserService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)public class UserController {

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
    public ResponseEntity<UserEntity> loginUser(@RequestBody UserEntity loginUser) {
        Optional<UserEntity> user = userService.loginUser(loginUser.getLoginName(), loginUser.getPassword());
        System.out.println(loginUser.getPassword());
        System.out.println(loginUser.getLoginName());
        UserEntity user1=user.get();
        System.out.println(user1.getUserId());
        return user.map(userEntity -> new ResponseEntity<>(userEntity, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
    }
}
