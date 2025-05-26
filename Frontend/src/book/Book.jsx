import React from "react";
import Navbar from "../components/main/Navbar";
import Footer from "../components/main/Footer";
import Books from "../pages/main/Books";
function Book() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Books/>
      </div>
      <Footer />
    </>
  );
}

export default Book;
