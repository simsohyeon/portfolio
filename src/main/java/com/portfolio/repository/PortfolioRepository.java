package com.portfolio.repository;

import com.portfolio.model.PortfolioSection;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PortfolioRepository extends MongoRepository<PortfolioSection, String> {
    Optional<PortfolioSection> findByType(String type);
}
