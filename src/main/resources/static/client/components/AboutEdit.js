import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const AboutEdit = ({ about, onAboutChange }) => {
  // 입력 핸들러
  const handleInputChange = (field, value) => {
    onAboutChange({ ...about, [field]: value });
  };

  return (
    <Box
      sx={{
        margin: "20px auto",
        padding: "20px",
        maxWidth: "800px",
        borderRadius: "8px",
        "@media (max-width: 600px)": {
          padding: "10px", // 모바일에서는 패딩 줄이기
        },
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
        color="black"
        textAlign={{ xs: "center", sm: "left" }} // 모바일에서는 중앙 정렬
      >
        기본정보
      </Typography>

      {/* 프로필 사진 + 입력 필드 */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent={{ xs: "center", sm: "flex-start" }} // 모바일에서 중앙 정렬
      >
        {/* 프로필 사진 */}
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            textAlign: "center",
            marginBottom: { xs: 2, sm: 0 }, // 모바일에서 여백 추가
          }}
        >
          <Avatar
            src={about.profileImage || ""}
            sx={{
              width: 120,
              height: 120,
              backgroundColor: "#007BFF",
              margin: "0 auto",
              marginBottom: "10px",
            }}
          />
          <IconButton color="primary" component="label">
            <PhotoCamera />
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(e) =>
                handleInputChange(
                  "profileImage",
                  URL.createObjectURL(e.target.files[0])
                )
              }
            />
          </IconButton>
        </Grid>

        {/* 입력 필드: 이름, 생년월일, 이메일 */}
        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            {/* 이름 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="이름"
                variant="outlined"
                fullWidth
                value={about.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                margin="normal"
              />
            </Grid>

            {/* 생년월일 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="생년월일"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={about.age || ""}
                onChange={(e) => handleInputChange("age", e.target.value)}
                margin="normal"
              />
            </Grid>

            {/* 이메일 */}
            <Grid item xs={12}>
              <TextField
                label="이메일"
                variant="outlined"
                fullWidth
                value={about.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* 소개 필드 */}
      <Box mt={3}>
        <TextField
          label="소개"
          variant="outlined"
          multiline
          rows={6}
          fullWidth
          value={about.about || ""}
          onChange={(e) => handleInputChange("about", e.target.value)}
          placeholder="간략한 자기소개를 입력해주세요."
          sx={{
            "@media (max-width: 600px)": {
              rows: 4, // 모바일에서 줄 수를 줄이기
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AboutEdit;
