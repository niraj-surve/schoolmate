package com.schoolmate.service;

import com.schoolmate.dto.ContactRequest;
import com.schoolmate.dto.EnquiryRequest;
import com.schoolmate.dto.MessageResponse;
import org.springframework.http.ResponseEntity;

public interface EmailService {
    ResponseEntity<MessageResponse> sendEnquiryMailResponse(EnquiryRequest request);

    ResponseEntity<MessageResponse> sendContactMailResponse(ContactRequest request);
}
