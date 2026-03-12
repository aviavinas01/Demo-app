import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-krayaa-dark">
      <img 
        src="/krayaa-logo.png" 
        alt="Loading..." 
        className="w-32 animate-pulse" 
      />
    </div>
  );
};

export default LoadingScreen;