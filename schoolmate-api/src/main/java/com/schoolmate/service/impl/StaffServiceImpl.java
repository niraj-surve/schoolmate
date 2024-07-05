package com.schoolmate.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.schoolmate.dao.StaffDao;
import com.schoolmate.dto.CountResponse;
import com.schoolmate.dto.DeleteByEmailRequest;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.dto.StaffDTO;
import com.schoolmate.model.Staff;
import com.schoolmate.service.StaffService;

@Service
public class StaffServiceImpl implements StaffService {

    private final StaffDao staffDao;

    public StaffServiceImpl(StaffDao staffDao) {
        this.staffDao = staffDao;
    }

    @Override
    public List<Staff> getAllStaff() {
        return staffDao.findByTransferredFalse();
    }

    @Override
    public List<Staff> getTransferredStaff() {
        return staffDao.findByTransferredTrue();
    }

    @Override
    public ResponseEntity<CountResponse> getCountOfAssistantTeachers() {
        CountResponse response = new CountResponse();
        response.setCount(staffDao.countByPosition("assistantTeacher"));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CountResponse> getCountOfGraduateTeachers() {
        CountResponse response = new CountResponse();
        response.setCount(staffDao.countByPosition("graduateTeacher"));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> addStaff(StaffDTO request) {
        if (staffDao.existsByEmail(request.getEmail())) {
            MessageResponse response = new MessageResponse();
            response.setEmailExistsError(true);
            return ResponseEntity.ok(response);
        }

        if ("principal".equalsIgnoreCase(request.getPosition()) && staffDao.existsByPosition("principal")) {
            MessageResponse response = new MessageResponse();
            response.setPrincipalExistsError(true);
            return ResponseEntity.ok(response);
        }

        if ("vicePrincipal".equalsIgnoreCase(request.getPosition()) && staffDao.existsByPosition("vocePrincipal")) {
            MessageResponse response = new MessageResponse();
            response.setVicePrincipalExistsError(true);
            return ResponseEntity.ok(response);
        }

        Staff staff = new Staff();

        staff.setFname(request.getFname());
        staff.setMname(request.getMname());
        staff.setLname(request.getLname());
        staff.setDob(request.getDob());
        staff.setGender(request.getGender());
        staff.setEmail(request.getEmail());
        staff.setPhone(request.getPhone());
        staff.setPosition(request.getPosition());
        staff.setAddress(request.getAddress());
        staff.setJobStartDate(request.getJobStartDate());
        staff.setRetirementDate(request.getRetirementDate());
        staff.setSchoolJoinedDate(request.getSchoolJoinedDate());
        staff.setEducationalQualification(request.getEducationalQualification());
        staff.setProfessionalQualification(request.getProfessionalQualification());
        staff.setTransferred(request.getTransferred());

        staffDao.save(staff);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> updateStaff(StaffDTO request) {
        Staff existingStaff = staffDao.findByEmail(request.getEmail()).orElse(null);
        if (existingStaff == null) {
            MessageResponse response = new MessageResponse();
            response.setEmailNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        if (!request.getEmail().equals(existingStaff.getEmail())) {
            MessageResponse response = new MessageResponse();
            response.setEmailChangeError(true);
            return ResponseEntity.ok(response);
        }

        if ("principal".equalsIgnoreCase(request.getPosition()) && staffDao.existsByPosition("principal")
                && !existingStaff.getPosition().equalsIgnoreCase("principal")) {
            MessageResponse response = new MessageResponse();
            response.setPrincipalExistsError(true);
            return ResponseEntity.ok(response);
        }

        if ("vicePrincipal".equalsIgnoreCase(request.getPosition()) && staffDao.existsByPosition("vicePrincipal")
                && !existingStaff.getPosition().equalsIgnoreCase("vicePrincipal")) {
            MessageResponse response = new MessageResponse();
            response.setVicePrincipalExistsError(true);
            return ResponseEntity.ok(response);
        }

        existingStaff.setFname(request.getFname());
        existingStaff.setMname(request.getMname());
        existingStaff.setLname(request.getLname());
        existingStaff.setDob(request.getDob());
        existingStaff.setGender(request.getGender());
        existingStaff.setPhone(request.getPhone());
        existingStaff.setPosition(request.getPosition());
        existingStaff.setAddress(request.getAddress());
        existingStaff.setJobStartDate(request.getJobStartDate());
        existingStaff.setRetirementDate(request.getRetirementDate());
        existingStaff.setSchoolJoinedDate(request.getSchoolJoinedDate());
        existingStaff.setEducationalQualification(request.getEducationalQualification());
        existingStaff.setProfessionalQualification(request.getProfessionalQualification());
        existingStaff.setTransferred(request.getTransferred());

        staffDao.save(existingStaff);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> deleteStaff(DeleteByEmailRequest request) {
        Staff existingStaff = staffDao.findByEmail(request.getEmail()).orElse(null);
        if (existingStaff == null) {
            MessageResponse response = new MessageResponse();
            response.setEmailNotExistsError(false);
            return ResponseEntity.ok(response);
        }

        staffDao.delete(existingStaff);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> transferStaff(StaffDTO request) {
        Staff existingStaff = staffDao.findByEmail(request.getEmail()).orElse(null);
        if (existingStaff == null) {
            MessageResponse response = new MessageResponse();
            response.setEmailNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        existingStaff.setTransferred(request.getTransferred());

        staffDao.save(existingStaff);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CountResponse> getCount() {
        CountResponse response = new CountResponse();
        response.setCount(staffDao.countByTransferredFalse());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CountResponse> getTransferredCount() {
        CountResponse response = new CountResponse();
        response.setCount(staffDao.countByTransferredTrue());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> uploadStaff(List<StaffDTO> staffDTOs) {
        try {
            List<Staff> staffList = new ArrayList<>();
            List<String> duplicateEmails = new ArrayList<>(); // To store duplicate emails

            for (StaffDTO staffDTO : staffDTOs) {
                String email = staffDTO.getEmail();

                // Check if email already exists
                if (staffDao.existsByEmail(email)) {
                    duplicateEmails.add(email); // Add to duplicate list
                    continue; // Skip saving this staff
                }

                // Convert StaffDTO to Staff entity and add to the list
                Staff staff = new Staff();
                staff.setFname(staffDTO.getFname());
                staff.setMname(staffDTO.getMname());
                staff.setLname(staffDTO.getLname());
                staff.setDob(staffDTO.getDob());
                staff.setGender(staffDTO.getGender());
                staff.setEmail(staffDTO.getEmail());
                staff.setPhone(staffDTO.getPhone());
                staff.setAddress(staffDTO.getAddress());
                staff.setPosition(staffDTO.getPosition());
                staff.setJobStartDate(staffDTO.getJobStartDate());
                staff.setRetirementDate(staffDTO.getRetirementDate());
                staff.setSchoolJoinedDate(staffDTO.getSchoolJoinedDate());
                staff.setEducationalQualification(staffDTO.getEducationalQualification());
                staff.setProfessionalQualification(staffDTO.getProfessionalQualification());
                staff.setTransferred(staffDTO.getTransferred());

                staffList.add(staff);
            }

            staffDao.saveAll(staffList);

            MessageResponse response = new MessageResponse();
            if (duplicateEmails.isEmpty()) {
                response.setSuccessful(true);
            } if(staffDTOs.size() == 1 && !duplicateEmails.isEmpty()){
                response.setDuplicateError(true);
            }else {
                response.setSuccessful(true);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.ok(response);
        }
    }


}