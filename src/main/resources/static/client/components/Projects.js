import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";
import { Box, Grid, Typography, Divider, useMediaQuery } from "@mui/material";

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [error, setError] = useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchPortfolioByType("projects");
        if (data && Array.isArray(data.content)) {
          setProjectsData(data.content);
        } else {
          setProjectsData([]);
        }
      } catch (err) {
        console.error("Failed to fetch projects data:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    };

    loadProjects();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!projectsData.length) return <Typography>프로젝트 데이터가 없습니다.</Typography>;

  return (
    <Box sx={{ margin: "20px auto", maxWidth: "800px", padding: isMobile ? "10px" : "20px" }}>
      {/* 타이틀과 총 개수 */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant={"h6" } fontWeight="bold">
            프로젝트
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="gray" fontSize={isMobile ? "0.9rem" : "1rem"}>
            총 {projectsData.length}개
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: 2 }} />

      {projectsData.map((project, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          <Grid container spacing={2} alignItems="center">
            {/* 날짜 */}
            <Grid item xs={12} sm={3} textAlign={isMobile ? "left" : "right"}>
              <Typography variant="subtitle1" color="gray" fontSize={isMobile ? "0.8rem" : "1rem"}>
                {project.startDate} ~ {project.endDate || "진행 중"}
              </Typography>
            </Grid>

            {/* 프로젝트 제목 */}
            <Grid item xs={12} sm={9}>
              <Typography fontWeight="bold" variant={isMobile ? "subtitle2" : "subtitle1"}>
                {project.title || "프로젝트 제목 없음"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {project.company || ""}
              </Typography>
            </Grid>
          </Grid>

          {/* 프로젝트 내용 */}
          <Typography
            variant="body1"
            fontSize={isMobile ? "0.8rem" : "0.9rem"}
            sx={{
              marginTop: 1,
              paddingLeft: isMobile ? "0" : "8px",
              whiteSpace: "pre-line"
            }}
          >
            {project.description || "설명이 없습니다."}
          </Typography>
          <Divider sx={{ marginTop: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default Projects;
