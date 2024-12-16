import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";
import {
  Box,
  Typography,
  Grid,
  Divider
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Career = () => {
  const [careerData, setCareerData] = useState([]);
  const [error, setError] = useState(null);

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
    <Box sx={{ margin: "20px auto", maxWidth: "800px" }}>
      {/* 타이틀 */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        경력{" "}
        <Typography variant="subtitle1" component="span" color="gray">
          총 경력 {careerData.length}개
        </Typography>
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      {/* 경력 리스트 */}
      {careerData.map((career, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          {/* 상단 정보 */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <BusinessIcon color="primary" fontSize="large" />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" fontWeight="bold" display="inline">
                {career.company || "회사명 없음"}
              </Typography>
              {career.isCurrent && (
                <CheckCircleIcon
                  color="primary"
                  sx={{ marginLeft: 1, fontSize: 20 }}
                />
              )}
              <Box component="span" sx={{ marginLeft: 5 }}>
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ marginRight: 1 }}
                >
                  {career.position || ""}
                </Typography>
                {career.department && (
                  <Typography component="span" variant="body1">
                    {`, ${career.department}`}
                  </Typography>
                )}
              </Box>
              <Typography color="textSecondary">
                {career.start_date} ~{" "}
                {career.isCurrent ? "재직중" : career.end_date || "퇴사일 없음"}
              </Typography>
            </Grid>
          </Grid>


          {/* 상세 정보 */}
          <Box sx={{ paddingLeft: "35px", marginTop: 1 }}>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
             {career.responsibilities || ""}
          </Typography>

          </Box>
          <Divider sx={{ marginTop: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default Career;
