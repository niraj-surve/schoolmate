package com.schoolmate.dto;

import java.util.Map;

public class PercentageResponse {
    private Map<String, Float> monthlyPercentages;
    private Map<String, Float> totalPercentages;

    public PercentageResponse(){}

    public PercentageResponse(Map<String, Float> monthlyPercentages, Map<String, Float> totalPercentages) {
        this.monthlyPercentages = monthlyPercentages;
        this.totalPercentages = totalPercentages;
    }

    public Map<String, Float> getMonthlyPercentages() {
        return monthlyPercentages;
    }

    public void setMonthlyPercentages(Map<String, Float> monthlyPercentages) {
        this.monthlyPercentages = monthlyPercentages;
    }

    public Map<String, Float> getTotalPercentages() {
        return totalPercentages;
    }

    public void setTotalPercentages(Map<String, Float> totalPercentages) {
        this.totalPercentages = totalPercentages;
    }
}
