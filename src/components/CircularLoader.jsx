import React from "react";

const CircularLoader = ({ size = 40, color = "#FF5534" }) => {
  return (
    <div
      className="animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
      style={{
        width: size,
        height: size,
        borderColor: `${color} ${color} ${color} transparent`,
      }}
    ></div>
  );
};

export default CircularLoader;
