import React from "react";
import { motion } from "framer-motion";
import { Avatar, Badge } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const shapeStyles = { bgcolor: "#f4f4f3", width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: "50%" };

const ChatList = ({ item, setRoomId, setRemoteUserId }) => {
  const user = useSelector(selectUser);
  console.log("🚀 ~ file: Chat.js:29 ~ Chat ~ item:", item);
  const circle = (
    <Box
      component="img"
      src={item?.profileImage ? item?.profileImage : ""}
      sx={{ ...shapeStyles, ...shapeCircleStyles }}
    />
  );

  return (
    <>
      {item?._id != user?._id && (
        <motion.div
          initial={{
            scale: 0,
          }}
          whileInView={{
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          onClick={() => {
            if (user?.role == "user") {
              setRoomId(item?._id);
            } else {
              setRoomId(user?._id);
            }
            setRemoteUserId(item);
          }}
          className={`w-full px-2 py-6 flex border-b cursor-pointer  justify-between`}
        >
          <div className="flex items-center space-x-2">
            <Badge
              color="secondary"
              overlap="circular"
              badgeContent=" "
              variant="dot"
            >
              {circle}
            </Badge>
            <div className="space-y-1">
              <h3 className="text-xl">{item?.name} </h3>
              {/* <p className="text-sm">Lorem, ipsum dolor...</p> */}
            </div>
          </div>
          {/* <p className="flex items-start whitespace-nowrap ">
        {" "}
        09:05 <strong className="pl-1">PM </strong>{" "}
      </p> */}
        </motion.div>
      )}
    </>
  );
};

export default ChatList;
