package com.schoolmate.dto;

public class BookByYearDTO {
    private String year;

    public BookByYearDTO(){}

    public BookByYearDTO(String year) {
        this.year = year;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }
}
