package com.schoolmate.dao;

import com.schoolmate.model.Student;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentDao extends MongoRepository<Student, ObjectId> {
    Optional<Student> findByRegNo(String regNo);

    boolean existsByRegNo(String regNo);

    @Query(value = "{}", fields = "{ 'standard': 1 }")
    List<String> getAllStandards();

    List<Student> findByStandard(String standard);

    long countByStandard(String standard);

    long countByGender(String gender);
}