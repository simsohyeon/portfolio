import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  useMediaQuery,
} from "@mui/material";

// 만나이 계산 함수
const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();

  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
};

const About = () => {
  const [aboutData, setAboutData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 반응형: 화면 크기 감지
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const data = await fetchPortfolioByType("about");
        setAboutData(data.content || {});
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch about data:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    loadAbout();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
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
      {/* 상단 프로필 */}
      <Grid container spacing={isMobile ? 1 : 2} alignItems="center">
        {/* 사진 */}
        <Grid
          item
          xs={12}
          sm={4}
          textAlign="center"
          sx={{ marginBottom: isMobile ? "10px" : "0" }}
        >
          <Avatar
            src={aboutData.profileImage || ""}
            sx={{
              width: isMobile ? 80 : 120,
              height: isMobile ? 80 : 120,
              margin: "0 auto",
            }}
          />
        </Grid>

        {/* 이름, 나이, 이메일 */}
        <Grid item xs={12} sm={8}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            gutterBottom
          >
            {aboutData.name || "이름 정보 없음"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {aboutData.age
              ? `${aboutData.age.substring(0, 4)}년생 (${calculateAge(
                  aboutData.age
                )}세)`
              : "나이 정보 없음"}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: 1, fontSize: isMobile ? "0.9rem" : "1rem" }}
          >
            📧 {aboutData.email || "이메일 정보 없음"}
          </Typography>
        </Grid>
      </Grid>

      {/* 간략 소개 */}
      <Box mt={5} sx={{ textAlign: "left" }}>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        >
          👩🏻‍💻 {aboutData.about || "간략한 소개 내용이 없습니다."}
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
