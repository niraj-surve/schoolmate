package com.schoolmate.dao;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.schoolmate.model.Timetable;

@Repository
public interface TimetableDao extends MongoRepository<Timetable, ObjectId> {
    Optional<Timetable> findByStandard(String standard);

    Optional<Timetable> findById(ObjectId id);

    boolean existsByStandard(String standard);
}