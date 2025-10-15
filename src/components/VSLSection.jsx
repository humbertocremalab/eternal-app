import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function VSLSection() {
  return (
    <motion.div className="section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Typography variant="h3" color="primary">¡Felicidades por agendar!</Typography>
      <Box sx={{ mt: 3 }}>
        <iframe
          width="80%"
          height="300"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="VSL"
          frameBorder="0"
          allowFullScreen
        />
      </Box>
    </motion.div>
  );
}