package com.portfolio.service;

import com.portfolio.model.PortfolioSection;
import com.portfolio.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository repository;

    // 모든 섹션 조회
    public List<PortfolioSection> getAllSections() {
        return repository.findAll();
    }

    // 특정 섹션 조회
    public Optional<PortfolioSection> getSectionById(String id) {
        return repository.findById(id);
    }

    // 섹션 추가
    public PortfolioSection addSection(PortfolioSection section) {
        return repository.save(section);
    }

    // 섹션 수정
    public boolean updateSection(String id, PortfolioSection updatedSection) {
        Optional<PortfolioSection> optionalSection = repository.findById(id);
        if (optionalSection.isPresent()) {
            PortfolioSection existingSection = optionalSection.get();
            // 비밀번호 확인
            if (existingSection.getPassword().equals(updatedSection.getPassword())) {
                existingSection.setTitle(updatedSection.getTitle());
                existingSection.setContent(updatedSection.getContent());
                repository.save(existingSection);
                return true;
            }
        }
        return false;
    }

    // 섹션 삭제
    public boolean deleteSection(String id, String password) {
        Optional<PortfolioSection> optionalSection = repository.findById(id);
        if (optionalSection.isPresent()) {
            PortfolioSection existingSection = optionalSection.get();
            // 비밀번호 확인
            if (existingSection.getPassword().equals(password)) {
                repository.delete(existingSection);
                return true;
            }
        }
        return false;
    }
}
