package com.schoolmate.dao;

import com.schoolmate.model.MidDayMeal;
import com.schoolmate.model.Role;
import com.schoolmate.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MidDayMealDao extends MongoRepository<MidDayMeal, ObjectId> {
    MidDayMeal findByYearAndMonth(String year, String month);
}