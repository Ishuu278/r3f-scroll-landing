import React from 'react';

export const Sections: React.FC = () => {
  return (
    <div className="scroll-container">
      {/* SECTION 1: HERO */}
      <section className="section section-1" id="hero">
        <div className="hero-content">
          <div className="reveal-wrapper">
            <h1 className="reveal-text">CREATIVE</h1>
          </div>
          <div className="reveal-wrapper">
            <h1 className="reveal-text accent-text">DIMENSION</h1>
          </div>
          <div className="reveal-wrapper">
            <p className="reveal-text-sub">
              An interactive 3D scroll experience showcasing visual excellence.
            </p>
          </div>
          
          <div className="scroll-indicator">
            <span className="mouse-wheel"></span>
            <span className="scroll-label">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURES */}
      <section className="section section-2" id="features">
        <div className="features-grid">
          {/* Left side is empty for the 3D model positioning on desktop */}
          <div className="grid-spacer"></div>
          
          <div className="features-content">
            <div className="reveal-wrapper">
              <h2 className="section-title reveal-text">What I Build</h2>
            </div>
            
            <div className="features-list">
              <div className="feature-item">
                <h3 className="feature-title">3D & Creative Frontend</h3>
                <p className="feature-desc">
                  Building responsive, browser-native 3D experiences with React Three Fiber, WebGL, and GSAP-driven scroll storytelling.
                </p>
              </div>
              
              <div className="feature-item">
                <h3 className="feature-title">Backend Systems</h3>
                <p className="feature-desc">
                  Designing REST APIs, authentication, and database-driven backends with Node.js, Express, and MongoDB.
                </p>
              </div>
              
              <div className="feature-item">
                <h3 className="feature-title">AI Engineering</h3>
                <p className="feature-desc">
                  Currently exploring LLM-powered tools and prompt engineering to build practical, AI-assisted applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CTA */}
      <section className="section section-3" id="cta">
        <div className="cta-content">
          <div className="reveal-wrapper">
            <h2 className="cta-title reveal-text">Swapna Sahani — Full-Stack + 3D Web Developer</h2>
          </div>
          <div className="reveal-wrapper">
            <p className="cta-desc reveal-text-sub">
              Building production-grade backends and AI-powered experiences, plus immersive 3D web interfaces on the side.
            </p>
          </div>
          
          <div className="cta-actions">
            <a href="https://www.linkedin.com/in/swapna-sahani-8ba321390/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              GET IN TOUCH
            </a>
            <a href="https://github.com/Ishuu278" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              View Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
