package com.schoolmate.dto;

import java.util.Date;

import com.schoolmate.model.Role;

public class RegisterRequest {
    private String fname;
    private String lname;
    private Date dob;
    private String phone;
    private String email;
    private String password;
    private String position;
    private Role role;
    private String standard;
    private String facility;

    public RegisterRequest() {
    }

    public RegisterRequest(String fname, String lname, Date dob, String phone, String email, String password, String position, Role role, String standard, String facility) {
        this.fname = fname;
        this.lname = lname;
        this.dob = dob;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.position = position;
        this.role = role;
        this.standard = standard;
        this.facility = facility;
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

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public String getFacility() {
        return facility;
    }

    public void setFacility(String facility) {
        this.facility = facility;
    }
}