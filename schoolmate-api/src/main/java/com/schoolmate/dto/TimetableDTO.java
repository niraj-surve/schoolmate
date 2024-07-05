package com.schoolmate.dto;

import java.util.Map;

import com.schoolmate.model.TimetableEntry;

public class TimetableDTO {

    private String standard;

    private Map<String, Map<String, TimetableEntry>> timetable;

    private Map<String, Map<String, TimetableEntry>> saturdayTimetable;

    public TimetableDTO() {
    }

    public TimetableDTO(String standard, Map<String, Map<String, TimetableEntry>> timetable,
                        Map<String, Map<String, TimetableEntry>> saturdayTimetable) {
        this.standard = standard;
        this.timetable = timetable;
        this.saturdayTimetable = saturdayTimetable;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public Map<String, Map<String, TimetableEntry>> getTimetable() {
        return timetable;
    }

    public void setTimetable(Map<String, Map<String, TimetableEntry>> timetable) {
        this.timetable = timetable;
    }

    public Map<String, Map<String, TimetableEntry>> getSaturdayTimetable() {
        return saturdayTimetable;
    }

    public void setSaturdayTimetable(Map<String, Map<String, TimetableEntry>> saturdayTimetable) {
        this.saturdayTimetable = saturdayTimetable;
    }

}