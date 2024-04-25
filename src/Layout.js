import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
const Layout = () => {
  return (
    <main>
      <Header />
      <article className="mt-16">
        <Outlet />
      </article>
    </main>
  );
};

export default Layout;
