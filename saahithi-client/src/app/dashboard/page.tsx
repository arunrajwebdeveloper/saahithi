"use client";

import authApi from "@/services/auth";
import React from "react";

const dashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => authApi.logout()}>Logout</button>
    </div>
  );
};

export default dashboardPage;
