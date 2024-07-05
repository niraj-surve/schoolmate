package com.schoolmate.dto;

public class UniformRequestDTO {
    private String year;
    private String standard;

    // Constructors, getters, and setters

    public UniformRequestDTO() {
    }

    public UniformRequestDTO(String year, String standard) {
        this.year = year;
        this.standard = standard;
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
}
