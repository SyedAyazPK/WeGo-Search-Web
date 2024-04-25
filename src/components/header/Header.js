import { AppBar, Toolbar } from "@mui/material";
import { motion } from "framer-motion";

function Header() {
  const appBarVariants = {
    initial: {
      y: 0,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div variants={appBarVariants} initial="initial" animate="animate">
      <AppBar position="fixed">
        <Toolbar>{/* Add your header content here */}</Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default Header;
