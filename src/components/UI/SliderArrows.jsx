import React from 'react';

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} customNextArrow`}
      style={{ ...style, display: "flex", right: "-20px" }}
      onClick={onClick}
    >
      ›
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} customPrevArrow`}
      style={{ ...style, display: "flex", left: "-20px" }}
      onClick={onClick}
    >
      ‹
    </div>
  );
};

export { CustomNextArrow, CustomPrevArrow };
