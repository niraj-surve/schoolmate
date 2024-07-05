package com.schoolmate.dto;

public class ProfileDTO {
    private String fname;
    private String lname;
    private String phone;

    private String token;

    public ProfileDTO() {
        // TODO Auto-generated constructor stub
    }

    public ProfileDTO(String fname, String lname, String phone, String token) {
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.token = token;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}