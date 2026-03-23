import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Animation Variants ---
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 800 : -800,
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 800 : -800,
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
  })
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 20 } }
};

const Slides = [
  // ── SLIDE 0: TITLE ──
  {
    content: (
      <motion.div className="editorial-layout title-slide" style={{ justifyContent: 'center' }} variants={stagger} initial="hidden" animate="show">
        <div className="grid-asymmetric" style={{ height: '100%' }}>
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p className="slide-label">Case Study Presentation</p>
            <motion.h1 variants={fadeUp} style={{ marginBottom: '16px' }}>Building a Better Boss</motion.h1>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Unpacking <span className="google-logo-colors"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span>'s Project Oxygen
            </motion.h2>
            <motion.div variants={fadeUp} style={{ marginTop: 'auto', paddingBottom: '4vh' }}>
              <p style={{ fontSize: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                Presented by: <strong style={{ color: 'var(--text-primary)' }}>[Your Name / Course Name]</strong>
              </p>
            </motion.div>
          </motion.div>
          <motion.div variants={popIn} className="slide-image-container">
            <img src="/hero.png" alt="Hero conceptual art" className="slide-image" />
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 1: SETTING THE SCENE ──
  {
    content: (
      <motion.div className="editorial-layout" variants={stagger} initial="hidden" animate="show">
        <motion.h2 variants={fadeUp} style={{color: 'var(--google-blue)'}}>Setting the Scene</motion.h2>
        <div className="grid-asymmetric align-start" style={{ flex: 1 }}>
          <div>
            <motion.p variants={fadeUp} style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '24px' }}>
              To understand Project Oxygen, you first need to understand Google's unique engineering culture.
            </motion.p>
            <motion.ul variants={fadeUp} className="premium-list compact">
              <li>Google was founded by two PhD students who built the company on the belief that <strong>brilliant engineers are the engine of innovation</strong>.</li>
              <li>In 2002, the company experimented with a <strong>completely flat structure — no managers at all</strong>. It failed within weeks.</li>
              <li>Managers were brought back, but the prevailing belief remained: a manager's only real value was their <strong>deep technical expertise</strong>.</li>
            </motion.ul>
          </div>
          <motion.div variants={fadeUp} className="insight-callout" style={{ margin: 0 }}>
            <h3 className="outfit" style={{ color: 'var(--google-blue)' }}>The Founding Assumption</h3>
            <p style={{ marginTop: '16px', fontSize: '1.2rem' }}><em>"Leave people alone. Let the engineers do their stuff. If they get stuck, they'll ask their boss, whose deep technical expertise propelled them into management."</em></p>
            <p style={{ marginTop: '16px' }}>This philosophy worked for a small startup. But as Google scaled to tens of thousands of employees, cracks began to show.</p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 2: THE QUESTION ──
  {
    content: (
      <motion.div className="editorial-layout flex-center" variants={stagger} initial="hidden" animate="show">
        <div style={{ maxWidth: '850px', textAlign: 'center' }}>
          <motion.h2 variants={fadeUp} style={{color: 'var(--google-blue)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '32px'}}>The Question</motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', lineHeight: 1.5, color: 'var(--text-primary)', maxWidth: 'none' }}>
            As Google scaled, its People Operations team faced a fundamental question:
          </motion.p>
          <motion.div variants={popIn} className="insight-callout red" style={{ marginTop: '40px', borderLeft: 'none', borderTop: '4px solid var(--google-red)', background: 'transparent' }}>
            <p style={{ textAlign: 'center', margin: 0, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: 'var(--google-red)' }}><strong>Does management even matter at Google?</strong></p>
          </motion.div>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)', lineHeight: 1.7, marginTop: '40px', color: 'var(--text-secondary)', maxWidth: 'none' }}>
            To answer this, they launched <strong>Project Oxygen</strong> — a multi-year research initiative that analyzed over <strong>10,000 observations</strong> across <strong>100 variables</strong>, drawing from performance reviews, feedback surveys, and nominations for top-manager awards.
          </motion.p>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 3: THE BIG EIGHT ──
  {
    content: (
      <motion.div className="editorial-layout" variants={stagger} initial="hidden" animate="show">
        <motion.h2 variants={fadeUp} style={{color: 'var(--google-blue)'}}>The Big Eight</motion.h2>
        <motion.p variants={fadeUp} style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-primary)', maxWidth: '100%' }}>
          Project Oxygen distilled management excellence into eight behaviors, ranked by importance:
        </motion.p>
        <div className="grid-asymmetric align-start" style={{ flex: 1 }}>
          <motion.div variants={fadeUp}>
            <ol className="big-eight-list">
              <li><strong>Be a good coach</strong> — give specific, constructive feedback and have regular 1-on-1s.</li>
              <li><strong>Empower your team</strong> — don't micromanage. Give people space to solve problems.</li>
              <li><strong>Express interest in well-being</strong> — care about people as individuals.</li>
              <li><strong>Be productive and results-oriented</strong> — focus on priorities and remove blockers.</li>
            </ol>
          </motion.div>
          <motion.div variants={fadeUp}>
            <ol className="big-eight-list" start={5}>
              <li><strong>Be a good communicator</strong> — share information openly and listen actively.</li>
              <li><strong>Help with career development</strong> — invest in people's professional growth.</li>
              <li><strong>Have a clear vision</strong> — provide unambiguous direction for the future.</li>
              <li><strong>Have key technical skills</strong> — understand the work enough to advise the team.</li>
            </ol>
            <div className="insight-callout" style={{ marginTop: '20px', padding: '16px 24px' }}>
              <p style={{ fontSize: '1.1rem', margin: 0 }}><strong>Technical skills ranked #8 — dead last.</strong> The top seven are all about people, communication, and coaching.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 4: THE REVELATION ──
  {
    content: (
      <motion.div className="editorial-layout" variants={stagger} initial="hidden" animate="show">
        <motion.h2 variants={fadeUp} style={{color: 'var(--google-blue)'}}>The Revelation</motion.h2>
        <div className="grid-asymmetric" style={{ flex: 1 }}>
          <motion.div variants={popIn} className="slide-image-container">
            <img src="/roadblock.png" alt="Clearing roadblocks" className="slide-image" />
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.h3 variants={fadeUp} className="outfit" style={{ fontSize: '1.7rem' }}>A Shock to Google's Identity</motion.h3>
            <motion.p variants={fadeUp} style={{ marginTop: '16px' }}>Google revered technical brilliance above all else. Yet the data showed that the <strong>best bosses weren't the best coders</strong> — they were the best listeners, coaches, and communicators.</motion.p>
            <motion.p variants={fadeUp} style={{ marginTop: '16px' }}>Laszlo Bock, Google's VP of People Operations, admitted the reaction was a deflating <em>"That's it?"</em> — the traits seemed almost obvious in hindsight.</motion.p>
            <motion.div variants={fadeUp} className="insight-callout" style={{ marginTop: '32px' }}>
              <p style={{ margin: 0 }}>An engineer solves technical problems. A manager's job is entirely different: it's to <strong>clear the path</strong> so the engineer can do their best work.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 5: TURNING DATA INTO ACTION ──
  {
    content: (
      <motion.div className="editorial-layout" variants={stagger} initial="hidden" animate="show">
        <motion.h2 variants={fadeUp} style={{color: 'var(--google-blue)'}}>Turning Data Into Action</motion.h2>
        <div className="grid-asymmetric align-start" style={{ flex: 1 }}>
          <div>
            <motion.p variants={fadeUp} style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
              Google didn't just publish findings — they built a system:
            </motion.p>
            <motion.ul variants={fadeUp} className="premium-list compact">
              <li><strong>Twice-yearly feedback surveys</strong> where employees rated managers on each of the eight behaviors.</li>
              <li><strong>Targeted training</strong> — managers who scored poorly on specific traits received customized coaching, not generic courses.</li>
              <li><strong>Redesigned performance reviews</strong> that weighted soft-skill behaviors as heavily as technical output.</li>
            </motion.ul>
          </div>
          <div>
            <motion.div variants={fadeUp} className="insight-callout" style={{ margin: 0 }}>
              <h3 className="outfit" style={{ color: 'var(--google-blue)' }}>The Results</h3>
              <ul className="premium-list compact" style={{ marginTop: '16px' }}>
                <li><strong>75%</strong> of the worst-performing managers improved after targeted coaching.</li>
                <li>Teams with high-scoring managers reported better satisfaction, retention, and productivity.</li>
                <li>Management <em>does</em> matter — and it can be systematically taught.</li>
              </ul>
            </motion.div>
            <motion.div variants={popIn} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <img src="/data.png" alt="Data analytics" style={{ width: '100%', maxHeight: '140px', objectFit: 'cover', borderRadius: '8px', mixBlendMode: 'multiply' }} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 6: ANALYZING THROUGH FRAMEWORKS ──
  {
    content: (
      <motion.div className="editorial-layout" variants={stagger} initial="hidden" animate="show">
        <motion.h2 variants={fadeUp} style={{color: 'var(--google-blue)'}}>Analyzing Through Frameworks</motion.h2>
        <div className="grid-asymmetric align-start" style={{ flex: 1 }}>
          <div>
            <motion.h3 variants={fadeUp} className="outfit">Mintzberg's Roles <span className="jargon-note"><br/>(What managers actually spend their time doing)</span></motion.h3>
            <motion.ul variants={fadeUp} className="premium-list compact" style={{marginTop: '8px'}}>
              <li><strong>Interpersonal</strong>: Focusing on well-being, making team members welcome.</li>
              <li><strong>Informational</strong>: Active listening, sharing context openly.</li>
              <li><strong>Decisional</strong>: Removing obstacles, prioritizing productivity.</li>
            </motion.ul>
            <motion.h3 variants={fadeUp} className="outfit" style={{marginTop: '24px'}}>Functions Approach <span className="jargon-note"><br/>(The four core duties: Plan, Organize, Lead, Control)</span></motion.h3>
            <motion.ul variants={fadeUp} className="premium-list compact" style={{marginTop: '8px'}}>
              <li><strong>Leading & Planning</strong> dominate. Coaching and providing clear vision are now core requirements.</li>
            </motion.ul>
          </div>
          <motion.div variants={fadeUp} className="insight-callout" style={{ margin: 0 }}>
            <h3 className="outfit" style={{ color: 'var(--google-blue)', fontSize: '1.4rem' }}>Skills Approach <span className="jargon-note">(Categorizes abilities into Technical, Human, and Conceptual)</span></h3>
            <p style={{ marginTop: '16px' }}>
              Project Oxygen proved that <strong>Human Skills</strong> (coaching, empowering, trusting) are overwhelmingly more important than Technical Skills for management success.
            </p>
            <p style={{ marginTop: '12px' }}>
              Technical Skills ranked #8 — still necessary for credibility, but the <em>least differentiating factor</em> between great and poor managers.
            </p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 7: KNOWING VS. ENCOURAGING ──
  {
    content: (
      <motion.div className="editorial-layout" variants={stagger} initial="hidden" animate="show">
        <motion.h2 variants={fadeUp} style={{color: 'var(--google-blue)'}}>Knowing vs. Encouraging</motion.h2>
        <motion.p variants={fadeUp} style={{ marginBottom: '24px', fontSize: '1.2rem', color: 'var(--text-primary)', maxWidth: '100%' }}>
          There's a critical difference between telling managers to "be great" and defining what greatness looks like:
        </motion.p>
        <div className="grid-asymmetric" style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center' }}>
            <motion.div variants={fadeUp} className="insight-callout red" style={{ margin: 0 }}>
              <h3 className="outfit">Before Project Oxygen</h3>
              <p style={{ marginTop: '12px' }}>Google's approach: <em>"Hire smart people and leave them alone."</em> No manager training, no structured feedback, no defined behaviors.</p>
              <p style={{ marginTop: '8px' }}>This is <strong>encouragement without direction</strong>.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="insight-callout green" style={{ margin: 0 }}>
              <h3 className="outfit">After Project Oxygen</h3>
              <p style={{ marginTop: '12px' }}>A concrete, data-backed list of eight behaviors. Managers could be measured, trained on weak areas, and held accountable.</p>
              <p style={{ marginTop: '8px' }}>This is <strong>knowledge in action</strong>.</p>
            </motion.div>
          </div>
          <motion.div variants={popIn} className="slide-image-container">
            <img src="/harmony.png" alt="Harmony of management" className="slide-image" />
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 8: INDUSTRY TAKEAWAYS ──
  {
    content: (
      <motion.div className="editorial-layout" variants={stagger} initial="hidden" animate="show">
        <motion.h2 variants={fadeUp} style={{color: 'var(--google-blue)'}}>What Every Company Can Learn</motion.h2>
        <div className="grid-asymmetric align-start" style={{ flex: 1 }}>
          <motion.div variants={fadeUp}>
            <ul className="premium-list">
              <li><strong>Data can solve people problems.</strong> Google proved that management can be studied, quantified, and systematically improved — just like any product.</li>
              <li>
                <strong>Beware of "The Peter Principle"</strong> <span className="jargon-note">(The tendency to promote people based on current-role success until they reach a level where they're no longer effective.)</span> Promoting your best engineer to management without people-skills training is a textbook example.
              </li>
              <li><strong>Soft skills produce hard results.</strong> Being a good listener and expressing genuine care drove measurable improvements in productivity, satisfaction, and retention.</li>
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="insight-callout" style={{ margin: 0 }}>
            <h3 className="outfit" style={{ color: 'var(--google-blue)' }}>The Bottom Line</h3>
            <p style={{ marginTop: '16px', fontSize: '1.2rem' }}>Google improved <strong>75%</strong> of its worst-performing managers through targeted soft-skill training.</p>
            <p style={{ marginTop: '12px' }}>This became a permanent system of continuous feedback and development that changed how Google thinks about leadership.</p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 9: WOULD YOU WORK AT GOOGLE? ──
  {
    content: (
      <motion.div className="editorial-layout" variants={stagger} initial="hidden" animate="show">
        <motion.h2 variants={fadeUp} style={{color: 'var(--google-blue)'}}>Would You Work at Google?</motion.h2>
        <div className="grid-asymmetric" style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.p variants={fadeUp} style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>
              <strong>Yes — and here's why.</strong>
            </motion.p>
            <motion.ul variants={fadeUp} className="premium-list compact" style={{ marginTop: '20px' }}>
              <li>Knowing your company actively invests in making your boss better is incredibly reassuring. Most companies leave management quality to chance.</li>
              <li>Google gives engineers <strong>autonomy</strong> — space to solve problems without micromanagement.</li>
              <li>That autonomy comes with a <strong>safety net</strong>: regular coaching, career development, and a trained manager who listens and removes blockers.</li>
            </motion.ul>
          </div>
          <motion.div variants={fadeUp} className="insight-callout" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 className="outfit" style={{ color: 'var(--google-blue)', fontSize: '1.5rem' }}>The Bigger Picture</h3>
            <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>Project Oxygen didn't just make Google a better workplace. It proved a universal truth:</p>
            <p style={{ marginTop: '20px', fontSize: '1.3rem', color: 'var(--text-primary)' }}><strong>Great managers aren't born — they're built. And the blueprint starts with data.</strong></p>
          </motion.div>
        </div>
      </motion.div>
    )
  },

  // ── SLIDE 10: THANK YOU ──
  {
    content: (
      <motion.div className="editorial-layout flex-center" variants={stagger} initial="hidden" animate="show">
        <div style={{ textAlign: 'center' }}>
          <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', color: 'var(--google-blue)', marginBottom: '16px' }}>Thank You.</motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--text-secondary)', maxWidth: 'none' }}>Any questions on Project Oxygen?</motion.p>
          <motion.div variants={stagger} style={{ marginTop: '64px', display: 'flex', justifyContent: 'center', gap: '32px' }}>
            <motion.div variants={popIn} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--google-blue)' }}></motion.div>
            <motion.div variants={popIn} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--google-red)' }}></motion.div>
            <motion.div variants={popIn} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--google-yellow)' }}></motion.div>
            <motion.div variants={popIn} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--google-green)' }}></motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      const next = prev + newDirection;
      return (next >= 0 && next < Slides.length) ? next : prev;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') paginate(1);
      else if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  return (
    <div className="presentation-container">
      <div className="slide-area">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 350, damping: 35 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 0.4 }
            }}
            className="slide"
          >
            {Slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="controls">
        <button className="nav-button" onClick={() => paginate(-1)} disabled={currentSlide === 0}>Previous</button>
        <div className="progress-container">
          <div className="progress-bar" style={{width: `${(currentSlide / (Slides.length - 1)) * 100}%`}}></div>
          <div className="slide-count">{currentSlide + 1} / {Slides.length}</div>
        </div>
        <button className="nav-button" onClick={() => paginate(1)} disabled={currentSlide === Slides.length - 1}>Next</button>
      </div>
    </div>
  );
}

export default App;
