package com.schoolmate.dto;

import java.util.Map;

public class StudentCountResponse {
    private Map<String, Long> countsByStandard;

    public StudentCountResponse(Map<String, Long> countsByStandard) {
        this.countsByStandard = countsByStandard;
    }

    public Map<String, Long> getCountsByStandard() {
        return countsByStandard;
    }

    public void setCountsByStandard(Map<String, Long> countsByStandard) {
        this.countsByStandard = countsByStandard;
    }
}
