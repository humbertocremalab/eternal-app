import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const testimonios = [
  { nombre: "Paciente 1", video: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { nombre: "Paciente 2", video: "https://www.youtube.com/embed/3JZ_D3ELwOQ" },
];

export default function TestimoniosSection() {
  return (
    <Box className="section" sx={{ bgcolor: "white" }}>
      <Typography variant="h4" color="primary" gutterBottom>Testimonios</Typography>
      <Grid container spacing={2}>
        {testimonios.map((t, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Typography variant="subtitle2">{t.nombre}</Typography>
            <iframe
              width="100%"
              height="200"
              src={t.video}
              title={t.nombre}
              frameBorder="0"
              allowFullScreen
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
