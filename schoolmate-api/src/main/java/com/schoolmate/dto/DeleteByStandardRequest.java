package com.schoolmate.dto;

public class DeleteByStandardRequest {
    private String standard;

    public DeleteByStandardRequest() {
    }

    public DeleteByStandardRequest(String standard) {
        this.standard = standard;
    }

    public String getstandard() {
        return standard;
    }

    public void setstandard(String standard) {
        this.standard = standard;
    }

}