package com.schoolmate.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.schoolmate.dto.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.schoolmate.dao.UserDao;
import com.schoolmate.model.Role;
import com.schoolmate.model.User;
import com.schoolmate.service.IamService;

@Service
public class IamServiceImpl implements IamService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    public IamServiceImpl(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ResponseEntity<CountResponse> getUsersCount() {
        CountResponse response = new CountResponse();
        response.setCount(userDao.countByPositionNot("admin"));
        return ResponseEntity.ok(response);
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.findByPositionNot("admin");
    }

    @Override
    public List<User> getAllStaffUsers() {
        return userDao.findByPositionNotIn(Arrays.asList("admin", "principal"));
    }


    @Override
    public ResponseEntity<MessageResponse> addUser(RegisterRequest request) {
        // Check if the user with the given email exists
        Optional<User> existingUserOptional = userDao.findByEmail(request.getEmail());
        if (existingUserOptional.isPresent()) {
            // Handle the case where the user already exists
            MessageResponse response = new MessageResponse();
            response.setEmailExistsError(true);
            return ResponseEntity.ok(response);
        }

        // Check if a principal already exists (if applicable)
        if ("principal".equalsIgnoreCase(request.getPosition()) && userDao.existsByPosition("principal")) {
            MessageResponse response = new MessageResponse();
            response.setPrincipalExistsError(true);
            return ResponseEntity.ok(response);
        }

        // Create a new user and save it
        User user = new User();
        user.setEmail(request.getEmail());
        user.setFname(request.getFname());
        user.setLname(request.getLname());
        user.setDob(request.getDob());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPosition(request.getPosition());
        user.setRole(Role.USER);

        userDao.save(user);

        // Return a success response
        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> updateUser(UpdateUserDTO request) {
        User existingUser = userDao.findByEmail(request.getEmail()).orElseThrow();
        if (existingUser == null) {
            MessageResponse response = new MessageResponse();
            response.setEmailNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        if (!existingUser.getEmail().equals(request.getEmail())) {
            MessageResponse response = new MessageResponse();
            response.setEmailChangeError(true);
            return ResponseEntity.ok(response);
        }

        if ("principal".equalsIgnoreCase(request.getPosition()) && userDao.existsByPosition("principal")
                && !existingUser.getPosition().equalsIgnoreCase("principal")) {
            MessageResponse response = new MessageResponse();
            response.setPrincipalExistsError(true);
            return ResponseEntity.ok(response);
        }

        existingUser.setEmail(request.getEmail());
        existingUser.setFname(request.getFname());
        existingUser.setLname(request.getLname());
        existingUser.setDob(request.getDob());
        existingUser.setPhone(request.getPhone());
        existingUser.setPosition(request.getPosition());

        userDao.save(existingUser);

        // Return a success response
        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> deleteUser(DeleteByEmailRequest request) {
        User existingUser = userDao.findByEmail(request.getEmail()).orElse(null);
        if (existingUser == null) {
            MessageResponse response = new MessageResponse();
            response.setEmailNotExistsError(false);
            return ResponseEntity.ok(response);
        }

        userDao.delete(existingUser);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

}