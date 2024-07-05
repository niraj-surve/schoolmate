package com.schoolmate.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.schoolmate.dto.*;
import com.schoolmate.model.Staff;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.schoolmate.dao.AlumniDao;
import com.schoolmate.model.Alumni;
import com.schoolmate.service.AlumniService;

@Service
public class AlumniServiceImpl implements AlumniService {

    private final AlumniDao alumniDao;

    public AlumniServiceImpl(AlumniDao alumniDao) {
        this.alumniDao = alumniDao;
    }

    @Override
    public List<Alumni> getAllAlumnis() {
        return alumniDao.findAll();
    }

    @Override
    public ResponseEntity<MessageResponse> addAlumni(AlumniDTO request) {
        if (alumniDao.existsByRegNo(request.getRegNo())) {
            MessageResponse response = new MessageResponse();
            response.setRegNoExistsError(true);
            return ResponseEntity.ok(response);
        }

        Alumni alumni = new Alumni();
        alumni.setRegNo(request.getRegNo());
        alumni.setFname(request.getFname());
        alumni.setMname(request.getMname());
        alumni.setLname(request.getLname());
        alumni.setDob(request.getDob());
        alumni.setGender(request.getGender());
        alumni.setPhone(request.getPhone());
        alumni.setAddress(request.getAddress());
        alumni.setAdmissionYear(request.getAdmissionYear());
        alumni.setPassingYear(request.getPassingYear());
        alumni.setCurrentStatus(request.getCurrentStatus());

        alumniDao.save(alumni);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> updateAlumni(AlumniDTO request) {
        Alumni existingAlumni = alumniDao.findByRegNo(request.getRegNo()).orElse(null);
        if (existingAlumni == null) {
            MessageResponse response = new MessageResponse();
            response.setRegNoNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        if (!request.getRegNo().equals(existingAlumni.getRegNo())) {
            MessageResponse response = new MessageResponse();
            response.setRegNoChangeError(true);
            return ResponseEntity.ok(response);
        }

        existingAlumni.setFname(request.getFname());
        existingAlumni.setMname(request.getMname());
        existingAlumni.setLname(request.getLname());
        existingAlumni.setDob(request.getDob());
        existingAlumni.setGender(request.getGender());
        existingAlumni.setPhone(request.getPhone());
        existingAlumni.setAddress(request.getAddress());
        existingAlumni.setAdmissionYear(request.getAdmissionYear());
        existingAlumni.setPassingYear(request.getPassingYear());
        existingAlumni.setCurrentStatus(request.getCurrentStatus());

        // Save the updated alumni information
        alumniDao.save(existingAlumni);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> deleteAlumni(DeleteByRegNoRequest request) {
        Alumni existingAlumni = alumniDao.findByRegNo(request.getRegNo()).orElse(null);
        if (existingAlumni == null) {
            MessageResponse response = new MessageResponse();
            response.setRegNoNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        alumniDao.delete(existingAlumni);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CountResponse> getCount() {
        CountResponse response = new CountResponse();
        response.setCount(alumniDao.count());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<GraduationRatesResponse> getGraduationRates() {
        List<Alumni> alumniList = alumniDao.findAll();

        // Extract distinct years
        List<String> distinctYears = alumniList.stream()
                .map(Alumni::getPassingYear)
                .distinct()
                .collect(Collectors.toList());

        // Count graduate students for each year
        Map<String, Long> graduateStudentsCountByYear = alumniList.stream()
                .collect(Collectors.groupingBy(Alumni::getPassingYear, Collectors.counting()));

        GraduationRatesResponse response = new GraduationRatesResponse();
        response.setDistinctYears(distinctYears);
        response.setGraduateStudentsCountByYear(graduateStudentsCountByYear);

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> uploadAlumni(List<AlumniDTO> alumniDTOS) {
        try {
            List<Alumni> alumniList = new ArrayList<>();
            List<String> duplicateRegNos = new ArrayList<>(); // To store duplicate emails

            for (AlumniDTO alumniDTO : alumniDTOS) {
                String regNo = alumniDTO.getRegNo();

                // Check if email already exists
                if (alumniDao.existsByRegNo(regNo)) {
                    duplicateRegNos.add(regNo); // Add to duplicate list
                    continue; // Skip saving this staff
                }

                // Convert StaffDTO to Staff entity and add to the list
                Alumni alumni = new Alumni();
                alumni.setFname(alumniDTO.getFname());
                alumni.setMname(alumniDTO.getMname());
                alumni.setLname(alumniDTO.getLname());
                alumni.setDob(alumniDTO.getDob());
                alumni.setGender(alumniDTO.getGender());
                alumni.setRegNo(alumniDTO.getRegNo());
                alumni.setPhone(alumniDTO.getPhone());
                alumni.setAddress(alumniDTO.getAddress());
                alumni.setAdmissionYear(alumniDTO.getAdmissionYear());
                alumni.setPassingYear(alumniDTO.getPassingYear());
                alumni.setCurrentStatus(alumniDTO.getCurrentStatus());

                alumniList.add(alumni);
            }

            alumniDao.saveAll(alumniList);

            MessageResponse response = new MessageResponse();
            if (duplicateRegNos.isEmpty()) {
                response.setSuccessful(true);
            } if(alumniDTOS.size() == 1 && !duplicateRegNos.isEmpty()){
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