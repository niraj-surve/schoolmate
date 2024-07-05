package com.schoolmate.service;

import com.schoolmate.dto.AssignClassRequest;
import com.schoolmate.dto.AssignFacilityRequest;
import com.schoolmate.dto.MessageResponse;
import org.springframework.http.ResponseEntity;

public interface PrincipalService {
    ResponseEntity<MessageResponse> assignClassteacher(AssignClassRequest request);

    ResponseEntity<MessageResponse> assignFacility(AssignFacilityRequest request);
}
