package com.portfolio.repository;

import com.portfolio.model.PortfolioSection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortfolioRepository extends MongoRepository<PortfolioSection, String> {
    // 추가적인 쿼리가 필요하다면 메서드 정의 가능
}
