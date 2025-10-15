import React, { useState, useRef, useEffect } from "react";
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
  Pause,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

// Importar videos locales
import videoIntro from '../src/assets/videos/Eternalvsl1.mp4';
import testimonioMariana from '../src/assets/videos/Slide-1.mp4';
import galeriasVideo1 from '../src/assets/videos/TerraNova-Map.mp4';

export default function ClinicOnboardingMobile() {
  const [step, setStep] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [faqOpen, setFaqOpen] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRefs = useRef({});
  const [playingBranchVideo, setPlayingBranchVideo] = useState(null);
  const [mutedVideos, setMutedVideos] = useState({});

  const theme = useTheme();
  const isSmallMobile = useMediaQuery('(max-width: 360px)');

  // Tamaños optimizados para 360x740px
  const mobileSizes = {
    padding: isSmallMobile ? 1.5 : 2,
    buttonHeight: "42px",
    buttonFontSize: "0.8rem",
    titleFontSize: "1rem",
    bodyFontSize: "0.75rem",
    cardPadding: isSmallMobile ? 1.5 : 2,
    iconSize: isSmallMobile ? "20px" : "24px",
  };

  const branches = [
    { name: "Galerías", map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.6173644001456!2d-100.35766342379881!3d25.683975877400812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x866297cef094fea9%3A0xeaea01d6dd72287!2sEternal%20Centro%20Medico%20Galer%C3%ADas!5e0!3m2!1ses-419!2smx!4v1760511783100!5m2!1ses-419!2smx"},
    { name: "Centro", map: "https://maps.google.com/?q=Centro" },
    { name: "Monterrey Norte", map: "https://maps.google.com/?q=Monterrey+Norte" },
    { name: "San Pedro", map: "https://maps.google.com/?q=San+Pedro" },
    { name: "Cumbres", map: "https://maps.google.com/?q=Cumbres" },
  ];

  const branchVideos = {
    "Galerías": [galeriasVideo1],
    "Centro": [galeriasVideo1],
    "Monterrey Norte": [galeriasVideo1],
    "San Pedro": [galeriasVideo1],
    "Cumbres": [galeriasVideo1],
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
      video: testimonioMariana,
      type: "local"
    },
    { 
      name: "Ana Martínez", 
      role: "Implantes Dentales",
      duration: "3:15",
      thumbnail: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=400",
      video: testimonioMariana,
      type: "local"
    },
  ];

  function next() {
    setStep((s) => Math.min(s + 1, 4));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  // Función mejorada para manejar videos de testimonios - SIN AUDIO DOBLE
  const handleTestimonialVideoPlay = async (index) => {
    const videoKey = `testimonial-${index}`;
    const videoElement = videoRefs.current[videoKey];

    if (!videoElement) return;

    // Si el video ya se está reproduciendo, pausarlo
    if (playingVideo === index) {
      videoElement.pause();
      setPlayingVideo(null);
      return;
    }

    // Pausar todos los otros videos primero
    Object.keys(videoRefs.current).forEach(key => {
      if (key !== videoKey && videoRefs.current[key]) {
        const otherVideo = videoRefs.current[key];
        otherVideo.pause();
        otherVideo.currentTime = 0;
      }
    });

    // Configurar el video antes de reproducir
    videoElement.currentTime = 0;
    videoElement.muted = false; // Asegurar que no esté muteado

    try {
      // Reproducir el video
      await videoElement.play();
      setPlayingVideo(index);
    } catch (error) {
      console.log("Error al reproducir video:", error);
      setPlayingVideo(null);
    }
  };

  const handleBranchVideoPlay = (branchName, videoIndex) => {
    setPlayingBranchVideo(`${branchName}-${videoIndex}`);
  };

  // Función para prevenir el comportamiento predeterminado de iOS
  const preventDefault = (e) => {
    e.preventDefault();
  };

  // Función para manejar el fin del video
  const handleVideoEnd = (index) => {
    setPlayingVideo(null);
    if (videoRefs.current[`testimonial-${index}`]) {
      videoRefs.current[`testimonial-${index}`].currentTime = 0;
    }
  };

  // Efecto para pausar videos cuando cambia el step
  useEffect(() => {
    if (step !== 3) {
      // Pausar todos los videos cuando no estamos en el step de testimonios
      Object.keys(videoRefs.current).forEach(key => {
        if (videoRefs.current[key]) {
          videoRefs.current[key].pause();
          videoRefs.current[key].currentTime = 0;
        }
      });
      setPlayingVideo(null);
    }
  }, [step]);

  // Función para toggle mute
  const toggleMute = (index, e) => {
    e.stopPropagation(); // Prevenir que active el play/pause
    const videoKey = `testimonial-${index}`;
    const videoElement = videoRefs.current[videoKey];
    
    if (videoElement) {
      videoElement.muted = !videoElement.muted;
      setMutedVideos(prev => ({
        ...prev,
        [videoKey]: videoElement.muted
      }));
    }
  };

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
        // Prevenir zoom en iOS
        touchAction: "manipulation",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
    >
      <AnimatePresence mode="wait">
        {/* STEP 0 - Bienvenida + Sucursales - OPTIMIZADO */}
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
              minHeight: "740px"
            }}>
              {/* Video Player COMPACTO */}
              <Paper
                sx={{
                  aspectRatio: "16/9",
                  borderRadius: 2,
                  overflow: "hidden",
                  mb: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  position: "relative",
                  cursor: !videoEnded ? "pointer" : "default",
                  minHeight: "160px",
                  // Prevenir comportamientos no deseados en iOS
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none",
                }}
              >
                {!videoEnded ? (
                  playingVideo === "intro" ? (
                    <video
                      ref={el => videoRefs.current['intro'] = el}
                      controls
                      autoPlay
                      playsInline // 🔥 IMPORTANTE: Para iOS
                      webkit-playsinline="true" // 🔥 IMPORTANTE: Para Safari iOS
                      disablePictureInPicture // Prevenir PiP
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        // Prevenir acciones no deseadas
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
                        playsInline // 🔥 Para el video de fondo
                        webkit-playsinline="true"
                      >
                        <source src={videoIntro} type="video/mp4" />
                      </video>
                      
                      <PlayCircle sx={{ 
                        position: "absolute", 
                        color: "#1E88E5", 
                        fontSize: isSmallMobile ? 40 : 45,
                        bgcolor: "rgba(255,255,255,0.9)",
                        borderRadius: "50%",
                        p: 0.5,
                        zIndex: 2
                      }} />
                      
                      <Typography 
                        sx={{ 
                          position: "absolute", 
                          bottom: 10, 
                          left: 10, 
                          color: "#1E88E5", 
                          fontWeight: "600",
                          fontSize: "0.75rem",
                          zIndex: 2,
                          background: "rgba(255,255,255,0.8)",
                          padding: "3px 6px",
                          borderRadius: 1,
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
                      p: 2,
                    }}
                  >
                    <CheckCircle sx={{ color: "#4CAF50", fontSize: 35, mb: 1 }} />
                    <Typography 
                      variant="h6" 
                      fontWeight="700" 
                      textAlign="center" 
                      sx={{ color: "#1E88E5", mb: 0.5, fontSize: mobileSizes.titleFontSize }}
                    >
                      Video completado
                    </Typography>
                    <Typography 
                      variant="body2" 
                      textAlign="center" 
                      sx={{ color: "#666", fontSize: mobileSizes.bodyFontSize }}
                    >
                      Selecciona tu sucursal
                    </Typography>
                  </Box>
                )}
              </Paper>

              <Typography variant="h6" fontWeight="700" sx={{ mb: 1, fontSize: mobileSizes.titleFontSize }}>
                ¡Felicidades! Tu cita está agendada
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: mobileSizes.bodyFontSize }}>
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
                        mb: 2, 
                        textAlign: "center",
                        color: "#1E88E5",
                        fontSize: "0.9rem"
                      }}
                    >
                      🏥 Selecciona tu sucursal
                    </Typography>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Lista de sucursales COMPACTA */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mb: 2,
                  minHeight: "180px"
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
                      elevation={selectedBranch === s.name ? 4 : 1}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: selectedBranch === s.name ? "#bbdefb" : "white",
                        border: selectedBranch === s.name ? "2px solid #1E88E5" : "1px solid #e0e0e0",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        transition: "all 0.2s ease",
                        minHeight: "48px"
                      }}
                      onClick={() => setSelectedBranch(s.name)}
                    >
                      <Place sx={{ color: "#1E88E5", fontSize: mobileSizes.iconSize }} />
                      <Typography variant="body2" fontWeight="500" sx={{ fontSize: mobileSizes.bodyFontSize }}>
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
                        fontWeight: "600", 
                        py: 1,
                        fontSize: mobileSizes.buttonFontSize,
                        minHeight: mobileSizes.buttonHeight,
                        background: "linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)",
                        boxShadow: "0 2px 8px rgba(30, 136, 229, 0.3)",
                        "&:hover": {
                          boxShadow: "0 4px 12px rgba(30, 136, 229, 0.4)",
                        },
                      }}
                      onClick={next}
                      disabled={!selectedBranch}
                      endIcon={<ArrowForward sx={{ fontSize: "18px" }} />}
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
                    variant="body2" 
                    textAlign="center" 
                    color="text.secondary" 
                    sx={{ mt: 2, fontStyle: "italic", fontSize: mobileSizes.bodyFontSize }}
                  >
                    Mira el video introductorio primero
                  </Typography>
                </motion.div>
              )}
            </Box>
          </motion.div>
        )}

        {/* STEP 1 - Info de sucursal - OPTIMIZADO */}
        {step === 1 && (
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
              minHeight: "740px"
            }}>
              <Typography variant="h6" fontWeight="700" sx={{ mb: 1, fontSize: mobileSizes.titleFontSize }}>
                {selectedBranch}
              </Typography>

              {/* Mapa COMPACTO */}
              <Paper
                sx={{
                  height: "150px",
                  borderRadius: 2,
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

              {/* Videos MÁS PEQUEÑOS para 360px */}
              {branchVideos[selectedBranch]?.map((video, index) => (
                <Paper
                  key={index}
                  sx={{
                    width: "100%",
                    maxWidth: "220px",
                    height: "390px",
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: 2,
                    position: "relative",
                    cursor: "pointer",
                    bgcolor: "#000",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => handleBranchVideoPlay(selectedBranch, index)}
                >
                  {playingBranchVideo === `${selectedBranch}-${index}` ? (
                    <video
                      controls
                      autoPlay
                      playsInline // 🔥 IMPORTANTE: Para iOS
                      webkit-playsinline="true" // 🔥 IMPORTANTE: Para Safari iOS
                      disablePictureInPicture
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#000",
                      }}
                      onContextMenu={preventDefault}
                      onEnded={() => setPlayingBranchVideo(null)}
                    >
                      <source src={video} type="video/mp4" />
                    </video>
                  ) : (
                    <>
                      <video
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: 0.7,
                          filter: "brightness(0.6)",
                        }}
                        muted
                        playsInline
                        webkit-playsinline="true"
                      >
                        <source src={video} type="video/mp4" />
                      </video>
                      
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
                            width: 45,
                            height: 45,
                            borderRadius: "50%",
                            bgcolor: "rgba(255,255,255,0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                          }}
                        >
                          <PlayArrow sx={{ color: "#346bf1", fontSize: 22 }} />
                        </Box>
                      </Box>
                      
                      <Typography sx={{ 
                        position: "absolute", 
                        bottom: 8, 
                        left: 8, 
                        color: "white", 
                        fontWeight: "600",
                        background: "rgba(0,0,0,0.6)",
                        padding: "2px 6px",
                        borderRadius: 1,
                        fontSize: "0.7rem"
                      }}>
                        Video {index + 1}
                      </Typography>
                    </>
                  )}
                </Paper>
              ))}

              {/* Botones COMPACTOS */}
              <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                <Button
                  startIcon={<ArrowBack sx={{ fontSize: "18px" }} />}
                  variant="outlined"
                  fullWidth
                  sx={{ 
                    borderRadius: 2, 
                    py: 1,
                    fontSize: mobileSizes.buttonFontSize,
                    minHeight: mobileSizes.buttonHeight
                  }}
                  onClick={prev}
                >
                  Atrás
                </Button>
                <Button
                  endIcon={<ArrowForward sx={{ fontSize: "18px" }} />}
                  variant="contained"
                  fullWidth
                  sx={{ 
                    borderRadius: 2, 
                    py: 1,
                    fontSize: mobileSizes.buttonFontSize,
                    minHeight: mobileSizes.buttonHeight
                  }}
                  onClick={next}
                >
                  Siguiente
                </Button>
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

                {/* Testimonios en Video - CORREGIDO SIN AUDIO DOBLE */}
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
                      {/* Video Player Local - VERSIÓN SIMPLIFICADA */}
                      <Box
                        sx={{
                          position: "relative",
                          aspectRatio: "16/9",
                          bgcolor: "#000",
                          cursor: "pointer",
                          overflow: "hidden",
                        }}
                        onClick={() => handleTestimonialVideoPlay(index)}
                      >
                        {/* Video element - SIN AUTOPLAY */}
                        <video
                          ref={el => {
                            if (el) {
                              videoRefs.current[`testimonial-${index}`] = el;
                              // Configurar muted por defecto para evitar sorpresas
                              el.muted = false;
                            }
                          }}
                          playsInline // 🔥 CRUCIAL para iOS
                          webkit-playsinline="true" // 🔥 CRUCIAL para Safari
                          disablePictureInPicture
                          preload="metadata"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            backgroundColor: "#000",
                            display: playingVideo === index ? "block" : "none",
                          }}
                          onContextMenu={preventDefault}
                          onEnded={() => handleVideoEnd(index)}
                        >
                          <source src={testimonial.video} type="video/mp4" />
                          Tu navegador no soporta el elemento de video.
                        </video>

                        {/* Thumbnail - solo se muestra cuando NO se está reproduciendo */}
                        {playingVideo !== index && (
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
                                }}
                              >
                                <PlayArrow sx={{ color: "#1E88E5", fontSize: 25 }} />
                              </Box>
                            </Box>
                          </>
                        )}

                        {/* Controles cuando el video está reproduciéndose */}
                        {playingVideo === index && (
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                              p: 1,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<Pause />}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTestimonialVideoPlay(index);
                              }}
                              sx={{
                                bgcolor: "rgba(255,255,255,0.9)",
                                color: "#1E88E5",
                                minWidth: "auto",
                                px: 1,
                                "&:hover": {
                                  bgcolor: "rgba(255,255,255,1)",
                                },
                              }}
                            >
                              Pausar
                            </Button>

                            {/* Botón de mute */}
                            <IconButton
                              size="small"
                              onClick={(e) => toggleMute(index, e)}
                              sx={{
                                color: "white",
                                bgcolor: "rgba(0,0,0,0.5)",
                                "&:hover": {
                                  bgcolor: "rgba(0,0,0,0.7)",
                                },
                              }}
                            >
                              {mutedVideos[`testimonial-${index}`] ? <VolumeOff /> : <VolumeUp />}
                            </IconButton>
                          </Box>
                        )}

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


        {/* STEP 2 - WhatsApp - OPTIMIZADO */}
        {step === 2 && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            {/* ... (código del step 2 sin cambios) ... */}
          </motion.div>
        )}


        {/* STEP 2 - WhatsApp - OPTIMIZADO */}
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
                <Box sx={{ textAlign: "center", mb: 3, px: 1 }}>
                  <CheckCircle 
                    sx={{ 
                      color: "#346bf1", 
                      fontSize: 45, 
                      mb: 2,
                    }} 
                  />
                  <Typography variant="h6" fontWeight="700" sx={{ mb: 1, color: "#1a1a1a", fontSize: mobileSizes.titleFontSize }}>
                    ¡Completa tu proceso!
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.5, fontSize: mobileSizes.bodyFontSize }}>
                    Conecta con nuestra asesora especializada.
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, px: 1 }}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <Chat sx={{ fontSize: 30, mb: 1 }} />
                    <Typography variant="subtitle1" fontWeight="700" sx={{ mb: 1, fontSize: "0.9rem" }}>
                      WhatsApp Inmediato
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.75rem" }}>
                      Resuelve dudas y confirma horarios
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "white",
                      border: "2px solid #e3f2fd",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                      <Schedule sx={{ color: "#346bf1", mr: 1.5, mt: 0.2, fontSize: 18 }} />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: "0.8rem" }}>
                          Información importante
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5, fontSize: "0.75rem", mt: 0.5 }}>
                          <Box component="span" fontWeight="600" color="#1a1a1a">
                            Si ya dejaste tus datos, espera nuestra llamada
                          </Box>{" "}
                          en las próximas horas hábiles.
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>

                <Box sx={{ mb: 3, px: 1 }}>
                  <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2, color: "#1a1a1a", fontSize: "0.85rem" }}>
                    ¿Por qué hablar con nuestra asesora?
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {[
                      "Confirmación inmediata de tu cita",
                      "Resolución de dudas sobre tratamiento",
                      "Información sobre preparación",
                      "Detalles de costos y pagos",
                      "Guía personalizada"
                    ].map((benefit, index) => (
                      <Box key={index} sx={{ display: "flex", alignItems: "flex-start" }}>
                        <CheckCircle sx={{ color: "#346bf1", fontSize: 16, mr: 1.5, mt: 0.1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", lineHeight: 1.4 }}>
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
                  color="success"
                  fullWidth
                  startIcon={<Chat />}
                  sx={{
                    borderRadius: 2,
                    py: 1,
                    fontWeight: "700",
                    fontSize: mobileSizes.buttonFontSize,
                    background: "linear-gradient(135deg, #346bf1 0%, #125f8cff 100%)",
                    boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
                    minHeight: mobileSizes.buttonHeight
                  }}
                  onClick={() => window.open("https://wa.me/521XXXXXXXXXX", "_blank")}
                >
                  Hablar con asesora
                </Button>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    startIcon={<ArrowBack sx={{ fontSize: "18px" }} />}
                    variant="outlined"
                    fullWidth
                    sx={{ 
                      borderRadius: 2, 
                      py: 1,
                      fontSize: mobileSizes.buttonFontSize,
                      minHeight: mobileSizes.buttonHeight
                    }}
                    onClick={prev}
                  >
                    Atrás
                  </Button>
                  <Button
                    endIcon={<ArrowForward sx={{ fontSize: "18px" }} />}
                    variant="contained"
                    fullWidth
                    sx={{ 
                      borderRadius: 2, 
                      py: 1,
                      fontSize: mobileSizes.buttonFontSize,
                      minHeight: mobileSizes.buttonHeight
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
                            bgcolor: faqOpen === i ? "#346bf1" : "#f0f4f8",
                            color: faqOpen === i ? "#fff" : "#346bf1",
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
                                <PlayArrow sx={{ color: "#346bf1", fontSize: 25 }} />
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
                              bgcolor: "#346bf1",
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
                                  bgcolor: "#346bf1",
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

       {/* STEP 4 - Cupón de Regalo OPTIMIZADO */}
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
        p: mobileSizes.padding,
        bgcolor: "#f8f9fa",
        position: "relative",
        overflow: "hidden",
        minHeight: "740px"
      }}
    >
      {/* Efecto de Confeti MÁS PEQUEÑO */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none" }}>
        {[...Array(15)].map((_, i) => (
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
              duration: 1.5 + Math.random() * 1.5,
              delay: Math.random() * 0.3,
              repeat: 0
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              width: 8,
              height: 8,
              background: ["#346bf1", "#346bf1", "#1E88E5", "#346bf1", "#2730b0ff"][Math.floor(Math.random() * 5)],
              borderRadius: "50%",
            }}
          />
        ))}
      </Box>

      {/* Cupón COMPACTO */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: isSmallMobile ? "300px" : "320px",
            borderRadius: 2,
            overflow: "hidden",
            background: "white",
            border: "2px solid #e0e0e0",
            position: "relative",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          }}
        >
          {/* Contenido del Cupón COMPACTO */}
          <Box sx={{ p: isSmallMobile ? 2.5 : 3, textAlign: "center" }}>
            {/* Icono de regalo MÁS PEQUEÑO */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3553ffff 0%, #1ea0f7ff 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto 15px",
                  boxShadow: "0 3px 10px rgba(255, 107, 53, 0.3)",
                }}
              >
                <Typography variant="h5" fontWeight="800" sx={{ color: "white" }}>
                  🎁
                </Typography>
              </Box>
            </motion.div>

            {/* Texto principal COMPACTO */}
            <Typography variant="h6" fontWeight="700" sx={{ mb: 0.5, color: "#1a1a1a", fontSize: mobileSizes.titleFontSize }}>
              ¡Felicidades!
            </Typography>
            <Typography variant="body1" fontWeight="600" sx={{ mb: 2, color: "#666", fontSize: "0.9rem" }}>
              Tienes un regalo especial
            </Typography>

            {/* Monto del regalo COMPACTO */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <Box
                sx={{
                  background: "linear-gradient(135deg, #2c4db9ff 0%, #2e647dff 100%)",
                  color: "white",
                  padding: "15px",
                  borderRadius: 2,
                  marginBottom: 2,
                  boxShadow: "0 3px 10px rgba(76, 175, 80, 0.3)",
                }}
              >
                <Typography variant="h4" fontWeight="800" sx={{ mb: 0.5, fontSize: "2rem" }}>
                  $200
                </Typography>
                <Typography variant="body1" fontWeight="600" sx={{ fontSize: "0.9rem" }}>
                  EN TU CONSULTA
                </Typography>
              </Box>
            </motion.div>

            {/* Información importante COMPACTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
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
                  fontSize: mobileSizes.bodyFontSize
                }}
              >
                Espera nuestra llamada en las próximas horas hábiles desde un número local.
              </Typography>
            </motion.div>

            {/* Código de cupón COMPACTO */}
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
                  mb: 2.5,
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

            {/* Botón de WhatsApp COMPACTO */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Button
                variant="contained"
                fullWidth
                startIcon={<Chat sx={{ fontSize: "20px" }} />}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  fontWeight: "700",
                  fontSize: mobileSizes.buttonFontSize,
                  background: "linear-gradient(135deg, #346bf1 0%, #124b8cff 100%)",
                  boxShadow: "0 4px 12px rgba(37, 98, 211, 0.4)",
                  minHeight: mobileSizes.buttonHeight,
                  mb: 1.5,
                }}
                onClick={() => {
                  const message = "¡Hola! Acabo de recibir un regalo de $200 para mi consulta médica. Te comparto esta increíble oferta por si la necesitas: [Enlace de la clínica]";
                  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
                }}
              >
                Compartir por WhatsApp
              </Button>
            </motion.div>

            {/* Botón secundario COMPACTO */}
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
                  py: 1,
                  fontWeight: "600",
                  fontSize: mobileSizes.buttonFontSize,
                  borderColor: "#ccc",
                  color: "#666",
                  minHeight: mobileSizes.buttonHeight,
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

      {/* Mensaje adicional COMPACTO */}
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
            maxWidth: isSmallMobile ? "280px" : "300px",
            lineHeight: 1.4,
            fontSize: mobileSizes.bodyFontSize
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