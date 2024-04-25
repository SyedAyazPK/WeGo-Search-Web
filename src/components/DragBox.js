import React from "react";
import { motion, useDragControls } from "framer-motion";

const DragBox = ({ children }) => {
  const controls = useDragControls();

  return (
    <motion.article
      className="min-h-[90vh] justify-center  py-8 "
      drag="y"
      dragControls={controls}
    >
      <div className=" w-[60%] mx-auto ">{children}</div>
    </motion.article>
  );
};

export default DragBox;
