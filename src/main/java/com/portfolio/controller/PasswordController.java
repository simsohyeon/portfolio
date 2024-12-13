package com.portfolio.controller;

import com.portfolio.model.UserPassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 허용
public class PasswordController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/validate-password")
    public ResponseEntity<Void> validatePassword(@RequestBody Map<String, String> request) {
        try {
            // 클라이언트에서 전달된 비밀번호 가져오기
            String inputPassword = request.get("password");
            System.out.println("Received password: " + inputPassword); // 요청 디버깅

            // MongoDB에서 저장된 비밀번호 조회
            UserPassword storedPassword = mongoTemplate.findById("password-id", UserPassword.class, "user");

            if (storedPassword != null) {
                System.out.println("Stored password: " + storedPassword.getPassword()); // 저장된 비밀번호 디버깅
                // 입력된 비밀번호와 저장된 비밀번호 비교
                if (inputPassword.equals(storedPassword.getPassword())) {
                    return ResponseEntity.ok().build(); // 인증 성공
                }
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 인증 실패
        } catch (Exception e) {
            e.printStackTrace(); // 예외 디버깅
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 서버 오류
        }
    }
}
