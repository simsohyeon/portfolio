package com.portfolio.controller;

import com.portfolio.model.PortfolioSection;
import com.portfolio.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/sections")
@CrossOrigin(origins = "http://localhost:3000") // React의 로컬 도메인 허용
public class PortfolioController {

    @GetMapping("/api/portfolio")
    public Map<String, Object> getPortfolioData() {
        Map<String, Object> data = new HashMap<>();
        data.put("about", "I am a passionate developer with experience in building web applications.");
        data.put("skills", List.of("Java", "Spring Boot", "React", "MongoDB"));
        data.put("projects", List.of(
                Map.of("title", "Project A", "description", "Description of project A"),
                Map.of("title", "Project B", "description", "Description of project B")
        ));
        data.put("contact", "Email: example@example.com, Phone: 123-456-7890");
        return data;
    }
}
