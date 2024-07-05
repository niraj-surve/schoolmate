package com.schoolmate.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "notices")
public class Notice {
    @Id
    private String id;

    @Field(value = "to")
    private String to;

    @Field(value = "subject")
    private String subject;

    @Field(value = "message")
    private String message;

    @Field(value = "time")
    private Date time;

    public Notice() {
    }

    public Notice(String id, String to, String subject, String message, Date time) {
        this.id = id;
        this.to = to;
        this.subject = subject;
        this.message = message;
        this.time = time;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

}