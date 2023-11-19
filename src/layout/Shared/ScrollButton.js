import '../../assets/style/component/scroll-button.css'
import React, { useState, useEffect } from 'react'

function ScrollButton() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    setShowScrollButton(position > 100);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }

  return (
    <div className="scroll-button-container">
    {showScrollButton ? (
        <button onClick={scrollToTop}>
          <i className="uil uil-top-arrow-to-top"></i>
          <span className="button-text">go up</span>
        </button>
    ) : (
        <button onClick={scrollToBottom}>
          <i className="uil uil-arrow-to-bottom"></i>
          <span className="button-text">go down</span>
        </button>
    )}
</div>
  );
}

export default ScrollButton;