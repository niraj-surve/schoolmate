package com.schoolmate.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.schoolmate.dto.DeleteByStandardRequest;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.dto.TimetableDTO;
import com.schoolmate.model.Timetable;

public interface TimetableService {
    List<Timetable> getAllTimetables();

    ResponseEntity<MessageResponse> saveTimetable(TimetableDTO request);

    ResponseEntity<MessageResponse> updateTimetable(Timetable timetable);

    ResponseEntity<MessageResponse> deleteTimetable(DeleteByStandardRequest request);
}