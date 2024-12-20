import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ProjectsEdit = ({ projects, onProjectsChange }) => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Responsive breakpoint

  // 프로젝트 추가
  const handleAddProject = () => {
    onProjectsChange([
      ...projects,
      { title: "", description: "", startDate: "", endDate: "", techStack: "" },
    ]);
  };

  // 프로젝트 수정
  const handleChangeProject = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    onProjectsChange(updatedProjects);
  };

  // 프로젝트 삭제
  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    onProjectsChange(updatedProjects);
  };

  // 드래그 앤 드랍 결과 처리
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedProjects = Array.from(projects);
    const [movedProject] = reorderedProjects.splice(result.source.index, 1);
    reorderedProjects.splice(result.destination.index, 0, movedProject);
    onProjectsChange(reorderedProjects);
  };

  return (
    <Box
      sx={{
        margin: "20px auto",
        padding: isMobile ? "10px" : "20px",
        maxWidth: "800px",
        borderRadius: "8px",
      }}
    >
      {/* 제목 */}
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight="bold">
          프로젝트
        </Typography>
        <IconButton color="primary" onClick={handleAddProject}>
          <AddIcon />
        </IconButton>
      </Grid>

      {/* 드래그 앤 드랍 컨텍스트 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {projects.map((project, index) => (
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
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: isMobile ? "10px" : "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        {/* 프로젝트 제목 */}
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="프로젝트 제목"
                            fullWidth
                            value={project.title}
                            onChange={(e) =>
                              handleChangeProject(index, "title", e.target.value)
                            }
                          />
                        </Grid>

                        {/* 시작일 */}
                        <Grid item xs={12} sm={3}>
                          <TextField
                            label="시작일"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={project.startDate}
                            onChange={(e) =>
                              handleChangeProject(index, "startDate", e.target.value)
                            }
                          />
                        </Grid>

                        {/* 종료일 */}
                        <Grid item xs={12} sm={3}>
                          <TextField
                            label="종료일"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={project.endDate}
                            onChange={(e) =>
                              handleChangeProject(index, "endDate", e.target.value)
                            }
                          />
                        </Grid>

                        {/* 기술 스택 */}
                        <Grid item xs={12}>
                          <TextField
                            label="기술 스택"
                            fullWidth
                            value={project.techStack}
                            onChange={(e) =>
                              handleChangeProject(index, "techStack", e.target.value)
                            }
                          />
                        </Grid>

                        {/* 프로젝트 설명 */}
                        <Grid item xs={12}>
                          <TextField
                            label="프로젝트 설명"
                            multiline
                            rows={isMobile ? 3 : 4}
                            fullWidth
                            value={project.description}
                            onChange={(e) =>
                              handleChangeProject(index, "description", e.target.value)
                            }
                          />
                        </Grid>

                        {/* 삭제 버튼 */}
                        <Grid item xs={12} textAlign="right">
                          <IconButton
                            color="error"
                            onClick={() => handleRemoveProject(index)}
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
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ProjectsEdit;
