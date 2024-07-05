package com.schoolmate.dto;

import java.util.List;
import java.util.Map;

public class GraduationRatesResponse {
    private List<String> distinctYears;
    private Map<String, Long> graduateStudentsCountByYear;

    public GraduationRatesResponse() {
    }

    public GraduationRatesResponse(List<String> distinctYears, Map<String, Long> graduateStudentsCountByYear) {
        this.distinctYears = distinctYears;
        this.graduateStudentsCountByYear = graduateStudentsCountByYear;
    }

    public List<String> getDistinctYears() {
        return distinctYears;
    }

    public void setDistinctYears(List<String> distinctYears) {
        this.distinctYears = distinctYears;
    }

    public Map<String, Long> getGraduateStudentsCountByYear() {
        return graduateStudentsCountByYear;
    }

    public void setGraduateStudentsCountByYear(Map<String, Long> graduateStudentsCountByYear) {
        this.graduateStudentsCountByYear = graduateStudentsCountByYear;
    }

}