package com.schoolmate.service.impl;

import com.schoolmate.dao.UserDao;
import com.schoolmate.dto.AssignClassRequest;
import com.schoolmate.dto.AssignFacilityRequest;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.model.User;
import com.schoolmate.service.PrincipalService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PrincipalServiceImpl implements PrincipalService {

    private final UserDao userDao;

    public PrincipalServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public ResponseEntity<MessageResponse> assignClassteacher(AssignClassRequest request) {
        User user = userDao.findByEmail(request.getEmail()).orElseThrow();
        if (user != null) {
            user.setStandard(request.getStandard());
            userDao.save(user);
            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<MessageResponse> assignFacility(AssignFacilityRequest request) {
        User user = userDao.findByEmail(request.getEmail()).orElseThrow();
        if (user != null) {
            user.setFacility(request.getFacility());
            userDao.save(user);
            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
