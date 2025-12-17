// import React, { useState, useEffect } from 'react';
// import banner from '../../assets/HeroBanner.jpg';
// import image2 from '../../assets/j2.jpg'; // Replace with actual image
// import image3 from '../../assets/Our_experts3.jpg'; // Replace with actual image
// import image4 from '../../assets/VM1.jpg'; // Replace with actual image
// // import image5 from '../../assets/HeroBanner.jpg'; // Replace with actual image

// const HeroSection = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
    
//     // Hero images array - keep same content for all slides
//     const heroImages = [
//         banner,
//         image2,
//         image3,
//         image4,
        
//     ];

//     // Auto slide functionality
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prev) => (prev + 1) % heroImages.length);
//         }, 5000); // Change slide every 5 seconds

//         return () => clearInterval(interval);
//     }, [heroImages.length]);

//     return (
//         <>
//             <style>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
//         }

//         .hero-section {
//           position: relative;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//           padding: 40px 20px;
//         }

//         /* Slider Background */
//         .slider-background {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//         }

//         .background-slide {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-size: cover;
//           background-position: center;
//           background-repeat: no-repeat;
//           opacity: 0;
//           transition: opacity 1.5s ease-in-out;
//         }

//         .background-slide.active {
//           opacity: 1;
//         }

//         /* Animated Background Elements */
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
//           }
//         }

       
//         @keyframes rotate {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .hero-content {
//           position: relative;
//           z-index: 2;
//           text-align: center;
//           max-width: 1000px;
//           color: white;
//           opacity: 0;
//           animation: fadeInUp 1.5s ease-out 0.5s forwards;
          
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(50px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .hero-title {
//           font-size: 3.5rem;
//           font-weight: 800;
//           letter-spacing: 2px;
//           margin-bottom: 20px;
//           text-transform: uppercase;
//           line-height: 1.2;
//           text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
//           opacity: 0;
//           animation: slideInFromLeft 1.2s ease-out 0.8s forwards;
//         }

//         @keyframes slideInFromLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-100px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .hero-subtitle {
//           font-size: 2rem;
//           font-weight: 600;
//           font-style: italic;
//           margin-bottom: 10px;
//           color: #ecf0f1;
//           text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
//         }

//         .orange-underline {
//           width: 280px;
//           height: 4px;
//           background: #e67e22;
//           margin: 0 auto 40px;
//           border-radius: 2px;
//           opacity: 0;
//           transform: scaleX(0);
//           animation: expandWidth 1s ease-out 1.2s forwards;
//         }

//         @keyframes expandWidth {
//           from {
//             opacity: 0;
//             transform: scaleX(0);
//           }
//           to {
//             opacity: 1;
//             transform: scaleX(1);
//           }
//         }

//         .hero-description {
//           font-size: 1.25rem;
//           line-height: 1.8;
//           margin-bottom: 50px;
//           color: #ecf0f1;
//           max-width: 800px;
//           margin-left: auto;
//           margin-right: auto;
//           text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
//           opacity: 0;
//           animation: fadeIn 1.5s ease-out 1.5s forwards;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         .company-name {
//           font-weight: 700;
//           color: #07b4f3f6;
//           position: relative;
//           display: inline-block;
//         }

//         .company-name::after {
//           content: '';
//           position: absolute;
//           bottom: -2px;
//           left: 0;
//           width: 100%;
//           height: 2px;
//           background: #e67e22;
//           transform: scaleX(0);
//           animation: expandUnderline 1s ease-out 2s forwards;
//         }

//         @keyframes expandUnderline {
//           from {
//             transform: scaleX(0);
//           }
//           to {
//             transform: scaleX(1);
//           }
//         }

//         .cta-button {
//           display: inline-block;
//           padding: 18px 50px;
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: white;
//           background: transparent;
//           border: 2px solid white;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           text-decoration: none;
//           opacity: 0;
//           animation: bounceIn 1s ease-out 2s forwards;
//           position: relative;
//           overflow: hidden;
//         }

//         @keyframes bounceIn {
//           0% {
//             opacity: 0;
//             transform: scale(0.3);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.05);
//           }
//           70% {
//             transform: scale(0.9);
//           }
//           100% {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         .cta-button::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//           transition: left 0.5s;
//         }

//         .cta-button:hover::before {
//           left: 100%;
//         }

//         .cta-button:hover {
//           background: white;
//           color: #2c3e50;
//           transform: translateY(-3px);
//           box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
//         }

//         .cta-button:active {
//           transform: translateY(-1px);
//         }

//         /* Pulsing glow effect */
//         @keyframes pulseGlow {
//           0%, 100% {
//             box-shadow: 0 0 20px rgba(230, 126, 34, 0.4);
//           }
//           50% {
//             box-shadow: 0 0 30px rgba(230, 126, 34, 0.8), 0 0 40px rgba(230, 126, 34, 0.6);
//           }
//         }

        

//         /* Sparkle particles */
//         .sparkle {
//           position: absolute;
//           background: white;
//           border-radius: 50%;
//           pointer-events: none;
//           opacity: 0;
//         }

//         @keyframes sparkle {
//           0% {
//             opacity: 1;
//             transform: translate(0, 0) scale(0);
//           }
//           50% {
//             opacity: 0.8;
//             transform: translate(var(--tx), var(--ty)) scale(1);
//           }
//           100% {
//             opacity: 0;
//             transform: translate(var(--tx), var(--ty)) scale(0);
//           }
//         }

//         @media (max-width: 768px) {
//           .hero-title {
//             font-size: 2rem;
//           }

//           .hero-subtitle {
//             font-size: 1.3rem;
//           }

//           .hero-description {
//             font-size: 1rem;
//             padding: 0 15px;
//           }

//           .cta-button {
//             padding: 15px 35px;
//             font-size: 1rem;
//           }        

//           .floating-element {
//             width: 40px !important;
//             height: 40px !important;
//           }
//         }

//         @media (max-width: 480px) {
//           .hero-title {
//             font-size: 1.5rem;
//           }

//           .hero-subtitle {
//             font-size: 1.1rem;
//           }

//           .orange-underline {
//             width: 180px;
//           }
//         }

//         /* Simple dot indicators */
//         .slider-dots {
//           position: absolute;
//           bottom: 40px;
//           left: 0;
//           right: 0;
//           display: flex;
//           justify-content: center;
//           gap: 10px;
//           z-index: 3;
//         }

//         .slider-dot {
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.3);
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .slider-dot.active {
//           background: #e67e22;
//           transform: scale(1.3);
//         }
//       `}</style>

//             <section className="hero-section">
//                 {/* Slider Background - Only change */}
//                 <div className="slider-background">
//                     {heroImages.map((image, index) => (
//                         <div
//                             key={index}
//                             className={`background-slide ${index === currentSlide ? 'active' : ''}`}
//                             style={{
//                                 backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image})`
//                             }}
//                         />
//                     ))}
//                 </div>

//                 {/* Floating Background Elements - Kept exactly as is */}
//                 <div className="floating-elements">
//                     <div className="floating-element element-1"></div>
//                     <div className="floating-element element-2"></div>
//                     <div className="floating-element element-3"></div>
//                     <div className="floating-element element-4"></div>
//                 </div>

//                 {/* Hero Content - Kept exactly as is */}
//                 <div className="hero-content mt-5 ">
//                     <h1 className="hero-title">
//                         Bringing Light to Your Journey
//                     </h1>
//                     <div className="orange-underline"></div>
//                     <p className="hero-description">
//                         <span className="company-name">SUNSHINE MINDCARE</span> Discover healing and growth at Sunshine Counseling. Our compassionate team is here for your mental well-being journey.
//                     </p>
                    
//                 </div>

//                 {/* Simple dot indicators */}
//                 <div className="slider-dots">
//                     {heroImages.map((_, index) => (
//                         <div
//                             key={index}
//                             className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
//                             onClick={() => setCurrentSlide(index)}
//                         />
//                     ))}
//                 </div>
//             </section>
//         </>
//     );
// };

// export default HeroSection;

import React, { useState, useEffect } from 'react';
import banner from '../../assets/HeroBanner.jpg';
import image2 from '../../assets/j2.jpg';
import image3 from '../../assets/Our_experts3.jpg';
import image4 from '../../assets/VM1.jpg';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const heroImages = [
        banner,
        image2,
        image3,
        image4,
    ];

    // Auto slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

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
                    padding: 40px 20px;
                    overflow: hidden;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                }

                /* Two Column Layout */
                .hero-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    max-width: 1400px;
                    margin: 0 auto;
                    width: 100%;
                    gap: 60px;
                }

                /* Image Slider Side */
                .image-slider-container {
                    flex: 1;
                    position: relative;
                    height: 600px;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }

                .slider-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .background-slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    opacity: 0;
                    transition: opacity 1.5s ease-in-out;
                    border-radius: 20px;
                }

                .background-slide.active {
                    opacity: 1;
                }

                /* Content Side */
                .content-container {
                    flex: 1;
                    position: relative;
                    z-index: 2;
                    color: #2c3e50;
                    padding-right: 20px;
                }

                .hero-content {
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

                .hero-subtitle {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #e67e22;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    opacity: 0;
                    animation: slideInFromLeft 1.2s ease-out 0.8s forwards;
                }

                @keyframes slideInFromLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .hero-title {
                    font-size: 3rem;
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 20px;
                    opacity: 0;
                    animation: slideInFromLeft 1.2s ease-out 1s forwards;
                }

                .orange-underline {
                    width: 150px;
                    height: 4px;
                    background: linear-gradient(90deg, #e67e22, #f39c12);
                    margin: 0 0 30px 0;
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
                    font-size: 1.1rem;
                    line-height: 1.8;
                    margin-bottom: 40px;
                    color: #34495e;
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
                    padding: 16px 45px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: white;
                    background: linear-gradient(135deg, #e67e22, #f39c12);
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    text-decoration: none;
                    opacity: 0;
                    animation: bounceIn 1s ease-out 2s forwards;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(230, 126, 34, 0.3);
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

                .cta-button:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(230, 126, 34, 0.4);
                }

                /* Slider Controls */
                .slider-controls {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 20px;
                    z-index: 3;
                }

                .slider-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    color: #2c3e50;
                    font-size: 1.2rem;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .slider-btn:hover {
                    background: white;
                    transform: scale(1.1);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }

                .slider-dots {
                    position: absolute;
                    bottom: 30px;
                    right: 30px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    z-index: 3;
                }

                .slider-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .slider-dot.active {
                    background: #e67e22;
                    transform: scale(1.3);
                    border-color: white;
                }

                /* Healthcare Floating Icons */
                .floating-icons {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                }

                .floating-icon {
                    position: absolute;
                    font-size: 2rem;
                    color: rgba(52, 152, 219, 0.7);
                    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
                    opacity: 0.8;
                }

                .icon-heart {
                    color: rgba(231, 76, 60, 0.7);
                    top: 20%;
                    left: 10%;
                    animation: floatHeart 6s ease-in-out infinite;
                }

                .icon-brain {
                    color: rgba(155, 89, 182, 0.7);
                    top: 60%;
                    left: 85%;
                    animation: floatBrain 8s ease-in-out infinite;
                }

                .icon-leaf {
                    color: rgba(46, 204, 113, 0.7);
                    top: 80%;
                    left: 15%;
                    animation: floatLeaf 7s ease-in-out infinite;
                }

                .icon-hands {
                    color: rgba(241, 196, 15, 0.7);
                    top: 30%;
                    left: 75%;
                    animation: floatHands 9s ease-in-out infinite;
                }

                .icon-star {
                    color: rgba(52, 152, 219, 0.7);
                    top: 70%;
                    left: 90%;
                    animation: floatStar 10s ease-in-out infinite;
                }

                @keyframes floatHeart {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(10deg);
                    }
                }

                @keyframes floatBrain {
                    0%, 100% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-15px) scale(1.1);
                    }
                }

                @keyframes floatLeaf {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-25px) rotate(180deg);
                    }
                }

                @keyframes floatHands {
                    0%, 100% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-18px) scale(1.05);
                    }
                }

                @keyframes floatStar {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-12px) rotate(360deg);
                    }
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .hero-container {
                        flex-direction: column;
                        gap: 40px;
                    }

                    .image-slider-container {
                        width: 100%;
                        height: 400px;
                    }

                    .content-container {
                        padding-right: 0;
                        text-align: center;
                    }

                    .orange-underline {
                        margin: 0 auto 30px auto;
                    }

                    .slider-dots {
                        flex-direction: row;
                        bottom: 20px;
                        right: 50%;
                        transform: translateX(50%);
                    }
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.2rem;
                    }

                    .hero-description {
                        font-size: 1rem;
                    }

                    .image-slider-container {
                        height: 350px;
                    }

                    .floating-icons {
                        display: none;
                    }
                }

                @media (max-width: 480px) {
                    .hero-title {
                        font-size: 1.8rem;
                    }

                    .hero-subtitle {
                        font-size: 1rem;
                    }

                    .image-slider-container {
                        height: 300px;
                    }

                    .cta-button {
                        padding: 14px 35px;
                        font-size: 1rem;
                    }
                }

                /* Slide Counter */
                .slide-counter {
                    position: absolute;
                    top: 30px;
                    right: 30px;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    z-index: 3;
                }
            `}</style>

            <section className="hero-section">
                {/* Floating Healthcare Icons */}
                <div className="floating-icons">
                    <div className="floating-icon icon-heart">❤️</div>
                    <div className="floating-icon icon-brain">🧠</div>
                    <div className="floating-icon icon-leaf">🍃</div>
                    <div className="floating-icon icon-hands">🤝</div>
                    <div className="floating-icon icon-star">⭐</div>
                </div>

                <div className="hero-container">
                    {/* Image Slider Side */}
                    <div className="image-slider-container">
                        <div className="slider-background">
                            {heroImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`background-slide ${index === currentSlide ? 'active' : ''}`}
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${image})`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Slide Counter */}
                        <div className="slide-counter">
                            {currentSlide + 1} / {heroImages.length}
                        </div>

                        {/* Slider Controls */}
                        <div className="slider-controls">
                            <button 
                                className="slider-btn prev-btn"
                                onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                            >
                                ←
                            </button>
                            <button 
                                className="slider-btn next-btn"
                                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
                            >
                                →
                            </button>
                        </div>

                        {/* Slider Dots */}
                        <div className="slider-dots">
                            {heroImages.map((_, index) => (
                                <div
                                    key={index}
                                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="content-container">
                        <div className="hero-content">
                            <h3 className="hero-subtitle">Welcome to Sunshine Mindcare</h3>
                            <h1 className="hero-title">
                                Bringing Light to Your Journey
                            </h1>
                            <div className="orange-underline"></div>
                            <p className="hero-description">
                                Discover healing and growth at <span className="company-name">SUNSHINE MINDCARE</span>. Our compassionate team is here for your mental well-being journey. We provide professional counseling services to help you find peace, clarity, and happiness.
                            </p>
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;