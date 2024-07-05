package com.schoolmate.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "uniforms")

public class Uniform {
    private ObjectId id;

    @Field(value = "year")
    private String year;

    @Field(value = "standard")
    private String standard;

    @Field(value = "noOfGirls")
    private int noOfGirls;
    @Field(value = "noOfBoys")
    private int noOfBoys;
    @Field(value = "noOfTotalStudents")
    private int noOfTotalStudents;
    @Field(value = "uniformsReceivedByGirls")
    private int uniformsReceivedByGirls;
    @Field(value = "uniformsReceivedByBoys")
    private int uniformsReceivedByBoys;
    @Field(value = "uniformToBeReceivedByGirls")
    private int uniformToBeReceivedByGirls;
    @Field(value = "uniformToBeReceivedByBoys")
    private int uniformToBeReceivedByBoys;
    @Field(value = "totalUniformToBeReceived")
    private int totalUniformToBeReceived;

    public Uniform(){ }

    public Uniform(ObjectId id, String year, String standard, int noOfGirls, int noOfBoys, int noOfTotalStudents, int uniformsReceivedByGirls, int uniformsReceivedByBoys, int uniformToBeReceivedByGirls, int uniformToBeReceivedByBoys, int totalUniformToBeReceived) {
        this.id = id;
        this.year = year;
        this.standard = standard;
        this.noOfGirls = noOfGirls;
        this.noOfBoys = noOfBoys;
        this.noOfTotalStudents = noOfTotalStudents;
        this.uniformsReceivedByGirls = uniformsReceivedByGirls;
        this.uniformsReceivedByBoys = uniformsReceivedByBoys;
        this.uniformToBeReceivedByGirls = uniformToBeReceivedByGirls;
        this.uniformToBeReceivedByBoys = uniformToBeReceivedByBoys;
        this.totalUniformToBeReceived = totalUniformToBeReceived;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "Uniform{" +
                "id=" + id +
                ", year='" + year + '\'' +
                ", standard='" + standard + '\'' +
                ", noOfGirls=" + noOfGirls +
                ", noOfBoys=" + noOfBoys +
                ", noOfTotalStudents=" + noOfTotalStudents +
                ", uniformsReceivedByGirls=" + uniformsReceivedByGirls +
                ", uniformsReceivedByBoys=" + uniformsReceivedByBoys +
                ", uniformToBeReceivedByGirls=" + uniformToBeReceivedByGirls +
                ", uniformToBeReceivedByBoys=" + uniformToBeReceivedByBoys +
                ", totalUniformToBeReceived=" + totalUniformToBeReceived +
                '}';
    }
}
