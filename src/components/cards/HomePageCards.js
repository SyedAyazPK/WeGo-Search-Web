import React from "react";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

const HomePageCards = () => {
  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
        rotate: -360,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
        rotate: 360,
      }}
      transition={{
        duration: 3,
        type: "spring",
      }}
    >
      <div className="py-8 pb-4 px-8 bg-[#f1f1f1] border rounded-xl">
        <Typography variant="h4" fontWeight={700}>
          700 K
        </Typography>
        <Typography className="!pt-4" variant="h6" fontWeight={700}>
          ACTIVE USERS
        </Typography>
      </div>
    </motion.div>
  );
};

export default HomePageCards;
