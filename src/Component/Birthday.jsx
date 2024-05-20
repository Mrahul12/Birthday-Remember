import React, { useContext } from "react";
import { Context } from "../Api/Birthdayevent";
import Today from "./Today";
import Tomorrow from "./Tomorrow";
const Birthday = () => {
  const { birth, showNotification, message, birthdate, currentD,handleShow ,today} =
    useContext(Context);
  let v = currentD.slice(0, 10);
  
  return (
    <>
      <p className="text-xl font-bold text-center text-slate-800 bg-rose-500 w-full  rounded-lg py-1 shadow-[1px_1px_5px_black] whitespace-nowrap">
        🎂 Birthday Boy or Girl.
      </p>
      <div className='w-full flex justify-evenly'>
        <button className='bg-white px-2 py-1 font-bold text-rose-500 shadow-[0px_0px_5px] rounded hover:scale-[1.1]' onClick={()=>handleShow(false)}>Today</button>
        <button className='bg-white px-2 py-1 font-bold text-rose-500 shadow-[0px_0px_5px] rounded hover:scale-[1.1]' onClick={()=>handleShow(true)}>Tomorrow</button>
      </div>
      {
        today?<Tomorrow/>:<Today/>
      }
      
    </>
  );
};
export default Birthday;
