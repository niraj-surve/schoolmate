package com.schoolmate.dto;

import java.util.Date;

public class StaffDTO {
    private String fname;

    private String mname;

    private String lname;

    private Date dob;

    private String gender;

    private String email;

    private String phone;

    private String address;

    private String position;

    private Date jobStartDate;

    private String retirementDate;

    private String schoolJoinedDate;

    private String educationalQualification;

    private String professionalQualification;

    private Boolean transferred;

    public StaffDTO() {
    }

    public StaffDTO(String fname, String mname, String lname, Date dob, String gender, String email, String phone,
                    String address, String position, Date jobStartDate, String retirementDate, String schoolJoinedDate,
                    String educationalQualification, String professionalQualification, Boolean transferred) {
        this.fname = fname;
        this.mname = mname;
        this.lname = lname;
        this.dob = dob;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.position = position;
        this.jobStartDate = jobStartDate;
        this.retirementDate = retirementDate;
        this.schoolJoinedDate = schoolJoinedDate;
        this.educationalQualification = educationalQualification;
        this.professionalQualification = professionalQualification;
        this.transferred = transferred;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Date getJobStartDate() {
        return jobStartDate;
    }

    public void setJobStartDate(Date jobStartDate) {
        this.jobStartDate = jobStartDate;
    }

    public String getRetirementDate() {
        return retirementDate;
    }

    public void setRetirementDate(String retirementDate) {
        this.retirementDate = retirementDate;
    }

    public String getSchoolJoinedDate() {
        return schoolJoinedDate;
    }

    public void setSchoolJoinedDate(String schoolJoinedDate) {
        this.schoolJoinedDate = schoolJoinedDate;
    }

    public String getEducationalQualification() {
        return educationalQualification;
    }

    public void setEducationalQualification(String educationalQualification) {
        this.educationalQualification = educationalQualification;
    }

    public String getProfessionalQualification() {
        return professionalQualification;
    }

    public void setProfessionalQualification(String professionalQualification) {
        this.professionalQualification = professionalQualification;
    }

    public Boolean getTransferred() {
        return transferred;
    }

    public void setTransferred(Boolean transferred) {
        this.transferred = transferred;
    }
}