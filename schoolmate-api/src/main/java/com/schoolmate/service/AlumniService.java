package com.schoolmate.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.schoolmate.dto.AlumniDTO;
import com.schoolmate.dto.CountResponse;
import com.schoolmate.dto.DeleteByRegNoRequest;
import com.schoolmate.dto.GraduationRatesResponse;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.model.Alumni;

public interface AlumniService {
    List<Alumni> getAllAlumnis();

    ResponseEntity<MessageResponse> addAlumni(AlumniDTO request);

    ResponseEntity<MessageResponse> updateAlumni(AlumniDTO request);

    ResponseEntity<MessageResponse> deleteAlumni(DeleteByRegNoRequest request);

    ResponseEntity<CountResponse> getCount();

    ResponseEntity<GraduationRatesResponse> getGraduationRates();

    ResponseEntity<MessageResponse> uploadAlumni(List<AlumniDTO> alumniDTOS);
}