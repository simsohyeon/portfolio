package com.portfolio.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "http://localhost:3000") // React 앱의 주소를 추가
public class PortfolioController {

    @GetMapping("/latest")
    public Map<String, Object> getPortfolioData() {
        Map<String, Object> data = new HashMap<>();
        data.put("about", "I am a passionate developer with experience in building web applications.");
        data.put("skills", List.of("Java", "Spring Boot", "React", "MongoDB"));
        data.put("projects", List.of(
                Map.of("title", "Project A", "description", "Description of project A"),
                Map.of("title", "Project B", "description", "Description of project B")
        ));
        data.put("contact", List.of("Email: example@example.com", "Phone: 123-456-7890"));
        return data;
    }
}
