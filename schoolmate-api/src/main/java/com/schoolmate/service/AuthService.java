package com.schoolmate.service;

import com.schoolmate.dto.JwtAuthResponse;
import com.schoolmate.dto.LoginRequest;
import com.schoolmate.dto.ProfileDTO;
import com.schoolmate.dto.RefreshTokenRequest;
import com.schoolmate.dto.RegisterRequest;
import com.schoolmate.dto.UserResponse;
import com.schoolmate.model.User;

public interface AuthService {
    User registerUser(RegisterRequest request);

    JwtAuthResponse loginUser(LoginRequest request);

    JwtAuthResponse refreshToken(RefreshTokenRequest request);

    UserResponse getUser(RefreshTokenRequest request);

    UserResponse updateProfile(ProfileDTO request);
}