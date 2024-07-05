package com.schoolmate.model;

import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Attendance {
    @Field(value = "academicYear")
    private String academicYear;

    @Field(value = "standard")
    private String standard;

    @Field(value = "month")
    private String month;

    @Field(value = "dates")
    private Map<String, Boolean> dates = new HashMap<>();

    public Attendance(){}

    public Attendance(String academicYear, String standard, String month, Map<String, Boolean> dates) {
        this.academicYear = academicYear;
        this.standard = standard;
        this.month = month;
        this.dates = dates;
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

    public Map<String, Boolean> getDates() {
        return dates;
    }

    public void setDates(Map<String, Boolean> dates) {
        this.dates = dates;
    }
}
