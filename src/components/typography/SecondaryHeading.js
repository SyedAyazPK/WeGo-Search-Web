import React from "react";

const SecondaryHeading = ({ text, styling }) => {
  return (
    <h3
      className={`text-center w-full justify-center flex items-center py-3 text-xl font-bold ${styling} `}
    >
      {text}
    </h3>
  );
};

export default SecondaryHeading;
