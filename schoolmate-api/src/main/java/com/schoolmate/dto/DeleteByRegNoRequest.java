package com.schoolmate.dto;

public class DeleteByRegNoRequest {
    private String regNo;

    public DeleteByRegNoRequest() {
    }

    public DeleteByRegNoRequest(String regNo) {
        this.regNo = regNo;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

}