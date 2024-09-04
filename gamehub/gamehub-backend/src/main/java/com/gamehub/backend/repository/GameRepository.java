package com.gamehub.backend.repository;


import com.gamehub.backend.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GameRepository extends MongoRepository<Game, String> {
    List<Game> findByName(String name);

    List<Game> findByNameContainingIgnoreCase(String query);
    // TODO: Add custom queries here
}
