package com.portfolio.repository;

import com.portfolio.model.PortfolioSection;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PortfolioRepository extends MongoRepository<PortfolioSection, String> {
    PortfolioSection findByType(String type);
}
