package com.schoolmate.dto;

public class ViewAttendanceDTO {
    private String academicYear;
    private String month;
    private String standard;

    public ViewAttendanceDTO(){}

    public ViewAttendanceDTO(String academicYear, String month, String standard) {
        this.academicYear = academicYear;
        this.month = month;
        this.standard = standard;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }
}
