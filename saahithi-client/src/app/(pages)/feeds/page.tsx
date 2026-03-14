"use client";

import Header from "@/components/layouts/Header";
import authApi from "@/services/auth.services";
// import { notFound } from "next/navigation";

const FeedsPage = () => {
  // const post = false;
  // if (!post) {
  //   notFound();
  // }

  return (
    <>
      <div className="flex-1 h-screen bg-gray-50">twtwteye</div>
      <div className="max-w-3xl w-full mx-auto bg-white flex-none">
        <Header />
        <div className="px-6">
          <h1>Dashboard</h1>
          <button onClick={() => authApi.logout()}>Logout</button>
        </div>
      </div>
      <div className="flex-1 h-screen bg-gray-50">ddfgdfhdfhd</div>
    </>
  );
};

export default FeedsPage;
