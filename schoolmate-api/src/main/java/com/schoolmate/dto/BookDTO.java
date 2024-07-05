package com.schoolmate.dto;

public class BookDTO {
    private String subject;
    private int noBooksFirst;
    private int noBooksSecond;
    private int noBooksThird;
    private int noBooksFourth;
    private int noBooksFifth;
    private int noBooksSixth;
    private int noBooksSeventh;

    // Constructors, getters, and setters

    public BookDTO() {
    }

    public BookDTO(String subject, int noBooksFirst, int noBooksSecond, int noBooksThird, int noBooksFourth, int noBooksFifth, int noBooksSixth, int noBooksSeventh) {
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
