import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LightHeading = ({
  colorMain,
  colorSecondary,
  textMain,
  textSecondary,
  link,
}) => {
  return (
    <Typography className={`${colorMain} text-xl  !font-bold `}>
      {textMain}{" "}
      <Link
        to={link ? link : "/"}
        className={`${colorSecondary} text-xl  pl-3 `}
      >
        {textSecondary}{" "}
      </Link>
    </Typography>
  );
};

export default LightHeading;
