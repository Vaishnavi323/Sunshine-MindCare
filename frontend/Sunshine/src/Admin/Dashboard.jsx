import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

import {
  faHandHoldingHeart,
  faUserFriends,
  faCalendarAlt,
  faImages,
  faArrowUp,
  faArrowDown,
  faDonate,
  faUserPlus,
  faClipboardList,
  faUserMd,
  faStethoscope,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

// Inline CSS for custom animations and effects
const dashboardStyles = {
  container: {
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    minHeight: "100vh",
    padding: "20px",
  },
  headerCard: {
    background: "linear-gradient(135deg, #3567c3 0%, #2a5298 100%)",
    borderRadius: "25px",
    padding: "50px 30px",
    position: "relative",
    overflow: "hidden",
    margin: "0 auto 40px auto",
    maxWidth: "1200px",
    boxShadow: "0 20px 60px rgba(45, 54, 91, 0.3)",
    border: "3px solid rgba(255, 255, 255, 0.1)",
  },
  floatingOrbs: {
    position: "absolute",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
    animation: "floatOrbs 8s ease-in-out infinite",
  },
  floatingOrb1: {
    width: "120px",
    height: "120px",
    top: "-30px",
    left: "10%",
    animationDelay: "0s",
  },
  floatingOrb2: {
    width: "80px",
    height: "80px",
    top: "20%",
    right: "15%",
    animationDelay: "2s",
  },
  floatingOrb3: {
    width: "60px",
    height: "60px",
    bottom: "-20px",
    left: "20%",
    animationDelay: "4s",
  },
  floatingOrb4: {
    width: "100px",
    height: "100px",
    bottom: "10%",
    right: "10%",
    animationDelay: "6s",
  },
  shimmerEffect: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background:
      "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
    transform: "rotate(45deg)",
    animation: "shimmerSlide 6s ease-in-out infinite",
  },
  statCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: "3px solid #e2e8f0",
    borderRadius: "25px",
    padding: "25px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    cursor: "pointer",
  },
  statCardHover: {
    border: "3px solid #2a5298",
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 25px 50px rgba(45, 54, 91, 0.15)",
  },
  hoverOverlay: {
    position: "absolute",
    top: "0",
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)",
    transition: "left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    zIndex: 1,
  },
  hoverOverlayActive: {
    left: "0",
  },
  cornerAccent: {
    position: "absolute",
    top: "0",
    right: "0",
    width: "60px",
    height: "60px",
    background:
      "linear-gradient(135deg, transparent 50%, rgba(120, 131, 174, 0.1) 50%)",
    borderBottomLeftRadius: "20px",
    transition: "all 0.4s ease",
  },
  cornerAccentHover: {
    background:
      "linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.2) 50%)",
  },
  iconContainer: {
    background: "linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)",
    borderRadius: "18px",
    width: "70px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "28px",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    position: "relative",
    zIndex: 2,
  },
  iconContainerHover: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    color: "#2a5298",
    transform: "scale(1.1) rotate(5deg)",
  },
  dataCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
    border: "2px solid #e2e8f0",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  dataCardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
    borderColor: "#667eea",
  },
  graphContainer: {
    background: "linear-gradient(135deg, #3567c3 0%, #2a5298 100%)",
    borderRadius: "20px",
    padding: "25px",
    color: "white",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  graphContainerHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 35px rgba(45, 54, 91, 0.3)",
  },
  progressBar: {
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
    height: "10px",
    overflow: "hidden",
    position: "relative",
  },
  progressFill: {
    height: "100%",
    borderRadius: "12px",
    transition: "width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    position: "relative",
    overflow: "hidden",
  },
  progressShine: {
    position: "absolute",
    top: "0",
    left: "-100%",
    width: "50%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
    animation: "shine 2s infinite",
  },
};

// Keyframes as style component
const KeyframesStyles = () => (
  <style>
    {`
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInDown {
        from {
          opacity: 0;
          transform: translateY(-40px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInFromLeft {
        from {
          opacity: 0;
          transform: translateX(-40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInFromRight {
        from {
          opacity: 0;
          transform: translateX(40px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes countUp {
        from {
          opacity: 0;
          transform: translateY(15px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      @keyframes pulseGlow {
        0%, 100% {
          box-shadow: 0 0 25px rgba(102, 126, 234, 0.4);
        }
        50% {
          box-shadow: 0 0 35px rgba(102, 126, 234, 0.7);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-12px);
        }
      }
      
      @keyframes textWave {
        0%, 100% {
          transform: translateY(0px);
        }
        25% {
          transform: translateY(-3px);
        }
        50% {
          transform: translateY(0px);
        }
        75% {
          transform: translateY(3px);
        }
      }
      
      @keyframes shine {
        0% {
          left: -100%;
        }
        100% {
          left: 200%;
        }
      }
      
      @keyframes barGrow {
        from {
          transform: scaleY(0);
          opacity: 0;
        }
        to {
          transform: scaleY(1);
          opacity: 1;
        }
      }
      
      @keyframes floatOrbs {
        0%, 100% {
          transform: translateY(0px) translateX(0px) scale(1);
          opacity: 0.6;
        }
        25% {
          transform: translateY(-20px) translateX(15px) scale(1.1);
          opacity: 0.8;
        }
        50% {
          transform: translateY(10px) translateX(-10px) scale(0.9);
          opacity: 0.7;
        }
        75% {
          transform: translateY(-15px) translateX(-15px) scale(1.05);
          opacity: 0.9;
        }
      }
      
      @keyframes shimmerSlide {
        0% {
          transform: rotate(45deg) translateX(-100%) translateY(-100%);
        }
        50% {
          transform: rotate(45deg) translateX(100%) translateY(100%);
        }
        100% {
          transform: rotate(45deg) translateX(-100%) translateY(-100%);
        }
      }
      
      @keyframes titleGlow {
        0%, 100% {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                       0 0 40px rgba(255, 255, 255, 0.3),
                       0 0 60px rgba(255, 255, 255, 0.1);
        }
        50% {
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
                       0 0 60px rgba(255, 255, 255, 0.5),
                       0 0 90px rgba(255, 255, 255, 0.2);
        }
      }
      
      @keyframes subtitlePulse {
        0%, 100% {
          opacity: 0.8;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.02);
        }
      }
      
      .animate-text-wave {
        animation: textWave 3s ease-in-out infinite;
      }
      
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
      
      .animate-title-glow {
        animation: titleGlow 4s ease-in-out infinite;
      }
      
      .animate-subtitle-pulse {
        animation: subtitlePulse 3s ease-in-out infinite;
      }
    `}
  </style>
);

const StatsCard = ({ title, value, icon, delay = 0 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/doctor/list`)
      .then(res => res.json())
      .then(result => {
        if (result.status === true) {
          setTotalDoctors(result.total);
        }
      })
      .catch(err => console.error("Doctor API error:", err));
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const end =
        typeof value === "number"
          ? value
          : parseInt(value.replace(/[^0-9]/g, "")) || 0;
      const duration = 2000;

      if (end === 0) {
        setAnimatedValue(0);
        setHasAnimated(true);
        return;
      }

      const startTime = Date.now();

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * end);

        setAnimatedValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setAnimatedValue(end);
          setHasAnimated(true);
        }
      };

      animate();
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const formatValue = (val) => {
    if (typeof val === "number") {
      if (val >= 1000000) {
        return (val / 1000000).toFixed(1) + "M";
      } else if (val >= 1000) {
        return (val / 1000).toFixed(1) + "K";
      }
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div
      style={{
        ...dashboardStyles.statCard,
        ...(isHovered ? dashboardStyles.statCardHover : {}),
        animation: `fadeInUp 0.8s ease-out ${delay}ms both`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      {/* Hover overlay that slides from left to right */}
      <div
        style={{
          ...dashboardStyles.hoverOverlay,
          ...(isHovered ? dashboardStyles.hoverOverlayActive : {}),
        }}
      ></div>

      {/* Corner accent */}
      <div
        style={{
          ...dashboardStyles.cornerAccent,
          ...(isHovered ? dashboardStyles.cornerAccentHover : {}),
        }}
      ></div>

      <div className="flex items-center justify-between relative z-2">
        <div className="flex-1 relative z-2">
          <div
            style={{
              animation: `countUp 0.8s ease-out ${delay + 300}ms both`,
            }}
          >
            <h3
              className={`text-3xl font-bold mb-2 transition-all duration-500 ${isHovered ? "text-white transform scale-105" : "text-[#2a5298]"
                }`}
            >
              {hasAnimated ? formatValue(animatedValue) : "0"}
            </h3>
            <p
              className={`text-sm font-semibold transition-all duration-500 ${isHovered
                  ? "text-gray-200 transform translateX(2px)"
                  : "text-[#7883ae]"
                }`}
            >
              {title}
            </p>
          </div>
        </div>
        <div
          style={{
            ...dashboardStyles.iconContainer,
            ...(isHovered ? dashboardStyles.iconContainerHover : {}),
            animation: `fadeInUp 0.8s ease-out ${delay + 200}ms both`,
          }}
          className="group-hover:animate-pulseGlow"
        >
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    </div>
  );
};

const DataItem = ({ icon, title, value, time, color, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...dashboardStyles.dataCard,
        ...(isHovered ? dashboardStyles.dataCardHover : {}),
        animation: `fadeInUp 0.6s ease-out ${delay}ms both`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center space-x-4"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg transition-all duration-400"
        style={{
          background: color,
          transform: isHovered ? "scale(1.1) rotate(5deg)" : "scale(1)",
        }}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="flex-1">
        <p
          className={`text-sm font-semibold transition-colors duration-400 ${isHovered ? "text-[#667eea]" : "text-[#2a5298]"
            }`}
        >
          {title}
        </p>
        <p className="text-lg font-bold text-[#2a5298] mt-1 transition-all duration-400">
          {value}
        </p>
        <p className="text-xs text-[#7883ae] mt-1 transition-colors duration-400">
          {time}
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Main Stats Data - Updated with new cards
  const mainStatsData = [
    {
      title: "Total Doctors",
      value: totalDoctors,
      icon: faUserFriends,
      delay: 200,
    },
    {
      title: "Upcoming Events",
      value: 12,
      icon: faCalendarAlt,
      delay: 300,
    },
    {
      title: "Pending Appointments",
      value: 23,
      icon: faClipboardList,
      delay: 400,
    },
    {
      title: "Total Jobs",
      value: 45,
      icon: faBriefcase,
      delay: 500,
    },
  ];

  // Recent Events
  const recentEvents = [
    {
      icon: faCalendarAlt,
      title: "Mental Health Workshop",
      value: "Community Hall",
      time: "Tomorrow, 10:00 AM",
      color: "#667eea",
    },
    {
      icon: faCalendarAlt,
      title: "Youth Counseling",
      value: "City College",
      time: "Dec 25, 2:00 PM",
      color: "#764ba2",
    },
    {
      icon: faCalendarAlt,
      title: "Awareness Camp",
      value: "Local Park",
      time: "Dec 28, 9:00 AM",
      color: "#f47058",
    },
  ];

  // Senior Doctors Data
  const seniorDoctors = [
    {
      icon: faUserMd,
      title: "Dr. Rajesh Kumar",
      value: "Psychiatry",
      time: "15+ years experience",
      color: "#3b82f6",
    },
    {
      icon: faUserMd,
      title: "Dr. Priya Sharma",
      value: "Clinical Psychology",
      time: "12+ years experience",
      color: "#8b5cf6",
    },
    {
      icon: faUserMd,
      title: "Dr. Amit Patel",
      value: "Counseling",
      time: "18+ years experience",
      color: "#06b6d4",
    },
    {
      icon: faUserMd,
      title: "Dr. Sneha Reddy",
      value: "Child Psychology",
      time: "10+ years experience",
      color: "#ec4899",
    },
  ];

  // Pending Appointments
  const pendingAppointments = [
    {
      icon: faStethoscope,
      title: "Rohan Mehra",
      value: "Follow-up Session",
      time: "Today, 2:30 PM",
      color: "#f59e0b",
    },
    {
      icon: faStethoscope,
      title: "Anita Sharma",
      value: "Initial Consultation",
      time: "Tomorrow, 11:00 AM",
      color: "#10b981",
    },
    {
      icon: faStethoscope,
      title: "Vikram Singh",
      value: "Therapy Session",
      time: "Dec 24, 4:00 PM",
      color: "#ef4444",
    },
  ];

  if (isLoading) {
    return (
      <>
        <KeyframesStyles />
        <div style={dashboardStyles.container}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div
                className="text-6xl mb-6 animate-float"
                style={{ animation: "float 2s ease-in-out infinite" }}
              >
                💙
              </div>
              <h1 className="text-4xl font-bold text-[#2a5298] mb-4 animate-text-wave">
                Sunshine Mindcare
              </h1>
              <p className="text-xl text-[#7883ae]">
                Loading your dashboard...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <KeyframesStyles />
      <div style={dashboardStyles.container}>
        {/* Header Card with all-side curved rectangle and animations */}
        <div style={dashboardStyles.headerCard}>
          {/* Floating Orbs */}
          <div
            style={{
              ...dashboardStyles.floatingOrbs,
              ...dashboardStyles.floatingOrb1,
            }}
          ></div>
          <div
            style={{
              ...dashboardStyles.floatingOrbs,
              ...dashboardStyles.floatingOrb2,
            }}
          ></div>
          <div
            style={{
              ...dashboardStyles.floatingOrbs,
              ...dashboardStyles.floatingOrb3,
            }}
          ></div>
          <div
            style={{
              ...dashboardStyles.floatingOrbs,
              ...dashboardStyles.floatingOrb4,
            }}
          ></div>

          {/* Shimmer Effect */}
          <div style={dashboardStyles.shimmerEffect}></div>

          <div className="text-center text-white relative z-10">
            <h1
              className="text-5xl font-bold mb-6 animate-title-glow"
              style={{ animation: "slideInDown 0.8s ease-out" }}
            >
              Sunshine Mindcare
            </h1>
            <p
              className="text-xl opacity-90 max-w-2xl mx-auto animate-subtitle-pulse"
              style={{ animation: "slideInDown 0.8s ease-out 0.2s both" }}
            >
              Mental Health Awareness & Support - Making a Difference in Our
              Community
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Stats Grid - Updated with 4 cards */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainStatsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
          </div>



        </div>
      </div>
    </>
  );
};

export default Dashboard;