package com.schoolmate.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.schoolmate.dao.NoticeDao;
import com.schoolmate.dao.StaffDao;
import com.schoolmate.model.Notice;
import com.schoolmate.model.Staff;
import com.schoolmate.service.HomeService;

@Service
public class HomeServiceImpl implements HomeService {
    private final NoticeDao noticeDao;
    private final StaffDao staffDao;



    public HomeServiceImpl(NoticeDao noticeDao, StaffDao staffDao) {
        this.noticeDao = noticeDao;
        this.staffDao = staffDao;
    }

    @Override
    public List<Notice> getAllNotices() {
        return noticeDao.findAll();
    }

    @Override
    public List<Staff> getAllStaff() {
        return staffDao.findAll();
    }

}