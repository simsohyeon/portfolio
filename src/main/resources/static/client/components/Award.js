import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";
import {
  Box,
  Typography,
  Divider,
  Grid
} from "@mui/material";

const Award = () => {
  const [awardData, setAwardData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAwards = async () => {
      try {
        const data = await fetchPortfolioByType("award");
        if (data && Array.isArray(data.content)) {
          setAwardData(data.content); // 데이터가 배열일 경우 저장
        } else {
          setAwardData([]);
        }
      } catch (err) {
        console.error("Failed to fetch award data:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      }
    };

    loadAwards();
  }, []);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!awardData.length) return <Typography></Typography>;

  return (
    <Box sx={{ margin: "20px auto", maxWidth: "800px" }}>
    {/* 타이틀과 총 개수*/}
    <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
            <Typography variant="h6" fontWeight="bold">
                자격/어학/수상
            </Typography>
        </Grid>
        <Grid item>
            <Typography variant="subtitle2" color="gray">
                총 {awardData.length}개
            </Typography>
        </Grid>
    </Grid>
    <Divider sx={{ marginBottom: 2 }} />

      {/* 수상 내역 리스트 */}
      {awardData.map((award, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          <Grid container spacing={2} alignItems="center">
            {/* 날짜 */}
            <Grid item xs={2}>
              <Typography variant="body1" color="textSecondary">
                {award.date || "날짜 없음"}
              </Typography>
            </Grid>

            {/* 수상 제목과 기관 */}
            <Grid item xs={10}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                display="inline"
                sx={{ marginRight: 1 }}
              >
                {award.title || "수상명 없음"}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                display="inline"
              >
                {award.organization ? ` | ${award.organization}` : ""}
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: 1, whiteSpace: "pre-line" }}
              >
                {award.description || ""}
              </Typography>
            </Grid>
          </Grid>

          {index < awardData.length - 1 && <Divider sx={{ marginY: 2 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default Award;
