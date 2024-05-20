import React, { useContext,useState } from "react";
import Datacollect from "./Datacollect";
import Form from'./Form';
  import { ToastContainer, toast } from "react-toastify";
import { Context } from "../Api/Birthdayevent";
const Main = (props) => {
  const { show, handleDisplay, buttons } = useContext(Context);






  return (
    <>
      <main className="flex flex-col gap-5  py-4 px-2 w-full h-screen items-center bgimage">
        <section className="flex justify-evenly gap-4">
          <button
            className="bg-green-500 px-10 py-2 rounded text-1xl font-bold text-slate-900 shadow-[0px_0px_5px_black] hover:scale-[1.1]"
            onClick={() => handleDisplay(false)}
          >
            Home
          </button>
         
            <button
              className="bg-green-500 px-5 py-2 rounded text-1xl font-bold text-slate-900 shadow-[0px_0px_5px_black] hover:scale-[1.1]"
              onClick={() => handleDisplay(true)}
              
            >
              Dashboard
            </button>

        </section>
        <ToastContainer />
        {show ? <Datacollect /> : <Form />}
      </main>
    </>
  );
};
export default Main;
