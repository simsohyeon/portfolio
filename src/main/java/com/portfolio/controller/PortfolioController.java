package com.portfolio.controller;

import com.portfolio.model.PortfolioSection;
import com.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 허용
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/latest")
    public ResponseEntity<List<PortfolioSection>> getAllSections() {
        return ResponseEntity.ok(portfolioService.getAllSections());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioSection> getSectionById(@PathVariable String id) {
        PortfolioSection section = portfolioService.getSectionById(id);
        return section != null ? ResponseEntity.ok(section) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<PortfolioSection> createSection(@RequestBody PortfolioSection section) {
        return ResponseEntity.ok(portfolioService.saveSection(section));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable String id) {
        portfolioService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }
}
