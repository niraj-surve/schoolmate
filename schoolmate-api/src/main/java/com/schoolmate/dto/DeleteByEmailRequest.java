package com.schoolmate.dto;

public class DeleteByEmailRequest {
    private String email;

    public DeleteByEmailRequest() {
    }

    public DeleteByEmailRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}