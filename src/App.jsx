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
  useTheme,
  useMediaQuery,
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
  KeyboardArrowDown,
  ChevronRight,
} from "@mui/icons-material";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

// Importar videos locales
import videoIntro from '../src/assets/videos/Eternalvsl1.mp4';
import testimonioMariana from '../src/assets/videos/Slide-1.mp4';
import galeriasVideo1 from '../src/assets/videos/TerraNova-Map.mp4';

import imgGalerias from "../src/assets/img/foto-galerias.jpg";

export default function ClinicOnboardingMobile() {
  const [step, setStep] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);
  const [playingBranchVideo, setPlayingBranchVideo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const theme = useTheme();
  const isSmallMobile = useMediaQuery('(max-width: 360px)');

  // Tamaños optimizados para 360x740px
  const mobileSizes = {
    padding: isSmallMobile ? 2 : 3,
    buttonHeight: "48px",
    buttonFontSize: "1rem",
    titleFontSize: "1.3rem",
    bodyFontSize: "1rem",
    cardPadding: isSmallMobile ? 2 : 3,
    iconSize: isSmallMobile ? "24px" : "28px",
  };

  const branches = [
    { 
      name: "Galerías", 
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.6173644001456!2d-100.35766342379881!3d25.683975877400812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866297cef094fea9%3A0xeaea01d6dd72287!2sEternal%20Centro%20Medico%20Galer%C3%ADas!5e0!3m2!1ses-419!2smx!4v1760511783100!5m2!1ses-419!2smx",
      image: imgGalerias
    },
    { 
      name: "Terranova", 
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.6173644001456!2d-100.35766342379881!3d25.683975877400812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866297cef094fea9%3A0xeaea01d6dd72287!2sEternal%20Centro%20Medico%20Galer%C3%ADas!5e0!3m2!1ses-419!2smx!4v1760511783100!5m2!1ses-419!2smx",
      image: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=400"
    },
    { 
      name: "Saltillo", 
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.6173644001456!2d-100.35766342379881!3d25.683975877400812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866297cef094fea9%3A0xeaea01d6dd72287!2sEternal%20Centro%20Medico%20Galer%C3%ADas!5e0!3m2!1ses-419!2smx!4v1760511783100!5m2!1ses-419!2smx",
      image: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=400"
    },
    { 
      name: "Cdmx", 
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.6173644001456!2d-100.35766342379881!3d25.683975877400812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866297cef094fea9%3A0xeaea01d6dd72287!2sEternal%20Centro%20Medico%20Galer%C3%ADas!5e0!3m2!1ses-419!2smx!4v1760511783100!5m2!1ses-419!2smx",
      image: "https://images.unsplash.com/photo-1551966775-a4ddc8df052b?w=400"
    },
  ];

  const branchVideos = {
    "Galerías": [galeriasVideo1],
    "Terranova": [galeriasVideo1],
    "Saltillo": [galeriasVideo1],
    "Cdmx": [galeriasVideo1],
  };

  const faqs = [
    { q: "¿Puedo llegar antes?", a: "Sí, se recomienda llegar 10 minutos antes." },
    { q: "¿Hay estacionamiento?", a: "Sí, contamos con estacionamiento para pacientes." },
    { q: "¿Se acepta seguro médico?", a: "Sí, verificamos cobertura con anticipación." },
    { q: "¿Puedo consultar tratamientos alternativos?", a: "Sí, nuestros especialistas te guiarán según tu caso." },
    { q: "¿Cuál es la duración promedio de la consulta?", a: "Aproximadamente 30 minutos, según necesidad." },
  ];

  const carouselRef = useRef(null);

  // Función para manejar el scroll
  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const slideWidth = carouselRef.current.offsetWidth;
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    }
  };

  // Función para desplazarse a un slide específico
  const scrollToSlide = (slideIndex) => {
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: slideWidth * slideIndex,
        behavior: 'smooth'
      });
      setCurrentSlide(slideIndex);
    }
  };

  function next() {
    setStep((s) => Math.min(s + 1, 4));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const handleVideoPlay = (videoType) => {
    if (playingVideo === videoType) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(videoType);
    }
  };

  const handleBranchVideoPlay = (branchName, videoIndex) => {
    setPlayingBranchVideo(`${branchName}-${videoIndex}`);
  };

  // Función para prevenir el comportamiento predeterminado de iOS
  const preventDefault = (e) => {
    e.preventDefault();
  };

  // Componente de botones estandarizado
  const NavigationButtons = ({ onPrev, onNext, nextDisabled = false, prevLabel = "Atrás", nextLabel = "Siguiente" }) => (
    <Box sx={{ display: "flex", gap: 2, mt: "auto", pt: 2 }}>
      <Button 
        variant="outlined" 
        fullWidth 
        sx={{ 
          borderRadius: 2, 
          py: 1.5,
          fontSize: mobileSizes.buttonFontSize,
          minHeight: mobileSizes.buttonHeight,
          fontWeight: "600"
        }} 
        onClick={onPrev}
      >
        {prevLabel}
      </Button>
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ 
          borderRadius: 2, 
          py: 1.5,
          fontSize: mobileSizes.buttonFontSize,
          minHeight: mobileSizes.buttonHeight,
          fontWeight: "600",
          background: "linear-gradient(135deg, #346bf1 0%, #2E7D32 100%)",
        }}
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: "360px",
        minHeight: "740px",
        height: "100dvh",
        bgcolor: "#f9fafb",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        touchAction: "manipulation",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        // Prevenir zoom en iOS
        fontSize: "16px", // Tamaño mínimo para prevenir zoom automático
      }}
      // Prevenir zoom con gestos
      onTouchStart={(e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
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
            <Box sx={{ 
              height: "100dvh", 
              p: mobileSizes.padding, 
              display: "flex", 
              flexDirection: "column",
              minHeight: "740px",
              overflow: "hidden", // Prevenir scroll innecesario
            }}>
              {/* Video Player */}
              <Paper
                sx={{
                  aspectRatio: "16/9",
                  borderRadius: 2,
                  overflow: "hidden",
                  mb: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  position: "relative",
                  cursor: !videoEnded ? "pointer" : "default",
                  minHeight: "200px",
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                }}
              >
                {!videoEnded ? (
                  playingVideo === "intro" ? (
                    <video
                      ref={videoRef}
                      controls
                      autoPlay
                      playsInline
                      webkit-playsinline="true"
                      disablePictureInPicture
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      }}
                      onContextMenu={preventDefault}
                      onEnded={() => {
                        setVideoEnded(true);
                        setPlayingVideo(null);
                      }}
                    >
                      <source src={videoIntro} type="video/mp4" />
                    </video>
                  ) : (
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
                        playsInline
                        webkit-playsinline="true"
                      >
                        <source src={videoIntro} type="video/mp4" />
                      </video>
                      
                      <PlayCircle sx={{ 
                        position: "absolute", 
                        color: "#346bf1", 
                        fontSize: 60,
                        bgcolor: "rgba(255,255,255,0.9)",
                        borderRadius: "50%",
                        p: 1,
                        zIndex: 2
                      }} />
                      
                      <Typography 
                        sx={{ 
                          position: "absolute", 
                          bottom: 12, 
                          left: 12, 
                          color: "#346bf1", 
                          fontWeight: "700",
                          fontSize: "1rem",
                          zIndex: 2,
                          background: "rgba(255,255,255,0.9)",
                          padding: "6px 12px",
                          borderRadius: 2,
                        }}
                      >
                        Ver video
                      </Typography>
                      
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
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "#E3F2FD",
                      p: 3,
                    }}
                  >
                    <CheckCircle sx={{ color: "#4CAF50", fontSize: 50, mb: 2 }} />
                    <Typography 
                      variant="h6" 
                      fontWeight="700" 
                      textAlign="center" 
                      sx={{ color: "#346bf1", mb: 1, fontSize: mobileSizes.titleFontSize }}
                    >
                      Video completado
                    </Typography>
                    <Typography 
                      variant="body1" 
                      textAlign="center" 
                      sx={{ color: "#666", fontSize: mobileSizes.bodyFontSize }}
                    >
                      Selecciona tu sucursal
                    </Typography>
                  </Box>
                )}
              </Paper>

              <Typography variant="h6" fontWeight="700" sx={{ mb: 2, fontSize: mobileSizes.titleFontSize, textAlign: "center" }}>
                ¡Felicidades! Tu cita está agendada
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: mobileSizes.bodyFontSize, textAlign: "center" }}>
                Revisa cada sección y selecciona tu sucursal.
              </Typography>

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
                        mb: 3, 
                        textAlign: "center",
                        color: "#346bf1",
                        fontSize: "1.1rem"
                      }}
                    >
                      🏥 Selecciona tu sucursal
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
                  gap: 2,
                  mb: 2,
                  minHeight: "200px"
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
                      elevation={selectedBranch === s.name ? 4 : 2}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: selectedBranch === s.name ? "#e3f2fd" : "white",
                        border: selectedBranch === s.name ? "2px solid #346bf1" : "1px solid #e0e0e0",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        transition: "all 0.2s ease",
                        minHeight: "60px"
                      }}
                      onClick={() => setSelectedBranch(s.name)}
                    >
                      <Place sx={{ color: "#346bf1", fontSize: mobileSizes.iconSize }} />
                      <Typography variant="body1" fontWeight="600" sx={{ fontSize: mobileSizes.bodyFontSize }}>
                        {s.name}
                      </Typography>
                    </Paper>
                  </motion.div>
                ))}
              </Box>

              <AnimatePresence>
                {videoEnded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      delay: 0.3 
                    }}
                  >
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ 
                        borderRadius: 2, 
                        fontWeight: "700", 
                        py: 1.5,
                        fontSize: mobileSizes.buttonFontSize,
                        minHeight: mobileSizes.buttonHeight,
                        background: "linear-gradient(135deg, #346bf1 0%, #2E7D32 100%)",
                        boxShadow: "0 4px 12px rgba(52, 107, 241, 0.3)",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(52, 107, 241, 0.4)",
                        },
                      }}
                      onClick={next}
                      disabled={!selectedBranch}
                    >
                      Continuar a {selectedBranch || "Sucursal"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              {!videoEnded && !playingVideo && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Typography 
                    variant="body1" 
                    textAlign="center" 
                    color="text.secondary" 
                    sx={{ mt: 3, fontStyle: "italic", fontSize: mobileSizes.bodyFontSize }}
                  >
                    Mira el video introductorio primero
                  </Typography>
                </motion.div>
              )}
            </Box>
          </motion.div>
        )}

        {/* STEP 1 - Info de sucursal CON CARRUSEL HORIZONTAL */}
        {step === 1 && (
  <motion.div
    key={step}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.5 }}
  >
    <Box
      sx={{
        height: "100dvh",
        p: mobileSizes.padding,
        display: "flex",
        flexDirection: "column",
        minHeight: "740px",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f8faff 0%, #eef2f7 100%)",
      }}
    >
      {/* Título de sucursal */}
      <Typography
        variant="h5"
        fontWeight="700"
        sx={{
          mb: 2,
          fontSize: mobileSizes.titleFontSize,
          textAlign: "center",
          color: "#1b3a57",
          letterSpacing: "0.5px",
        }}
      >
        {selectedBranch}
      </Typography>

      {/* Carrusel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 2,
          overflow: "hidden",
        }}
      >
        <Box
          ref={carouselRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 3,
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            flex: 1,
            borderRadius: 3,
          }}
          onScroll={handleScroll}
        >
          {/* SLIDE 1: Mapa + Imagen */}
          <Paper
            sx={{
              minWidth: "100%",
              scrollSnapAlign: "start",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Imagen superior */}
            <Box
              component="img"
              src={branches.find((b) => b.name === selectedBranch)?.image}
              alt={`Imagen de ${selectedBranch}`}
              sx={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                filter: "brightness(0.9)",
              }}
            />

            {/* Info inferior: mapa */}
            <Box sx={{ p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#1b3a57",
                  fontWeight: 700,
                  mb: 1,
                  textAlign: "center",
                }}
              >
                Ubicación
              </Typography>

              <Box
                sx={{
                  height: "220px",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: "1px solid #e0e5eb",
                }}
              >
                <iframe
                  title={selectedBranch}
                  src={branches.find((b) => b.name === selectedBranch)?.map}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            </Box>
          </Paper>

          {/* SLIDE 2: VIDEOS */}
          <Box
            sx={{
              minWidth: "100%",
              scrollSnapAlign: "start",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            {branchVideos[selectedBranch]?.map((video, index) => (
              <Paper
                key={index}
                sx={{
                  width: "100%",
                  maxWidth: "280px",
                  height: "420px",
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  bgcolor: "#000",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                }}
                onClick={() => handleBranchVideoPlay(selectedBranch, index)}
              >
                {playingBranchVideo === `${selectedBranch}-${index}` ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onEnded={() => setPlayingBranchVideo(null)}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <video
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.8,
                        filter: "brightness(0.6)",
                      }}
                      muted
                      playsInline
                    >
                      <source src={video} type="video/mp4" />
                    </video>

                    {/* Círculo de play */}
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
                          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                        }}
                      >
                        <PlayArrow sx={{ color: "#346bf1", fontSize: 28 }} />
                      </Box>
                    </Box>

                    {/* Etiqueta */}
                    <Typography
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        color: "white",
                        fontWeight: 600,
                        background: "rgba(0,0,0,0.6)",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: "0.85rem",
                      }}
                    >
                      Video {index + 1}
                    </Typography>
                  </Box>
                )}
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Indicador de slide */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, py: 1 }}>
          {[0, 1].map((i) => (
            <Box
              key={i}
              onClick={() => scrollToSlide(i)}
              sx={{
                width: currentSlide === i ? 12 : 8,
                height: currentSlide === i ? 12 : 8,
                borderRadius: "50%",
                bgcolor: currentSlide === i ? "#346bf1" : "#ccc",
                boxShadow:
                  currentSlide === i
                    ? "0 0 0 3px rgba(52,107,241,0.2)"
                    : "none",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#5b6673",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "0.8rem",
          }}
        >
          {currentSlide === 0
            ? "📍 Mapa y fotografía de la sucursal"
            : "🎥 Videos de presentación"}
        </Typography>
      </Box>

      <NavigationButtons onPrev={prev} onNext={next} />
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
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                p: mobileSizes.padding,
                bgcolor: "#f8f9fa",
                overflow: "hidden",
              }}
            >
              <Box sx={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column",
                overflowY: "auto",
                pb: 2 
              }}>
                <Box sx={{ textAlign: "center", mb: 4, px: 1 }}>
                  <CheckCircle 
                    sx={{ 
                      color: "#346bf1", 
                      fontSize: 60, 
                      mb: 3,
                    }} 
                  />
                  <Typography variant="h5" fontWeight="700" sx={{ mb: 2, color: "#1a1a1a", fontSize: mobileSizes.titleFontSize }}>
                    ¡Completa tu proceso!
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#666", lineHeight: 1.6, fontSize: mobileSizes.bodyFontSize }}>
                    Conecta con nuestra asesora especializada.
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 4, px: 1 }}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <Chat sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h6" fontWeight="700" sx={{ mb: 1, fontSize: "1.1rem" }}>
                      Contacto Inmediato
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, fontSize: "0.9rem" }}>
                      Resuelve dudas y confirma horarios
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "white",
                      border: "2px solid #e3f2fd",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                      <Schedule sx={{ color: "#346bf1", mr: 2, mt: 0.2, fontSize: 24 }} />
                      <Box>
                        <Typography variant="h6" fontWeight="600" sx={{ fontSize: "1rem" }}>
                          Información importante
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: "0.9rem", mt: 1 }}>
                          <Box component="span" fontWeight="600" color="#1a1a1a">
                            Si ya dejaste tus datos, resiviras nuestra llamada
                          </Box>{" "}
                          en las próximas horas o puedes hablar con una de nuestras asesoras.
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>

                <Box sx={{ mb: 4, px: 1 }}>
                  <Typography variant="h6" fontWeight="600" sx={{ mb: 3, color: "#1a1a1a", fontSize: "1rem" }}>
                    ¿Por qué hablar con nuestra asesora?
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {[
                      "Confirmación inmediata de tu cita",
                      "Resolución de dudas sobre tratamiento",
                      "Información sobre preparación",
                      "Detalles de costos y pagos",
                      "Guía personalizada"
                    ].map((benefit, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "flex-start" }}>
                        <CheckCircle sx={{ color: "#346bf1", fontSize: 20, mr: 2, mt: 0.2 }} />
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: "0.9rem", lineHeight: 1.5 }}>
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

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
                  fullWidth
                  startIcon={<Phone />}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: "700",
                    fontSize: mobileSizes.buttonFontSize,
                    background: "linear-gradient(135deg, #346bf1 0%, #125f8c 100%)",
                    boxShadow: "0 4px 12px rgba(52, 107, 241, 0.4)",
                    minHeight: mobileSizes.buttonHeight
                  }}
                  onClick={() => window.open("tel:+528180744482", "_self")}
                >
                  Llamar ahora
                </Button>

                <NavigationButtons onPrev={prev} onNext={next} />
              </Box>
            </Box>
          </motion.div>
        )}

        {/* STEP 3 - FAQ + Testimonios CORREGIDO */}
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
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                p: mobileSizes.padding,
              }}
            >
              <Box sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Preguntas frecuentes */}
                <Typography variant="h5" fontWeight="700" sx={{ textAlign: "center" }}>
                  Preguntas frecuentes
                </Typography>

                <Box sx={{ display: "grid", gap: 2 }}>
                  {faqs.map((f, i) => (
                    <Paper
                      key={i}
                      elevation={3}
                      sx={{
                        borderRadius: 2,
                        p: 2,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" },
                      }}
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography fontWeight="600" sx={{ fontSize: "1rem" }}>{f.q}</Typography>
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            bgcolor: faqOpen === i ? "#346bf1" : "#f0f4f8",
                            color: faqOpen === i ? "#fff" : "#346bf1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "1rem"
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
                          <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, fontSize: "0.9rem" }}>
                            {f.a}
                          </Typography>
                        )}
                      </motion.div>
                    </Paper>
                  ))}
                </Box>

                {/* Testimonio de Paciente */}
                <Typography variant="h5" fontWeight="700" sx={{ mt: 3, textAlign: "center" }}>
                  Testimonio de Paciente
                </Typography>

                {/* Video Player de Testimonio - SE PUEDE REPRODUCIR CUANTAS VECES QUIERA */}
                <Paper
                  sx={{
                    aspectRatio: "16/9",
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    position: "relative",
                    cursor: "pointer",
                    minHeight: "200px",
                    WebkitUserSelect: "none",
                    WebkitTouchCallout: "none",
                  }}
                >
                  {playingVideo === "testimonial" ? (
                    <video
                      controls
                      autoPlay
                      playsInline
                      webkit-playsinline="true"
                      disablePictureInPicture
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      }}
                      onContextMenu={preventDefault}
                      onEnded={() => setPlayingVideo(null)}
                    >
                      <source src={testimonioMariana} type="video/mp4" />
                    </video>
                  ) : (
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
                      onClick={() => setPlayingVideo("testimonial")}
                    >
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
                        playsInline
                        webkit-playsinline="true"
                      >
                        <source src={testimonioMariana} type="video/mp4" />
                      </video>
                      
                      <PlayCircle sx={{ 
                        position: "absolute", 
                        color: "#346bf1", 
                        fontSize: 60,
                        bgcolor: "rgba(255,255,255,0.9)",
                        borderRadius: "50%",
                        p: 1,
                        zIndex: 2
                      }} />
                      
                      <Typography 
                        sx={{ 
                          position: "absolute", 
                          bottom: 12, 
                          left: 12, 
                          color: "#346bf1", 
                          fontWeight: "700",
                          fontSize: "1rem",
                          zIndex: 2,
                          background: "rgba(255,255,255,0.9)",
                          padding: "6px 12px",
                          borderRadius: 2,
                        }}
                      >
                        Ver testimonio
                      </Typography>
                      
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
                  )}
                </Paper>

                {/* Información del testimonio */}
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="h6" fontWeight="700" sx={{ mb: 1.5, fontSize: "1.1rem" }}>
                    Mariana López
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: "0.9rem" }}>
                    Paciente con Artritis - Tratamiento completado
                  </Typography>
                  
                  {/* Rating */}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Box
                          key={star}
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            bgcolor: "#FFD700",
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 1.5, fontSize: "0.9rem" }}>
                      5.0 • Experiencia verificada
                    </Typography>
                  </Box>
                </Paper>
              </Box>

              <NavigationButtons onPrev={prev} onNext={next} nextLabel="Finalizar" />
            </Box>
          </motion.div>
        )}

        {/* STEP 4 - Cupón de Regalo OPTIMIZADO para 360x740 */}
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
                minHeight: "740px",
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: isSmallMobile ? 1.5 : 2,
                bgcolor: "#f8f9fa",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Efecto de Confeti más compacto */}
              <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      y: -30, 
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
                      duration: 1.2 + Math.random() * 1.2,
                      delay: Math.random() * 0.2,
                      repeat: 0
                    }}
                    style={{
                      position: "absolute",
                      left: `${Math.random() * 100}%`,
                      width: 6,
                      height: 6,
                      background: ["#346bf1", "#346bf1", "#1E88E5", "#346bf1", "#2730b0"][Math.floor(Math.random() * 5)],
                      borderRadius: "50%",
                    }}
                  />
                ))}
              </Box>

              {/* Cupón OPTIMIZADO para 360px */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ width: "100%" }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    width: "100%",
                    maxWidth: "320px",
                    borderRadius: 2,
                    overflow: "hidden",
                    background: "white",
                    border: "2px solid #e0e0e0",
                    position: "relative",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                    margin: "0 auto",
                  }}
                >
                  <Box sx={{ p: isSmallMobile ? 2 : 2.5, textAlign: "center" }}>
                    {/* Icono de regalo más compacto */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Box
                        sx={{
                          width: 55,
                          height: 55,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #346bf1 0%, #1ea0f7 100%)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "0 auto 15px",
                          boxShadow: "0 3px 8px rgba(52, 107, 241, 0.3)",
                        }}
                      >
                        <Typography variant="h5" fontWeight="800" sx={{ color: "white" }}>
                          🎁
                        </Typography>
                      </Box>
                    </motion.div>

                    {/* Texto principal compacto */}
                    <Typography variant="h6" fontWeight="700" sx={{ mb: 0.5, color: "#1a1a1a", fontSize: "1.2rem" }}>
                      ¡Felicidades!
                    </Typography>
                    <Typography variant="body1" fontWeight="600" sx={{ mb: 2, color: "#666", fontSize: "0.9rem" }}>
                      Tienes un regalo especial
                    </Typography>

                    {/* Monto del regalo compacto */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      <Box
                        sx={{
                          background: "linear-gradient(135deg, #2c4db9 0%, #2e647d 100%)",
                          color: "white",
                          padding: "15px",
                          borderRadius: 2,
                          marginBottom: 2,
                          boxShadow: "0 3px 8px rgba(44, 77, 185, 0.3)",
                        }}
                      >
                        <Typography variant="h4" fontWeight="800" sx={{ mb: 0.5, fontSize: "1.8rem" }}>
                          $200
                        </Typography>
                        <Typography variant="body1" fontWeight="600" sx={{ fontSize: "0.85rem" }}>
                          EN TU CONSULTA
                        </Typography>
                      </Box>
                    </motion.div>

                    {/* Información importante compacta */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: "#666", 
                          lineHeight: 1.5,
                          mb: 2,
                          textAlign: "center",
                          fontSize: "0.8rem"
                        }}
                      >
                        Espera nuestra llamada en las próximas horas hábiles desde un número local.
                      </Typography>
                    </motion.div>

                    {/* Código de cupón compacto */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      <Paper
                        elevation={1}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: "#FFF3E0",
                          border: "2px dashed #346bf1",
                          mb: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#346bf1", fontWeight: "600", mb: 1, fontSize: "0.75rem" }}>
                          Muestra este código en tu consulta:
                        </Typography>
                        <Typography 
                          variant="h6" 
                          fontWeight="800" 
                          sx={{ 
                            color: "#346bf1",
                            fontFamily: "'Courier New', monospace",
                            letterSpacing: 1,
                            background: "rgba(255,255,255,0.7)",
                            padding: "6px 10px",
                            borderRadius: 1,
                            border: "1px solid #346bf1",
                            fontSize: "1rem"
                          }}
                        >
                          {Math.random().toString(36).substr(2, 8).toUpperCase()}
                        </Typography>
                      </Paper>
                    </motion.div>

                    {/* Botón de WhatsApp compacto */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                     <Button
  variant="contained"
  fullWidth
  startIcon={<Chat sx={{ fontSize: "20px" }} />}
  sx={{
    borderRadius: 2,
    py: 1.2,
    fontWeight: "700",
    fontSize: "0.9rem",
    background: "linear-gradient(135deg, #346bf1 0%, #124b8c 100%)",
    boxShadow: "0 3px 10px rgba(52, 107, 241, 0.4)",
    minHeight: "44px",
    mb: 1.5,
  }}
  onClick={() => {
    // Obtenemos el enlace según la sucursal seleccionada
    const clinicUrl = clinicLinks[selectedBranch] || "https://sucursales.eternal.mx/galerias";

    // Mensaje personalizado
    const message = `¡Hola! Acabo de recibir un regalo de $200 para mi consulta médica en la clínica ${selectedBranch}. 
Quiero asistir a consulta: ${clinicUrl}`;

    window.open(`https://wa.me/528180744482?text=${encodeURIComponent(message)}`, "_blank");
  }}
>
  Canjear Código
</Button>
                    </motion.div>

                    {/* Botón secundario compacto */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                    >
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          py: 1.2,
                          fontWeight: "600",
                          fontSize: "0.9rem",
                          borderColor: "#ccc",
                          color: "#666",
                          minHeight: "44px",
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

              {/* Mensaje adicional compacto */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 2, 
                    color: "#666", 
                    textAlign: "center",
                    maxWidth: "280px",
                    lineHeight: 1.4,
                    fontSize: "0.8rem"
                  }}
                >
                  Comparte esta oferta con alguien que pueda necesitarla
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}