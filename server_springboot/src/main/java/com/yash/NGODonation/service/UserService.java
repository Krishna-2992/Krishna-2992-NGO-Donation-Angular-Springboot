package com.yash.NGODonation.service;

import com.yash.NGODonation.entity.UserEntity;
import com.yash.NGODonation.exceptions.UserNotFoundException;
import com.yash.NGODonation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public UserEntity createNewUser(UserEntity user) throws SQLIntegrityConstraintViolationException {
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<UserEntity> getUserById(int id) {
        return userRepository.findById(id);
    }

    public List<UserEntity> getAllUsers() {
        List<UserEntity> userList = userRepository.findAll();
        return userList;
    }

    public boolean deleteUserById(int id) {
        boolean isPresent = userRepository.existsById(id);
        if(!isPresent) return false;
        userRepository.deleteById(id);
        return true;
    }


    public UserEntity updateUser(UserEntity user) throws UserNotFoundException {
        // Check if user exists first
        if (!userRepository.existsById(user.getUserId())) {
            throw new UserNotFoundException("User not found with id: " + user.getUserId());
        }
        return userRepository.save(user);
    }

    public Optional<UserEntity> loginUser(String loginName, String rawPassword) {
//        Optional<UserEntity> user = userRepository.findByUsernameAndPassword(loginName, rawPassword);
        Optional<UserEntity> user = userRepository.findByloginNameAndPassword(loginName, rawPassword);

//        if (user.isPresent() && passwordEncoder.matches(rawPassword, user.get().getPassword())) {
//            // Create a copy of the user to hide the password
//            UserEntity safeUser = new UserEntity();
//            safeUser.setUserId(user.get().getUserId());
//            safeUser.setLoginName(user.get().getLoginName());
//            safeUser.setRole(user.get().getRole());
//            // Copy other non-sensitive fields as needed
//
//            return Optional.of(safeUser);
//        }

        return user;
    }

}
