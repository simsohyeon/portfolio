package com.portfolio.service;

import com.portfolio.model.PortfolioSection;
import com.portfolio.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    // 특정 타입의 섹션 가져오기
    public PortfolioSection getSectionByType(String type) {
        return portfolioRepository.findByType(type).orElse(null);
    }

    // 모든 섹션 가져오기
    public List<PortfolioSection> getAllSections() {
        return portfolioRepository.findAll();
    }

    // 새로운 섹션 추가
    public void addSection(PortfolioSection section) {
        portfolioRepository.save(section);
    }

    // 섹션 업데이트
    public boolean updateSection(String type, PortfolioSection newSection) {
        Optional<PortfolioSection> existingSection = portfolioRepository.findByType(type);
        if (existingSection.isPresent()) {
            PortfolioSection section = existingSection.get();
            section.setContent(newSection.getContent());
            portfolioRepository.save(section);
            return true;
        }
        return false;
    }

    // 섹션 삭제
    public boolean deleteSection(String type) {
        Optional<PortfolioSection> existingSection = portfolioRepository.findByType(type);
        if (existingSection.isPresent()) {
            portfolioRepository.delete(existingSection.get());
            return true;
        }
        return false;
    }
}
