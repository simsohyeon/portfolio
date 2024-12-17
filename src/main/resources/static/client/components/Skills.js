import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";
import { Box, Typography, Chip, Grid, Divider } from "@mui/material";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchPortfolioByType("skills");
        setSkills(data.content || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch skills data:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  if (loading) return <Typography></Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        margin: "20px auto",
        padding: "20px",
        maxWidth: "800px",
        borderRadius: "8px",
      }}
    >
      {/* 제목과 총 스킬 개수 */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" fontWeight="bold">
            나의 스킬
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="gray">
            총 스킬 {skills.length}개
          </Typography>
        </Grid>
      </Grid>

      {/* 구분선 */}
      <Divider sx={{ marginY: 2 }} />

      {/* 스킬 목록 */}
      <Grid container spacing={1}>
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <Grid item key={index}>
              <Chip
                label={skill}
                variant="outlined"
                sx={{
                  fontSize: "14px",
                  borderRadius: "20px",
                  paddingX: "8px",
                  marginBottom: "8px",
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: "center", width: "100%" }}
          >
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Skills;
