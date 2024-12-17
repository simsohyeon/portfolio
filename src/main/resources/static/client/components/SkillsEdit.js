import React from "react";
import { Box, Typography, Chip, TextField, IconButton, Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';

const SkillsEdit = ({ skills = [], onSkillsChange }) => {
  // 스킬 추가
  const handleAddSkill = () => {
    const newSkills = [...skills, ""];
    onSkillsChange(newSkills);
  };

  // 스킬 수정
  const handleEditSkill = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    onSkillsChange(updatedSkills);
  };

  // 스킬 삭제
  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    onSkillsChange(updatedSkills);
  };

  return (
    <Box
      sx={{
        margin: "20px auto",
        padding: "20px",
        maxWidth: "800px",
        borderRadius: "8px"
      }}
    >
      {/* 제목 */}
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          나의 스킬
        </Typography>
        <IconButton color="primary" onClick={handleAddSkill}>
          <AddIcon />
        </IconButton>
      </Grid>

      {/* 스킬 목록 */}
      <Grid container spacing={1}>
        {skills.map((skill, index) => (
          <Grid item key={index}>
            <Chip
              label={
                <Box display="flex" alignItems="center">
                  <TextField
                    variant="standard"
                    value={skill}
                    onChange={(e) => handleEditSkill(index, e.target.value)}
                    sx={{ width: "80px", marginRight: "8px" }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteSkill(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
              variant="outlined"
              sx={{ borderRadius: "20px", padding: "4px 8px" }}
            />
          </Grid>
        ))}
      </Grid>

      {/* 추가 안내 메시지 */}
      {skills.length === 0 && (
        <Typography color="textSecondary" mt={2}>
          스킬을 추가해 주세요.
        </Typography>
      )}
    </Box>
  );
};

export default SkillsEdit;
