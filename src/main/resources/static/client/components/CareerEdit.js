import React from "react";
import {
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const CareerEdit = ({ career = [], onCareerChange }) => {
  // 경력 추가
  const handleAddCareer = () => {
    onCareerChange([
      ...career,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        isCurrent: false,
        department: "",
        responsibilities: "",
      },
    ]);
  };

  // 경력 데이터 수정
  const handleUpdateCareer = (index, field, value) => {
    const updatedCareers = [...career];
    updatedCareers[index][field] = value;
    onCareerChange(updatedCareers);
  };

  // 재직중 토글
  const handleToggleCurrent = (index) => {
    const updatedCareers = [...career];
    updatedCareers[index].isCurrent = !updatedCareers[index].isCurrent;
    if (updatedCareers[index].isCurrent) updatedCareers[index].end_date = "";
    onCareerChange(updatedCareers);
  };

  // 경력 삭제
  const handleRemoveCareer = (index) => {
    const updatedCareers = career.filter((_, i) => i !== index);
    onCareerChange(updatedCareers);
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
       <Grid container alignItems="center">
           <Grid item>
             <Typography
               variant="h6"
               sx={{ fontWeight: "bold", marginLeft: "8px" }}
             >
               경력 수정
             </Typography>
           </Grid>

           <Grid item xs>
             <Box display="flex" justifyContent="flex-end">
               <AddIcon
                 color="primary"
                 sx={{ cursor: "pointer", fontSize: 25 }}
                 onClick={handleAddCareer}
               />
             </Box>
           </Grid>
         </Grid>


      {career.map((item, index) => (
        <Box
          key={index}
          sx={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <Grid container spacing={2}>
            {/* 회사명 */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="회사명"
                fullWidth
                value={item.company}
                onChange={(e) => handleUpdateCareer(index, "company", e.target.value)}
              />
            </Grid>

            {/* 입사년월 */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="입사년월"
                type="month"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={item.start_date}
                onChange={(e) => handleUpdateCareer(index, "start_date", e.target.value)}
              />
            </Grid>

            {/* 퇴사년월 */}
            <Grid item xs={12} sm={3} container alignItems="center">
              <TextField
                label="퇴사년월"
                type="month"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={item.end_date}
                onChange={(e) => handleUpdateCareer(index, "end_date", e.target.value)}
                disabled={item.isCurrent}
              />
              </Grid>
              <Grid item xs={12} sm={3} container alignItems="center">
              <FormControlLabel
                control={
                  <Switch
                    checked={item.isCurrent}
                    onChange={() => handleToggleCurrent(index)}
                    color="primary"
                  />
                }
                label="재직중"
                sx={{ marginLeft: "10px" }}
              />
            </Grid>

            {/* 직무 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="직무"
                fullWidth
                value={item.position}
                onChange={(e) => handleUpdateCareer(index, "position", e.target.value)}
              />
            </Grid>

            {/* 직급 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="직급"
                fullWidth
                value={item.department}
                onChange={(e) => handleUpdateCareer(index, "department", e.target.value)}
              />
            </Grid>

            {/* 담당업무 */}
            <Grid item xs={12}>
              <TextField
                label="담당업무"
                multiline
                rows={4}
                fullWidth
                value={item.responsibilities}
                onChange={(e) =>
                  handleUpdateCareer(index, "responsibilities", e.target.value)
                }
                placeholder="담당 업무를 입력하세요."
              />
            </Grid>

            {/* 삭제 버튼 */}
            <Grid item xs={12}>
             <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveCareer(index)}
                >
                경력 삭제
                </Button>
             </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default CareerEdit;
