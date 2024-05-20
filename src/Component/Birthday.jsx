import React, { useContext } from "react";
import { Context } from "../Api/Birthdayevent";

const Birthday = () => {
  const { birth, showNotification, message, birthdate, currentD } =
    useContext(Context);
  let v = currentD.slice(0, 10);

  return (
    <>
      <p className="text-xl font-bold text-center text-slate-800 bg-rose-500 w-full  rounded-lg py-1 shadow-[1px_1px_5px_black] whitespace-nowrap">
        🎂 Birthday Boy or Girl.
      </p>
      <section className="flex flex-col gap-2 w-full h-[160px] overflow-x-hidden overflow-y-scroll p-2 scrollars">
        {birth.map((user, ind) => {
          // console.log(user.birthdate)
          if (v == user.birthdate) {
            return (
              <section
                key={ind}
                className="bg-green-500 w-full p-4 rounded shadow-[1px_1px_5px] flex justify-between items-center gap-3"
              >
                <img
                  src={user.picture}
                  alt={user.name.slice(0, 2)}
                  className="w-[60px] h-[60px] rounded-[50%] border-[3.5px] border-slate-800 shadow-[0px_1px_5px_black] object-center flex justify-center items-center text-2xl font-bold text-slate-800"
                />
                <div className="text-justify  max-sm:w-[160px]">
                  <p className="text-1xl max-sm:text-[12px]  text-slate-700 text-justify font-semibold">
                    {`${user.name}, Happy many many returns of the day. Good Bless You! 🎂🎂🎊🎊`}
                  </p>
                </div>
              </section>
            );
          }
        })}
      </section>
    </>
  );
};
export default Birthday;
