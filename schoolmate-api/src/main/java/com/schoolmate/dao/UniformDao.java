package com.schoolmate.dao;

import com.schoolmate.model.Uniform;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniformDao extends MongoRepository<Uniform, ObjectId> {
    Uniform findByYearAndStandard(String year, String standard);
}
