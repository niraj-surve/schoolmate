package com.schoolmate.dto;

import java.util.Map;

public class ViewAttendanceData {
    private String regNo;
    private String rollNo;
    private String name;
    private String academicYear;
    private String month;
    private String standard;
    private Map<String, String> dates;

    private float monthlyAttendance;

    private float totalAttendance;

    public ViewAttendanceData() {
    }

    public ViewAttendanceData(String regNo, String rollNo, String name, String academicYear, String month, String standard, Map<String, String> dates, float monthlyAttendance, float totalAttendance) {
        this.regNo = regNo;
        this.rollNo = rollNo;
        this.name = name;
        this.academicYear = academicYear;
        this.month = month;
        this.standard = standard;
        this.dates = dates;
        this.monthlyAttendance = monthlyAttendance;
        this.totalAttendance = totalAttendance;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Map<String, String> getDates() {
        return dates;
    }

    public void setDates(Map<String, String> dates) {
        this.dates = dates;
    }

    public float getMonthlyAttendance() {
        return monthlyAttendance;
    }

    public void setMonthlyAttendance(float monthlyAttendance) {
        this.monthlyAttendance = monthlyAttendance;
    }

    public float getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalAttendance(float totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    @Override
    public String toString() {
        return "ViewAttendanceData{" +
                "regNo='" + regNo + '\'' +
                ", rollNo='" + rollNo + '\'' +
                ", name='" + name + '\'' +
                ", academicYear='" + academicYear + '\'' +
                ", month='" + month + '\'' +
                ", standard='" + standard + '\'' +
                ", dates=" + dates +
                ", monthlyAttendance=" + monthlyAttendance +
                ", totalAttendance=" + totalAttendance +
                '}';
    }
}
