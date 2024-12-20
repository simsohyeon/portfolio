import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  // 드래그 앤 드랍 끝났을 때 실행
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedCareers = Array.from(career);
    const [reorderedItem] = updatedCareers.splice(result.source.index, 1);
    updatedCareers.splice(result.destination.index, 0, reorderedItem);

    onCareerChange(updatedCareers);
  };

  return (
    <Box
      sx={{
        margin: "20px auto",
        padding: "20px",
        maxWidth: "800px",
        borderRadius: "8px",
      }}
    >
      {/* 제목 및 추가 버튼 */}
      <Grid container alignItems="center">
        <Grid item>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginLeft: "8px" }}
          >
            경력
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

      {/* 드래그 앤 드랍 영역 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="careers">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {career.map((item, index) => (
                <Draggable
                  key={index.toString()}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
                            onChange={(e) =>
                              handleUpdateCareer(index, "company", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleUpdateCareer(index, "start_date", e.target.value)
                            }
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
                            onChange={(e) =>
                              handleUpdateCareer(index, "end_date", e.target.value)
                            }
                            disabled={item.isCurrent}
                          />
                        </Grid>

                        {/* 재직중 */}
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
                            onChange={(e) =>
                              handleUpdateCareer(index, "position", e.target.value)
                            }
                          />
                        </Grid>

                        {/* 직급 */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="직급"
                            fullWidth
                            value={item.department}
                            onChange={(e) =>
                              handleUpdateCareer(index, "department", e.target.value)
                            }
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
                              handleUpdateCareer(
                                index,
                                "responsibilities",
                                e.target.value
                              )
                            }
                            placeholder="담당 업무를 입력하세요."
                          />
                        </Grid>

                        {/* 삭제 버튼 */}
                        <Grid item xs={12} textAlign="right">
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveCareer(index)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default CareerEdit;
