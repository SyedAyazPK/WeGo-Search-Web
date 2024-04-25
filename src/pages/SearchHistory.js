import {
  Avatar,
  Button,
  Divider,
  Fab,
  IconButton,
  Paper,
  Rating,
  Select,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../components/reuse-css/FlexBetween";
import { FaMicrophoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import {
  searchHistory,
  searchedText,
  selectSearchData,
  selectSearchHistory,
} from "../features/searchSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchResultCard } from "../components/cards/SearchResultCard";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "55px",
  backgroundColor: "#c9c9c9",
  "&:hover": {
    backgroundColor: "#c9c9c9",
  },
  margin: 0,
  padding: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  padding: 0,
  margin: 0,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "12ch",
    //   "&:focus": {
    //     width: "20ch",
    //   },
    // },
  },
}));

const SearchHistory = ({}) => {
  const [value, setValue] = useState(0);
  const user = useSelector(selectUser);
  const searches = useSelector(selectSearchHistory);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(searches, "searches");
  useEffect(() => {
    dispatch(searchHistory());
    console.log("after useEffect");
  }, []);

  return (
    <section style={{ marginTop: "-48px", marginBottom: "-96px" }}>
      {/* <FlexBetween>
        <Search className="!w-[70%]  " sx={{ margin: 0 }}>
          <SearchIconWrapper>
            <FaMicrophoneAlt />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            onChange={(e) => {
              dispatch(searchedText({ params: e.target.value, navigate }));
            }}
            autoComplete="false"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </FlexBetween> */}
      <div className="py-6  w-[85%]   mx-auto ">
        {searches?.map((search, index) => (
          <div key={index}>
            <SearchResultCard title={search.text} id={search._id} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchHistory;
