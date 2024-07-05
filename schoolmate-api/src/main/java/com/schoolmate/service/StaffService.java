package com.schoolmate.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.schoolmate.dto.CountResponse;
import com.schoolmate.dto.DeleteByEmailRequest;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.dto.StaffDTO;
import com.schoolmate.model.Staff;

public interface StaffService {
    List<Staff> getAllStaff();

    List<Staff> getTransferredStaff();

    ResponseEntity<MessageResponse> addStaff(StaffDTO request);

    ResponseEntity<MessageResponse> updateStaff(StaffDTO request);

    ResponseEntity<MessageResponse> deleteStaff(DeleteByEmailRequest request);

    ResponseEntity<MessageResponse> transferStaff(StaffDTO request);

    ResponseEntity<CountResponse> getCount();

    ResponseEntity<CountResponse> getTransferredCount();

    ResponseEntity<CountResponse> getCountOfAssistantTeachers();

    ResponseEntity<CountResponse> getCountOfGraduateTeachers();

    ResponseEntity<MessageResponse> uploadStaff(List<StaffDTO> staffDTOs);
}