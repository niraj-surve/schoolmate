package com.schoolmate.service.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.schoolmate.dao.NoticeDao;
import com.schoolmate.dto.DeleteNoticeRequest;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.dto.NoticeDTO;
import com.schoolmate.model.Notice;
import com.schoolmate.service.NoticeService;

@Service
public class NoticeServiceImpl implements NoticeService {
    private final NoticeDao noticeDao;

    public NoticeServiceImpl(NoticeDao noticeDao) {
        this.noticeDao = noticeDao;
    }

    @Override
    public ResponseEntity<MessageResponse> addNotice(NoticeDTO request) {
        if (noticeDao.existsBySubject(request.getSubject())) {
            MessageResponse response = new MessageResponse();
            response.setNoticeExistsError(true);
            return ResponseEntity.ok(response);
        }

        Notice notice = new Notice();
        notice.setTo(request.getTo());
        notice.setSubject(request.getSubject());
        notice.setMessage(request.getMessage());
        notice.setTime(request.getTime());

        noticeDao.save(notice);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> updateNotice(Notice request) {
        Notice existingNotice = noticeDao.findById(request.getId()).orElse(null);
        if (existingNotice == null) {
            MessageResponse response = new MessageResponse();
            response.setNoticeNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        existingNotice.setTo(request.getId());
        existingNotice.setSubject(request.getSubject());
        existingNotice.setMessage(request.getMessage());
        existingNotice.setTime(request.getTime());

        noticeDao.save(existingNotice);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<MessageResponse> deleteNotice(DeleteNoticeRequest request) {
        Notice existingNotice = noticeDao.findById(request.getId()).orElse(null);
        if (existingNotice == null) {
            MessageResponse response = new MessageResponse();
            response.setNoticeNotExistsError(true);
            return ResponseEntity.ok(response);
        }

        noticeDao.delete(existingNotice);

        MessageResponse response = new MessageResponse();
        response.setSuccessful(true);
        return ResponseEntity.ok(response);
    }

}