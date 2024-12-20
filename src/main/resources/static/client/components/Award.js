import React, { useEffect, useState } from "react";
import { fetchPortfolioByType } from "../api/api";
import {
  Box,
  Typography,
  Divider,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Award = () => {
  const [awardData, setAwardData] = useState([]);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const loadAwards = async () => {
      try {
        const data = await fetchPortfolioByType("award");
        if (data && Array.isArray(data.content)) {
          setAwardData(data.content);
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
    <Box
      sx={{
        margin: "20px auto",
        maxWidth: "800px",
        padding: isMobile ? "10px" : "20px",
        borderRadius: "8px",
      }}
    >
      {/* 타이틀과 총 개수 */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography
            variant={"h6"}
            fontWeight="bold"
          >
            자격/어학/수상
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle2"
            color="gray"
            fontSize={isMobile ? "0.9rem" : "1rem"}
          >
            총 {awardData.length}개
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: 2 }} />

      {/* 수상 내역 리스트 */}
      {awardData.map((award, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          <Grid container spacing={isMobile ? 1 : 2} alignItems="center">
            {/* 날짜 */}
            <Grid item xs={12} sm={2} textAlign={isMobile ? "left" : "center"}>
              <Typography
                variant="body2"
                color="textSecondary"
                fontSize={isMobile ? "0.8rem" : "1rem"}
              >
                {award.date || "날짜 없음"}
              </Typography>
            </Grid>

            {/* 수상 제목과 기관 */}
            <Grid item xs={12} sm={10}>
              <Typography
                variant={isMobile ? "subtitle2" : "subtitle1"}
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
                fontSize={isMobile ? "0.8rem" : "0.9rem"}
              >
                {award.organization ? ` | ${award.organization}` : ""}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginTop: 1,
                  whiteSpace: "pre-line",
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                }}
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
