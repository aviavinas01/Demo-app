import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/HomePage/logo.svg';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {

  const navLinks = [
    { label: 'About',       to: '/about' },
    { label: 'Blogs',       to: '/blogs' },
    { label: 'Research',    to: '/research' },
    { label: 'Agents',      to: '/agents' },
    { label: 'Forums',      to: '/forums' },
    { label: 'Marketplace', to: '/market' },
    { label: 'Resources',   to: '/resources' },
  ];

  return (
    <>
      {/* BACKDROP */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-[99] bg-black transition-opacity duration-700 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* MENU PANEL */}
      <div
        style={{ backgroundColor: 'var(--color-krayaa-navbar, #1a1008)' }}
        className={`
          fixed inset-0 w-full h-[100dvh]
          z-[100]
          transform transition-transform duration-700 ease-in-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
          flex flex-col
        `}
      >

        {/* TOP BAR */}
        <div className="flex justify-between items-center px-8 md:px-12 pt-6 pb-4 flex-shrink-0">

          <img
            src={logo}
            alt="Krayaa"
            className="h-12 md:h-14 w-auto object-contain"
          />

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="text-krayaa-gold text-4xl font-light hover:text-krayaa-cream transition-colors duration-200 focus:outline-none leading-none"
          >
            &times;
          </button>

        </div>


        {/* MAIN BODY */}
        <div className="flex-grow flex flex-col md:flex-row w-full px-8 md:px-12 py-8 md:py-0 overflow-hidden">

          {/* LEFT SIDE */}
          <div className="flex items-center justify-start md:w-3/5 mb-10 md:mb-0 md:pl-8">

            <h2
              className="font-display font-extrabold text-krayaa-gold leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 4.8vw, 4.8rem)' }}
            >
              Connect.
            </h2>

          </div>


          {/* RIGHT SIDE NAV */}
          <nav
            aria-label="Main navigation"
            className="flex flex-col justify-center md:w-2/5 space-y-3 md:space-y-2 lg:space-y-4"
          >

            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className="font-display font-bold text-krayaa-cream text-2xl md:text-3xl lg:text-4xl leading-tight tracking-wide hover:text-krayaa-gold transition-colors duration-200"
              >
                {label}
              </Link>
            ))}

          </nav>

        </div>


        {/* FOOTER */}
        <footer className="flex-shrink-0 border-t border-krayaa-cream/20 w-full">

          <div className="flex items-center justify-between px-8 md:px-25 py-4 gap-4">


            {/* LEFT */}
            <div className="flex items-center gap-6">

              <Link
                to="/faq"
                onClick={onClose}
                className="font-body text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-krayaa-cream/60 hover:text-krayaa-gold transition-colors duration-200"
              >
                FAQ
              </Link>

              <Link
                to="/contact"
                onClick={onClose}
                className="font-body text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-krayaa-cream/60 hover:text-krayaa-gold transition-colors duration-200"
              >
                Contact
              </Link>

            </div>


            {/* CENTER SOCIAL */}
            <div className="flex items-center gap-4 md:gap-6">

              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'Twitter',   href: 'https://twitter.com' },
                { label: 'Facebook',  href: 'https://facebook.com' },
              ].map(({ label, href }) => (

                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.11em] text-krayaa-cream/60 hover:text-krayaa-gold transition-colors duration-200"
                >
                  {label}
                </a>

              ))}

            </div>


            {/* RIGHT REGION */}
            <div className="flex items-center gap-4">

              {['EN', 'NP'].map((locale, i, arr) => (
                <React.Fragment key={locale}>

                  <button
                    className="font-body text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-krayaa-cream/60 hover:text-krayaa-gold transition-colors duration-200 focus:outline-none"
                  >
                    {locale}
                  </button>

                  {i < arr.length - 1 && (
                    <span className="text-krayaa-cream/20 text-[11px] select-none">
                      |
                    </span>
                  )}

                </React.Fragment>
              ))}

            </div>


          </div>

        </footer>

      </div>
    </>
  );
};

export default NavigationMenu;