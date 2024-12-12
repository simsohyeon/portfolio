package com.portfolio.service;

import com.portfolio.model.PortfolioSection;
import com.portfolio.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public List<PortfolioSection> getAllSections() {
        return portfolioRepository.findAll();
    }

    public PortfolioSection getSectionById(String id) {
        return portfolioRepository.findById(id).orElse(null);
    }

    public PortfolioSection saveSection(PortfolioSection section) {
        return portfolioRepository.save(section);
    }

    public void deleteSection(String id) {
        portfolioRepository.deleteById(id);
    }
}
