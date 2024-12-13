package com.portfolio.controller;

import com.portfolio.model.PortfolioSection;
import com.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/portfolios")
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 허용
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<PortfolioSection> getSectionByType(@PathVariable String type) {
        PortfolioSection section = portfolioService.getSectionByType(type);
        return section != null ? ResponseEntity.ok(section) : ResponseEntity.notFound().build();
    }
}
