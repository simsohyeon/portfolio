package com.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "portfolio_sections") // MongoDB 컬렉션 이름
public class PortfolioSection {

    @Id
    private String id; // MongoDB의 기본 ID 필드

    private About about; // "about" 섹션
    private List<String> skills; // "skills" 배열
    private List<Project> projects; // "projects" 배열
    private List<String> contact; // "contact" 배열

    // 기본 생성자 (필수)
    public PortfolioSection() {}

    // 생성자
    public PortfolioSection(About about, List<String> skills, List<Project> projects, List<String> contact) {
        this.about = about;
        this.skills = skills;
        this.projects = projects;
        this.contact = contact;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public About getAbout() {
        return about;
    }

    public void setAbout(About about) {
        this.about = about;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<String> getContact() {
        return contact;
    }

    public void setContact(List<String> contact) {
        this.contact = contact;
    }

    // 내부 클래스: About
    public static class About {
        private String about;

        // 기본 생성자
        public About() {}

        // 생성자
        public About(String about) {
            this.about = about;
        }

        // Getters and Setters
        public String getAbout() {
            return about;
        }

        public void setAbout(String about) {
            this.about = about;
        }
    }

    // 내부 클래스: Project
    public static class Project {
        private String title;
        private String description;

        // 기본 생성자
        public Project() {}

        // 생성자
        public Project(String title, String description) {
            this.title = title;
            this.description = description;
        }

        // Getters and Setters
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }
    }
}
