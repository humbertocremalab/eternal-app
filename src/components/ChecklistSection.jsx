import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const checklist = ["Documento A", "Documento B", "Documento C"];

export default function ChecklistSection() {
  return (
    <Box className="section" sx={{ bgcolor: "white" }}>
      <Typography variant="h4" color="primary">Qué llevar</Typography>
      <List>
        {checklist.map((item, i) => (
          <ListItem key={i}><ListItemText primary={item} /></ListItem>
        ))}
      </List>
    </Box>
  );
}
