import React from "react";
import "../../assets/style/layout/slider.css";

const Slider = ({ defaultValue, onValueChange }) => {
    const tenScaleLabels = Array.from({ length: 11 }, (_, index) => index * 10);
    const fiveScaleLabels = Array.from({ length: 10 }, (_, index) => (index * 10) + 5);

  const onSelectValue = (e) => {
    onValueChange && onValueChange(e.currentTarget.value);
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={0}
        max={100}
        className="slider"
        defaultValue={defaultValue}
        onInput={onSelectValue}
      />
      <div className="slider-ten-scale">
        {tenScaleLabels.map((label) => (
          <span key={label} className="slider-scale-label">
            {label}
          </span>
        ))}
      </div>

      <div className="slider-five-scale">
        {fiveScaleLabels.map((label) => (
          <span key={label} className="slider-scale-label">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Slider;