import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import {
  Place,
  PlayCircle,
  HelpOutline,
  Chat,
  ArrowBack,
  ArrowForward,
  PlayArrow,
  Phone,
  Schedule,
  CheckCircle,
  LocalActivity,
  ConfirmationNumber,
} from "@mui/icons-material";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

// Importar videos locales
import videoIntro from '../src/assets/videos/Eternalvsl1.mp4';
import testimonioMariana from '../src/assets/videos/Slide-1.mp4';
import galeriasVideo1 from '../src/assets/videos/TerraNova-Map.mp4';

// NOTA: Necesitarás importar los demás videos cuando los tengas
// Por ahora, usaré el mismo video como placeholder para las demás sucursales

export default function ClinicOnboardingMobile() {
  const [step, setStep] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);
  const [playingBranchVideo, setPlayingBranchVideo] = useState(null);

  const branches = [
    { name: "Galerías", map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.6173644001456!2d-100.35766342379881!3d25.683975877400812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866297cef094fea9%3A0xeaea01d6dd72287!2sEternal%20Centro%20Medico%20Galer%C3%ADas!5e0!3m2!1ses-419!2smx!4v1760511783100!5m2!1ses-419!2smx"},
    { name: "Centro", map: "https://maps.google.com/?q=Centro" },
    { name: "Monterrey Norte", map: "https://maps.google.com/?q=Monterrey+Norte" },
    { name: "San Pedro", map: "https://maps.google.com/?q=San+Pedro" },
    { name: "Cumbres", map: "https://maps.google.com/?q=Cumbres" },
  ];

  // Videos por sucursal - usando el mismo video como placeholder por ahora
  const branchVideos = {
    "Galerías": [galeriasVideo1],
    "Centro": [galeriasVideo1], // Placeholder - cambiar cuando tengas el video real
    "Monterrey Norte": [galeriasVideo1], // Placeholder
    "San Pedro": [galeriasVideo1], // Placeholder
    "Cumbres": [galeriasVideo1], // Placeholder
  };

  const faqs = [
    { q: "¿Puedo llegar antes?", a: "Sí, se recomienda llegar 10 minutos antes." },
    { q: "¿Hay estacionamiento?", a: "Sí, contamos con estacionamiento para pacientes." },
    { q: "¿Se acepta seguro médico?", a: "Sí, verificamos cobertura con anticipación." },
    { q: "¿Puedo consultar tratamientos alternativos?", a: "Sí, nuestros especialistas te guiarán según tu caso." },
    { q: "¿Cuál es la duración promedio de la consulta?", a: "Aproximadamente 30 minutos, según necesidad." },
  ];

  const videoTestimonials = [
    { 
      name: "Mariana López", 
      role: "Paciente de Ortodoncia",
      duration: "2:30",
      thumbnail: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
      video: testimonioMariana,
      type: "local"
    },
    { 
      name: "Carlos Rodríguez", 
      role: "Tratamiento de Blanqueamiento",
      duration: "1:45",
      thumbnail: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
      video: testimonioMariana, // Placeholder - cambiar cuando tengas el video real
      type: "local"
    },
    { 
      name: "Ana Martínez", 
      role: "Implantes Dentales",
      duration: "3:15",
      thumbnail: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=400",
      video: testimonioMariana, // Placeholder - cambiar cuando tengas el video real
      type: "local"
    },
  ];

  function next() {
    setStep((s) => Math.min(s + 1, 4));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const handleVideoPlay = (index) => {
    if (playingVideo === index) {
      setPlayingVideo(null); // Pausar video
    } else {
      setPlayingVideo(index); // Reproducir video
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleVideoPlayClick = () => {
    // Simular el fin del video después de 5 segundos (para demo)
    setTimeout(() => {
      setVideoEnded(true);
    }, 5000);
  };

  const handleBranchVideoPlay = (branchName, videoIndex) => {
    setPlayingBranchVideo(`${branchName}-${videoIndex}`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        bgcolor: "#f9fafb",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AnimatePresence mode="wait">
        {/* STEP 0 - Bienvenida + Sucursales */}
        {step === 0 && (
  <motion.div
    key={step}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.5 }}
  >
    <Box sx={{ height: "100dvh", p: 3, display: "flex", flexDirection: "column" }}>
      {/* Video Player REAL */}
      <Paper
        sx={{
          aspectRatio: "16/9",
          borderRadius: 3,
          overflow: "hidden",
          mb: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          position: "relative",
          cursor: !videoEnded ? "pointer" : "default",
        }}
      >
        {!videoEnded ? (
          // REPRODUCIENDO o THUMBNAIL
          playingVideo === "intro" ? (
            // VIDEO REPRODUCIÉNDOSE
            <video
              controls
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onEnded={() => {
                setVideoEnded(true);
                setPlayingVideo(null);
              }}
            >
              <source src={videoIntro} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          ) : (
            // THUMBNAIL CON BOTÓN PLAY
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "#E3F2FD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
              onClick={() => setPlayingVideo("intro")}
            >
              {/* Video como fondo (pausado) */}
              <video
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.4,
                  filter: "brightness(0.8)",
                }}
                muted
                loop
              >
                <source src={videoIntro} type="video/mp4" />
              </video>
              
              {/* Icono de play */}
              <PlayCircle sx={{ 
                position: "absolute", 
                color: "#1E88E5", 
                fontSize: 60,
                bgcolor: "rgba(255,255,255,0.9)",
                borderRadius: "50%",
                p: 0.5,
                zIndex: 2
              }} />
              
              <Typography 
                sx={{ 
                  position: "absolute", 
                  bottom: 16, 
                  left: 16, 
                  color: "#1E88E5", 
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  zIndex: 2,
                  background: "rgba(255,255,255,0.8)",
                  padding: "4px 8px",
                  borderRadius: 1,
                }}
              >
                Haz clic para ver el video
              </Typography>
              
              {/* Overlay para mejor contraste */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(227, 242, 253, 0.6)",
                  zIndex: 1,
                }}
              />
            </Box>
          )
        ) : (
          // DESPUÉS de reproducir - Mensaje de completado
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "#E3F2FD",
              p: 2,
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
            >
              <CheckCircle sx={{ color: "#4CAF50", fontSize: 50, mb: 2 }} />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Typography 
                variant="h6" 
                fontWeight="700" 
                textAlign="center" 
                sx={{ color: "#1E88E5", mb: 1 }}
              >
                Video completado
              </Typography>
              <Typography 
                variant="body2" 
                textAlign="center" 
                sx={{ color: "#666" }}
              >
                Ahora selecciona tu sucursal más cercana
              </Typography>
            </motion.div>
          </Box>
        )}
      </Paper>

      <Typography variant="h6" fontWeight="700" sx={{ mb: 1 }}>
        ¡Felicidades! Tu cita está agendada
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Te compartimos información útil para tu visita. Revisa cada sección y selecciona tu sucursal.
      </Typography>

      {/* Texto animado que aparece después del video */}
      <AnimatePresence>
        {videoEnded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="subtitle1" 
              fontWeight="700" 
              sx={{ 
                mb: 2, 
                textAlign: "center",
                color: "#1E88E5",
                fontSize: "1.1rem"
              }}
            >
              🏥 Selecciona tu sucursal más cercana
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de sucursales */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mb: 2,
        }}
      >
        {branches.map((s, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.97 }}
            initial={videoEnded ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={videoEnded ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ delay: videoEnded ? 0.1 * i : 0 }}
          >
            <Paper
              elevation={selectedBranch === s.name ? 6 : 1}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: selectedBranch === s.name ? "#bbdefb" : "white",
                border: selectedBranch === s.name ? "2px solid #1E88E5" : "1px solid #e0e0e0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1,
                transition: "all 0.3s ease",
              }}
              onClick={() => setSelectedBranch(s.name)}
            >
              <Place sx={{ color: "#1E88E5" }} />
              <Typography variant="body2" fontWeight="500">
                {s.name}
              </Typography>
            </Paper>
          </motion.div>
        ))}
      </Box>

      {/* Botón animado que aparece después del video */}
      <AnimatePresence>
        {videoEnded && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.6 
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{ 
                borderRadius: 3, 
                fontWeight: "600", 
                py: 1.3,
                fontSize: "0.95rem",
                minHeight: "48px",
                background: "linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)",
                boxShadow: "0 4px 15px rgba(30, 136, 229, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(30, 136, 229, 0.4)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
              onClick={next}
              disabled={!selectedBranch}
              endIcon={<ArrowForward />}
            >
              Continuar a {selectedBranch || "Sucursal"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mensaje inicial antes del video */}
      {!videoEnded && !playingVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Typography 
            variant="body2" 
            textAlign="center" 
            color="text.secondary" 
            sx={{ mt: 2, fontStyle: "italic" }}
          >
            Mira el video introductorio primero
          </Typography>
        </motion.div>
      )}
    </Box>
  </motion.div>
)}
{/* STEP 1 - Info de sucursal con videos locales */}
{step === 1 && (
  <motion.div
    key={step}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.5 }}
  >
    <Box sx={{ height: "100dvh", p: 3, display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" fontWeight="700" sx={{ mb: 1 }}>
        {selectedBranch}
      </Typography>

      {/* Mapa */}
      <Paper
        sx={{
          height: 200,
          borderRadius: 3,
          overflow: "hidden",
          mb: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <iframe
          title={selectedBranch}
          src={branches.find((b) => b.name === selectedBranch)?.map}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </Paper>

      {/* Videos de la sucursal seleccionada - CONTENEDOR 9:16 */}
      {branchVideos[selectedBranch]?.map((video, index) => (
        <Paper
          key={index}
          sx={{
            width: "100%",
            maxWidth: "280px", // Ancho máximo para mantener proporción 9:16
            height: "500px", // Altura fija para 9:16
            borderRadius: 3,
            overflow: "hidden",
            mb: 2,
            position: "relative",
            cursor: "pointer",
            bgcolor: "#000",
            margin: "0 auto", // Centrar horizontalmente
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => handleBranchVideoPlay(selectedBranch, index)}
        >
          {playingBranchVideo === `${selectedBranch}-${index}` ? (
            // Video reproduciéndose - 9:16 COMPLETO
            <video
              controls
              autoPlay
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Cubre todo el contenedor 9:16
                backgroundColor: "#000",
              }}
              onEnded={() => setPlayingBranchVideo(null)}
            >
              <source src={video} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          ) : (
            // Thumbnail con botón de play - 9:16
            <>
              {/* Video como thumbnail (pausado) */}
              <video
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.7,
                  filter: "brightness(0.6)",
                }}
                muted
              >
                <source src={video} type="video/mp4" />
              </video>
              
              {/* Botón de play centrado */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      bgcolor: "rgba(255,255,255,1)",
                    },
                  }}
                >
                  <PlayArrow sx={{ color: "#1E88E5", fontSize: 30 }} />
                </Box>
              </Box>
              
              {/* Texto del video */}
              <Typography sx={{ 
                position: "absolute", 
                bottom: 12, 
                left: 12, 
                color: "white", 
                fontWeight: "600",
                background: "rgba(0,0,0,0.6)",
                padding: "4px 8px",
                borderRadius: 1,
                fontSize: "0.8rem"
              }}>
                Video {index + 1}
              </Typography>
            </>
          )}
        </Paper>
      ))}

      <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
        <Button
          startIcon={<ArrowBack />}
          variant="outlined"
          fullWidth
          sx={{ 
            borderRadius: 3, 
            py: 1.1,
            fontSize: "0.875rem",
            minHeight: "44px"
          }}
          onClick={prev}
        >
          Atrás
        </Button>
        <Button
          endIcon={<ArrowForward />}
          variant="contained"
          fullWidth
          sx={{ 
            borderRadius: 3, 
            py: 1.1,
            fontSize: "0.875rem",
            minHeight: "44px"
          }}
          onClick={next}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  </motion.div>
)}

        {/* STEP 2 - WhatsApp */}
        {step === 2 && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                p: 2,
                bgcolor: "#f8f9fa",
                overflow: "hidden",
              }}
            >
              {/* Contenedor principal con scroll */}
              <Box sx={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column",
                overflowY: "auto",
                pb: 2 
              }}>
                {/* Header */}
                <Box sx={{ textAlign: "center", mb: 3, px: 1 }}>
                  <CheckCircle 
                    sx={{ 
                      color: "#4CAF50", 
                      fontSize: 50, 
                      mb: 2,
                      filter: "drop-shadow(0 4px 12px rgba(76, 175, 80, 0.3))"
                    }} 
                  />
                  <Typography variant="h6" fontWeight="700" sx={{ mb: 1, color: "#1a1a1a", fontSize: "1.25rem" }}>
                    ¡Estás a un paso de completar tu proceso!
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.5, fontSize: "0.9rem" }}>
                    Conecta con nuestra asesora especializada para resolver todas tus dudas y confirmar los detalles de tu tratamiento.
                  </Typography>
                </Box>

                {/* Tarjetas de información */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, px: 1 }}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <Chat sx={{ fontSize: 35, mb: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight="700" sx={{ mb: 1, fontSize: "1rem" }}>
                      Chat Inmediato por WhatsApp
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.8rem" }}>
                      Resolución rápida de dudas y confirmación de horarios
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      bgcolor: "white",
                      border: "2px solid #e3f2fd",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1.5 }}>
                      <Schedule sx={{ color: "#1E88E5", mr: 1.5, mt: 0.2, fontSize: 20 }} />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: "0.9rem" }}>
                          Información importante
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5, fontSize: "0.8rem", mt: 0.5 }}>
                          <Box component="span" fontWeight="600" color="#1a1a1a">
                            Si ya dejaste tus datos, espera nuestra llamada
                          </Box>{" "}
                          en las próximas horas hábiles desde un número local.
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>

                {/* Beneficios */}
                <Box sx={{ mb: 3, px: 1 }}>
                  <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2, color: "#1a1a1a", fontSize: "0.95rem" }}>
                    ¿Por qué hablar con nuestra asesora?
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
                    {[
                      "Confirmación inmediata de tu cita",
                      "Resolución de dudas sobre tu tratamiento",
                      "Información sobre preparación previa",
                      "Detalles de costos y formas de pago",
                      "Guía personalizada según tu caso"
                    ].map((benefit, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "flex-start" }}>
                        <CheckCircle sx={{ color: "#4CAF50", fontSize: 18, mr: 1.5, mt: 0.1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Botones de acción - Fijos en la parte inferior */}
              <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 2, 
                pt: 2,
                borderTop: "1px solid #e0e0e0",
                bgcolor: "#f8f9fa"
              }}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  size="large"
                  startIcon={<Chat />}
                  sx={{
                    borderRadius: 3,
                    py: 1.3,
                    fontWeight: "700",
                    fontSize: "0.95rem",
                    background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                    boxShadow: "0 6px 20px rgba(37, 211, 102, 0.4)",
                    "&:hover": {
                      boxShadow: "0 8px 25px rgba(37, 211, 102, 0.6)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                    minHeight: "48px"
                  }}
                  onClick={() => window.open("https://wa.me/521XXXXXXXXXX", "_blank")}
                >
                  Hablar con una asesora
                </Button>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    fullWidth
                    sx={{ 
                      borderRadius: 3, 
                      py: 1.1,
                      fontSize: "0.875rem",
                      minHeight: "44px"
                    }}
                    onClick={prev}
                  >
                    Atrás
                  </Button>
                  <Button
                    endIcon={<ArrowForward />}
                    variant="contained"
                    fullWidth
                    sx={{ 
                      borderRadius: 3, 
                      py: 1.1,
                      fontSize: "0.875rem",
                      minHeight: "44px"
                    }}
                    onClick={next}
                  >
                    Siguiente
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}

        {/* STEP 3 - FAQ + Testimonios en Video con videos locales */}
        {step === 3 && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                p: 2,
              }}
            >
              <Box sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Preguntas frecuentes */}
                <Typography variant="h6" fontWeight="700">
                  Preguntas frecuentes
                </Typography>

                <Box sx={{ display: "grid", gap: 2 }}>
                  {faqs.map((f, i) => (
                    <Paper
                      key={i}
                      elevation={3}
                      sx={{
                        borderRadius: 3,
                        p: 2,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": { transform: "translateY(-2px)", boxShadow: "0 10px 20px rgba(0,0,0,0.15)" },
                      }}
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography fontWeight="600" sx={{ fontSize: "0.9rem" }}>{f.q}</Typography>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            bgcolor: faqOpen === i ? "#1E88E5" : "#f0f4f8",
                            color: faqOpen === i ? "#fff" : "#1E88E5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "0.8rem"
                          }}
                        >
                          {faqOpen === i ? "−" : "+"}
                        </Box>
                      </Box>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={faqOpen === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faqOpen === i && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: "0.8rem" }}>
                            {f.a}
                          </Typography>
                        )}
                      </motion.div>
                    </Paper>
                  ))}
                </Box>

                {/* Testimonios en Video */}
                <Typography variant="h6" fontWeight="700" sx={{ mt: 3 }}>
                  Testimonios en Video
                </Typography>
                <Box sx={{ display: "grid", gap: 3 }}>
                  {videoTestimonials.map((testimonial, index) => (
                    <Paper
                      key={index}
                      elevation={4}
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                        background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                        border: "1px solid #e0e0e0",
                        position: "relative",
                      }}
                    >
                      {/* Video Player Local */}
                      <Box
                        sx={{
                          position: "relative",
                          aspectRatio: "16/9",
                          bgcolor: "#000",
                          cursor: "pointer",
                          overflow: "hidden",
                        }}
                        onClick={() => handleVideoPlay(index)}
                      >
                        {playingVideo === index ? (
                          // Video reproduciéndose
                          <video
                            controls
                            autoPlay
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onEnded={() => setPlayingVideo(null)}
                          >
                            <source src={testimonial.video} type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                          </video>
                        ) : (
                          // Thumbnail con botón de play
                          <>
                            <Box
                              component="img"
                              src={testimonial.thumbnail}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                filter: "brightness(0.7)",
                              }}
                              alt={`Thumbnail de ${testimonial.name}`}
                            />
                            {/* Overlay con botón de play */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(0,0,0,0.3)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  background: "rgba(0,0,0,0.2)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: "50%",
                                  bgcolor: "rgba(255,255,255,0.9)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    transform: "scale(1.1)",
                                    bgcolor: "rgba(255,255,255,1)",
                                  },
                                }}
                              >
                                <PlayArrow sx={{ color: "#1E88E5", fontSize: 25 }} />
                              </Box>
                            </Box>
                            {/* Badge de duración */}
                            <Chip
                              label={testimonial.duration}
                              size="small"
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                right: 8,
                                bgcolor: "rgba(0,0,0,0.7)",
                                color: "white",
                                fontWeight: "600",
                                fontSize: "0.7rem",
                                height: "24px"
                              }}
                            />
                          </>
                        )}
                      </Box>

                      {/* Información del testimonio */}
                      <Box sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight="700" sx={{ mb: 0.5, fontSize: "0.9rem" }}>
                              {testimonial.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                              {testimonial.role}
                            </Typography>
                          </Box>
                          <Chip
                            label="VIDEO"
                            size="small"
                            sx={{
                              bgcolor: "#1E88E5",
                              color: "white",
                              fontWeight: "600",
                              fontSize: "0.65rem",
                              height: "22px"
                            }}
                          />
                        </Box>
                        
                        {/* Rating */}
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1.5 }}>
                          <Box sx={{ display: "flex", gap: 0.3 }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Box
                                key={star}
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: "50%",
                                  bgcolor: "#FFD700",
                                }}
                              />
                            ))}
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: "0.7rem" }}>
                            5.0 • Experiencia verificada
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </Box>

              {/* Botones ajustados al mismo tamaño */}
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ 
                    borderRadius: 3, 
                    py: 1.1,
                    fontSize: "0.875rem",
                    minHeight: "44px"
                  }} 
                  onClick={prev}
                >
                  Atrás
                </Button>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ 
                    borderRadius: 3, 
                    py: 1.1,
                    fontSize: "0.875rem",
                    minHeight: "44px"
                  }}
                  onClick={next}
                >
                  Finalizar
                </Button>
              </Box>
            </Box>
          </motion.div>
        )}

        {/* STEP 4 - Cupón de Regalo */}
        {step === 4 && (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <Box
              sx={{
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
                bgcolor: "#f8f9fa",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Efecto de Confeti */}
              <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      y: -50, 
                      x: Math.random() * 100 - 50,
                      opacity: 0,
                      rotate: 0
                    }}
                    animate={{ 
                      y: "100vh", 
                      x: Math.random() * 100 - 50,
                      opacity: [0, 1, 1, 0],
                      rotate: 360
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      repeat: 0
                    }}
                    style={{
                      position: "absolute",
                      left: `${Math.random() * 100}%`,
                      width: 12,
                      height: 12,
                      background: ["#FF6B35", "#4CAF50", "#1E88E5", "#FFD700", "#9C27B0"][Math.floor(Math.random() * 5)],
                      borderRadius: "50%",
                    }}
                  />
                ))}
              </Box>

              {/* Cupón Simple */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    width: "100%",
                    maxWidth: 350,
                    borderRadius: 3,
                    overflow: "hidden",
                    background: "white",
                    border: "2px solid #e0e0e0",
                    position: "relative",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* Contenido del Cupón */}
                  <Box sx={{ p: 4, textAlign: "center" }}>
                    {/* Icono de regalo */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "0 auto 20px",
                          boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
                        }}
                      >
                        <Typography variant="h4" fontWeight="800" sx={{ color: "white" }}>
                          🎁
                        </Typography>
                      </Box>
                    </motion.div>

                    {/* Texto principal */}
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 1, color: "#1a1a1a" }}>
                      ¡Felicidades!
                    </Typography>
                    <Typography variant="h6" fontWeight="600" sx={{ mb: 3, color: "#666" }}>
                      Tienes un regalo especial
                    </Typography>

                    {/* Monto del regalo */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      <Box
                        sx={{
                          background: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
                          color: "white",
                          padding: "20px",
                          borderRadius: 2,
                          marginBottom: 3,
                          boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                        }}
                      >
                        <Typography variant="h3" fontWeight="800" sx={{ mb: 1 }}>
                          $200
                        </Typography>
                        <Typography variant="h6" fontWeight="600">
                          EN TU CONSULTA
                        </Typography>
                      </Box>
                    </motion.div>

                    {/* Información importante */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: "#666", 
                          lineHeight: 1.6,
                          mb: 2,
                          textAlign: "center"
                        }}
                      >
                        Espera nuestra llamada en las próximas horas hábiles desde un número local.
                      </Typography>
                    </motion.div>

                    {/* Código de cupón */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "#FFF3E0",
                          border: "2px dashed #FF9800",
                          mb: 3,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#E65100", fontWeight: "600", mb: 1 }}>
                          Para hacer válido el cupón al ir a tu consulta, muestra este código:
                        </Typography>
                        <Typography 
                          variant="h5" 
                          fontWeight="800" 
                          sx={{ 
                            color: "#FF6B35",
                            fontFamily: "'Courier New', monospace",
                            letterSpacing: 2,
                            background: "rgba(255,255,255,0.7)",
                            padding: "8px 12px",
                            borderRadius: 1,
                            border: "1px solid #FFB74D"
                          }}
                        >
                          {Math.random().toString(36).substr(2, 8).toUpperCase()}
                        </Typography>
                      </Paper>
                    </motion.div>

                    {/* Botón de WhatsApp */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<Chat />}
                        sx={{
                          borderRadius: 3,
                          py: 1.5,
                          fontWeight: "700",
                          fontSize: "1rem",
                          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                          boxShadow: "0 6px 20px rgba(37, 211, 102, 0.4)",
                          "&:hover": {
                            boxShadow: "0 8px 25px rgba(37, 211, 102, 0.6)",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.3s ease",
                          mb: 2,
                        }}
                        onClick={() => {
                          const message = "¡Hola! Acabo de recibir un regalo de $200 para mi consulta médica. Te comparto esta increíble oferta por si la necesitas: [Enlace de la clínica]";
                          window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
                        }}
                      >
                        Compartir por WhatsApp
                      </Button>
                    </motion.div>

                    {/* Botón secundario */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderRadius: 3,
                          py: 1.2,
                          fontWeight: "600",
                          borderColor: "#ccc",
                          color: "#666",
                          "&:hover": {
                            borderColor: "#999",
                            bgcolor: "rgba(0,0,0,0.02)",
                          },
                        }}
                        onClick={() => setStep(0)}
                      >
                        Volver al Inicio
                      </Button>
                    </motion.div>
                  </Box>
                </Paper>
              </motion.div>

              {/* Mensaje adicional */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 3, 
                    color: "#666", 
                    textAlign: "center",
                    maxWidth: 350,
                    lineHeight: 1.5
                  }}
                >
                  Comparte esta increíble oferta con alguien que pueda necesitarla
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}