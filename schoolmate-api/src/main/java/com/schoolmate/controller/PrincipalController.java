package com.schoolmate.controller;

import com.schoolmate.dto.*;
import com.schoolmate.model.User;
import com.schoolmate.service.IamService;
import com.schoolmate.service.PrincipalService;
import com.schoolmate.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class PrincipalController {
    private final IamService iamService;
    private final PrincipalService principalService;

    public PrincipalController(IamService iamService, PrincipalService principalService) {
        this.iamService = iamService;
        this.principalService = principalService;
    }

    @GetMapping("/principal/get-staff-users")
    public List<User> getAllStaffUsers() {
        return iamService.getAllStaffUsers();
    }

    @PutMapping("/principal/assign-classteacher")
    public ResponseEntity<MessageResponse> assignClassteacher(@RequestBody AssignClassRequest request) {
        return principalService.assignClassteacher(request);
    }

    @PutMapping("/principal/assign-facility")
    public ResponseEntity<MessageResponse> assignFacility(@RequestBody AssignFacilityRequest request) {
        return principalService.assignFacility(request);
    }
}