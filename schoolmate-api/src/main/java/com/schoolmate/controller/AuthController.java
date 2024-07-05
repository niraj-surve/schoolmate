package com.schoolmate.controller;

import com.schoolmate.dto.*;
import com.schoolmate.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.schoolmate.model.User;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final StaffService staffService;
    private final StudentService studentService;
    private final AlumniService alumniService;
    private final IamService iamService;

    public AuthController(AuthService authService, StaffService staffService, StudentService studentService, AlumniService alumniService, IamService iamService) {
        this.authService = authService;
        this.staffService = staffService;
        this.studentService = studentService;
        this.alumniService = alumniService;
        this.iamService = iamService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.registerUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> loginUser(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.loginUser(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthResponse> refreshToken(@RequestBody RefreshTokenRequest request){
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @PostMapping("/get-user")
    public ResponseEntity<UserResponse> getUser(@RequestBody RefreshTokenRequest request){
        return ResponseEntity.ok(authService.getUser(request));
    }

    @PutMapping("/update-profile")
    public ResponseEntity<UserResponse> updateProfile(@RequestBody ProfileDTO request){
        return ResponseEntity.ok(authService.updateProfile(request));
    }

    @GetMapping("/graduation-rates")
    public ResponseEntity<GraduationRatesResponse> getGraduationRates() {
        return alumniService.getGraduationRates();
    }

    @GetMapping("/get-staff-count")
    public ResponseEntity<CountResponse> getStaffCount() {
        return staffService.getCount();
    }

    @GetMapping("/get-users-count")
    public ResponseEntity<CountResponse> getUsersCount() {
        return iamService.getUsersCount();
    }

    @GetMapping("/get-transferred-staff-count")
    public ResponseEntity<CountResponse> getTransferredCount() {
        return staffService.getTransferredCount();
    }

    @GetMapping("/get-assistant-teachers-count")
    public ResponseEntity<CountResponse> getAssistantTeachersCount() {
        return staffService.getCountOfAssistantTeachers();
    }

    @GetMapping("/get-graduate-teachers-count")
    public ResponseEntity<CountResponse> getGraduateTeachersCount() {
        return staffService.getCountOfGraduateTeachers();
    }

    @GetMapping("/get-students-count")
    public ResponseEntity<CountResponse> getStudentsCount() {
        return studentService.getStudentsCount();
    }

    @GetMapping("/get-boys-students-count")
    public ResponseEntity<CountResponse> getBoysStudentsCount() {
        return studentService.getBoysStudentsCount();
    }

    @GetMapping("/get-girls-students-count")
    public ResponseEntity<CountResponse> getGirlsStudentsCount() {
        return studentService.getGirlsStudentsCount();
    }

    @GetMapping("/get-alumni-count")
    public ResponseEntity<CountResponse> getAlumniCount() {
        return alumniService.getCount();
    }

    @GetMapping("/get-all-students-per-income")
    public ResponseEntity<List<Map<String, Object>>> getStudentsPerIncomeGroup() {
        return studentService.getStudentsPerIncomeGroup();
    }

    @PostMapping("/get-students-per-income-for-standard")
    public ResponseEntity<List<Map<String, Object>>> getStudentsPerIncomeGroupForStandard(@RequestBody StandardDTO request) {
        return studentService.getStudentsPerIncomeGroupForStandard(request);
    }

    @PostMapping("/get-students-per-caste-for-standard")
    public ResponseEntity<List<Map<String, Object>>> getStudentsPerCasteForStandard(@RequestBody StandardDTO request) {
        return studentService.getStudentsPerCasteForStandard(request);
    }

    @GetMapping("/get-all-students-per-caste")
    public ResponseEntity<List<Map<String, Object>>> getStudentsPerCaste() {
        return studentService.getStudentsPerCaste();
    }
}