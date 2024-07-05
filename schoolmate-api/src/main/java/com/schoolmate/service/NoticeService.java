package com.schoolmate.service;

import org.springframework.http.ResponseEntity;

import com.schoolmate.dto.DeleteNoticeRequest;
import com.schoolmate.dto.MessageResponse;
import com.schoolmate.dto.NoticeDTO;
import com.schoolmate.model.Notice;

public interface NoticeService {
    ResponseEntity<MessageResponse> addNotice(NoticeDTO request);
    ResponseEntity<MessageResponse> updateNotice(Notice request);
    ResponseEntity<MessageResponse> deleteNotice(DeleteNoticeRequest request);
}