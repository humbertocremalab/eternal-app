import React from "react";
import { Box, Typography } from "@mui/material";

const faqs = [
  { q: "¿Cómo agendar cita?", a: "Puedes agendar por teléfono o en línea." },
  { q: "¿Qué horarios tienen?", a: "Lunes a viernes de 9:00 a 18:00." },
];

export default function FaqsSection() {
  return (
    <Box className="section" sx={{ bgcolor: "#f0f4f8" }}>
      <Typography variant="h4" color="primary" gutterBottom>Preguntas frecuentes</Typography>
      {faqs.map((faq, i) => (
        <Box key={i} sx={{ my: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">{faq.q}</Typography>
          <Typography>{faq.a}</Typography>
        </Box>
      ))}
    </Box>
  );
}
