import React from "react";
import { Box, Typography } from "@mui/material";

export default function ComoLlegarSection() {
  return (
    <Box className="section" sx={{ bgcolor: "#f0f4f8" }}>
      <Typography variant="h4" color="primary">Cómo llegar</Typography>
      <Typography>Av. Principal #123, Ciudad</Typography>
      <Box sx={{ mt: 2 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.9999999999995!2d-99.1332!3d19.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fffff!2sCDMX!5e0!3m2!1ses!2smx!4v1631234567890"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: 8 }}
          allowFullScreen
          loading="lazy"
        />
      </Box>
    </Box>
  );
}
