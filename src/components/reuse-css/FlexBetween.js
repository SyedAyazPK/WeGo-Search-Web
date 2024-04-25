import { Box } from "@mui/system";
import React from "react";

const FlexBetween = ({ children }) => {
  return (
    <Box
      m="1.6rem 1.2rem"
      p="1.3rem 0.6rem"
      display="flex"
      flexGrow="1"
      justifyContent="space-between"
    >
      {children}
    </Box>
  );
};

export default FlexBetween;
