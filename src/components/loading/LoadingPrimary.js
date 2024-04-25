import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const circleVariants = {
  start: {
    y: "50%",
  },
  end: {
    y: "150%",
  },
};

const LoadingPrimary = () => {
  const [loading, setLoading] = useState(true);

  const controls = useAnimation();

  useEffect(() => {
    if (loading) {
      controls.start("start");
    } else {
      controls.start("end");
    }
  }, [loading, controls]);
};
