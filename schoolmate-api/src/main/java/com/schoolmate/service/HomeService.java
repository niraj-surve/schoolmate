package com.schoolmate.service;

import java.util.List;

import com.schoolmate.model.Notice;
import com.schoolmate.model.Staff;

public interface HomeService {
    List<Notice> getAllNotices();

    List<Staff> getAllStaff();
}