import { Divider, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const PrimaryHeading = ({
  boxStyles,
  text,
  textStyles,
  provideDivider = true,
}) => {
  return (
    <motion.div
      initial={{
        scale: 1,
      }}
      whileHover={{
        scale: 1.2,
      }}
      transition={{
        duration: 3,
      }}
      className={boxStyles}
    >
      <Typography
        variant="h4"
        className={`uppercase  text-[#333333] ${textStyles} `}
      >
        {text}{" "}
      </Typography>
      {provideDivider && (
        <Divider
          variant="inset"
          sx={{
            my: 1,
            borderColor: "black",
          }}
        />
      )}
    </motion.div>
  );
};

export default PrimaryHeading;
