package com.portfolio.controller;

import com.portfolio.model.PortfolioSection;
import com.portfolio.service.PortfolioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 허용
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    // 특정 타입의 섹션 가져오기
    @GetMapping("/type/{type}")
    public ResponseEntity<PortfolioSection> getSectionByType(@PathVariable String type) {
        PortfolioSection section = portfolioService.getSectionByType(type);
        return section != null ? ResponseEntity.ok(section) : ResponseEntity.notFound().build();
    }

    // 모든 섹션 가져오기
    @GetMapping
    public ResponseEntity<List<PortfolioSection>> getAllSections() {
        List<PortfolioSection> sections = portfolioService.getAllSections();
        return ResponseEntity.ok(sections);
    }

    // 새로운 섹션 추가
    @PostMapping("/type/{type}")
    public ResponseEntity<Void> addSection(@PathVariable String type, @RequestBody PortfolioSection section) {
        section.setType(type);
        portfolioService.addSection(section);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 섹션 업데이트
    @PutMapping("/type/{type}")
    public ResponseEntity<Void> updateSection(@PathVariable String type, @RequestBody PortfolioSection section) {
        boolean isUpdated = portfolioService.updateSection(type, section);
        return isUpdated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    // 섹션 삭제
    @DeleteMapping("/type/{type}")
    public ResponseEntity<Void> deleteSection(@PathVariable String type) {
        boolean isDeleted = portfolioService.deleteSection(type);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
