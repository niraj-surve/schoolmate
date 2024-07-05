package com.schoolmate.model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "staff")
public class Staff {
    private ObjectId id;

    @Field(value = "fname")
    private String fname;

    @Field(value = "mname")
    private String mname;

    @Field(value = "lname")
    private String lname;

    @Field(value = "dob")
    private Date dob;

    @Field(value = "gender")
    private String gender;

    @Field(value = "email")
    private String email;

    @Field(value = "phone")
    private String phone;

    @Field(value = "address")
    private String address;

    @Field(value = "position")
    private String position;

    @Field(value = "jobStartDate")
    private Date jobStartDate;

    @Field(value = "retirementDate")
    private String retirementDate;

    @Field(value = "schoolJoinedDate")
    private String schoolJoinedDate;

    @Field(value = "educationalQualification")
    private String educationalQualification;

    @Field(value = "professionalQualification")
    private String professionalQualification;

    @Field(value = "transferred")
    private Boolean transferred;

    public Staff() {
    }

    public Staff(ObjectId id, String fname, String mname, String lname, Date dob, String gender, String email, String phone, String address, String position, Date jobStartDate, String retirementDate, String schoolJoinedDate, String educationalQualification, String professionalQualification, Boolean transferred) {
        this.id = id;
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

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
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