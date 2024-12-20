import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";
import {
  Box,
  Typography,
  Grid,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Career = () => {
  const [careerData, setCareerData] = useState([]);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const loadCareer = async () => {
      try {
        const data = await fetchPortfolioByType("career");
        if (data && Array.isArray(data.content)) {
          setCareerData(data.content);
        } else {
          setCareerData([]);
        }
      } catch (err) {
        console.error("Failed to fetch career data:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    };

    loadCareer();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!careerData.length) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ margin: "20px auto", maxWidth: "800px", padding: "16px" }}>
      {/* 타이틀과 총 경력 수 */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography
            variant={"h6"}
            fontWeight="bold"
          >
            경력
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle2"
            color="gray"
            fontSize={isMobile ? "0.9rem" : "1rem"}
          >
            총 {careerData.length}개
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: 2 }} />

      {/* 경력 리스트 */}
      {careerData.map((career, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          {/* 상단 정보 */}
          <Grid container spacing={isMobile ? 1 : 2} alignItems="center">
            <Grid item xs={2} sm={1} textAlign="center">
              <BusinessIcon color="primary" fontSize="large" />
            </Grid>
            <Grid item xs={10} sm={11}>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                fontWeight="bold"
                display="inline"
              >
                {career.company || "회사명 없음"}
              </Typography>
              {career.isCurrent && (
                <CheckCircleIcon
                  color="primary"
                  sx={{ marginLeft: 1, fontSize: 20 }}
                />
              )}
              <Typography color="textSecondary" sx={{ marginTop: 1 }} variant={isMobile ? "subtitle2" : "subtitle1"}>
                {career.start_date} ~ {career.isCurrent ? "재직중" : career.end_date || "퇴사일 없음"}
              </Typography>
              <Box sx={{ marginTop: 1 }}>
                <Typography
                  component="span"
                  variant={isMobile ? "subtitle2" : "subtitle1"}
                  sx={{ marginRight: 1 }}
                >
                  {career.position || "직무 없음"}
                </Typography>
                {career.department && (
                  <Typography component="span" variant="body2">
                    {`, ${career.department}`}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* 상세 정보 */}
          <Box
            sx={{
              paddingLeft: isMobile ? "16px" : "35px",
              marginTop: 1,
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ whiteSpace: "pre-line" }}
            >
              {career.responsibilities || "담당 업무 없음"}
            </Typography>
          </Box>
          <Divider sx={{ marginTop: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default Career;
