import React, { useState } from "react";
// import Main from "./Component/Main";
import Birthdayevent from "./Api/Birthdayevent";


function App() {
 
  return (
    <>
      <header className="w-full h-screen overflow-hidden flex flex-col  ">
        <h1 className="text-center sm:text-4xl max-md:text-2xl font-bold text-slate-800 bg-slate-400 p-5 border-b-4 border-rose-500 text-ellipsis ">
          Birthday Remember App
        </h1>
        <Birthdayevent/>
      </header>
    </>
  );
}

export default App;
