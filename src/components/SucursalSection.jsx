import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const sucursal = {
  nombre: "Sucursal Centro",
  direccion: "Av. Principal #123, Ciudad",
  galeria: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ],
};

export default function SucursalSection() {
  return (
    <Box className="section" sx={{ bgcolor: "#f0f4f8" }}>
      <Typography variant="h4" color="primary" gutterBottom>{sucursal.nombre}</Typography>
      <Typography>{sucursal.direccion}</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {sucursal.galeria.map((img, i) => (
          <Grid item xs={4} key={i}>
            <img src={img} alt={`Galeria ${i}`} style={{ width: "100%", borderRadius: 8 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
