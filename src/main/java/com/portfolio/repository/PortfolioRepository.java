package com.portfolio.repository;

import com.portfolio.model.PortfolioSection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioRepository extends MongoRepository<PortfolioSection, String> {
    // 필요한 경우 사용자 정의 메서드 추가
}
