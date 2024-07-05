package com.schoolmate.service.impl;

import com.schoolmate.dao.StudentDao;
import com.schoolmate.dto.*;
import com.schoolmate.model.*;
import com.schoolmate.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentDao studentDao;

    public StudentServiceImpl(StudentDao studentDao) {
        this.studentDao = studentDao;
    }

    @Override
    public ResponseEntity<CountResponse> getStudentsCount() {
        long totalCount = studentDao.count();
        CountResponse response = new CountResponse(totalCount);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CountResponse> getBoysStudentsCount() {
        long boysCount = studentDao.findAll().stream()
                .filter(student -> "male".equalsIgnoreCase(student.getGender()))
                .count();
        CountResponse response = new CountResponse(boysCount);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CountResponse> getGirlsStudentsCount() {
        long boysCount = studentDao.findAll().stream()
                .filter(student -> "female".equalsIgnoreCase(student.getGender()))
                .count();
        CountResponse response = new CountResponse(boysCount);
        return ResponseEntity.ok(response);
    }


    @Override
    public List<Student> getAllStudents(StandardDTO request) {
        return studentDao.findByStandard(request.getStandard());
    }


    @Override
    public ResponseEntity<MessageResponse> addStudent(StudentDTO request) {
        if (studentDao.existsByRegNo(request.getRegNo())) {
            MessageResponse response = new MessageResponse();
            response.setRegNoExistsError(true);
            return ResponseEntity.ok(response);
        }

        Student student = new Student();
        student.setRegNo(request.getRegNo());
        student.setName(request.getName());
        student.setFathersName(request.getFathersName());
        student.setMothersName(request.getMothersName());
        student.setDob(request.getDob());
        student.setGender(request.getGender());
        student.setStandard(request.getStandard());
        student.setpContactNo(request.getpContactNo());
        student.setAddress(request.getAddress());
        student.setAdmissionDate(request.getAdmissionDate());
        student.setNoInSiblings(request.getNoInSiblings());
        student.setIncome(request.getIncome());
        student.setAadharNo(request.getAadharNo());
        student.setReligion(request.getReligion());
        student.setCaste(request.getCaste());

        studentDao.save(student);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> updateStudent(StudentDTO request) {
        Student existingStudent = studentDao.findByRegNo(request.getRegNo()).orElse(null);
        if (existingStudent == null) {
            MessageResponse response = new MessageResponse();
            response.setRegNoNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        if (!request.getRegNo().equals(existingStudent.getRegNo())) {
            MessageResponse response = new MessageResponse();
            response.setRegNoChangeError(true);
            return ResponseEntity.ok(response);
        }

        existingStudent.setRegNo(request.getRegNo());
        existingStudent.setName(request.getName());
        existingStudent.setFathersName(request.getFathersName());
        existingStudent.setMothersName(request.getMothersName());
        existingStudent.setDob(request.getDob());
        existingStudent.setGender(request.getGender());
        existingStudent.setStandard(request.getStandard());
        existingStudent.setpContactNo(request.getpContactNo());
        existingStudent.setAddress(request.getAddress());
        existingStudent.setAdmissionDate(request.getAdmissionDate());
        existingStudent.setNoInSiblings(request.getNoInSiblings());
        existingStudent.setIncome(request.getIncome());
        existingStudent.setAadharNo(request.getAadharNo());
        existingStudent.setReligion(request.getReligion());
        existingStudent.setCaste(request.getCaste());

        // Save the updated alumni information
        studentDao.save(existingStudent);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> deleteStudent(DeleteByRegNoRequest request) {
        Student existingStudent = studentDao.findByRegNo(request.getRegNo()).orElse(null);
        if (existingStudent == null) {
            MessageResponse response = new MessageResponse();
            response.setRegNoNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        studentDao.delete(existingStudent);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Long>> getCountByAllStandards() {
        List<String> allStandards = studentDao.getAllStandards();
        Map<String, Long> countsByStandard = new HashMap<>();

        for (String standard : allStandards) {
            long count = studentDao.countByStandard(standard);
            countsByStandard.put(standard, count);
        }

        return ResponseEntity.ok(countsByStandard);
    }

    @Override
    public ResponseEntity<CountResponse> getAllCounts() {
        long count = studentDao.count();
        CountResponse response = new CountResponse(count);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CountResponse> getCountOfMaleStudents() {
        long maleCount = studentDao.countByGender("male");
        CountResponse response = new CountResponse(maleCount);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<CountResponse> getCountOfFemaleStudents() {
        long femaleCount = studentDao.countByGender("female");
        CountResponse response = new CountResponse(femaleCount);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> uploadStudent(List<StudentDTO> studentDTOS) {
        try {
            List<Student> studentList = new ArrayList<>();
            List<String> duplicateRegNos = new ArrayList<>(); // To store duplicate emails

            for (StudentDTO studentDTO : studentDTOS) {
                String regNo = studentDTO.getRegNo();

                // Check if email already exists
                if (studentDao.existsByRegNo(regNo)) {
                    duplicateRegNos.add(regNo); // Add to duplicate list
                    continue; // Skip saving this staff
                }

                // Convert StaffDTO to Staff entity and add to the list
                Student student = new Student();
                student.setRegNo(studentDTO.getRegNo());
                student.setRollNo(studentDTO.getRollNo());
                student.setName(studentDTO.getName());
                student.setFathersName(studentDTO.getFathersName());
                student.setMothersName(studentDTO.getMothersName());
                student.setDob(studentDTO.getDob());
                student.setGender(studentDTO.getGender());
                student.setStandard(studentDTO.getStandard());
                student.setpContactNo(studentDTO.getpContactNo());
                student.setAddress(studentDTO.getAddress());
                student.setAdmissionDate(studentDTO.getAdmissionDate());
                student.setNoInSiblings(studentDTO.getNoInSiblings());
                student.setIncome(studentDTO.getIncome());
                student.setAadharNo(studentDTO.getAadharNo());
                student.setReligion(studentDTO.getReligion());
                student.setCaste(studentDTO.getCaste());

                studentList.add(student);
            }

            studentDao.saveAll(studentList);

            MessageResponse response = new MessageResponse();
            if (duplicateRegNos.isEmpty()) {
                response.setSuccessful(true);
            } if(studentDTOS.size() == 1 && !duplicateRegNos.isEmpty()){
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

    @Override
    public ResponseEntity<MessageResponse> markAttendance(List<AttendanceDTO> attendanceDTOList) {
        try {
            for (AttendanceDTO attendanceDTO : attendanceDTOList) {
                // Find the student by registration number
                Student student = studentDao.findByRegNo(attendanceDTO.getRegNo()).orElseThrow();

                if (student != null) {
                    // Get the list of attendances for the student
                    List<Attendance> attendances = student.getAttendances();

                    // Check if the student has any attendance records
                    if (attendances == null) {
                        attendances = new ArrayList<>();
                        student.setAttendances(attendances);
                    }

                    // Check if the student has attendance records for the current academic year
                    boolean found = false;
                    for (Attendance existingAttendance : attendances) {
                        if (existingAttendance.getAcademicYear().equals(attendanceDTO.getAcademicYear())) {
                            // Update the existing attendance
                            existingAttendance.getDates().put(attendanceDTO.getDate(), attendanceDTO.getPresent());
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        // Create a new Attendance object for the new academic year
                        Map<String, Boolean> dateMap = new HashMap<>();
                        dateMap.put(attendanceDTO.getDate(), attendanceDTO.getPresent());
                        Attendance newAttendance = new Attendance(attendanceDTO.getAcademicYear(), attendanceDTO.getStandard(), attendanceDTO.getMonth(), dateMap);
                        attendances.add(newAttendance);
                    }

                    // Save the updated student information
                    studentDao.save(student);
                }
            }

            MessageResponse response = new MessageResponse();
            response.setSuccessful(true);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e);
            MessageResponse response = new MessageResponse();
            response.setSuccessful(false);
            return ResponseEntity.ok(response);
        }
    }

    @Override
    public ResponseEntity<PercentageResponse> calculateMonthlyAttendance(AttendancePercentageRequestDTO request) {
        Map<String, Float> monthlyAttendanceMap = new HashMap<>();
        Map<String, Float> totalAttendanceMap = new HashMap<>();

        for (Student student : request.getStudents()) {
            int totalDatesInMonth = getTotalDatesInMonth(request.getMonth(), student);
            int presentDays = 0;

            List<Attendance> attendances = student.getAttendances();

            for (Attendance attendance : attendances) {
                if (attendance.getMonth().equalsIgnoreCase(request.getMonth())) {
                    Map<String, Boolean> dates = attendance.getDates();
                    for (Map.Entry<String, Boolean> entry : dates.entrySet()) {
                        if (isDateInMonth(entry.getKey(), request.getMonth()) && entry.getValue()) {
                            presentDays++;
                        }
                    }
                }
            }

            double monthlyPercentage = (double) presentDays / totalDatesInMonth * 100;
            monthlyAttendanceMap.put(student.getRegNo(), (float) monthlyPercentage);

            // Calculate total attendance for all months in the academic year
            int totalPresentDays = 0;
            int totalDates = 0;

            for (Attendance attendance : attendances) {
                if (attendance.getAcademicYear().equals(request.getAcademicYear())) {
                    totalDates += getTotalDatesInMonth(attendance.getMonth(), student);
                    totalPresentDays += attendance.getDates().values().stream().filter(Boolean::booleanValue).count();
                }
            }

            double totalPercentage = (double) totalPresentDays / totalDates * 100;
            totalAttendanceMap.put(student.getRegNo(), (float) totalPercentage);
        }

        PercentageResponse response = new PercentageResponse(monthlyAttendanceMap, totalAttendanceMap);
        return ResponseEntity.ok(response);
    }

    // Function to calculate the total number of dates in the specified month for the student
    private int getTotalDatesInMonth(String month, Student student) {
        int totalDates = 0;

        List<Attendance> attendances = student.getAttendances();
        for (Attendance attendance : attendances) {
            if (attendance.getMonth().equalsIgnoreCase(month)) {
                totalDates += attendance.getDates().size(); // Add the number of dates in this attendance
            }
        }

        return totalDates;
    }


    // Helper method to check if a date falls within a specified month
    private boolean isDateInMonth(String date, String month) {
        // Split the date string into parts (assuming format is "YYYY-MM-DD")
        String[] parts = date.split("-");
        int monthOfYear = Integer.parseInt(parts[1]); // Extract the month part

        // Check if the month of the date matches the specified month
        return monthOfYear == getMonthIndex(month);
    }

    // Helper method to get the index of a month (e.g., January -> 1, February -> 2, etc.)
    private int getMonthIndex(String month) {
        switch (month.toLowerCase()) {
            case "january":
                return 1;
            case "february":
                return 2;
            case "march":
                return 3;
            case "april":
                return 4;
            case "may":
                return 5;
            case "june":
                return 6;
            case "july":
                return 7;
            case "august":
                return 8;
            case "september":
                return 9;
            case "october":
                return 10;
            case "november":
                return 11;
            case "december":
                return 12;
            default:
                return 0;
        }
    }

    @Override
    public ResponseEntity<ViewAttendanceResponse> viewAttendance(ViewAttendanceDTO request) {
        String academicYear = request.getAcademicYear();
        String month = request.getMonth();
        String standard = request.getStandard();

        // Check if academicYear and month are not null
        if (academicYear == null || month == null) {
            return ResponseEntity.badRequest().build();
        }

        // Initialize the response DTO
        List<ViewAttendanceData> viewAttendanceDataList = new ArrayList<>();

        // Get all students for the specified standard
        List<Student> students = studentDao.findByStandard(standard);

        // Iterate over each student
        for (Student student : students) {
            // Initialize variables to calculate monthly and total attendance
            int totalDatesInMonth = 0;
            int presentDaysInMonth = 0;
            int totalPresentDays = 0;
            int totalDates = 0;

            // Get the list of attendances for the student
            List<Attendance> attendances = student.getAttendances();

            // Initialize map to store dates and attendance status
            Map<String, String> datesMap = new HashMap<>();

            // Iterate over each attendance record
            for (Attendance attendance : attendances) {
                // Check if the attendance record matches the academic year and month
                if (attendance.getAcademicYear().equals(academicYear) && attendance.getMonth().equalsIgnoreCase(month)) {
                    // Iterate over each date and its attendance status
                    for (Map.Entry<String, Boolean> entry : attendance.getDates().entrySet()) {
                        totalDatesInMonth++; // Increment total dates in the month
                        if (entry.getValue()) {
                            presentDaysInMonth++; // Increment present days in the month
                        }
                        // Add date and attendance status to map
                        datesMap.put(entry.getKey(), entry.getValue() ? "P" : "A");
                    }
                }

                // Calculate total attendance for all months in the academic year
                if (attendance.getAcademicYear().equals(academicYear)) {
                    totalDates += attendance.getDates().size(); // Add the number of dates in this attendance
                    totalPresentDays += (int) attendance.getDates().values().stream().filter(Boolean::booleanValue).count();
                }
            }

            // Calculate monthly and total attendance percentages
            float monthlyAttendance = (float) presentDaysInMonth / totalDatesInMonth * 100;
            float totalAttendance = (float) totalPresentDays / totalDates * 100;

            // Create ViewAttendanceData object
            ViewAttendanceData viewAttendanceData = new ViewAttendanceData();
            viewAttendanceData.setRegNo(student.getRegNo());
            viewAttendanceData.setRollNo(student.getRollNo());
            viewAttendanceData.setName(student.getName());
            viewAttendanceData.setAcademicYear(academicYear);
            viewAttendanceData.setMonth(month);
            viewAttendanceData.setStandard(standard);
            viewAttendanceData.setDates(datesMap); // Set dates map
            viewAttendanceData.setMonthlyAttendance(monthlyAttendance);
            viewAttendanceData.setTotalAttendance(totalAttendance);

            // Add ViewAttendanceData to the list
            viewAttendanceDataList.add(viewAttendanceData);
        }

        // Create the response DTO
        ViewAttendanceResponse response = new ViewAttendanceResponse();
        response.setData(viewAttendanceDataList);

        // Return the response DTO
        return ResponseEntity.ok(response);
    }


    @Override
    public List<String> getAllAcademicYears() {
        // Get all students from the database
        List<Student> students = studentDao.findAll();

        return students.stream()
                .map(Student::getAttendances) // Get the list of attendances for each student
                .flatMap(List::stream) // Flatten the list of attendances
                .map(Attendance::getAcademicYear) // Get the academic year for each attendance
                .distinct() // Get distinct academic years
                .collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> getStudentsPerIncomeGroup() {
        // Fetch all students from the database
        List<Student> allStudents = studentDao.findAll();

        // Group students by income category and count the number of students in each category
        Map<String, Long> studentsPerIncomeGroup = allStudents.stream()
                .collect(Collectors.groupingBy(this::mapIncomeToCategory, Collectors.counting()));

        // Add zero counts for missing categories
        addMissingCategories(studentsPerIncomeGroup);

        // Convert the map to a list of objects
        List<Map<String, Object>> resultList = studentsPerIncomeGroup.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> obj = new LinkedHashMap<>();
                    obj.put("incomeGroup", entry.getKey());
                    obj.put("count", entry.getValue());
                    return obj;
                })
                .collect(Collectors.toList());

        // Return the response
        return ResponseEntity.ok(resultList);
    }

    private String mapIncomeToCategory(Student student) {
        int income = student.getIncome();
        if (income < 80000) {
            return "Low Income";
        } else if (income <= 800000) {
            return "Middle Income";
        } else {
            return "High Income";
        }
    }

    private void addMissingCategories(Map<String, Long> studentsPerIncomeGroup) {
        // Check if each income category exists, if not, add it with count 0
        if (!studentsPerIncomeGroup.containsKey("Low Income")) {
            studentsPerIncomeGroup.put("Low Income", 0L);
        }
        if (!studentsPerIncomeGroup.containsKey("Middle Income")) {
            studentsPerIncomeGroup.put("Middle Income", 0L);
        }
        if (!studentsPerIncomeGroup.containsKey("High Income")) {
            studentsPerIncomeGroup.put("High Income", 0L);
        }
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> getStudentsPerCaste() {
        // Fetch all students from the database
        List<Student> allStudents = studentDao.findAll();

        // Group students by caste and count the number of students in each caste
        Map<String, Long> studentsPerCaste = allStudents.stream()
                .collect(Collectors.groupingBy(Student::getCaste, Collectors.counting()));

        // Convert the map to a list of objects
        List<Map<String, Object>> resultList = studentsPerCaste.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> obj = new LinkedHashMap<>();
                    obj.put("caste", entry.getKey());
                    obj.put("count", entry.getValue());
                    return obj;
                })
                .collect(Collectors.toList());

        // Return the response
        return ResponseEntity.ok(resultList);
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> getStudentsPerIncomeGroupForStandard(StandardDTO request) {
        // Fetch all students from the database for the given standard
        List<Student> studentsForStandard = studentDao.findByStandard(request.getStandard());

        // Group students by income category and count the number of students in each category
        Map<String, Long> studentsPerIncomeGroup = studentsForStandard.stream()
                .collect(Collectors.groupingBy(this::mapIncomeToCategory, Collectors.counting()));

        // Add zero counts for missing categories
        addMissingCategories(studentsPerIncomeGroup);

        // Convert the map to a list of objects
        List<Map<String, Object>> resultList = studentsPerIncomeGroup.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> obj = new LinkedHashMap<>();
                    obj.put("incomeGroup", entry.getKey());
                    obj.put("count", entry.getValue());
                    return obj;
                })
                .collect(Collectors.toList());

        // Return the response
        return ResponseEntity.ok(resultList);
    }

    @Override
    public ResponseEntity<List<Map<String, Object>>> getStudentsPerCasteForStandard(StandardDTO request) {
        // Fetch all students from the database for the given standard
        List<Student> studentsForStandard = studentDao.findByStandard(request.getStandard());

        // Group students by caste and count the number of students in each caste
        Map<String, Long> studentsPerCaste = studentsForStandard.stream()
                .collect(Collectors.groupingBy(Student::getCaste, Collectors.counting()));

        // Convert the map to a list of objects
        List<Map<String, Object>> resultList = studentsPerCaste.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> obj = new LinkedHashMap<>();
                    obj.put("caste", entry.getKey());
                    obj.put("count", entry.getValue());
                    return obj;
                })
                .collect(Collectors.toList());

        // Return the response
        return ResponseEntity.ok(resultList);
    }


}
