import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/navbar";

import Footer from "./Components/footer";
import OfferLater from "./Pages/LettersPage/OfferLater";


const App = () =>{

  return(
    <Fragment>
    <main className="flex flex-col min-h-screen ">
      {/* //Navbar  */}
      <Navbar/>
      {/* -------------------- */}


    <Routes>
      {/* <Route path="/" element={<Home/>} /> */}
      <Route path="/" element={<OfferLater/>} />

    </Routes>


    <Footer/>
    </main>
    </Fragment>
  );
}

export default App;
