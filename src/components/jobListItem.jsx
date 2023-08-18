import React, { useState } from "react";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  List,
  IconButton,
  Typography,
  ListItem,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

function JobListItem({
  title,
  jobsData,
  handleEdit,
  handleDelete,
  handleDetails,
}) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          setOpen(!open);
        }}
        sx={{
          border: "1px solid black",
          borderRadius: "6px",
          marginBottom: "1px",
        }}
      >
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ padding: "0" }}>
          {jobsData &&
            jobsData.map((job, i) => (
              <ListItem
                key={i}
                sx={{
                  backgroundColor: "#e7eef5",
                  margin: "1px",
                  borderRadius: "6px",
                }}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() => {
                        handleEdit(job);
                      }}
                      edge="end"
                      aria-label="edit"
                      sx={{ marginRight: "4px" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        handleDelete(job._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDetails(job);
                  }}
                >
                  {job.title}
                </Typography>
              </ListItem>
            ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
JobListItem.propTypes = {
  title: PropTypes.string.isRequired,
  jobsData: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleDetails: PropTypes.func.isRequired,
};

export default JobListItem;
