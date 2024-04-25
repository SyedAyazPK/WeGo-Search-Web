import {
  AddOutlined,
  MenuOutlined,
  SearchOutlined,
  SearchRounded,
} from "@mui/icons-material";
import { Avatar, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatList from "../components/list/ChatList";
import SecondaryHeading from "../components/typography/SecondaryHeading";
import InputEmoji from "react-input-emoji";
import { useDispatch, useSelector } from "react-redux";
import { searchedText, selectSearchData } from "../features/searchSlice";
import { addMessages, getMessages, selectMsgs } from "../features/chatSlice";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Chat = ({ socket }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const searchResults = useSelector(selectSearchData);
  const [roomId, setRoomId] = useState("");
  const [remoteUserId, setRemoteUserId] = useState({});
  const [messagesRecieve, setMessagesRecieve] = useState({});
  const msgs = useSelector(selectMsgs);
  const navigate = useNavigate();

  socket.emit("joinRoom", roomId);

  socket.on("msg-recieve", (data) => {
    console.log("🚀 ~ file: Chat.js:31 ~ socket.on ~ data:", data);
    dispatch(getMessages({ from: user._id, to: remoteUserId?._id }));
  });

  useEffect(() => {
    dispatch(getMessages({ from: user._id, to: remoteUserId?._id }));
  }, [remoteUserId, messagesRecieve]);

  useEffect(() => {
    dispatch(searchedText());
  }, []);

  function handleOnEnter(text) {
    if (roomId?.length == 0) return;
    socket.emit("send-msg", { to: remoteUserId?._id, msg: text });
    if (user?.role == "user") {
      dispatch(
        addMessages({
          from: user._id,
          to: remoteUserId?._id,
          message: text,
        })
      ).then(() => {
        dispatch(getMessages({ from: user._id, to: remoteUserId?._id }));
      });
    } else {
      dispatch(
        addMessages({
          from: user._id,
          to: remoteUserId?._id,
          message: text,
        })
      ).then(() => {
        dispatch(getMessages({ from: user._id, to: remoteUserId?._id }));
      });
    }
  }

  function OnChatClick() {}
  return (
    <div className="grid grid-cols-12 min-h-[100vh]  ">
      <div className="col-span-3 ">
        <div className="w-full px-2 bg-[#f0f0f0] border-2 border-black  py-4 flex items-center justify-between">
          <Avatar className="!border-[#FF9A00] !w-[4rem] !h-[4rem] border-2" />
          <button className="cursor-pointer px-2 py-2 rounded-full border-2 border-[#FF9A00] ">
            <AddOutlined className="text-[#FF9A00] " />
          </button>
        </div>
        <div className="w-full min-h-[80vh] bg-white ">
          <SecondaryHeading
            text={"Messages"}
            styling={"text-[#ff9a00] !text-left px-3 !justify-start"}
          />
          <TextField
            variant="outlined"
            fullWidth
            sx={{
              px: 2,
              "& .css-11n7pad-MuiInputBase-root-MuiOutlinedInput-root": {
                backgroundColor: "#f5f4f5",
              },
            }}
            placeholder="Search Here..."
            onChange={(e) => {
              dispatch(
                searchedText({
                  params: e.target.value,
                  navigate,
                })
              );
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="pt-4 px-2 ">
            {searchResults?.search?.map((item, i) => (
              <ChatList
                setRemoteUserId={setRemoteUserId}
                setRoomId={setRoomId}
                item={item}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-9  ">
        <div className="py-6 border border-black justify-between flex items-center px-4 w-full bg-[#fff] ">
          <div className="flex space-x-3 items-center">
            <Avatar />
            <h3 className="text-3xl">{remoteUserId?.name} </h3>
          </div>

          <div className="flex items-center space-x-4">
            <IconButton>
              <SearchRounded className="!text-[2rem] " />{" "}
            </IconButton>
            <IconButton>
              <MenuOutlined className="!text-[2rem] " />{" "}
            </IconButton>
          </div>
        </div>
        <div className="h-[75vh] py-4  overflow-y-scroll w-[95%] mx-auto  ">
          {msgs?.map((item, i) => (
            <div
              className={`${
                item.fromSelf == true
                  ? " w-[50%] mr-auto "
                  : "w-[50%] justify-end ml-auto "
              } `}
            >
              <div className="flex items-center space-x-3">
                <Avatar />
                <div className="flex space-x-2">
                  <h4 className="text-lg">
                    {item?.fromSelf == true ? user?.name : remoteUserId?.name}{" "}
                  </h4>
                  <p className="text-sm text-gray-400 ">
                    09:54 <strong>PM</strong>{" "}
                  </p>
                </div>
              </div>
              <p
                className={`${
                  item?.fromSelf === true
                    ? " bg-[#F6F6F6] text-white  rounded-br-3xl rounded-bl-3xl rounded-tr-3xl "
                    : "  !bg-white rounded-br-3xl rounded-bl-3xl rounded-tr-3xl "
                }py-1 px-3 mt-2 text-[17px] font-medium `}
              >
                {item?.message}
              </p>
            </div>
          ))}
          {/* <div className="">
            <div className="flex w-full justify-end items-center space-x-3">
              <div className="flex space-x-2">
                <h4 className="text-lg">Tom Holland</h4>

                <p className="text-sm text-gray-400 ">
                  09:55 <strong>PM</strong>{" "}
                </p>

                <Avatar />
              </div>
            </div>
            <p className=" py-1 px-3 mt-2 text-[17px] font-medium ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A sunt
              beatae labore, iusto, tempora facilis odio voluptas reprehenderit
              porro nihil officia quos praesentium doloremque dolor ad commodi,
              fugiat deleniti hic.
            </p>
          </div> */}
        </div>
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
      </div>
    </div>
  );
};

export default Chat;
