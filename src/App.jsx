import React, { useState, useEffect } from 'react';
import { 
  User, Briefcase, GraduationCap, Code, FileText, CheckCircle, AlertTriangle, 
  Download, Eye, Edit3, ArrowRight, Github, Mail, Phone, MapPin, Plus, 
  Trash2, Award, Zap, Check, Moon, Sun, ArrowLeft, ExternalLink, Globe, Linkedin, Instagram 
} from 'lucide-react';

/* -------------------------------------------------------------
   DEFAULT ATS-OPTIMIZED CV STATE FOR ASHISH KUMAR
   ------------------------------------------------------------- */
const INITIAL_RESUME_DATA = {
  personalInfo: {
    fullName: "Ashish Kumar",
    title: "Software & Web Developer",
    email: "ashishv56789@gmail.com",
    phone: "7048*****",
    location: "Ghaziabad, Uttar Pradesh",
    github: "github.com/Ashishverma3012",
    linkedin: "linkedin.com/in/ashish-kumar-769a913a1",
    summary: "Detail-oriented MCA candidate at AKGEC with a solid foundation in software engineering, systems programming, and modern web technologies. Proficient in C, C++, Python, and relational databases. Experienced in developing responsive, AI-integrated platforms, and dedicated to engineering clean, efficient, and scalable applications."
  },
  education: [
    {
      id: "edu-1",
      institution: "Ajay Kumar Garg Engineering College (AKGEC)",
      degree: "Master of Computer Applications (MCA)",
      duration: "2025 - 2027",
      location: "Ghaziabad",
      grade: "CGPA: 7.6 / 10.0 (1st Semester)"
    },
    {
      id: "edu-2",
      institution: "Institute for Education & Technical Science",
      degree: "Bachelor of Computer Applications (BCA)",
      duration: "2021 - 2024",
      location: "Ghaziabad",
      grade: "Percentage: 70.97%"
    },
    {
      id: "edu-3",
      institution: "DAV Sr. Secondary School",
      degree: "Intermediate (Class XII)",
      duration: "2020 - 2021",
      location: "Delhi",
      grade: "Percentage: 59.6%"
    },
    {
      id: "edu-4",
      institution: "East Delhi Public School",
      degree: "High School (Class X)",
      duration: "2018 - 2019",
      location: "Ghaziabad",
      grade: "Percentage: 61.2%"
    }
  ],
  skills: {
    languages: ["C", "C++", "Python", "Java", "HTML5", "CSS3", "JavaScript"],
    databases: ["SQL", "Relational Databases", "SQLite"],
    tools: ["Git & GitHub", "VS Code"],
    currentlyLearning: ["AI/ML Basics", "Advanced Python & Java", "Database Systems"]
  },
  projects: [
    {
      id: "proj-1",
      title: "Financial Power Symbol (Stock Market Platform)",
      technologies: "Next.js/React, Tailwind CSS, Agentic AI, Animation Graphics",
      link: "https://financial-power-symbol-stock-market.vercel.app/",
      bullets: [
        "Designed and engineered a high-performance Stock Market platform hosted at financial-power-symbol-stock-market.vercel.app, integrating interactive graphic charting systems.",
        "Programmed intelligent Agentic AI financial checkers using robust web scraping and real-time news sentiment APIs to automate daily stock analysis reports.",
        "Implemented premium fluid animation graphics rendering at 60fps, providing interactive charts and responsive panels that boost user dashboard engagement by 40%.",
        "Optimized server-side API routing and integrated client cache frameworks, reducing ticker query responses to under 200ms with perfect real-time synchronization."
      ]
    }
  ],
  softSkills: ["Collaboration", "Problem Solving", "Team Work", "Analytical Thinking"],
  passions: ["Stock Market Analysis (Fundamental & Technical)", "Cricket", "Music Listening"]
};

// Common action verbs and industry keywords for the ATS matcher
const ATS_KEYWORDS = [
  "C++", "C", "Python", "Java", "HTML", "CSS", "SQL", "Database", "OOP", "Object-Oriented", 
  "Git", "GitHub", "Vite", "React", "Frontend", "Backend", "AI", "Machine Learning", 
  "Algorithms", "Data Structures", "Web Development", "Software Engineering", "Analytical", 
  "SQLite", "Authentication", "Architecture", "System", "Invoicing", "Processing"
];

const WEAK_WORDS_MAP = {
  "helped": "collaborated",
  "made": "designed / developed",
  "worked on": "engineered / executed",
  "responsible for": "led / spearheaded",
  "did": "implemented / completed",
  "tried": "optimized",
  "took part": "spearheaded"
};

export default function App() {
  const [resumeData, setResumeData] = useState(INITIAL_RESUME_DATA);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit', 'ats'
  const [isPortfolioMode, setIsPortfolioMode] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('slate'); // 'slate', 'tech', 'minimal'
  const [isLightMode, setIsLightMode] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [openAccordions, setOpenAccordions] = useState({
    personal: true,
    education: false,
    skills: false,
    projects: false,
    additional: false
  });

  // Highlight active section on scroll in portfolio mode
  const [activePortfolioSection, setActivePortfolioSection] = useState('home');

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const toggleAccordion = (section) => {
    setOpenAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  /* -------------------------------------------------------------
     DYNAMIC INPUT HANDLERS
     ------------------------------------------------------------- */
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleEducationChange = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: "New School/College",
      degree: "Degree / Course",
      duration: "Duration Year",
      location: "Location",
      grade: "GPA / Percentage"
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const deleteEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Skill handlers
  const [newSkillText, setNewSkillText] = useState({
    languages: '',
    databases: '',
    tools: '',
    currentlyLearning: ''
  });

  const addSkill = (category) => {
    if (!newSkillText[category].trim()) return;
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: [...prev.skills[category], newSkillText[category].trim()]
      }
    }));
    setNewSkillText(prev => ({ ...prev, [category]: '' }));
  };

  const deleteSkill = (category, idx) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== idx)
      }
    }));
  };

  // Project handlers
  const handleProjectChange = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "New Impact Project",
      technologies: "Python, HTML/CSS, Relational Database",
      bullets: [
        "Implemented the core software structure with custom features, enhancing user experience by 25%.",
        "Collaborated with developers to integrate database features using relational schemas."
      ]
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const deleteProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const handleBulletChange = (projId, bulletIdx, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => {
        if (proj.id === projId) {
          const updatedBullets = [...proj.bullets];
          updatedBullets[bulletIdx] = value;
          return { ...proj, bullets: updatedBullets };
        }
        return proj;
      })
    }));
  };

  const addBullet = (projId) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => {
        if (proj.id === projId) {
          return { ...proj, bullets: [...proj.bullets, "New high-impact metric bullet point."] };
        }
        return proj;
      })
    }));
  };

  const deleteBullet = (projId, bulletIdx) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => {
        if (proj.id === projId) {
          return { ...proj, bullets: proj.bullets.filter((_, i) => i !== bulletIdx) };
        }
        return proj;
      })
    }));
  };

  // Additional details
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newPassion, setNewPassion] = useState('');

  const addSoftSkill = () => {
    if (!newSoftSkill.trim()) return;
    setResumeData(prev => ({
      ...prev,
      softSkills: [...prev.softSkills, newSoftSkill.trim()]
    }));
    setNewSoftSkill('');
  };

  const deleteSoftSkill = (idx) => {
    setResumeData(prev => ({
      ...prev,
      softSkills: prev.softSkills.filter((_, i) => i !== idx)
    }));
  };

  const addPassion = () => {
    if (!newPassion.trim()) return;
    setResumeData(prev => ({
      ...prev,
      passions: [...prev.passions, newPassion.trim()]
    }));
    setNewPassion('');
  };

  const deletePassion = (idx) => {
    setResumeData(prev => ({
      ...prev,
      passions: prev.passions.filter((_, i) => i !== idx)
    }));
  };

  /* -------------------------------------------------------------
     ATS ALGORITHM ENGINE
     ------------------------------------------------------------- */
  const calculateATSStats = () => {
    let score = 0;
    const checklist = [];
    const weakWordMatches = [];

    const { fullName, email, phone, github, location, summary } = resumeData.personalInfo;
    const educationCount = resumeData.education.length;
    const skillsCount = 
      resumeData.skills.languages.length + 
      resumeData.skills.databases.length + 
      resumeData.skills.tools.length;
    const projectCount = resumeData.projects.length;

    // 1. Contact Information Check (20 points max)
    let contactScore = 0;
    const missingContacts = [];
    if (fullName) contactScore += 4;
    if (email && email.includes('@')) contactScore += 4; else missingContacts.push('Valid Email');
    if (phone && phone.length >= 10) contactScore += 4; else missingContacts.push('Valid Phone Number');
    if (github && github.includes('github.com')) contactScore += 4; else missingContacts.push('GitHub Link');
    if (location) contactScore += 4; else missingContacts.push('Physical Location');
    score += contactScore;

    checklist.push({
      id: 'contact',
      title: 'Contact Details Checklist',
      score: contactScore,
      max: 20,
      pass: contactScore === 20,
      desc: contactScore === 20 
        ? 'Perfect! All standard recruiter-friendly contact information links are fully defined.'
        : `Almost ready! Missing fields: ${missingContacts.join(', ')}. Include these so recruiters can reach out easily.`
    });

    // 2. Sections Coverage Check (20 points max)
    let sectionsScore = 0;
    const missingSections = [];
    if (summary && summary.trim().length > 30) sectionsScore += 5; else missingSections.push('Professional Summary');
    if (educationCount > 0) sectionsScore += 5; else missingSections.push('Education');
    if (skillsCount >= 5) sectionsScore += 5; else missingSections.push('Minimum of 5 Technical Skills');
    if (projectCount > 0) sectionsScore += 5; else missingSections.push('Academic or Technical Projects');
    score += sectionsScore;

    checklist.push({
      id: 'structure',
      title: 'Standard ATS Header Sections',
      score: sectionsScore,
      max: 20,
      pass: sectionsScore === 20,
      desc: sectionsScore === 20 
        ? 'Excellent! The document features standard parsing structures that ATS spiders rely on.'
        : `Structure alert: Missing standard parser targets: ${missingSections.join(', ')}.`
    });

    // 3. Word Count Check (10 points max)
    // Gather all text to count words
    let allText = `${fullName} ${email} ${phone} ${github} ${location} ${summary} `;
    resumeData.education.forEach(edu => {
      allText += `${edu.institution} ${edu.degree} ${edu.grade} `;
    });
    resumeData.projects.forEach(proj => {
      allText += `${proj.title} ${proj.technologies} ${proj.bullets.join(' ')} `;
    });
    Object.values(resumeData.skills).flat().forEach(sk => { allText += `${sk} `; });
    const wordCount = allText.split(/\s+/).filter(w => w.trim().length > 0).length;

    let wordScore = 0;
    let wordDesc = '';
    let wordPass = false;
    if (wordCount >= 350 && wordCount <= 550) {
      wordScore = 10;
      wordPass = true;
      wordDesc = `Ideal length! Your CV sits comfortably at ${wordCount} words (ideal ATS range: 350-550 words for a single page).`;
    } else if (wordCount > 550) {
      wordScore = 6;
      wordDesc = `Slightly long! Total ${wordCount} words. Keep descriptions concise to prevent spilling over a standard printed page.`;
    } else {
      wordScore = 5;
      wordDesc = `A bit sparse! Your CV only has ${wordCount} words. Add more detail to your projects or extend your skills summary.`;
    }
    score += wordScore;

    checklist.push({
      id: 'length',
      title: 'Word Count & Layout Density',
      score: wordScore,
      max: 10,
      pass: wordPass,
      desc: wordDesc
    });

    // 4. Project Descriptions & Action Verbs Check (30 points max)
    let projectDetailScore = 0;
    let totalBullets = 0;
    let weakWordCount = 0;

    resumeData.projects.forEach(proj => {
      totalBullets += proj.bullets.length;
      proj.bullets.forEach(b => {
        const lowerB = b.toLowerCase();
        Object.keys(WEAK_WORDS_MAP).forEach(weak => {
          if (lowerB.includes(weak)) {
            weakWordCount++;
            weakWordMatches.push({
              project: proj.title,
              weakWord: weak,
              replacement: WEAK_WORDS_MAP[weak]
            });
          }
        });
      });
    });

    if (projectCount > 0 && totalBullets >= 4) {
      projectDetailScore += 15;
    } else if (projectCount > 0) {
      projectDetailScore += 8;
    }

    // Action Verb deductions
    const verbPenalty = Math.min(15, weakWordCount * 3);
    const verbScore = 15 - verbPenalty;
    projectDetailScore += verbScore;
    score += projectDetailScore;

    checklist.push({
      id: 'verbs',
      title: 'Action Verbs & Impact Factors',
      score: projectDetailScore,
      max: 30,
      pass: weakWordCount === 0 && totalBullets >= 4,
      desc: weakWordCount > 0 
        ? `Found ${weakWordCount} weak action verbs (e.g. "helped", "made")! Substitute with stronger developer action phrases listed below.`
        : totalBullets < 4
        ? 'Add more context! Make sure to write at least 2-3 high-impact bullets per project to detail achievements.'
        : 'Stellar phrasing! You are utilizing strong, metrics-driven software verbs across project logs.'
    });

    // 5. Skills Grid Density Check (20 points max)
    let skillDensityScore = 0;
    if (skillsCount >= 8) {
      skillDensityScore = 20;
    } else if (skillsCount >= 5) {
      skillDensityScore = 15;
    } else if (skillsCount > 0) {
      skillDensityScore = 10;
    }
    score += skillDensityScore;

    checklist.push({
      id: 'skills',
      title: 'Keyword Density & Specialization',
      score: skillDensityScore,
      max: 20,
      pass: skillsCount >= 8,
      desc: skillsCount >= 8
        ? `Top tier! You have listed ${skillsCount} critical developer keywords to match automatic resume sorting systems.`
        : `Add more keywords! Listing only ${skillsCount} tech items. Ensure languages, core tools, and DB packages are itemized.`
    });

    return {
      totalScore: score,
      checklist,
      weakWordMatches
    };
  };

  const { totalScore, checklist, weakWordMatches } = calculateATSStats();

  /* -------------------------------------------------------------
     JOB DESCRIPTION KEYWORD MATCHER ALGORITHM
     ------------------------------------------------------------- */
  const analyzeJobDescriptionMatches = () => {
    if (!jobDescription.trim()) return null;

    const jdWords = jobDescription
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .split(/\s+/);

    const matchResults = ATS_KEYWORDS.map(kw => {
      const keywordLower = kw.toLowerCase();
      // Check if it exists in our current resume
      let inResume = false;
      
      // Check skills
      Object.values(resumeData.skills).flat().forEach(sk => {
        if (sk.toLowerCase().includes(keywordLower)) inResume = true;
      });
      // Check projects
      resumeData.projects.forEach(p => {
        if (p.title.toLowerCase().includes(keywordLower) || 
            p.technologies.toLowerCase().includes(keywordLower) ||
            p.bullets.join(' ').toLowerCase().includes(keywordLower)) {
          inResume = true;
        }
      });
      // Check summary
      if (resumeData.personalInfo.summary.toLowerCase().includes(keywordLower)) inResume = true;

      // Check if it is requested in the job description
      const requested = jdWords.some(word => word === keywordLower || word.includes(keywordLower));

      return {
        keyword: kw,
        requested,
        inResume,
        status: requested ? (inResume ? 'matched' : 'missing') : 'neutral'
      };
    });

    const activeKeywords = matchResults.filter(r => r.requested);
    const matchedCount = activeKeywords.filter(r => r.inResume).length;
    const totalCount = activeKeywords.length;
    const matchPercentage = totalCount > 0 ? Math.round((matchedCount / totalCount) * 100) : 0;

    return {
      matchPercentage,
      activeKeywords,
      matchedCount,
      totalCount
    };
  };

  const jdAnalysis = analyzeJobDescriptionMatches();

  /* -------------------------------------------------------------
     PORTFOLIO MODE SCROLL SPIES & HANDLERS
     ------------------------------------------------------------- */
  const scrollToPortfolioSection = (sectionId) => {
    setActivePortfolioSection(sectionId);
    const container = document.querySelector('.portfolio-mode');
    const element = document.getElementById(`port-${sectionId}`);
    if (container && element) {
      const topOffset = element.offsetTop - 80; // Leaves exactly 80px space for sticky portfolio header navbar
      container.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`app-container ${isLightMode ? 'light-mode' : ''}`}>
      {/* -------------------------------------------------------------
         APP NAV HEADER
         ------------------------------------------------------------- */}
      <header className="app-header">
        <div className="logo-section">
          <FileText className="text-primary" size={28} style={{ color: 'var(--primary)' }} />
          <div>
            <h1>Ashish Kumar</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Interactive ATS Core Optimizer
            </p>
          </div>
          <span className="logo-badge">V2.0</span>
        </div>
        
        <div className="header-controls">
          <button 
            className="btn btn-secondary" 
            onClick={() => setIsLightMode(!isLightMode)}
            title="Toggle theme inside builder"
          >
            {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
            <span>Theme</span>
          </button>
          
          <button 
            className={`btn ${isPortfolioMode ? 'btn-secondary' : 'btn-accent'}`}
            onClick={() => setIsPortfolioMode(!isPortfolioMode)}
          >
            {isPortfolioMode ? (
              <>
                <Edit3 size={18} />
                <span>Resume Builder</span>
              </>
            ) : (
              <>
                <Globe size={18} />
                <span>Interactive Portfolio Mode</span>
              </>
            )}
          </button>

          <button className="btn btn-primary" onClick={() => window.print()}>
            <Download size={18} />
            <span>Export to PDF</span>
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------------
         MAIN WEB CLIENT AREA
         ------------------------------------------------------------- */}
      <main className="app-main">
        
        {/* -------------------------------------------------------------
           PORTFOLIO OVERLAY (TOGGLE TRIGGERED)
           ------------------------------------------------------------- */}
        {isPortfolioMode && (
          <div className="portfolio-mode animate-fade-in">
            {/* Sticky Navigation Bar */}
            <nav className="portfolio-nav">
              <div className="portfolio-nav-logo">
                AK<span style={{ color: 'var(--primary)' }}>.</span>
              </div>
              <div className="portfolio-nav-links">
                {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    className={`portfolio-nav-link ${activePortfolioSection === section ? 'active' : ''}`}
                    onClick={() => scrollToPortfolioSection(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
              <div>
                <button className="btn btn-primary" onClick={() => setIsPortfolioMode(false)}>
                  <ArrowLeft size={16} />
                  Back to Builder
                </button>
              </div>
            </nav>

            {/* Home Hero Section */}
            <section id="port-home" className="portfolio-hero">
              <div className="hero-glow"></div>
              <p className="hero-subtitle">Welcome to My Professional Sandbox</p>
              <h2 className="hero-title">
                Hi, I am <span>{resumeData.personalInfo.fullName}</span>
              </h2>
              <h3 className="hero-title" style={{ fontSize: '2.4rem', marginTop: '-15px', color: 'var(--text-secondary)' }}>
                Pursuing MCA at AKGEC Ghaziabad
              </h3>
              <p className="hero-desc">
                Building robust backend frameworks, responsive user-centric web applications, and learning the fundamentals of AI/ML systems. Let's build something phenomenal.
              </p>
              <div className="hero-cta">
                <button className="btn btn-primary btn-lg" onClick={() => scrollToPortfolioSection('projects')}>
                  Explore My Projects
                  <ArrowRight size={16} />
                </button>
                <button className="btn btn-secondary btn-lg" onClick={() => scrollToPortfolioSection('about')}>
                  About Me & Education
                </button>
              </div>
              <div className="scroll-indicator">
                <span>SCROLL DOWN</span>
                <div className="scroll-mouse">
                  <div className="scroll-wheel"></div>
                </div>
              </div>
            </section>

            {/* About & Education Timeline Section */}
            <section id="port-about" className="portfolio-section">
              <div className="section-head">
                <span className="section-tag">Biography</span>
                <h3 className="section-heading">About Me & Educational Pathway</h3>
              </div>
              <div className="about-grid">
                <div className="glass-card profile-card">
                  <div className="avatar-container">
                    <div className="avatar-inner">👨‍💻</div>
                  </div>
                  <h4 className="profile-name">{resumeData.personalInfo.fullName}</h4>
                  <span className="profile-role">MCA Student | Developer</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Based in Ghaziabad, striving to combine academic software engineering theories with production-ready code.
                  </p>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                    <a href={`mailto:${resumeData.personalInfo.email}`} className="contact-card-icon" style={{ width: '40px', height: '40px' }} title="Email"><Mail size={18} /></a>
                    <div className="contact-card-icon" style={{ width: '40px', height: '40px', cursor: 'default' }} title="Phone (Masked for Privacy)"><Phone size={18} /></div>
                    <a href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="contact-card-icon" style={{ width: '40px', height: '40px' }} title="GitHub"><Github size={18} /></a>
                    {resumeData.personalInfo.linkedin && (
                      <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-card-icon" style={{ width: '40px', height: '40px' }} title="LinkedIn"><Linkedin size={18} /></a>
                    )}
                    <a href="https://share.google/DEUwJzgDHIKUXPHMZ" target="_blank" rel="noopener noreferrer" className="contact-card-icon" style={{ width: '40px', height: '40px' }} title="Instagram"><Instagram size={18} /></a>
                  </div>
                </div>

                <div className="glass-card">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px' }}>
                    Education History
                  </h3>
                  <div className="timeline">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-card">
                          <div className="timeline-header">
                            <div className="timeline-title">
                              <h4>{edu.degree}</h4>
                              <p className="timeline-subtitle">{edu.institution}</p>
                            </div>
                            <span className="timeline-badge">{edu.duration}</span>
                          </div>
                          <p className="timeline-desc" style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '4px' }}>
                            {edu.grade}
                          </p>
                          <p className="timeline-desc" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            Location: {edu.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Skills & Strengths Section */}
            <section id="port-skills" className="portfolio-section">
              <div className="section-head">
                <span className="section-tag">Capabilities</span>
                <h3 className="section-heading">My Technical Toolkit & Focus</h3>
              </div>
              <div className="skills-container">
                <div className="glass-card skill-category-card">
                  <h3><Code size={20} className="text-primary" style={{ color: 'var(--primary)' }} /> Languages</h3>
                  <div className="skill-items-list">
                    {resumeData.skills.languages.map((lang, idx) => (
                      <div key={idx} className="skill-progress-item">
                        <div className="skill-progress-info">
                          <span className="skill-name">{lang}</span>
                          <span className="skill-percent">{lang === 'C' || lang === 'C++' || lang === 'HTML5' || lang === 'CSS3' ? '90%' : '75%'}</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-bar" style={{ width: lang === 'C' || lang === 'C++' || lang === 'HTML5' || lang === 'CSS3' ? '90%' : '75%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card skill-category-card">
                  <h3><Briefcase size={20} className="text-primary" style={{ color: 'var(--primary)' }} /> Databases & Dev Tools</h3>
                  <div className="skill-items-list">
                    {resumeData.skills.databases.concat(resumeData.skills.tools).map((item, idx) => (
                      <div key={idx} className="skill-progress-item">
                        <div className="skill-progress-info">
                          <span className="skill-name">{item}</span>
                          <span className="skill-percent">80%</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-bar" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card skill-category-card">
                  <h3><Zap size={20} className="text-primary" style={{ color: 'var(--primary)' }} /> Currently Specializing</h3>
                  <div className="skill-items-list">
                    {resumeData.skills.currentlyLearning.map((item, idx) => (
                      <div key={idx} className="skill-progress-item">
                        <div className="skill-progress-info">
                          <span className="skill-name">{item}</span>
                          <span className="skill-percent" style={{ color: 'var(--accent)' }}>Actively Advancing</span>
                        </div>
                        <div className="skill-progress-track">
                          <div className="skill-progress-bar" style={{ width: '60%', background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-hover) 100%)' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Projects Section */}
            <section id="port-projects" className="portfolio-section">
              <div className="section-head">
                <span className="section-tag">Portfolio</span>
                <h3 className="section-heading">Showcase Projects</h3>
              </div>
              <div className="projects-grid">
                {resumeData.projects.map((proj) => (
                  <div key={proj.id} className="glass-card project-card">
                    <div>
                      <div className="project-header-row">
                        <div className="project-icon-box">
                          <Briefcase size={20} />
                        </div>
                        <div className="project-links">
                          {proj.link && (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" title="Visit Live Site">
                              <ExternalLink size={20} style={{ color: 'var(--primary)' }} />
                            </a>
                          )}
                          <a href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noopener noreferrer" title="View Source">
                            <Github size={20} />
                          </a>
                        </div>
                      </div>
                      <div className="project-info">
                        <h3>{proj.title}</h3>
                        <p>{proj.bullets[0]}</p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderLeft: '2px solid var(--primary)', paddingLeft: '10px' }}>
                          {proj.bullets[1]}
                        </p>
                      </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                      <div className="project-tags">
                        {proj.technologies.split(',').map((tech, idx) => (
                          <span key={idx} className="project-tag">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Connection Section */}
            <section id="port-contact" className="portfolio-section" style={{ borderBottom: 'none' }}>
              <div className="section-head">
                <span className="section-tag">Connection</span>
                <h3 className="section-heading">Get In Touch</h3>
              </div>
              <div className="contact-container">
                <div className="glass-card">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '24px' }}>
                    Contact Information
                  </h3>
                  <div className="contact-info-list">
                    <div className="contact-card-item">
                      <div className="contact-card-icon">
                        <Mail size={22} />
                      </div>
                      <div className="contact-card-details">
                        <h4>Email Address</h4>
                        <p>{resumeData.personalInfo.email}</p>
                      </div>
                    </div>

                    <div className="contact-card-item">
                      <div className="contact-card-icon">
                        <Phone size={22} />
                      </div>
                      <div className="contact-card-details">
                        <h4>Phone Line</h4>
                        <p>{resumeData.personalInfo.phone}</p>
                      </div>
                    </div>

                    <div className="contact-card-item">
                      <div className="contact-card-icon">
                        <MapPin size={22} />
                      </div>
                      <div className="contact-card-details">
                        <h4>Operational Base</h4>
                        <p>{resumeData.personalInfo.location}</p>
                      </div>
                    </div>

                    {resumeData.personalInfo.linkedin && (
                      <div className="contact-card-item">
                        <div className="contact-card-icon">
                          <Linkedin size={22} />
                        </div>
                        <div className="contact-card-details">
                          <h4>LinkedIn Connection</h4>
                          <p>
                            <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                              {resumeData.personalInfo.linkedin}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="contact-card-item">
                      <div className="contact-card-icon">
                        <Instagram size={22} />
                      </div>
                      <div className="contact-card-details">
                        <h4>Instagram Connection</h4>
                        <p>
                          <a href="https://share.google/DEUwJzgDHIKUXPHMZ" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                            share.google/DEUwJzgDH...
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card">
                  <form onSubmit={(e) => { e.preventDefault(); alert("Thanks, Ashish will get back to you shortly!"); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input type="text" className="form-input" placeholder="Enter name" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-input" placeholder="Enter email" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea className="form-input" placeholder="Type a message..." required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="portfolio-footer">
              <p>&copy; {new Date().getFullYear()} Ashish Kumar. MCA Student @ AKGEC. Crafted with excellence.</p>
            </footer>
          </div>
        )}

        {/* -------------------------------------------------------------
           LEFT SIDEBAR: CONTROLS & RESUME DATA FORMS
           ------------------------------------------------------------- */}
        <aside className="sidebar">
          <div className="sidebar-tabs">
            <button 
              className={`sidebar-tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
              onClick={() => setActiveTab('edit')}
            >
              <Edit3 size={16} />
              <span>Edit Details</span>
            </button>
            <button 
              className={`sidebar-tab-btn ${activeTab === 'ats' ? 'active' : ''}`}
              onClick={() => setActiveTab('ats')}
            >
              <Zap size={16} />
              <span>ATS Scan & Job Matcher</span>
            </button>
          </div>

          <div className="sidebar-content">
            
            {/* TAB 1: RESUME BUILDER FORM ACCORDIONS */}
            {activeTab === 'edit' && (
              <>
                {/* 1. PERSONAL INFORMATION */}
                <div className={`accordion ${openAccordions.personal ? 'open' : ''}`}>
                  <button className="accordion-header" onClick={() => toggleAccordion('personal')}>
                    <span className="accordion-title">
                      <User size={18} style={{ color: 'var(--primary)' }} />
                      Personal Info
                    </span>
                    <Plus size={16} className="accordion-icon" />
                  </button>
                  {openAccordions.personal && (
                    <div className="accordion-body">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input 
                          type="text" 
                          name="fullName"
                          value={resumeData.personalInfo.fullName}
                          onChange={handlePersonalChange}
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Professional Subtitle</label>
                        <input 
                          type="text" 
                          name="title"
                          value={resumeData.personalInfo.title}
                          onChange={handlePersonalChange}
                          className="form-input" 
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Email</label>
                          <input 
                            type="email" 
                            name="email"
                            value={resumeData.personalInfo.email}
                            onChange={handlePersonalChange}
                            className="form-input" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Phone</label>
                          <input 
                            type="text" 
                            name="phone"
                            value={resumeData.personalInfo.phone}
                            onChange={handlePersonalChange}
                            className="form-input" 
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Location</label>
                          <input 
                            type="text" 
                            name="location"
                            value={resumeData.personalInfo.location}
                            onChange={handlePersonalChange}
                            className="form-input" 
                          />
                        </div>
                      </div>
                      <div className="form-row" style={{ marginTop: '8px' }}>
                        <div className="form-group">
                          <label className="form-label">GitHub</label>
                          <input 
                            type="text" 
                            name="github"
                            value={resumeData.personalInfo.github}
                            onChange={handlePersonalChange}
                            className="form-input" 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">LinkedIn</label>
                          <input 
                            type="text" 
                            name="linkedin"
                            value={resumeData.personalInfo.linkedin || ''}
                            onChange={handlePersonalChange}
                            className="form-input" 
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Professional Summary</label>
                        <textarea 
                          name="summary"
                          value={resumeData.personalInfo.summary}
                          onChange={handlePersonalChange}
                          className="form-input"
                        ></textarea>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. EDUCATION SECTION */}
                <div className={`accordion ${openAccordions.education ? 'open' : ''}`}>
                  <button className="accordion-header" onClick={() => toggleAccordion('education')}>
                    <span className="accordion-title">
                      <GraduationCap size={18} style={{ color: 'var(--primary)' }} />
                      Education Tracker
                    </span>
                    <Plus size={16} className="accordion-icon" />
                  </button>
                  {openAccordions.education && (
                    <div className="accordion-body">
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>Academic Institution Entry</span>
                            <button onClick={() => deleteEducation(edu.id)} style={{ color: 'var(--danger)' }} title="Remove Entry">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Institution Name</label>
                            <input 
                              type="text" 
                              value={edu.institution}
                              onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                              className="form-input" 
                            />
                          </div>
                          <div className="form-row" style={{ marginTop: '8px' }}>
                            <div className="form-group">
                              <label className="form-label">Degree / Course</label>
                              <input 
                                type="text" 
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                                className="form-input" 
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Location (City / State)</label>
                              <input 
                                type="text" 
                                value={edu.location || ''}
                                onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)}
                                className="form-input" 
                                placeholder="e.g. Ghaziabad"
                              />
                            </div>
                          </div>
                          <div className="form-row" style={{ marginTop: '8px' }}>
                            <div className="form-group">
                              <label className="form-label">Duration</label>
                              <input 
                                type="text" 
                                value={edu.duration}
                                onChange={(e) => handleEducationChange(edu.id, 'duration', e.target.value)}
                                className="form-input" 
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Grade / CGPA / %</label>
                              <input 
                                type="text" 
                                value={edu.grade}
                                onChange={(e) => handleEducationChange(edu.id, 'grade', e.target.value)}
                                className="form-input" 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary btn-sm" onClick={addEducation} style={{ width: '100%' }}>
                        <Plus size={16} />
                        Add Education Entry
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. TECHNICAL SKILLS SECTION */}
                <div className={`accordion ${openAccordions.skills ? 'open' : ''}`}>
                  <button className="accordion-header" onClick={() => toggleAccordion('skills')}>
                    <span className="accordion-title">
                      <Code size={18} style={{ color: 'var(--primary)' }} />
                      Technical Skill Grids
                    </span>
                    <Plus size={16} className="accordion-icon" />
                  </button>
                  {openAccordions.skills && (
                    <div className="accordion-body">
                      {/* Skill Categories */}
                      {Object.keys(resumeData.skills).map((cat) => (
                        <div key={cat} className="skills-editor-section">
                          <label className="form-label" style={{ textTransform: 'capitalize' }}>
                            {cat.replace(/([A-Z])/g, ' $1')}
                          </label>
                          <div className="pill-container">
                            {resumeData.skills[cat].map((sk, idx) => (
                              <span key={idx} className="skill-pill">
                                {sk}
                                <button onClick={() => deleteSkill(cat, idx)}>
                                  <Trash2 size={12} />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input 
                              type="text" 
                              value={newSkillText[cat]}
                              onChange={(e) => setNewSkillText(prev => ({ ...prev, [cat]: e.target.value }))}
                              placeholder={`Add item to ${cat}...`}
                              className="form-input"
                              onKeyDown={(e) => { if(e.key === 'Enter') addSkill(cat); }}
                            />
                            <button className="btn btn-primary" onClick={() => addSkill(cat)} style={{ padding: '8px 12px' }}>
                              Add
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. TECHNICAL PROJECTS SECTION */}
                <div className={`accordion ${openAccordions.projects ? 'open' : ''}`}>
                  <button className="accordion-header" onClick={() => toggleAccordion('projects')}>
                    <span className="accordion-title">
                      <Briefcase size={18} style={{ color: 'var(--primary)' }} />
                      Academic & Dev Projects
                    </span>
                    <Plus size={16} className="accordion-icon" />
                  </button>
                  {openAccordions.projects && (
                    <div className="accordion-body">
                      {resumeData.projects.map((proj) => (
                        <div key={proj.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>Project Details Log</span>
                            <button onClick={() => deleteProject(proj.id)} style={{ color: 'var(--danger)' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Project Title</label>
                            <input 
                              type="text" 
                              value={proj.title}
                              onChange={(e) => handleProjectChange(proj.id, 'title', e.target.value)}
                              className="form-input" 
                            />
                          </div>
                          <div className="form-group" style={{ marginTop: '8px' }}>
                            <label className="form-label">Core Technologies Used</label>
                            <input 
                              type="text" 
                              value={proj.technologies}
                              onChange={(e) => handleProjectChange(proj.id, 'technologies', e.target.value)}
                              className="form-input" 
                            />
                          </div>
                          
                          {/* Bullet Points */}
                          <div style={{ marginTop: '12px' }}>
                            <label className="form-label">High-Impact Bullet Points (ATS Metric Driven)</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                              {proj.bullets.map((b, bIdx) => (
                                <div key={bIdx} style={{ display: 'flex', gap: '8px' }}>
                                  <textarea 
                                    value={b}
                                    onChange={(e) => handleBulletChange(proj.id, bIdx, e.target.value)}
                                    className="form-input"
                                    style={{ fontSize: '0.85rem', minHeight: '60px' }}
                                  />
                                  <button onClick={() => deleteBullet(proj.id, bIdx)} style={{ color: 'var(--danger)', alignSelf: 'center' }}>
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              ))}
                              <button className="btn btn-secondary btn-sm" onClick={() => addBullet(proj.id)}>
                                <Plus size={12} />
                                Add Bullet Point
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button className="btn btn-secondary btn-sm" onClick={addProject} style={{ width: '100%' }}>
                        <Plus size={16} />
                        Add New Project Profile
                      </button>
                    </div>
                  )}
                </div>

                {/* 5. ADDITIONAL INFORMATION */}
                <div className={`accordion ${openAccordions.additional ? 'open' : ''}`}>
                  <button className="accordion-header" onClick={() => toggleAccordion('additional')}>
                    <span className="accordion-title">
                      <Award size={18} style={{ color: 'var(--primary)' }} />
                      Additional Metadata
                    </span>
                    <Plus size={16} className="accordion-icon" />
                  </button>
                  {openAccordions.additional && (
                    <div className="accordion-body">
                      {/* Soft Skills */}
                      <div className="skills-editor-section">
                        <label className="form-label">Soft Strengths</label>
                        <div className="pill-container">
                          {resumeData.softSkills.map((sk, idx) => (
                            <span key={idx} className="skill-pill">
                              {sk}
                              <button onClick={() => deleteSoftSkill(idx)}>
                                <Trash2 size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input 
                            type="text" 
                            value={newSoftSkill}
                            onChange={(e) => setNewSoftSkill(e.target.value)}
                            placeholder="Add soft skill..."
                            className="form-input"
                            onKeyDown={(e) => { if(e.key === 'Enter') addSoftSkill(); }}
                          />
                          <button className="btn btn-primary" onClick={addSoftSkill} style={{ padding: '8px 12px' }}>
                            Add
                          </button>
                        </div>
                      </div>

                      {/* Passions / Hobbies */}
                      <div className="skills-editor-section" style={{ marginTop: '14px' }}>
                        <label className="form-label">Passions & Hobbies</label>
                        <div className="pill-container">
                          {resumeData.passions.map((pass, idx) => (
                            <span key={idx} className="skill-pill">
                              {pass}
                              <button onClick={() => deletePassion(idx)}>
                                <Trash2 size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <input 
                            type="text" 
                            value={newPassion}
                            onChange={(e) => setNewPassion(e.target.value)}
                            placeholder="Add interest..."
                            className="form-input"
                            onKeyDown={(e) => { if(e.key === 'Enter') addPassion(); }}
                          />
                          <button className="btn btn-primary" onClick={addPassion} style={{ padding: '8px 12px' }}>
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* TAB 2: ATS SCANNER & KEYWORD MATCHER */}
            {activeTab === 'ats' && (
              <div className="ats-panel">
                
                {/* 1. DYNAMIC ATS SCORE CARD */}
                <div className="ats-card score-display">
                  <div className="score-ring-container">
                    <svg width="80" height="80" viewBox="0 0 36 36">
                      <path className="score-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path 
                        className="score-ring-fill" 
                        stroke={totalScore >= 80 ? 'var(--success)' : totalScore >= 60 ? 'var(--warning)' : 'var(--danger)'}
                        strokeDasharray={`${totalScore}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      />
                    </svg>
                    <div className="score-ring-text" style={{ color: totalScore >= 80 ? 'var(--success)' : totalScore >= 60 ? 'var(--warning)' : 'var(--text-primary)' }}>
                      {totalScore}
                    </div>
                  </div>
                  <div className="score-info">
                    <h3>Overall ATS Quality Score</h3>
                    <p>Target a score of 80+ to bypass automatic HR scoring filters.</p>
                  </div>
                </div>

                {/* 2. JOB DESCRIPTION SCANNER */}
                <div className="ats-card">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={18} className="text-primary" />
                    Target Job Keyword Matcher
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    Paste the target job description text below. The NLP matcher parses the text, extracts key skills, and scores your CV.
                  </p>
                  <textarea 
                    className="form-input jd-textarea"
                    placeholder="Paste job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  ></textarea>

                  {/* Match Analysis Results */}
                  {jdAnalysis && (
                    <div className="keyword-analysis" style={{ marginTop: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Keyword Match Rate</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: jdAnalysis.matchPercentage >= 70 ? 'var(--success)' : 'var(--warning)' }}>
                          {jdAnalysis.matchPercentage}%
                        </span>
                      </div>
                      <div className="skill-progress-track">
                        <div className="skill-progress-bar" style={{ 
                          width: `${jdAnalysis.matchPercentage}%`,
                          background: jdAnalysis.matchPercentage >= 70 ? 'var(--success)' : 'var(--warning)'
                        }}></div>
                      </div>
                      
                      <div className="keyword-grid">
                        {jdAnalysis.activeKeywords.map((r, idx) => (
                          <span key={idx} className={`keyword-badge ${r.status}`}>
                            {r.status === 'matched' ? <Check size={12} /> : <AlertTriangle size={12} />}
                            {r.keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Phrasing & Action Verbs Optimizer */}
                <div className="ats-card">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Zap size={18} className="text-primary" />
                    Action Phrasing Assistant
                  </h3>
                  
                  {weakWordMatches.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--warning)' }}>
                        DANGER: Identified {weakWordMatches.length} weak/passive verbs that cause ATS spiders to flag resumes. Substitute with strong words:
                      </p>
                      {weakWordMatches.map((m, idx) => (
                        <div key={idx} style={{ padding: '8px 12px', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '6px', fontSize: '0.8rem' }}>
                          <div><strong>Project:</strong> {m.project}</div>
                          <div style={{ marginTop: '4px' }}>
                            Replace <span style={{ color: 'var(--danger)', textDecoration: 'line-through' }}>"{m.weakWord}"</span> with:
                            <span style={{ color: 'var(--success)', fontWeight: 700, marginLeft: '6px' }}>"{m.replacement}"</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.82rem', color: 'var(--success)' }}>
                      SUCCESS: No weak action verbs detected in your project logs. Your descriptions look robust!
                    </p>
                  )}
                </div>

                {/* 4. QUALITY SCORE CHECKLIST */}
                <div className="ats-card">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>
                    Technical Quality Checklist
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {checklist.map((item) => (
                      <div key={item.id} className="checklist-item">
                        <div className={`checklist-icon ${item.pass ? 'pass' : 'fail'}`}>
                          {item.pass ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
                        </div>
                        <div className="checklist-body">
                          <h4>{item.title} ({item.score}/{item.max})</h4>
                          <p>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </aside>

        {/* -------------------------------------------------------------
           RIGHT PREVIEW PANEL: ATS VISUAL CANVAS SHEET
           ------------------------------------------------------------- */}
        <section className="preview-panel">
          <div className="template-selector">
            <button 
              className={`template-btn ${currentTemplate === 'slate' ? 'active' : ''}`}
              onClick={() => setCurrentTemplate('slate')}
            >
              Slate Executive
            </button>
            <button 
              className={`template-btn ${currentTemplate === 'tech' ? 'active' : ''}`}
              onClick={() => setCurrentTemplate('tech')}
            >
              Tech Cobalt
            </button>
            <button 
              className={`template-btn ${currentTemplate === 'minimal' ? 'active' : ''}`}
              onClick={() => setCurrentTemplate('minimal')}
            >
              Classic Minimal
            </button>
          </div>

          <div className="resume-sheet-container">
            <div className={`resume-sheet template-${currentTemplate}`}>
              
              {/* HEADER SECTION */}
              <div className="resume-header">
                <div className="header-title">
                  <h1>{resumeData.personalInfo.fullName}</h1>
                  <p>{resumeData.personalInfo.title}</p>
                </div>
                <div className="header-contacts">
                  {resumeData.personalInfo.phone && (
                    <span className="contact-item">
                      <Phone size={12} />
                      {resumeData.personalInfo.phone}
                    </span>
                  )}
                  {resumeData.personalInfo.email && (
                    <span className="contact-item">
                      <Mail size={12} />
                      <a href={`mailto:${resumeData.personalInfo.email}`}>{resumeData.personalInfo.email}</a>
                    </span>
                  )}
                  {resumeData.personalInfo.location && (
                    <span className="contact-item">
                      <MapPin size={12} />
                      {resumeData.personalInfo.location}
                    </span>
                  )}
                  {resumeData.personalInfo.github && (
                    <span className="contact-item">
                      <Github size={12} />
                      <a href={`https://${resumeData.personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                        {resumeData.personalInfo.github}
                      </a>
                    </span>
                  )}
                  {resumeData.personalInfo.linkedin && (
                    <span className="contact-item">
                      <Linkedin size={12} />
                      <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
                        {resumeData.personalInfo.linkedin}
                      </a>
                    </span>
                  )}
                </div>
              </div>

              {/* SUMMARY SECTION */}
              {resumeData.personalInfo.summary && (
                <div className="resume-summary">
                  {resumeData.personalInfo.summary}
                </div>
              )}

              {/* EDUCATION SECTION */}
              {resumeData.education.length > 0 && (
                <div className="resume-section">
                  <h2 className="section-title">Education</h2>
                  <div className="entry-list">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} className="entry-item">
                        <div className="entry-header">
                          <div className="entry-titles">
                            <span className="entry-primary">{edu.degree}</span>
                            <span className="entry-secondary">{edu.institution}</span>
                          </div>
                          <div className="entry-meta">
                            <span className="entry-date">{edu.duration}</span>
                            <span className="entry-location">{edu.location}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e3a8a', marginTop: '1px' }}>
                          {edu.grade}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TECHNICAL SKILLS SECTION */}
              <div className="resume-section">
                <h2 className="section-title">Technical Skills</h2>
                <div className="resume-skills-grid">
                  <div className="skills-category">
                    <span className="skills-category-name">Languages:</span>
                    <span className="skills-category-list">{resumeData.skills.languages.join(', ')}</span>
                  </div>
                  <div className="skills-category">
                    <span className="skills-category-name">Databases & Tools:</span>
                    <span className="skills-category-list">
                      {resumeData.skills.databases.concat(resumeData.skills.tools).join(', ')}
                    </span>
                  </div>
                  <div className="skills-category">
                    <span className="skills-category-name">Focus Specializations:</span>
                    <span className="skills-category-list">{resumeData.skills.currentlyLearning.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* PROJECTS SECTION */}
              {resumeData.projects.length > 0 && (
                <div className="resume-section">
                  <h2 className="section-title">Projects</h2>
                  <div className="entry-list">
                    {resumeData.projects.map((proj) => (
                      <div key={proj.id} className="entry-item">
                        <div className="entry-header">
                          <div className="entry-titles">
                            <span className="entry-primary">
                              {proj.title}
                              {proj.link && (
                                <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1d4ed8', marginLeft: '8px', textDecoration: 'underline' }}>
                                  [Live Site]
                                </a>
                              )}
                            </span>
                            <span className="entry-secondary">Technologies: {proj.technologies}</span>
                          </div>
                        </div>
                        <ul className="entry-bullets">
                          {proj.bullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ADDITIONAL METADATA SECTION */}
              <div className="resume-section" style={{ marginTop: 'auto' }}>
                <h2 className="section-title">Professional Profile & Interests</h2>
                <div className="resume-skills-grid">
                  <div className="skills-category">
                    <span className="skills-category-name">Soft Skills:</span>
                    <span className="skills-category-list">{resumeData.softSkills.join(', ')}</span>
                  </div>
                  <div className="skills-category">
                    <span className="skills-category-name">Passions & Hobbies:</span>
                    <span className="skills-category-list">{resumeData.passions.join(', ')}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
