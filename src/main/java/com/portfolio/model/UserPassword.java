package com.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user") // MongoDB 컬렉션 이름
public class UserPassword {

    @Id
    private String id; // MongoDB 기본 ID
    private String password; // 비밀번호

    // 기본 생성자 (필수)
    public UserPassword() {}

    // 모든 필드 초기화 생성자
    public UserPassword(String id, String password) {
        this.id = id;
        this.password = password;
    }

    // Getter와 Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
