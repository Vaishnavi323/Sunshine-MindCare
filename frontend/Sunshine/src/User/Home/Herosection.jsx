import React from 'react';

const SpyromechHero = () => {
    return (
        <>
            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3567c3ff 0%, #2a5298 100%);
          overflow: hidden;
          padding: 40px 20px;
        }

        /* Animated Background Elements */
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .element-1 {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .element-2 {
          width: 120px;
          height: 120px;
          top: 60%;
          left: 5%;
          animation-delay: 2s;
        }

        .element-3 {
          width: 60px;
          height: 60px;
          top: 30%;
          right: 10%;
          animation-delay: 4s;
        }

        .element-4 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          right: 8%;
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .gear-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.15;
          overflow: hidden;
        }

        .gear {
          position: absolute;
          fill: #95a5a6;
          animation: rotate 20s linear infinite;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        }

        .gear-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 5%;
          animation-duration: 25s;
          animation-delay: 0s;
        }

        .gear-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          left: 15%;
          animation-duration: 18s;
          animation-direction: reverse;
          animation-delay: 1s;
        }

        .gear-3 {
          width: 250px;
          height: 250px;
          top: 5%;
          right: 10%;
          animation-duration: 22s;
          animation-delay: 2s;
        }

        .gear-4 {
          width: 180px;
          height: 180px;
          bottom: 15%;
          right: 5%;
          animation-duration: 20s;
          animation-direction: reverse;
          animation-delay: 3s;
        }

        .gear-5 {
          width: 150px;
          height: 150px;
          top: 45%;
          right: 20%;
          animation-duration: 16s;
          animation-delay: 4s;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 1000px;
          color: white;
          opacity: 0;
          animation: fadeInUp 1.5s ease-out 0.5s forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 20px;
          text-transform: uppercase;
          line-height: 1.2;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          opacity: 0;
          animation: slideInFromLeft 1.2s ease-out 0.8s forwards;
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-subtitle {
          font-size: 2rem;
          font-weight: 600;
          font-style: italic;
          margin-bottom: 10px;
          color: #ecf0f1;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }

        .orange-underline {
          width: 280px;
          height: 4px;
          background: #e67e22;
          margin: 0 auto 40px;
          border-radius: 2px;
          opacity: 0;
          transform: scaleX(0);
          animation: expandWidth 1s ease-out 1.2s forwards;
        }

        @keyframes expandWidth {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.8;
          margin-bottom: 50px;
          color: #ecf0f1;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          opacity: 0;
          animation: fadeIn 1.5s ease-out 1.5s forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .company-name {
          font-weight: 700;
          color: #3498db;
          position: relative;
          display: inline-block;
        }

        .company-name::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #e67e22;
          transform: scaleX(0);
          animation: expandUnderline 1s ease-out 2s forwards;
        }

        @keyframes expandUnderline {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .cta-button {
          display: inline-block;
          padding: 18px 50px;
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          background: transparent;
          border: 2px solid white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          opacity: 0;
          animation: bounceIn 1s ease-out 2s forwards;
          position: relative;
          overflow: hidden;
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          background: white;
          color: #2c3e50;
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
        }

        .cta-button:active {
          transform: translateY(-1px);
        }

        /* Pulsing glow effect */
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(230, 126, 34, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(230, 126, 34, 0.8), 0 0 40px rgba(230, 126, 34, 0.6);
          }
        }

        

        /* Sparkle particles */
        .sparkle {
          position: absolute;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        }

        @keyframes sparkle {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(0);
          }
          50% {
            opacity: 0.8;
            transform: translate(var(--tx), var(--ty)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.3rem;
          }

          .hero-description {
            font-size: 1rem;
            padding: 0 15px;
          }

          .cta-button {
            padding: 15px 35px;
            font-size: 1rem;
          }

          .gear-1, .gear-3 {
            width: 200px;
            height: 200px;
          }

          .gear-2, .gear-4, .gear-5 {
            width: 120px;
            height: 120px;
          }

          .floating-element {
            width: 40px !important;
            height: 40px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .orange-underline {
            width: 180px;
          }
        }
      `}</style>

            <section className="hero-section">
                {/* Floating Background Elements */}
                <div className="floating-elements">
                    <div className="floating-element element-1"></div>
                    <div className="floating-element element-2"></div>
                    <div className="floating-element element-3"></div>
                    <div className="floating-element element-4"></div>
                </div>

                {/* Animated Gear Background */}
                <div className="gear-background">
                    <svg className="gear gear-1" viewBox="0 0 100 100">
                        <path d="M50,10 L55,25 L70,25 L58,35 L63,50 L50,42 L37,50 L42,35 L30,25 L45,25 Z M50,5 C47,5 45,7 45,10 L40,10 C37,10 35,12 35,15 L30,20 C28,22 28,25 30,27 L27,32 C25,34 25,37 27,39 L30,44 C28,46 28,49 30,51 L35,56 C35,59 37,61 40,61 L45,61 C45,64 47,66 50,66 C53,66 55,64 55,61 L60,61 C63,61 65,59 65,56 L70,51 C72,49 72,46 70,44 L73,39 C75,37 75,34 73,32 L70,27 C72,25 72,22 70,20 L65,15 C65,12 63,10 60,10 L55,10 C55,7 53,5 50,5 Z" />
                    </svg>

                    <svg className="gear gear-2" viewBox="0 0 100 100">
                        <path d="M50,10 L55,25 L70,25 L58,35 L63,50 L50,42 L37,50 L42,35 L30,25 L45,25 Z M50,5 C47,5 45,7 45,10 L40,10 C37,10 35,12 35,15 L30,20 C28,22 28,25 30,27 L27,32 C25,34 25,37 27,39 L30,44 C28,46 28,49 30,51 L35,56 C35,59 37,61 40,61 L45,61 C45,64 47,66 50,66 C53,66 55,64 55,61 L60,61 C63,61 65,59 65,56 L70,51 C72,49 72,46 70,44 L73,39 C75,37 75,34 73,32 L70,27 C72,25 72,22 70,20 L65,15 C65,12 63,10 60,10 L55,10 C55,7 53,5 50,5 Z" />
                    </svg>

                    <svg className="gear gear-3" viewBox="0 0 100 100">
                        <path d="M50,10 L55,25 L70,25 L58,35 L63,50 L50,42 L37,50 L42,35 L30,25 L45,25 Z M50,5 C47,5 45,7 45,10 L40,10 C37,10 35,12 35,15 L30,20 C28,22 28,25 30,27 L27,32 C25,34 25,37 27,39 L30,44 C28,46 28,49 30,51 L35,56 C35,59 37,61 40,61 L45,61 C45,64 47,66 50,66 C53,66 55,64 55,61 L60,61 C63,61 65,59 65,56 L70,51 C72,49 72,46 70,44 L73,39 C75,37 75,34 73,32 L70,27 C72,25 72,22 70,20 L65,15 C65,12 63,10 60,10 L55,10 C55,7 53,5 50,5 Z" />
                    </svg>

                    <svg className="gear gear-4" viewBox="0 0 100 100">
                        <path d="M50,10 L55,25 L70,25 L58,35 L63,50 L50,42 L37,50 L42,35 L30,25 L45,25 Z M50,5 C47,5 45,7 45,10 L40,10 C37,10 35,12 35,15 L30,20 C28,22 28,25 30,27 L27,32 C25,34 25,37 27,39 L30,44 C28,46 28,49 30,51 L35,56 C35,59 37,61 40,61 L45,61 C45,64 47,66 50,66 C53,66 55,64 55,61 L60,61 C63,61 65,59 65,56 L70,51 C72,49 72,46 70,44 L73,39 C75,37 75,34 73,32 L70,27 C72,25 72,22 70,20 L65,15 C65,12 63,10 60,10 L55,10 C55,7 53,5 50,5 Z" />
                    </svg>

                    <svg className="gear gear-5" viewBox="0 0 100 100">
                        <path d="M50,10 L55,25 L70,25 L58,35 L63,50 L50,42 L37,50 L42,35 L30,25 L45,25 Z M50,5 C47,5 45,7 45,10 L40,10 C37,10 35,12 35,15 L30,20 C28,22 28,25 30,27 L27,32 C25,34 25,37 27,39 L30,44 C28,46 28,49 30,51 L35,56 C35,59 37,61 40,61 L45,61 C45,64 47,66 50,66 C53,66 55,64 55,61 L60,61 C63,61 65,59 65,56 L70,51 C72,49 72,46 70,44 L73,39 C75,37 75,34 73,32 L70,27 C72,25 72,22 70,20 L65,15 C65,12 63,10 60,10 L55,10 C55,7 53,5 50,5 Z" />
                    </svg>
                </div>

                {/* Hero Content */}
                <div className="hero-content">
                    <h1 className="hero-title">
                        Bringing Light to Your Journey
                    </h1>
                    <div className="orange-underline"></div>
                    <p className="hero-description">
                        <span className="company-name">SUNSHINE MINDCARE PVT.LTD</span> Discover healing and growth at Sunshine Counseling. Our compassionate team is here for your mental well-being journey.
                    </p>
                    <button className="cta-button">
                        Discover More
                    </button>
                </div>
            </section>
        </>
    );
};

export default SpyromechHero;