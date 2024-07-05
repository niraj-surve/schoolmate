package com.schoolmate.dto;

import java.util.Date;

public class UpdateUserDTO {
    private String fname;
    private String lname;
    private String phone;
    private Date dob;
    private String position;
    private String email;

    public UpdateUserDTO() {
    }

    public UpdateUserDTO(String fname, String lname, String phone, Date dob, String position, String email) {
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.dob = dob;
        this.position = position;
        this.email = email;
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

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}