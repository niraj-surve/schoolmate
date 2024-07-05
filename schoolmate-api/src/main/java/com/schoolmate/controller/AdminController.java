package com.schoolmate.controller;

import java.util.List;

import com.schoolmate.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.schoolmate.dto.AlumniDTO;
import com.schoolmate.dto.DeleteByEmailRequest;
import com.schoolmate.dto.DeleteByRegNoRequest;
import com.schoolmate.dto.DeleteByStandardRequest;
import com.schoolmate.dto.DeleteNoticeRequest;
import com.schoolmate.dto.GraduationRatesResponse;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.dto.NoticeDTO;
import com.schoolmate.dto.RegisterRequest;
import com.schoolmate.dto.StaffDTO;
import com.schoolmate.dto.TimetableDTO;
import com.schoolmate.dto.UpdateUserDTO;
import com.schoolmate.model.Alumni;
import com.schoolmate.model.Notice;
import com.schoolmate.model.Staff;
import com.schoolmate.model.Timetable;
import com.schoolmate.model.User;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final NoticeService noticeService;
    private final IamService iamServie;
    private final StaffService staffService;
    private final AlumniService alumniService;
    private final TimetableService timetableService;
    private final StudentService studentService;

    public AdminController(NoticeService noticeService, IamService iamServie, StaffService staffService,
                           AlumniService alumniService, TimetableService timetableService, StudentService studentService) {
        this.noticeService = noticeService;
        this.iamServie = iamServie;
        this.staffService = staffService;
        this.alumniService = alumniService;
        this.timetableService = timetableService;
        this.studentService = studentService;
    }

    @PostMapping("/add-notice")
    public ResponseEntity<MessageResponse> addNotice(@RequestBody NoticeDTO request) {
        return noticeService.addNotice(request);
    }

    @PutMapping("/update-notice")
    public ResponseEntity<MessageResponse> updateNotice(@RequestBody Notice notice) {
        return noticeService.updateNotice(notice);
    }

    @DeleteMapping("/delete-notice")
    public ResponseEntity<MessageResponse> deleteNotice(@RequestBody DeleteNoticeRequest request) {
        return noticeService.deleteNotice(request);
    }

    @GetMapping("/get-users")
    public List<User> getAllUsers() {
        return iamServie.getAllUsers();
    }

    @PostMapping("/add-user")
    public ResponseEntity<MessageResponse> addUser(@RequestBody RegisterRequest request) {
        return iamServie.addUser(request);
    }

    @PutMapping("/update-user")
    public ResponseEntity<MessageResponse> updateUser(@RequestBody UpdateUserDTO request) {
        return iamServie.updateUser(request);
    }

    @DeleteMapping("/delete-user")
    public ResponseEntity<MessageResponse> deleteUser(@RequestBody DeleteByEmailRequest request) {
        return iamServie.deleteUser(request);
    }

    @GetMapping("/get-staff")
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @GetMapping("/get-transferred-staff")
    public List<Staff> getTransferredStaff() {
        return staffService.getTransferredStaff();
    }

    @PostMapping("/upload-staff-data")
    public ResponseEntity<MessageResponse> uploadStaff(@RequestBody List<StaffDTO> request) {
        return staffService.uploadStaff(request);
    }

    @PostMapping("/add-staff")
    public ResponseEntity<MessageResponse> addStaff(@RequestBody StaffDTO request) {
        return staffService.addStaff(request);
    }

    @PutMapping("/update-staff")
    public ResponseEntity<MessageResponse> updateStaff(@RequestBody StaffDTO request) {
        return staffService.updateStaff(request);
    }

    @DeleteMapping("/delete-staff")
    public ResponseEntity<MessageResponse> deleteStaff(@RequestBody DeleteByEmailRequest request) {
        return staffService.deleteStaff(request);
    }

    @PutMapping("/transfer-staff")
    public ResponseEntity<MessageResponse> deleteStaff(@RequestBody StaffDTO request) {
        return staffService.transferStaff(request);
    }

    @GetMapping("/get-alumnis")
    public List<Alumni> getAllAlumni() {
        return alumniService.getAllAlumnis();
    }

    @PostMapping("/upload-alumni-data")
    public ResponseEntity<MessageResponse> uploadAlumni(@RequestBody List<AlumniDTO> request) {
        return alumniService.uploadAlumni(request);
    }

    @PostMapping("/add-alumni")
    public ResponseEntity<MessageResponse> addAlumni(@RequestBody AlumniDTO request) {
        System.out.println();
        return alumniService.addAlumni(request);
    }

    @PutMapping("/update-alumni")
    public ResponseEntity<MessageResponse> updateAlumni(@RequestBody AlumniDTO request) {
        return alumniService.updateAlumni(request);
    }

    @DeleteMapping("/delete-alumni")
    public ResponseEntity<MessageResponse> deleteAlumni(@RequestBody DeleteByRegNoRequest request) {
        return alumniService.deleteAlumni(request);
    }

    @GetMapping("/get-timetables")
    public List<Timetable> getAllTimetables() {
        return timetableService.getAllTimetables();
    }

    @PostMapping("/save-timetable")
    public ResponseEntity<MessageResponse> saveTimetable(@RequestBody TimetableDTO request) {
        return timetableService.saveTimetable(request);
    }

    @PutMapping("/update-timetable")
    public ResponseEntity<MessageResponse> updateTimetable(@RequestBody Timetable timetable) {
        return timetableService.updateTimetable(timetable);
    }

    @DeleteMapping("/delete-timetable")
    public ResponseEntity<MessageResponse> deleteTimetable(@RequestBody DeleteByStandardRequest request) {
        return timetableService.deleteTimetable(request);
    }
}