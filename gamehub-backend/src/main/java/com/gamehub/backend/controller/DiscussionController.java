package com.gamehub.backend.controller;

import com.gamehub.backend.model.Discussion;
import com.gamehub.backend.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discussions")
@CrossOrigin(origins = "*")
public class DiscussionController {

    private final DiscussionService discussionService;

    @Autowired
    public DiscussionController(DiscussionService discussionService) {
        this.discussionService = discussionService;
    }

    @GetMapping
    public List<Discussion> getAllDiscussions() {
        return discussionService.getAllDiscussions();
    }

    @GetMapping("/game/{gameId}")
    public List<Discussion> getDiscussionsByGameId(@PathVariable String gameId) {
        return discussionService.getDiscussionsByGameId(gameId);
    }

    @GetMapping("/replies/{parentId}")
    public List<Discussion> getRepliesByParentId(@PathVariable String parentId) {
        return discussionService.getRepliesByParentId(parentId);
    }

    @PostMapping("/add")
    public Discussion addDiscussion(@RequestBody Discussion discussion) {
        return discussionService.addDiscussion(discussion);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDiscussion(@PathVariable String id) {
        discussionService.deleteDiscussion(id);
    }
}
