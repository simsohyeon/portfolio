package com.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "portfolio_sections") // MongoDB 컬렉션 이름
public class PortfolioSection {

    @Id
    private String id;
    private String type; // 섹션 타입 (about, skills, projects, contact)
    private Object content; // 섹션 데이터

    public PortfolioSection() {}

    public PortfolioSection(String id, String type, Object content) {
        this.id = id;
        this.type = type;
        this.content = content;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }
}
