import React from "react";
import {
  Box,
  Grid,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AwardEdit = ({ award = [], onAwardChange }) => {

  // 수상 데이터 추가
  const handleAddAward = () => {
    onAwardChange([
      ...award,
      { title: "", organization: "", date: "", description: "" },
    ]);
  };

  // 수상 데이터 수정
  const handleUpdateAward = (index, field, value) => {
    const updatedAwards = [...award];
    updatedAwards[index][field] = value;
    onAwardChange(updatedAwards);
  };

  // 수상 데이터 삭제
  const handleRemoveAward = (index) => {
    const updatedAwards = award.filter((_, i) => i !== index);
    onAwardChange(updatedAwards);
  };

  // 드래그 앤 드롭 정렬 처리
  const handleDragEnd = (result) => {
    if (!result.destination) return; // 목적지가 없으면 리턴
    const items = Array.from(award);
    const [reorderedItem] = items.splice(result.source.index, 1); // 항목 제거
    items.splice(result.destination.index, 0, reorderedItem); // 새로운 위치에 삽입
    onAwardChange(items);
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
      {/* 타이틀 및 추가 버튼 */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          자격/어학/수상
        </Typography>
        <IconButton onClick={handleAddAward} color="primary">
          <AddIcon />
        </IconButton>
      </Grid>

      {/* 드래그 앤 드롭 컨텍스트 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="awards">
          {(provided) => (
            <Box
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{ marginTop: 2 }}
            >
              {award.length > 0 ? (
                award.map((item, index) => (
                  <Draggable
                    key={index}
                    draggableId={`award-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} sm={5}>
                            <TextField
                              label="제목"
                              fullWidth
                              variant="outlined"
                              value={item.title}
                              onChange={(e) =>
                                handleUpdateAward(index, "title", e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              label="기관"
                              fullWidth
                              variant="outlined"
                              value={item.organization}
                              onChange={(e) =>
                                handleUpdateAward(index, "organization", e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <TextField
                              label="날짜"
                              type="month"
                              fullWidth
                              InputLabelProps={{ shrink: true }}
                              value={item.date}
                              onChange={(e) =>
                                handleUpdateAward(index, "date", e.target.value)
                              }
                            />
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sx={{ marginTop: 2 }}>
                          <TextField
                            label="설명"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                            value={item.description}
                            onChange={(e) =>
                              handleUpdateAward(index, "description", e.target.value)
                            }
                          />
                        </Grid>

                        {/* 삭제 아이콘 */}
                        <Grid item xs={12} textAlign="right">
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveAward(index)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Grid>
                      </Box>
                    )}
                  </Draggable>
                ))
              ) : (
                <Typography>수상 내역이 없습니다. 추가해주세요.</Typography>
              )}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default AwardEdit;
