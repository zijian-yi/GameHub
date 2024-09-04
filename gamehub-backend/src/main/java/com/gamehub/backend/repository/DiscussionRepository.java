package com.gamehub.backend.repository;

import com.gamehub.backend.model.Discussion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DiscussionRepository extends MongoRepository<Discussion, String> {

    List<Discussion> findByGameId(String gameId);

    List<Discussion> findByParentId(String parentId);
}
