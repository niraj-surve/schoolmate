package com.schoolmate.dto;

public class AssignClassRequest {
    private String email;

    private String standard;

    public AssignClassRequest(String email, String standard) {
        this.email = email;
        this.standard = standard;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }
}
