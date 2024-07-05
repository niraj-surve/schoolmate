package com.schoolmate.dto;

import java.util.List;
import java.util.Map;

public class ViewAttendanceResponse {
    private List<ViewAttendanceData> data;

    public ViewAttendanceResponse() {
    }

    public ViewAttendanceResponse(List<ViewAttendanceData> data) {
        this.data = data;
    }

    public List<ViewAttendanceData> getData() {
        return data;
    }

    public void setData(List<ViewAttendanceData> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ViewAttendanceResponse{" +
                "data=" + data +
                '}';
    }
}
