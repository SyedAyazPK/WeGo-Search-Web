import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const PrimaryBtn = ({ width, text, onClick }) => {
  return (
    <motion.button
      className={`bg-black mx py-3 text-white  rounded-full ${
        width != "100%" && "mx-auto"
      } `}
      style={{
        width: width,
      }}
      onClick={onClick}
    >
      <Typography variant="h6" className="uppercase">
        {text}
      </Typography>
    </motion.button>
  );
};

export default PrimaryBtn;
