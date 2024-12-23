package com.yash.NGODonation.service;

import com.yash.NGODonation.entity.UserEntity;
import com.yash.NGODonation.exceptions.UserNotFoundException;
import com.yash.NGODonation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

    public UserEntity createNewUser(UserEntity user) throws SQLIntegrityConstraintViolationException {
        return userRepository.save(user);
    }

    public UserEntity getUserById(int id) {
        UserEntity userEntity = userRepository.findById(id).orElse(null);
        return userEntity;
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

    public UserEntity loginUser(String loginName, String password) {
        UserEntity user =  userRepository.findByUsernameAndPassword(loginName, password);
        user.setPassword("*********");
        return user;
    }
}
