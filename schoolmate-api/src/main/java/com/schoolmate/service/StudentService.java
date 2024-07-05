package com.schoolmate.service;

import com.schoolmate.dto.*;
import com.schoolmate.model.Student;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface StudentService {
    List<Student> getAllStudents(StandardDTO request);

    ResponseEntity<MessageResponse> addStudent(StudentDTO request);

    ResponseEntity<MessageResponse> updateStudent(StudentDTO request);

    ResponseEntity<MessageResponse> deleteStudent(DeleteByRegNoRequest request);

    ResponseEntity<Map<String, Long>> getCountByAllStandards();

    ResponseEntity<CountResponse> getAllCounts();

    ResponseEntity<CountResponse> getCountOfMaleStudents();

    ResponseEntity<CountResponse> getCountOfFemaleStudents();

    ResponseEntity<MessageResponse> uploadStudent(List<StudentDTO> studentDTOS);

    ResponseEntity<MessageResponse> markAttendance(List<AttendanceDTO> attendanceDTOList);

    ResponseEntity<PercentageResponse> calculateMonthlyAttendance(AttendancePercentageRequestDTO request);

    ResponseEntity<ViewAttendanceResponse> viewAttendance(ViewAttendanceDTO request);

    List<String> getAllAcademicYears();

    ResponseEntity<CountResponse> getStudentsCount();

    ResponseEntity<CountResponse> getBoysStudentsCount();

    ResponseEntity<CountResponse> getGirlsStudentsCount();

    ResponseEntity<List<Map<String, Object>>> getStudentsPerIncomeGroup();

    ResponseEntity<List<Map<String, Object>>> getStudentsPerCaste();

    ResponseEntity<List<Map<String, Object>>> getStudentsPerIncomeGroupForStandard(StandardDTO request);

    ResponseEntity<List<Map<String, Object>>> getStudentsPerCasteForStandard(StandardDTO request);
}
