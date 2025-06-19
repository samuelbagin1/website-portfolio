import { useEffect } from 'react';

const BeholdWidget = ({id}) => {
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      return;
    }

    // Create and append the script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://w.behold.so/widget.js';
    document.head.appendChild(script);

    // Cleanup function (optional)
    return () => {
      // Remove script when component unmounts if needed
      const existingScript = document.querySelector('script[src="https://w.behold.so/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return <div data-behold-id={id}></div>;
};

export default BeholdWidget;