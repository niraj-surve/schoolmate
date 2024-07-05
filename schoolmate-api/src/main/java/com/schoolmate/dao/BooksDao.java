package com.schoolmate.dao;

import com.schoolmate.model.Books;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BooksDao extends MongoRepository<Books, ObjectId> {
    Books findByYear(String year);
}
