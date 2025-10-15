import React from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

const medicos = [
  { nombre: "Dr. Juan Pérez", bio: "Especialista en medicina general." },
  { nombre: "Dra. Ana Gómez", bio: "Especialista en pediatría." },
];

export default function MedicosSection() {
  return (
    <Box className="section" sx={{ bgcolor: "white" }}>
      <Typography variant="h4" color="primary" gutterBottom>Nuestros médicos</Typography>
      <Grid container spacing={2}>
        {medicos.map((doc, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card>
              <CardContent>
                <Typography variant="h6">{doc.nombre}</Typography>
                <Typography>{doc.bio}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
