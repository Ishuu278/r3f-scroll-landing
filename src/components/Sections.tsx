import React, { useRef, useCallback } from 'react';
import avatarImg from '../assets/avatar.png';

const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="tilt-card-wrapper"
    >
      {children}
    </div>
  );
};

export const Sections: React.FC = () => {
  return (
    <>
      <div className="scroll-container">
        {/* SECTION 1: HERO */}
        <section className="section section-1" id="hero">
          <div className="hero-content">
            <div className="reveal-wrapper">
              <h1 className="reveal-text">BUILDING AT THE</h1>
            </div>
            <div className="reveal-wrapper">
              <h1 className="reveal-text accent-text">EDGE</h1>
            </div>
            <div className="reveal-wrapper">
              <p className="reveal-text-sub">
                I build full-stack apps, AI systems, and immersive web experiences — this site is one of them.
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
        <section className="section section-3" id="contact">
          <div className="cta-content">
            <div className="reveal-wrapper">
              <h2 className="cta-title reveal-text">Let's Build Something Great</h2>
            </div>
            <div className="reveal-wrapper">
              <p className="cta-desc reveal-text-sub">
                Have a project in mind, or just want to connect? I'd love to hear from you.
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

      {/* SECTION 4: ABOUT ME */}
      <section className="section section-about" id="about">
        <div className="about-grid">
          <div className="about-image-col">
            <TiltCard>
              <div className="avatar-frame">
                <img src={avatarImg} alt="Swapna Sahani Portrait" className="avatar-img" />
              </div>
            </TiltCard>
          </div>
          <div className="about-text-col">
            <div className="reveal-wrapper">
              <h2 className="section-title reveal-about-title">About Me</h2>
            </div>
            <p className="about-paragraph">
              I'm passionate about <span className="text-highlight">Full-Stack Web Development</span> and building modern web applications. My primary expertise is the <span className="text-highlight">MERN stack</span>, including <span className="text-highlight">MongoDB</span>, <span className="text-highlight">Express.js</span>, <span className="text-highlight">React.js</span>, and <span className="text-highlight">Node.js</span>. I enjoy creating responsive, user-friendly, and scalable applications while writing <span className="text-highlight">clean and maintainable code</span>. Through projects like <span className="text-highlight">Job-Kart</span>, I've gained hands-on experience with <span className="text-highlight">REST APIs</span>, <span className="text-highlight">JWT authentication</span>, <span className="text-highlight">MongoDB</span>, and <span className="text-highlight">responsive UI development</span>. I'm always eager to learn new technologies, solve real-world problems, and grow as a <span className="text-highlight">MERN Stack Developer</span> by building impactful real-world applications.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: SKILLS */}
      <section className="section section-skills" id="skills">
        <div className="skills-content">
          <div className="reveal-wrapper text-center">
            <h2 className="section-title reveal-skills-title">Skills</h2>
          </div>

          <div className="skills-grid">
            <div className="skills-category">
              <h3 className="category-title">Languages</h3>
              <div className="skills-list">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">JavaScript (ES6+)</span>
                <span className="skill-tag">C</span>
              </div>
            </div>

            <div className="skills-category">
              <h3 className="category-title">AI / ML</h3>
              <div className="skills-list">
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">Keras</span>
                <span className="skill-tag">OpenCV</span>
                <span className="skill-tag">NumPy</span>
                <span className="skill-tag">CNNs</span>
                <span className="skill-tag">Computer Vision</span>
                <span className="skill-tag">Deep Learning</span>
              </div>
            </div>

            <div className="skills-category">
              <h3 className="category-title">Frontend</h3>
              <div className="skills-list">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">GSAP</span>
                <span className="skill-tag">Framer Motion</span>
              </div>
            </div>

            <div className="skills-category">
              <h3 className="category-title">Backend</h3>
              <div className="skills-list">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express.js</span>
                <span className="skill-tag">Django</span>
                <span className="skill-tag">Flask</span>
                <span className="skill-tag">REST APIs</span>
                <span className="skill-tag">JWT Auth</span>
                <span className="skill-tag">RBAC</span>
              </div>
            </div>

            <div className="skills-category">
              <h3 className="category-title">Data & Tools</h3>
              <div className="skills-list">
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Postman</span>
                <span className="skill-tag">Linux CLI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PROJECTS */}
      <section className="section section-projects" id="projects">
        <div className="projects-content">
          <div className="reveal-wrapper text-center">
            <h2 className="section-title reveal-projects-title">Projects</h2>
          </div>

          <div className="projects-grid">
            {/* Card 1 */}
            <div className="project-card">
              <div className="project-card-header">
                <h3 className="project-title">YORCH</h3>
                <span className="project-subtitle">Private Yacht Club Website</span>
              </div>
              <p className="project-desc">
                A premium single-page web app featuring immersive lazy-loaded video backgrounds and a custom WebGL-style interactive ripple cursor-trail effect for a cinematic, luxury experience.
              </p>
              <div className="project-tech-list">
                <span className="tech-badge">React 19</span>
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">Vite</span>
                <span className="tech-badge">Tailwind CSS</span>
                <span className="tech-badge">GSAP</span>
                <span className="tech-badge">Framer Motion</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/Ishuu278/yorch" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  GitHub
                </a>
                <a href="https://yatch-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  Live Demo
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="project-card">
              <div className="project-card-header">
                <h3 className="project-title">JobKart</h3>
                <span className="project-subtitle">Job Portal Application</span>
              </div>
              <p className="project-desc">
                A full-stack job portal connecting job seekers and recruiters, with JWT-based auth for two user roles, a recruiter dashboard for managing listings, resume uploads, and an admin panel for platform-wide moderation.
              </p>
              <div className="project-tech-list">
                <span className="tech-badge">React.js</span>
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">Express.js</span>
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">JWT</span>
                <span className="tech-badge">REST APIs</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/Ishuu278/job-kart" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  GitHub
                </a>
                <a href="https://job-kart-qrjm.onrender.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  Live Demo
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="project-card">
              <div className="project-card-header">
                <div className="project-card-title-row">
                  <h3 className="project-title">Mama's Dumpling Kitchen</h3>
                  <span className="client-badge">Client Project</span>
                </div>
                <span className="project-subtitle">Restaurant Website</span>
              </div>
              <p className="project-desc">
                A full restaurant marketing site for a homemade dumpling kitchen, featuring an animated hero video, a categorized filterable menu, customer testimonials, and a photo gallery — built to convert visitors into orders.
              </p>
              <div className="project-tech-list">
                <span className="tech-badge">HTML5</span>
                <span className="tech-badge">CSS3</span>
                <span className="tech-badge">JavaScript</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/Ishuu278/mamas-dumpling-diaries" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  GitHub
                </a>
                <a href="https://mamas-dumpling-diaries.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
