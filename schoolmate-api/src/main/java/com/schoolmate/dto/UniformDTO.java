package com.schoolmate.dto;

public class UniformDTO {
    private String year;
    private String standard;
    private int noOfGirls;
    private int noOfBoys;
    private int noOfTotalStudents;
    private int uniformsReceivedByGirls;
    private int uniformsReceivedByBoys;
    private int totalUniformReceived;
    private int uniformToBeReceivedByGirls;
    private int uniformToBeReceivedByBoys;
    private int totalUniformToBeReceived;

    // Constructors, getters, and setters

    public UniformDTO() {
    }

    public UniformDTO(String year, String standard, int noOfGirls, int noOfBoys, int noOfTotalStudents,
                      int uniformsReceivedByGirls, int uniformsReceivedByBoys, int totalUniformReceived,
                      int uniformToBeReceivedByGirls, int uniformToBeReceivedByBoys, int totalUniformToBeReceived) {
        this.year = year;
        this.standard = standard;
        this.noOfGirls = noOfGirls;
        this.noOfBoys = noOfBoys;
        this.noOfTotalStudents = noOfTotalStudents;
        this.uniformsReceivedByGirls = uniformsReceivedByGirls;
        this.uniformsReceivedByBoys = uniformsReceivedByBoys;
        this.totalUniformReceived = totalUniformReceived;
        this.uniformToBeReceivedByGirls = uniformToBeReceivedByGirls;
        this.uniformToBeReceivedByBoys = uniformToBeReceivedByBoys;
        this.totalUniformToBeReceived = totalUniformToBeReceived;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public int getNoOfGirls() {
        return noOfGirls;
    }

    public void setNoOfGirls(int noOfGirls) {
        this.noOfGirls = noOfGirls;
    }

    public int getNoOfBoys() {
        return noOfBoys;
    }

    public void setNoOfBoys(int noOfBoys) {
        this.noOfBoys = noOfBoys;
    }

    public int getNoOfTotalStudents() {
        return noOfTotalStudents;
    }

    public void setNoOfTotalStudents(int noOfTotalStudents) {
        this.noOfTotalStudents = noOfTotalStudents;
    }

    public int getUniformsReceivedByGirls() {
        return uniformsReceivedByGirls;
    }

    public void setUniformsReceivedByGirls(int uniformsReceivedByGirls) {
        this.uniformsReceivedByGirls = uniformsReceivedByGirls;
    }

    public int getUniformsReceivedByBoys() {
        return uniformsReceivedByBoys;
    }

    public void setUniformsReceivedByBoys(int uniformsReceivedByBoys) {
        this.uniformsReceivedByBoys = uniformsReceivedByBoys;
    }

    public int getTotalUniformReceived() {
        return totalUniformReceived;
    }

    public void setTotalUniformReceived(int totalUniformReceived) {
        this.totalUniformReceived = totalUniformReceived;
    }

    public int getUniformToBeReceivedByGirls() {
        return uniformToBeReceivedByGirls;
    }

    public void setUniformToBeReceivedByGirls(int uniformToBeReceivedByGirls) {
        this.uniformToBeReceivedByGirls = uniformToBeReceivedByGirls;
    }

    public int getUniformToBeReceivedByBoys() {
        return uniformToBeReceivedByBoys;
    }

    public void setUniformToBeReceivedByBoys(int uniformToBeReceivedByBoys) {
        this.uniformToBeReceivedByBoys = uniformToBeReceivedByBoys;
    }

    public int getTotalUniformToBeReceived() {
        return totalUniformToBeReceived;
    }

    public void setTotalUniformToBeReceived(int totalUniformToBeReceived) {
        this.totalUniformToBeReceived = totalUniformToBeReceived;
    }
}
