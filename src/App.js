import React, { useState } from "react";
import Table from "./pages/Table";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Layout/Header";
import Form from "./pages/Form"
import Footer from "./Layout/Footer";



const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
        
          <Route path="/table" element={<Table />} />
          <Route path="/" element={<Form />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
