package com.schoolmate.dto;

public class DeleteNoticeRequest {
    private String id;

    public DeleteNoticeRequest() {}

    public DeleteNoticeRequest(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}