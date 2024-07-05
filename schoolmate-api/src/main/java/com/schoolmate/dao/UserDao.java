package com.schoolmate.dao;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.schoolmate.model.Role;
import com.schoolmate.model.User;

@Repository
public interface UserDao extends MongoRepository<User, ObjectId> {
    Optional<User> findByEmail(String email);

    User findByRole(Role role);

    boolean existsByEmail(String email);

    List<User> findByPositionNot(String position);

    List<User> findByPositionNotIn(List<String> positions);

    boolean existsByPosition(String position);

    Long countByPositionNot(String admin);
}