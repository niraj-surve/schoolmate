package com.schoolmate.dto;

public class CountResponse {
    private Long count;

    public CountResponse() {
    }

    public CountResponse(Long count) {
        this.count = count;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

}