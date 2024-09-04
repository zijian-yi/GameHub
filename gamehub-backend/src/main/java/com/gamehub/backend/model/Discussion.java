package com.gamehub.backend.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "discussions")
public class Discussion {
    @Id
    private String id;

    private String gameId;
    private String userId;
    private String username;
    private String avatar;
    private String content;
    private Date postedDate;
    private String parentId;

    public Discussion() {
        this.postedDate = new Date();
    }

    public Discussion(String gameId, String userId, String username, String avatar, String content, String parentId) {
        this.gameId = gameId;
        this.userId = userId;
        this.username = username;
        this.avatar = avatar;
        this.content = content;
        this.parentId = parentId;
        this.postedDate = new Date();
    }

    public String getId() {
        return id;
    }

    public String getGameId() {
        return gameId;
    }

    public String getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }
    public String getAvatar() { return avatar; }
    public String getContent() { return content; }

    public Date getPostedDate() {
        return postedDate;
    }

    public String getParentId() {
        return parentId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public void setAvatar(String avatar) { this.avatar = avatar; }
    public void setContent(String content) {
        this.content = content;
    }

    public void setPostedDate(Date postedDate) {
        this.postedDate = postedDate;
    }

    public void setParentId(String parentId) { this.parentId = parentId; }
}
