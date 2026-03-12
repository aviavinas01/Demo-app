import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '../components/layout/NavigationMenu';
import homebg from '../assets/HomePage/homework_7.jpg';
import logo from '../assets/HomePage/logo.svg';
import rocketsImg from '../assets/HomePage/rockets.png';

// ─── DUMMY DATA FOR BACKEND INTEGRATION ─────────────────────────────────────────
const researchData = [
  { id: 1, title: 'Human Rights', category: 'HUMAN RIGHTS', color: '#F2B705', textColor: '#1a1008' },
  { id: 2, title: 'Machine Learning', category: 'AI & ETHICS', color: '#4A3525', textColor: '#F4F1EA' },
  { id: 3, title: 'Renewable Energy', category: 'SUSTAINABILITY', color: '#F4D0D9', textColor: '#1a1008' },
  { id: 4, title: 'Global Markets', category: 'ECONOMICS', color: '#A86A53', textColor: '#1a1008' },
  { id: 5, title: 'Quantum Physics', category: 'SCIENCES', color: '#2B231D', textColor: '#F2B705' },
];

const blogsData = [
  { id: 1, title: 'Call for Communications Coordinator at Krayaa!', excerpt: 'We are looking for a communication coordinator to ...', date: '13/02/2026', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Call for Cultural Residency at Krayaa Organization', excerpt: '...', date: '05/02/2026', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Open Call for Artistic and Cultural Co-Productions', excerpt: '...', date: '20/01/2026', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600' },
  { id: 4, title: 'Student Leaders Summit 2026 Preparations', excerpt: 'Join us as we prepare for the biggest summit of the year...', date: '15/01/2026', img: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600' },
];
// ────────────────────────────────────────────────────────────────────────────────

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Animation Visibility States
  const [storyVisible, setStoryVisible] = useState(false);
  const [researchVisible, setResearchVisible] = useState(false);
  const [blogsVisible, setBlogsVisible] = useState(false);
  const [joinVisible, setJoinVisible] = useState(false);

  // Intersection Observer Refs
  const storyRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);
  const joinRef = useRef<HTMLDivElement>(null);

  // Horizontal Scroll Refs for the buttons
  const researchScrollRef = useRef<HTMLDivElement>(null);
  const blogsScrollRef = useRef<HTMLDivElement>(null);

  // Initial Hero Load Animation
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Scroll Reveal Animation (Triggers only once per section)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'story-section') setStoryVisible(true);
            if (entry.target.id === 'research-section') setResearchVisible(true);
            if (entry.target.id === 'blogs-section') setBlogsVisible(true);
            if (entry.target.id === 'join-section') setJoinVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (storyRef.current) observer.observe(storyRef.current);
    if (researchRef.current) observer.observe(researchRef.current);
    if (blogsRef.current) observer.observe(blogsRef.current);
    if (joinRef.current) observer.observe(joinRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full bg-white">
      <NavigationMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <div className="relative w-full h-[100dvh] overflow-hidden">
        <img src={homebg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/40" />

        <header className={`absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 pt-8 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <img src={logo} alt="Krayaa" className="h-23 md:h-24 w-auto object-contain" />
          <button onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" className="flex flex-col gap-[6px] focus:outline-none cursor-pointer p-2 group">
            <span className="block w-8 h-[3px] bg-krayaa-gold group-hover:bg-krayaa-cream transition-colors duration-200" />
            <span className="block w-8 h-[3px] bg-krayaa-gold group-hover:bg-krayaa-cream transition-colors duration-200" />
            <span className="block w-8 h-[3px] bg-krayaa-gold group-hover:bg-krayaa-cream transition-colors duration-200" />
          </button>
        </header>

        <div className="relative z-10 w-full h-full flex flex-col justify-between pt-28">
          <div className="flex-grow flex items-center justify-center px-8 md:px-12 text-center"></div>
          <div className={`flex justify-end px-8 md:px-12 pb-8 transition-all duration-1000 ease-out delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="flex items-center gap-4">
              {(['EN', 'NP'] as const).map((locale, i, arr) => (
                <React.Fragment key={locale}>
                  <button className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-krayaa-cream/70 hover:text-krayaa-gold transition-colors duration-200 focus:outline-none">{locale}</button>
                  {i < arr.length - 1 && <span className="text-krayaa-cream/30 text-xs select-none">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          GLOBAL NETWORK STORY
      ════════════════════════════════════════ */}
      <section id="story-section" ref={storyRef} className="relative w-full bg-white text-krayaa-dark py-32 md:py-48 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          <div className={`lg:col-span-7 relative transition-all duration-1000 ease-out ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="absolute left-0 -translate-x-24 md:-translate-x-71 top-1/2 -translate-y-1/4 -rotate-90 origin-center opacity-10 pointer-events-none select-none z-0">
              <span className="font-display font-extrabold text-[8rem] md:text-[10rem] uppercase tracking-tighter text-krayaa-dark">About+</span>
            </div>
            <div className="relative z-10 space-y-8 pl-8 md:pl-16">
              <div className="space-y-2">
                <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-krayaa-gold leading-none">WTF?!</h1>
                <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-krayaa-gold leading-none">What’s the future?!</h2>
                <h3 className="font-display font-bold text-3xl md:text-4xl tracking-tight text-krayaa-gold leading-none">What the fuck?!</h3>
              </div>
              <div className="font-body text-sm md:text-base font-bold space-y-4 max-w-xl text-krayaa-dark/80 leading-relaxed">
                <p>We're not okay.</p>
                <p>The world is definitely not okay.</p>
                <p>So this year, we’re leaning in.</p>
                <blockquote className="border-l-4 border-krayaa-gold pl-6 italic font-bold py-1 text-krayaa-dark">“WTF?!” is not a theme.</blockquote>
                <p>We’re not offering answers.</p>
                <p>We’re inviting confusion. <span className="italic">It's cheaper that way, anyway.</span></p>
                <p>This year, Krayaa is a playground for uncertainty. Where creation meets collapse.</p>
                <p className="font-bold text-krayaa-dark pt-2">Join us in krayaa, 2026.</p>
                <p>Come with questions. Come with feelings. Come as you are, confused, curious, chaotic.</p>
                <p className="font-bold text-krayaa-dark pt-2">We'll be here.<br />WTF and all.</p>
              </div>
              <hr className="border-krayaa-dark/10 w-full mt-8 mb-6" />
              <p className="font-body text-[10px] md:text-xs text-krayaa-dark/70 leading-relaxed max-w-xl font-semibold italic">
                Krayaa is committed to providing a friendly, safe, supportive and harassment-free environment and experience for everyone, regardless of their gender, age, sexual orientation, gender identity, physical appearance, body size, race, ethnicity, religion or other group identity. As such, we do not tolerate any threatening, discriminatory, disrespectful or unsuitable behavior!
              </p>
            </div>
          </div>
          <div className={`lg:col-span-5 flex justify-center lg:justify-end items-start pointer-events-none mt-12 lg:mt-0 transition-all duration-1000 ease-out delay-200 ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <img src={rocketsImg} alt="Incoming" className="w-full max-w-md lg:max-w-lg object-contain" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          RESEARCH & PAPERS
      ════════════════════════════════════════ */}
      <section id="research-section" ref={researchRef} className="relative w-full overflow-hidden pb-32">
        <div className="absolute top-0 left-0 w-full h-[60%] bg-[#E8C127] z-0"></div>
        <div className="max-w-[1400px] mx-auto relative z-10 pt-24 px-8 md:px-12 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 flex flex-col justify-start">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-[#4A3525] leading-tight mb-16">Research and Papers</h2>
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollContainer(researchScrollRef, 'left')} className="w-12 h-12 rounded-full border-2 border-[#4A3525] flex items-center justify-center text-[#4A3525] hover:bg-[#4A3525] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              </button>
              <button onClick={() => scrollContainer(researchScrollRef, 'right')} className="w-12 h-12 rounded-full border-2 border-[#4A3525] flex items-center justify-center text-[#4A3525] hover:bg-[#4A3525] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </button>
            </div>
          </div>
          <div ref={researchScrollRef} className="md:w-3/4 flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {researchData.map((item, index) => (
              <div
                key={item.id}
                className={`flex-shrink-0 w-72 md:w-80 h-[450px] flex flex-col justify-between p-8 snap-start transition-all duration-1000 ease-out shadow-lg`}
                style={{
                  backgroundColor: item.color, color: item.textColor,
                  transform: researchVisible ? 'translateY(0)' : 'translateY(-50px)', opacity: researchVisible ? 1 : 0, transitionDelay: `${index * 150}ms`
                }}
              >
                <h3 className="font-display font-black text-4xl uppercase leading-none tracking-tighter text-center mt-4">{item.category}</h3>
                <div className="flex justify-center my-8">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className="mt-auto text-center">
                  <h4 className="font-display font-bold text-2xl mb-2">{item.title}</h4>
                  <button className="font-body text-sm font-semibold hover:opacity-70 transition-opacity">Read Paper</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          LATEST BLOGS 
      ════════════════════════════════════════ */}
      <section id="blogs-section" ref={blogsRef} className="relative w-full bg-[#FAF5ED] py-24 md:py-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/6 flex flex-col justify-start items-center md:items-start relative">
            <h2 className="font-display font-bold text-5xl md:text-6xl text-[#4A3525] mb-12">Latest</h2>
            <div className="flex flex-row md:flex-col gap-4 items-center">
              <button onClick={() => scrollContainer(blogsScrollRef, 'left')} className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              </button>
              <button onClick={() => scrollContainer(blogsScrollRef, 'right')} className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </button>
              <div className="mt-8 md:mt-24 font-body font-bold text-gray-400 text-lg tracking-widest hidden md:block" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                01 / 06
              </div>
            </div>
          </div>
          <div ref={blogsScrollRef} className="md:w-5/6 flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar border-l border-gray-300 pl-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {blogsData.map((blog, index) => (
              <div
                key={blog.id}
                className="flex-shrink-0 w-80 md:w-96 flex flex-col snap-start transition-all duration-1000 ease-out"
                style={{
                  transform: blogsVisible ? 'translateY(0)' : 'translateY(-40px)', opacity: blogsVisible ? 1 : 0, transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="w-full h-64 overflow-hidden mb-6 bg-gray-200">
                  <img src={blog.img} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-display font-bold text-2xl text-[#4A3525] leading-tight mb-3 line-clamp-2">{blog.title}</h3>
                <p className="font-body text-gray-400 text-base font-medium mb-8 line-clamp-2">{blog.excerpt}</p>
                <div className="mt-auto font-body text-xs text-gray-400 font-bold tracking-wider">{blog.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          JOIN US (ALIGNED RIGHT, DELAYED HOVER)
      ════════════════════════════════════════ */}
      <section
        id="join-section"
        ref={joinRef}
        className="w-full bg-[#FAF5ED] pb-32 pt-12 overflow-hidden pl-6 md:pl-12"
      >
        {/* Pinned to the right using ml-auto */}
        <div
          className={`
            w-full md:w-5/6 lg:w-4/5 ml-auto
            transition-all duration-1000 ease-out
            ${joinVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[40px]'}
          `}
        >
          {/* Main Join Banner with extended transition duration and delay */}
          <div className="relative w-full bg-[#4A3525] hover:bg-krayaa-gold transition-colors duration-1000 delay-150 text-krayaa-cream group overflow-hidden flex flex-col md:flex-row justify-between items-center p-10 md:p-14 shadow-2xl rounded-l-lg">

            {/* Left Content Area */}
            <div className="relative z-10 w-full md:w-2/3 space-y-6">
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight group-hover:text-[#4A3525] transition-colors duration-1000 delay-150">
                Join Krayaa <br /> Community
              </h2>

              <div className="flex flex-col sm:flex-row gap-6 pt-2">
                <Link to="/login" className="font-body text-xs md:text-sm font-bold tracking-widest uppercase border-b-2 border-transparent hover:border-current group-hover:text-[#4A3525] transition-colors duration-700 text-left w-max pb-1">
                  Apply as a Volunteer
                </Link>
                <button className="font-body text-xs md:text-sm font-bold tracking-widest uppercase border-b-2 border-transparent hover:border-current group-hover:text-[#4A3525] transition-colors duration-700 text-left w-max pb-1">
                  Apply as a Representative
                </button>
              </div>
            </div>

            {/* Right Side Background Text (Scaled Down) */}
            <div className="hidden md:flex absolute right-[-2%] top-1/2 -translate-y-1/2 pointer-events-none select-none">
              <span
                className="font-display font-black text-[6rem] lg:text-[8rem] uppercase tracking-tighter opacity-90 text-[#FAF5ED] group-hover:text-[#2B231D] transition-colors duration-1000 delay-150"
                style={{ transform: 'scaleY(1.2)' }}
              >
                JOIN US
              </span>
            </div>

            {/* The little eye icon */}
            <div className="hidden md:block absolute right-[12%] bottom-[20%] text-[#FAF5ED] group-hover:text-[#2B231D] transition-colors duration-1000 delay-150 z-10 pointer-events-none">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default Home;