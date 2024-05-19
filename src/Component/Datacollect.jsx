import React, { useContext } from "react";
import { Context } from "../Api/Birthdayevent";
import Birthday from "./Birthday";
const Datacollect = () => {
  const { birth, showNotification, message, birthdate, currentD } =
    useContext(Context);
  let v = currentD.slice(0, 10);
  let vss=v.slice(5,7);
  let births=birth.sort((a,b)=>a.id-b.id);
  return (
    <>
      <section className="w-full md:w-[50vw] h-screen flex flex-col justify-center items-center gap-4 ">
        <Birthday />
        <h2 className="text-xl font-bold text-slate-800 bg-yellow-300 w-full text-center rounded py-1 shadow-[1px_1px_5px_black] flex justify-evenly flex-wrap gap-2">
          Upcoming Birthday!
        </h2>
        <section className="w-full flex flex-col gap-3 overflow-y-scroll overflow-x-hidden px-2 pt-4 pb-[200px] h-[80vh] scrollars">
          {births.map((val, ind) => {
            return (
              <section key={ind}>
                {vss == val.birthdate.slice(5, 7) ? (
                  <section className="bg-pink-600 w-full px-4 pb-4 rounded shadow-[1px_1px_5px_black] flex justify-center flex-col items-center  gap-1">
                    <h2 className="bg-white leading-none w-full text-center p-1 font-bold rounded-bl rounded-br text-1xl shadow-[0px_1px_5px_black] text-green-600">
                      {val.birthmonth}
                    </h2>

                    <div className="flex justify-between w-full items-center">
                      <img
                        src={val.picture}
                        alt=""
                        className="w-[60px] h-[60px] rounded-[50%] border-[3px] border-slate-600 bg-white shadow-[1px_1px_5px_black] object-center"
                      />

                      <p className="text-1xl font-semibold text-slate-900 text-center">
                        {val.name}
                      </p>
                      <p className="text-[13px] font-semibold text-slate-900 text-center">
                        {val.birthdate.split("-").reverse().join("-")}
                      </p>
                    </div>
                  </section>
                ) : (
                  <section className="bg-slate-50 w-full p-4 rounded shadow-[1px_1px_5px_black] flex justify-between items-center ">
                    <img
                      src={val.picture}
                      alt=""
                      className="w-[60px] h-[60px] rounded-[50%] border-[3px] border-slate-700 shadow-[0px_1px_5px_black] object-center"
                    />

                    <p className="text-1xl font-semibold text-slate-700 text-center">
                      {val.name}
                    </p>
                    <p className="text-[13px] font-semibold text-slate-700 text-center">
                      {val.birthdate.split("-").reverse().join("-")}
                    </p>
                  </section>
                )}
              </section>
            );
          })}
        </section>
      </section>
    </>
  );
};
export default Datacollect;
