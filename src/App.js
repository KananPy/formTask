import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Layout/Header";
import Form from "./pages/Form"
import Footer from "./Layout/Footer";
import TablePage from "./pages/TablePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/table" element={<TablePage />} />
            <Route path="/" element={<Form />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
