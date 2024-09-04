package com.gamehub.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gamehub.backend.service.GameService;
import com.gamehub.backend.model.Game;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping("/{id}")
    public Optional<Game> getGameById(@PathVariable String id) {
        return gameService.getGameById(id);
    }

    @GetMapping("/search")
    public List<Game> getGameByName(@RequestParam String name) {
        // System.out.println(name);
        return gameService.getGameBySearch(name);
    }

    @PostMapping
    public Game addGame(@RequestBody Game game) {
        return gameService.addGame(game);
    }

//    @PutMapping{"/{id}"}
//    public ResponseEntity<Game> updateGame(@PathVariable String id, @RequestBody Game game) {
//        return gameService.getGameById(id)
//                .map(existingGame -> {
//                    Game updatedGame = gameService.updateGame(game);
//                    return ResponseEntity.ok(updatedGame);
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
}
