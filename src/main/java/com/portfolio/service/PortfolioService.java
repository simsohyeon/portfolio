package com.portfolio.service;

import com.portfolio.model.PortfolioSection;
import com.portfolio.repository.PortfolioRepository;
import org.springframework.stereotype.Service;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public PortfolioSection getSectionByType(String type) {
        return portfolioRepository.findByType(type);
    }
}
