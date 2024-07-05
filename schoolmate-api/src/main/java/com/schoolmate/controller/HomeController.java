package com.schoolmate.controller;

import java.util.List;

import com.schoolmate.dto.ContactRequest;
import com.schoolmate.dto.EnquiryRequest;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.schoolmate.model.Notice;
import com.schoolmate.model.Staff;
import com.schoolmate.service.HomeService;

@RestController
@RequestMapping("/api/v1/home")
public class HomeController {
    private final HomeService homeService;

    private final EmailService emailService;

    public HomeController(HomeService homeService, EmailService emailService) {
        this.homeService = homeService;
        this.emailService = emailService;
    }

    @GetMapping("/get-notices")
    public List<Notice> getAllNotices(){
        return homeService.getAllNotices();
    }

    @GetMapping("/get-staff")
    public List<Staff> getAllStaff(){
        return homeService.getAllStaff();
    }

    @PostMapping("/send-enquiry-mail")
    public ResponseEntity<MessageResponse> sendEnquiryMail(@RequestBody EnquiryRequest request){
        return emailService.sendEnquiryMailResponse(request);
    }

    @PostMapping("/send-contact-mail")
    public ResponseEntity<MessageResponse> sendContactMail(@RequestBody ContactRequest request){
        return emailService.sendContactMailResponse(request);
    }
}