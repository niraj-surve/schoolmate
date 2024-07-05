package com.schoolmate.dto;

import com.schoolmate.model.Student;

import java.util.List;

public class AttendancePercentageRequestDTO {
    private List<Student> students;

    private String month;

    private String academicYear;

    public AttendancePercentageRequestDTO(){}

    public AttendancePercentageRequestDTO(List<Student> students, String month, String academicYear) {
        this.students = students;
        this.month = month;
        this.academicYear = academicYear;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }
}
