package com.schoolmate.dao;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.schoolmate.model.Notice;

@Repository
public interface NoticeDao extends MongoRepository<Notice, String> {
    Optional<Notice> findById(String id);

    boolean existsBySubject(String subject);
}