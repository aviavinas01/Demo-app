import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  // Main navigation links based on the reference image + requested additions
  const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Blogs', to: '/blogs' },
    { label: 'Research', to: '/research' },
    { label: 'Agents', to: '/agents' },
    { label: 'Forums', to: '/forums' },
    { label: 'Marketplace', to: '/market' },
    { label: 'Resources', to: '/resources' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ];

  return (
    <footer className="w-full bg-[#FAF5ED] pt-20 pb-8 px-8 md:px-12 border-t border-[#4A3525]/10 mt-auto">
      <div className="max-w-[1400px] mx-auto">
        
        {/* ════════════════════════════════════════
            TOP SECTION: Brand & Navigation Grid
        ════════════════════════════════════════ */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-12">
          
          {/* LEFT: Massive Connect Brand */}
          <div className="md:w-1/2">
            <h2 className="font-display font-black text-6xl md:text-8xl lg:text-[6rem] tracking-tight text-krayaa-gold leading-none">
              Connect.
            </h2>
          </div>

          {/* RIGHT: Vertical Navigation Links */}
          <nav className="md:w-1/2 flex flex-col items-start md:items-end space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-display font-bold text-3xl md:text-4xl lg:text-3xl text-[#4A3525] hover:text-krayaa-gold transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ════════════════════════════════════════
            BOTTOM SECTION: Utility Bar
        ════════════════════════════════════════ */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-9 border-t border-[#4A3525]/20 gap-8">
          
          {/* LEFT: Utility links */}
          <div className="flex items-center gap-6">
            <Link to="/faq" className="font-body text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#4A3525] hover:text-krayaa-gold transition-colors duration-300">
              FAQ
            </Link>
            <Link to="/contact" className="font-body text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#4A3525] hover:text-krayaa-gold transition-colors duration-300">
              Contact
            </Link>
          </div>

          {/* CENTER: Socials */}
          <div className="flex items-center gap-6 md:gap-10">
            {['Instagram', 'Twitter', 'Facebook'].map((social) => (
              <a
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#4A3525] hover:text-krayaa-gold transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>

          {/* RIGHT: Region Toggle */}
          <div className="flex items-center gap-4">
            {['EN', 'NP'].map((locale, i, arr) => (
              <React.Fragment key={locale}>
                <button className="font-body text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#4A3525] hover:text-krayaa-gold transition-colors duration-300 focus:outline-none">
                  {locale}
                </button>
                {i < arr.length - 1 && (
                  <span className="text-[#4A3525]/30 text-xs select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;