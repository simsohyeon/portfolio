package com.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "portfolio_sections") // MongoDB의 컬렉션 이름
public class PortfolioSection {

    @Id
    private String id; // MongoDB의 기본 키는 String 타입

    private String title;
    private String content;

    // 수정 권한을 위한 비밀번호
    private String password;

    // 생성자, 게터, 세터
    public PortfolioSection() {}

    public PortfolioSection(String title, String content, String password) {
        this.title = title;
        this.content = content;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

