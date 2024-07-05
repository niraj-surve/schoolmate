package com.schoolmate.dto;

public class AssignFacilityRequest {
    private String email;
    private String facility;

    public AssignFacilityRequest(String email, String facility) {
        this.email = email;
        this.facility = facility;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFacility() {
        return facility;
    }

    public void setFacility(String facility) {
        this.facility = facility;
    }
}
