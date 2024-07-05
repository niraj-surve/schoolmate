package com.schoolmate.service;

import java.util.List;

import com.schoolmate.dto.*;
import org.springframework.http.ResponseEntity;

import com.schoolmate.model.User;

public interface IamService {
    List<User> getAllUsers();

    List<User> getAllStaffUsers();

    ResponseEntity<MessageResponse> addUser(RegisterRequest request);

    ResponseEntity<MessageResponse> updateUser(UpdateUserDTO request);

    ResponseEntity<MessageResponse> deleteUser(DeleteByEmailRequest request);

    ResponseEntity<CountResponse> getUsersCount();
}