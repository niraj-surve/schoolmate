package com.schoolmate.service.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.schoolmate.dao.TimetableDao;
import com.schoolmate.dto.DeleteByStandardRequest;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.dto.TimetableDTO;
import com.schoolmate.model.Timetable;
import com.schoolmate.service.TimetableService;

@Service
public class TimetableServiceImpl implements TimetableService {

    private final TimetableDao timetableDao;

    public TimetableServiceImpl(TimetableDao timetableDao) {
        this.timetableDao = timetableDao;
    }

    @Override
    public List<Timetable> getAllTimetables() {
        return timetableDao.findAll();
    }

    @Override
    public ResponseEntity<MessageResponse> saveTimetable(TimetableDTO request) {
        if (timetableDao.existsByStandard(request.getStandard())) {
            MessageResponse response = new MessageResponse();
            response.setTimetableExistsError(true);
            return ResponseEntity.ok(response);
        }

        Timetable timetable = new Timetable();
        timetable.setStandard(request.getStandard());
        timetable.setTimetable(request.getTimetable());
        timetable.setSaturdayTimetable(request.getSaturdayTimetable());

        timetableDao.save(timetable);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> updateTimetable(Timetable timetable) {
        Timetable existingTimetable = timetableDao.findByStandard(timetable.getStandard()).orElseThrow();
        if (existingTimetable == null) {
            MessageResponse response = new MessageResponse();
            response.setTimetableNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        existingTimetable.setTimetable(timetable.getTimetable());
        existingTimetable.setSaturdayTimetable(timetable.getSaturdayTimetable());
        timetableDao.save(existingTimetable);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }



    @Override
    public ResponseEntity<MessageResponse> deleteTimetable(DeleteByStandardRequest request) {
        Timetable existingTimetable = timetableDao.findByStandard(request.getstandard()).orElse(null);
        if (existingTimetable == null) {
            MessageResponse response = new MessageResponse();
            response.setTimetableNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        timetableDao.delete(existingTimetable);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }
}