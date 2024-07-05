package com.schoolmate.dao;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.schoolmate.model.Staff;

@Repository
public interface StaffDao extends MongoRepository<Staff, ObjectId> {
    Optional<Staff> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Staff> findByTransferredFalse();

    List<Staff> findByTransferredTrue();

    boolean existsByPosition(String position);

    long countByTransferredFalse();

    long countByTransferredTrue();

    Long countByPosition(String assistantTeacher);
}