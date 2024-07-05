package com.schoolmate.model;

public class TimetableEntry {
    private String subject;

    public TimetableEntry() {
    }

    public TimetableEntry(String subject, String teacher) {
        this.subject = subject;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

}