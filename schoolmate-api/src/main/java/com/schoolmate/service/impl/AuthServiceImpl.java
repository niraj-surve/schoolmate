package com.schoolmate.service.impl;

import java.util.HashMap;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.schoolmate.dao.UserDao;
import com.schoolmate.dto.JwtAuthResponse;
import com.schoolmate.dto.LoginRequest;
import com.schoolmate.dto.ProfileDTO;
import com.schoolmate.dto.RefreshTokenRequest;
import com.schoolmate.dto.RegisterRequest;
import com.schoolmate.dto.UserResponse;
import com.schoolmate.model.Role;
import com.schoolmate.model.User;
import com.schoolmate.service.AuthService;
import com.schoolmate.service.JwtService;

@Service
public class AuthServiceImpl implements AuthService {
    private UserDao userDao;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authManager;
    private JwtService jwtService;

    public AuthServiceImpl(UserDao userDao, PasswordEncoder passwordEncoder, AuthenticationManager authManager,
                           JwtService jwtService) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
        this.authManager = authManager;
        this.jwtService = jwtService;
    }

    @Override
    public User registerUser(RegisterRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFname(request.getFname());
        user.setLname(request.getLname());
        user.setDob(request.getDob());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPosition(request.getPosition());
        user.setStandard(request.getStandard());
        user.setFacility(request.getFacility());
        user.setRole(Role.USER);

        return userDao.save(user);
    }

    @Override
    public JwtAuthResponse loginUser(LoginRequest request) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var user = userDao.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password..!"));
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
        var expirationTime = jwtService.extractExpiration(jwt);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setToken(jwt);
        jwtAuthResponse.setRefreshToken(refreshToken);
        jwtAuthResponse.setPosition(user.getPosition());
        jwtAuthResponse.setStandard(user.getStandard());
        jwtAuthResponse.setFacility(user.getFacility());
        jwtAuthResponse.setExpirationTime(expirationTime);
        return jwtAuthResponse;
    }

    @Override
    public JwtAuthResponse refreshToken(RefreshTokenRequest request) {
        String userEmail = jwtService.extractUserName(request.getToken());
        User user = userDao.findByEmail(userEmail).orElseThrow();
        if (jwtService.isTokenValid(request.getToken(), user)) {
            var jwt = jwtService.generateToken(user);
            JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
            jwtAuthResponse.setToken(jwt);
            jwtAuthResponse.setRefreshToken(request.getToken());
            jwtAuthResponse.setPosition(user.getPosition());
            return jwtAuthResponse;
        }
        return null;
    }

    @Override
    public UserResponse getUser(RefreshTokenRequest request) {
        String userEmail = jwtService.extractUserName(request.getToken());

        User user = userDao.findByEmail(userEmail).orElseThrow();

        if (jwtService.isTokenValid(request.getToken(), user)) {
            UserResponse response = new UserResponse();
            response.setFname(user.getFname());
            response.setLname(user.getLname());
            response.setDob(user.getDob());
            response.setPhone(user.getPhone());
            response.setEmail(user.getEmail());
            response.setPhoto(user.getPhoto());
            response.setPosition(user.getPosition());
            response.setStandard(user.getStandard());
            return response;
        }
        return null;
    }

    @Override
    public UserResponse updateProfile(ProfileDTO request) {
        String userEmail = jwtService.extractUserName(request.getToken());

        User user = userDao.findByEmail(userEmail).orElseThrow();

        if (jwtService.isTokenValid(request.getToken(), user)) {
            user.setFname(request.getFname());
            user.setLname(request.getLname());
            user.setPhone(request.getPhone());

            userDao.save(user);

            UserResponse response = new UserResponse();
            response.setFname(user.getFname());
            response.setLname(user.getLname());
            response.setDob(user.getDob());
            response.setPhone(user.getPhone());
            response.setEmail(user.getEmail());
            response.setPhoto(user.getPhoto());
            response.setPosition(user.getPosition());
            response.setStandard(user.getStandard());
            return response;
        }
        return null;
    }

}