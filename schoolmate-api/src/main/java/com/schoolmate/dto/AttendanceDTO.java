package com.schoolmate.dto;

import com.schoolmate.model.Attendance;

public class AttendanceDTO {
    private String regNo;

    private String academicYear;

    private String standard;

    private String month;

    private String date;

    private Boolean present;

    public AttendanceDTO(){}

    public AttendanceDTO(String regNo, String academicYear, String standard, String month, String date, Boolean present) {
        this.regNo = regNo;
        this.academicYear = academicYear;
        this.standard = standard;
        this.month = month;
        this.date = date;
        this.present = present;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Boolean getPresent() {
        return present;
    }

    public void setPresent(Boolean present) {
        this.present = present;
    }

    @Override
    public String toString() {
        return "AttendanceDTO{" +
                "regNo='" + regNo + '\'' +
                ", academicYear='" + academicYear + '\'' +
                ", standard='" + standard + '\'' +
                ", month='" + month + '\'' +
                ", date='" + date + '\'' +
                ", present=" + present +
                '}';
    }
}
