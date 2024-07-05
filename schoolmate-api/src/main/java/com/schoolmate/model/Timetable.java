package com.schoolmate.model;

import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "timetables")
public class Timetable {
    private ObjectId id;

    @Field(value = "standard")
    private String standard;

    @Field(value = "timetable")
    private Map<String, Map<String, TimetableEntry>> timetable;

    @Field(value = "saturdayTimetable")
    private Map<String, Map<String, TimetableEntry>> saturdayTimetable;

    public Timetable() {
    }

    public Timetable(ObjectId id, String standard, Map<String, Map<String, TimetableEntry>> timetable,
                     Map<String, Map<String, TimetableEntry>> saturdayTimetable) {
        this.id = id;
        this.standard = standard;
        this.timetable = timetable;
        this.saturdayTimetable = saturdayTimetable;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "Timetable [id=" + id + ", standard=" + standard + ", timetable=" + timetable + ", saturdayTimetable="
                + saturdayTimetable + "]";
    }

}