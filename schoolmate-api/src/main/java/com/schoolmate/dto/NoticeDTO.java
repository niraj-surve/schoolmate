package com.schoolmate.dto;

import java.util.Date;

public class NoticeDTO {
    private String to;
    private String subject;
    private String message;
    private Date time;

    public NoticeDTO() {
    }

    public NoticeDTO(String to, String subject, String message, Date time) {
        this.to = to;
        this.subject = subject;
        this.message = message;
        this.time = time;
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

    @Override
    public String toString() {
        return "NoticeDTO [to=" + to + ", subject=" + subject + ", message=" + message + ", time=" + time + "]";
    }

}