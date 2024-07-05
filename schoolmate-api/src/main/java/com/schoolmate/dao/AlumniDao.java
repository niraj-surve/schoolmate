package com.schoolmate.dao;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.schoolmate.model.Alumni;

@Repository
public interface AlumniDao extends MongoRepository<Alumni, ObjectId> {
    Optional<Alumni> findByRegNo(String regNo);

    boolean existsByRegNo(String regNo);
}