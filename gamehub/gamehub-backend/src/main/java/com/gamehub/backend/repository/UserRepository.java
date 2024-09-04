package com.gamehub.backend.repository;

import com.gamehub.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);

    User findByEmail(String email);
    // TODO: Add custom queries here
}

