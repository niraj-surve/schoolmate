package com.schoolmate.controller;

import com.schoolmate.dto.*;
import com.schoolmate.model.*;
import com.schoolmate.service.BooksService;
import com.schoolmate.service.MidDayMealService;
import com.schoolmate.service.StudentService;
import com.schoolmate.service.UniformService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class StaffController {
    private final StudentService studentService;
    private final MidDayMealService mdmService;

    private final BooksService booksService;

    private final UniformService uniformService;

    public StaffController(StudentService studentService, MidDayMealService mdmService, BooksService booksService, UniformService uniformService) {
        this.studentService = studentService;
        this.mdmService = mdmService;
        this.booksService = booksService;
        this.uniformService = uniformService;
    }

    @PostMapping("/staff/get-students")
    public List<Student> getAllStudent(@RequestBody StandardDTO request) {
        return studentService.getAllStudents(request);
    }

    @GetMapping("/staff/get-all-students-count")
    public ResponseEntity<CountResponse> getAllStudentsCount(){
        return studentService.getAllCounts();
    }

    @GetMapping("/staff/get-student-counts")
    public ResponseEntity<Map<String, Long>> getStudentCount() {
        return studentService.getCountByAllStandards();
    }

    @GetMapping("/staff/get-male-student-counts")
    public ResponseEntity<CountResponse> getMaleStudentCount() {
        return studentService.getCountOfMaleStudents();
    }

    @GetMapping("/staff/get-female-student-counts")
    public ResponseEntity<CountResponse> getFealeStudentCount() {
        return studentService.getCountOfFemaleStudents();
    }

    @PostMapping("/staff/upload-student-data")
    public ResponseEntity<MessageResponse> uploadStudent(@RequestBody List<StudentDTO> request) {
        return studentService.uploadStudent(request);
    }

    @PostMapping("/staff/add-student")
    public ResponseEntity<MessageResponse> addStudent(@RequestBody StudentDTO request) {
        return studentService.addStudent(request);
    }

    @PutMapping("/staff/update-student")
    public ResponseEntity<MessageResponse> updateStudent(@RequestBody StudentDTO request) {
        return studentService.updateStudent(request);
    }

    @DeleteMapping("/staff/delete-student")
    public ResponseEntity<MessageResponse> deleteStudent(@RequestBody DeleteByRegNoRequest request) {
        return studentService.deleteStudent(request);
    }

    @PostMapping("/staff/mark-attendance")
    public ResponseEntity<MessageResponse> markAttendance(@RequestBody List<AttendanceDTO> request) {
        return studentService.markAttendance(request);
    }

    @PostMapping("/staff/view-previous-attendance")
    public ResponseEntity<ViewAttendanceResponse> viewAttendance(@RequestBody ViewAttendanceDTO request) {
        return studentService.viewAttendance(request);
    }

    @PostMapping("/staff/get-monthly-attendance")
    public ResponseEntity<PercentageResponse> markAttendance(@RequestBody AttendancePercentageRequestDTO request) {
        return studentService.calculateMonthlyAttendance(request);
    }

    @GetMapping("/staff/get-academic-years")
    public List<String> getAcademicYears() {
        return studentService.getAllAcademicYears();
    }

    @GetMapping("/staff/get-mdm-data")
    public List<MidDayMeal> getMDMData(){
        return mdmService.getAllData();
    }

    @PostMapping("/staff/get-mdm-data-by-year")
    public MidDayMeal getMDMDatabyYearAndMonth(@RequestBody MDMRequestDTO request){
        return mdmService.getDataByYearAndMonth(request);
    }

    @PostMapping("/staff/add-mdm-data")
    public ResponseEntity<MessageResponse> addMidDayMealData(@RequestBody MidDayMeal midDayMeal){
        return mdmService.addMidDayMeal(midDayMeal);
    }

    @PutMapping("/staff/update-mdm-data")
    public ResponseEntity<MessageResponse> updateMidDayMealData(@RequestBody MidDayMeal midDayMeal){
        return mdmService.updateMidDayMeal(midDayMeal);
    }

    @DeleteMapping("/staff/delete-mdm-data")
    public ResponseEntity<MessageResponse> deleteMidDayMealData(@RequestBody MDMRequestDTO request){
        return mdmService.deleteMidDayMeal(request);
    }

    @GetMapping("/staff/get-mdm-years")
    public List<String> getMDMYears(){
        return mdmService.getDistinctYears();
    }

    @GetMapping("/staff/get-mdm-months")
    public List<String> getMDMMonths(){
        return mdmService.getDistinctMonths();
    }

    @GetMapping("/staff/get-books-data")
    public List<Books> getBooksData(){
        return booksService.getAllData();
    }

    @PostMapping("/staff/get-books-data-by-year")
    public Books getBooksDatabyYear(@RequestBody BookByYearDTO request){
        return booksService.getDataByYear(request);
    }

    @GetMapping("/staff/get-books-years")
    public List<String> getBooksYears(){
        return booksService.getDistinctYears();
    }

    @PostMapping("/staff/add-books-data")
    public ResponseEntity<MessageResponse> addMBooksData(@RequestBody Books books){
        return booksService.addBooksData(books);
    }

    @PutMapping("/staff/update-books-data")
    public ResponseEntity<MessageResponse> updateBooksData(@RequestBody Books books){
        return booksService.updateBooksData(books);
    }

    @DeleteMapping("/staff/delete-books-data")
    public ResponseEntity<MessageResponse> deleteBooksData(@RequestBody BookByYearDTO request){
        return booksService.deleteBooksData(request);
    }

    @GetMapping("/staff/get-uniform-data")
    public List<Uniform> getUniformData(){
        return uniformService.getAllUniforms();
    }
    @PostMapping("/staff/get-uniform-data-by-year")
    public Uniform getUniformByYearAndStandard(@RequestBody UniformRequestDTO request) {
        return uniformService.getUniformByYearAndStandard(request);
    }

    @PostMapping("/staff/add-uniform-data")
    public ResponseEntity<MessageResponse> addUniform(@RequestBody Uniform uniform) {
        return uniformService.addUniform(uniform);
    }

    @PutMapping("/staff/update-uniform-data")
    public ResponseEntity<MessageResponse> updateUniform(@RequestBody Uniform uniform) {
        return uniformService.updateUniform(uniform);
    }

    @DeleteMapping("/staff/delete-uniform-data")
    public ResponseEntity<MessageResponse> deleteUniform(@RequestBody UniformRequestDTO request) {
        return uniformService.deleteUniform(request);
    }

    @GetMapping("/staff/get-uniforms-years")
    public List<String> getUniformsYears(){
        return uniformService.getDistinctYears();
    }

    @GetMapping("/staff/get-uniforms-standards")
    public List<String> getUniformsStandards(){
        return uniformService.getDistinctStandards();
    }
}