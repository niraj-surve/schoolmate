package com.schoolmate.service.impl;

import com.schoolmate.dto.ContactRequest;
import com.schoolmate.dto.EnquiryRequest;
import com.schoolmate.dto.MessageResponse;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.schoolmate.service.EmailService;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public ResponseEntity<MessageResponse> sendEnquiryMailResponse(EnquiryRequest request) {
        String fname = request.getFname();
        String lname = request.getLname();
        String email = request.getEmail();
        String phone = request.getPhone();

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("theschoolmate.official@gmail.com");
            message.setTo("theschoolmate.official@gmail.com");
            message.setText("Admission Enquiry from " + fname + " " + lname + ".\nEmail: " + email + "\nPhone: " + phone);
            message.setSubject("Admission Enquiry - Jeevan Shikshan School");

            mailSender.send(message);

            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } catch (MailException e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return internal server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<MessageResponse> sendContactMailResponse(ContactRequest request) {
        String name = request.getName();
        String email = request.getEmail();
        String msgBody = request.getMessage();

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("theschoolmate.official@gmail.com");
            message.setTo("theschoolmate.official@gmail.com");
            message.setText(name + " contacting you for assistance:\n" + msgBody);
            message.setSubject("Someone want to contact - Jeevan Shikshan School");

            mailSender.send(message);

            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } catch (MailException e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return internal server error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
