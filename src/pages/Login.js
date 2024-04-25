import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PrimaryBtn from "../components/buttons/PrimaryBtn";
import PrimaryTabs from "../components/tabs/PrimaryTabs";
import PrimaryHeading from "../components/typography/PrimaryHeading";
import DragBox from "../components/DragBox";
import { loginUser, registerUser } from "../features/userSlice";
import LightHeading from "../components/typography/LightHeading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
    role: "",
  });
  return (
    <DragBox>
      <div className="flex flex-col items-center w-full">
        <PrimaryHeading text={"Register"} boxStyles="pb-6" />
        <div className="flex sm:flex-row flex-col sm:space-y-0 space-y-3 sm:w-full lg:w-[70%] mx-auto sm:space-x-6 items-center pb-6">
          <PrimaryTabs
            text={"Login As User"}
            value={0}
            activeValue={value}
            setValue={setValue}
          />
          <PrimaryTabs
            text={"Login As Vendor"}
            value={1}
            activeValue={value}
            setValue={setValue}
          />
        </div>
        <div className="w-[70%] flex flex-col space-y-6 pt-6 mx-auto ">
          <TextField
            type="text"
            label="Email"
            value={form.email}
            onChange={(e) => {
              setForm({
                ...form,
                email: e.target.value,
              });
            }}
          />
          <TextField
            type="password"
            label="Password"
            value={form.password}
            onChange={(e) => {
              setForm({
                ...form,
                password: e.target.value,
              });
            }}
          />

          <PrimaryBtn
            text={"Submit"}
            width="75%"
            onClick={() => {
              if (value == 1) {
                setForm({
                  ...form,
                  role: "vendor",
                });
              }
              dispatch(loginUser(form)).then((resp) => {
                if (resp.payload?._id) {
                  navigate("/home");
                  localStorage.setItem("token", resp.payload?.token);
                }
              });
            }}
          />
          <div className="w-[52%] ml-auto ">
            <LightHeading
              colorMain={"text-[#707070]"}
              textMain={"Don't have an account? "}
              colorSecondary={"text-black"}
              textSecondary={"Sign Up"}
              link={"/register"}
            />
          </div>
        </div>
      </div>
    </DragBox>
  );
};

export default Login;
