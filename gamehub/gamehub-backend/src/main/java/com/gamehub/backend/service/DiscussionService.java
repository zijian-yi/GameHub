package com.gamehub.backend.service;

import com.gamehub.backend.model.Discussion;
import com.gamehub.backend.repository.DiscussionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscussionService {

    private final DiscussionRepository discussionRepository;

    @Autowired
    public DiscussionService(DiscussionRepository discussionRepository) {
        this.discussionRepository = discussionRepository;
    }

    public Discussion addDiscussion(Discussion discussion) {
        return discussionRepository.save(discussion);
    }

    public Discussion getDiscussionById(String id) {
        return discussionRepository.findById(id).orElse(null);
    }

    public void deleteDiscussion(String id) {
        discussionRepository.deleteById(id);
    }

    public List<Discussion> getDiscussionsByGameId(String gameId) {
        return discussionRepository.findByGameId(gameId);
    }

    public List<Discussion> getAllDiscussions() {
        return discussionRepository.findAll();
    }

    public List<Discussion> getRepliesByParentId(String parentId) {
        return discussionRepository.findByParentId(parentId);
    }
}
