package com.example.springsecurity.service;

import com.example.springsecurity.model.User;
import com.example.springsecurity.repository.UserRepository;
import com.example.springsecurity.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {


    @Autowired
    UserRepository userRepository;


    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;


    @Autowired
    private JwtProvider jwtProvider;

    public boolean createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

    public boolean verifyUser(String email, String password) {
        return userRepository.findByEmail(email).map(user -> passwordEncoder.matches(password, user.getPassword()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + email));

    }

    public String generateToken(String email, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtProvider.generateToken(authentication);

    }


    public boolean checkUserNameExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with mail " + username));
    }
}
