import { Fragment, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar";

import Footer from "./Components/footer";
import OfferLater from "./Pages/LettersPage/OfferLater";
import ViewOfferLettersPage from "./Pages/LettersPage/ViewLetters";
import LoginPage from "./Pages/Login";
import HomePage from "./Pages/Dashboard";


const App = () =>{
  const [render, setRender] = useState(false);

  const handleLogout = () => {
    // console.log('Logout function called');
    localStorage.removeItem('token')
    setRender(true);
    Navigate('/');
    handleRender();
}

const handleRender = () => {
  setRender(!render)
}

useEffect(()=>{
  handleRender()
},[])

  return(
    <Fragment>
    <main className="flex flex-col min-h-screen ">
      {/* //Navbar  */}
      <Navbar Logout={handleLogout} render={render} />

      {/* -------------------- */}

    <Routes>
      {/* <Route path="/" element={<Home/>} /> */}
      
      <Route path="/" element={<LoginPage/>} />
      <Route path="/dashboard" element={<HomePage/>} />

      <Route path="/LetterGenrate" element={<OfferLater/>} />
      <Route path="/OfferLetter" element={<ViewOfferLettersPage/>} />

    </Routes>


    <Footer/>
    </main>
    </Fragment>
  );
}

export default App;
