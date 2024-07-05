package com.schoolmate.dto;

import org.springframework.data.mongodb.core.mapping.Field;

public class StudentDTO {
    private String regNo;
    private String rollNo;
    private String name;
    private String fathersName;
    private String mothersName;
    private String dob;
    private String gender;
    private String standard;
    private String pContactNo;
    private String address;
    private String admissionDate;
    private int noInSiblings;
    private int income;
    private String aadharNo;
    private String religion;
    private String caste;

    public StudentDTO(){}

    public StudentDTO(String regNo, String rollNo, String name, String fathersName, String mothersName, String dob, String gender, String standard, String pContactNo, String address, String admissionDate, int noInSiblings, int income, String aadharNo, String religion, String caste) {
        this.regNo = regNo;
        this.rollNo = rollNo;
        this.name = name;
        this.fathersName = fathersName;
        this.mothersName = mothersName;
        this.dob = dob;
        this.gender = gender;
        this.standard = standard;
        this.pContactNo = pContactNo;
        this.address = address;
        this.admissionDate = admissionDate;
        this.noInSiblings = noInSiblings;
        this.income = income;
        this.aadharNo = aadharNo;
        this.religion = religion;
        this.caste = caste;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFathersName() {
        return fathersName;
    }

    public void setFathersName(String fathersName) {
        this.fathersName = fathersName;
    }

    public String getMothersName() {
        return mothersName;
    }

    public void setMothersName(String mothersName) {
        this.mothersName = mothersName;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public String getpContactNo() {
        return pContactNo;
    }

    public void setpContactNo(String pContactNo) {
        this.pContactNo = pContactNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(String admissionDate) {
        this.admissionDate = admissionDate;
    }

    public int getNoInSiblings() {
        return noInSiblings;
    }

    public void setNoInSiblings(int noInSiblings) {
        this.noInSiblings = noInSiblings;
    }

    public int getIncome() {
        return income;
    }

    public void setIncome(int income) {
        this.income = income;
    }

    public String getAadharNo() {
        return aadharNo;
    }

    public void setAadharNo(String aadharNo) {
        this.aadharNo = aadharNo;
    }

    public String getReligion() {
        return religion;
    }

    public void setReligion(String religion) {
        this.religion = religion;
    }

    public String getCaste() {
        return caste;
    }

    public void setCaste(String caste) {
        this.caste = caste;
    }
}
