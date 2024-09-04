package com.gamehub.backend.repository;

import com.gamehub.backend.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByGameId(String gameId);
    List<Review> findByUserId(String userId);
    // TODO: Add custom queries here
}
