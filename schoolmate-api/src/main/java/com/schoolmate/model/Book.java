package com.schoolmate.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

public class Book {
    @Field(value = "subject")
    private String subject;

    @Field(value = "noBooksFirst")
    private int noBooksFirst;

    @Field(value = "noBooksSecond")
    private int noBooksSecond;

    @Field(value = "noBooksThird")
    private int noBooksThird;

    @Field(value = "noBooksFourth")
    private int noBooksFourth;

    @Field(value = "noBooksFifth")
    private int noBooksFifth;

    @Field(value = "noBooksSixth")
    private int noBooksSixth;

    @Field(value = "noBooksSeventh")
    private int noBooksSeventh;

    public Book() {
    }

    public Book(String subject, int noBooksFirst, int noBooksSecond, int noBooksThird, int noBooksFourth, int noBooksFifth, int noBooksSixth, int noBooksSeventh) {
        this.subject = subject;
        this.noBooksFirst = noBooksFirst;
        this.noBooksSecond = noBooksSecond;
        this.noBooksThird = noBooksThird;
        this.noBooksFourth = noBooksFourth;
        this.noBooksFifth = noBooksFifth;
        this.noBooksSixth = noBooksSixth;
        this.noBooksSeventh = noBooksSeventh;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getNoBooksFirst() {
        return noBooksFirst;
    }

    public void setNoBooksFirst(int noBooksFirst) {
        this.noBooksFirst = noBooksFirst;
    }

    public int getNoBooksSecond() {
        return noBooksSecond;
    }

    public void setNoBooksSecond(int noBooksSecond) {
        this.noBooksSecond = noBooksSecond;
    }

    public int getNoBooksThird() {
        return noBooksThird;
    }

    public void setNoBooksThird(int noBooksThird) {
        this.noBooksThird = noBooksThird;
    }

    public int getNoBooksFourth() {
        return noBooksFourth;
    }

    public void setNoBooksFourth(int noBooksFourth) {
        this.noBooksFourth = noBooksFourth;
    }

    public int getNoBooksFifth() {
        return noBooksFifth;
    }

    public void setNoBooksFifth(int noBooksFifth) {
        this.noBooksFifth = noBooksFifth;
    }

    public int getNoBooksSixth() {
        return noBooksSixth;
    }

    public void setNoBooksSixth(int noBooksSixth) {
        this.noBooksSixth = noBooksSixth;
    }

    public int getNoBooksSeventh() {
        return noBooksSeventh;
    }

    public void setNoBooksSeventh(int noBooksSeventh) {
        this.noBooksSeventh = noBooksSeventh;
    }
}