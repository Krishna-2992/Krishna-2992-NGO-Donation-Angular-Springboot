package com.yash.NGODonation.service;

import com.yash.NGODonation.entity.UserEntity;
import com.yash.NGODonation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public UserEntity signup(UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public UserEntity authenticate(UserEntity input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getLoginName(),
                        input.getPassword()
                )
        );

        return userRepository.findByLoginName(input.getLoginName())
                .orElseThrow();
    }
}
