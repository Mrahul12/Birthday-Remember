import React, { useContext } from "react";
import { Context } from "../Api/Birthdayevent";

const Today = () => {
  const { birth, showNotification, message, birthdate, currentD } =
    useContext(Context);
  let v = currentD.slice(0, 10);
  let showDated;
  birth.map((asered, ind) => {
    let asersed = asered.birthdate.slice(0, 10);
    if (v == asersed) {
      showDated = v;
    }
  });
  return (
    <>
      <section className="flex flex-col gap-2 w-full h-[160px] overflow-x-hidden overflow-y-scroll p-2 scrollars">
        {v == showDated ? (
          birth.map((user, ind) => {
            let users = user.birthdate.slice(0, 10);

            if (v == users) {
              return (
                <section
                  key={ind}
                  className="bg-white w-full p-4 rounded shadow-[1px_1px_5px] flex justify-between items-center gap-3"
                >
                  <img
                    src={user.picture}
                    alt={user.name.slice(0, 2)}
                    className="w-[60px] h-[60px] rounded-[50%] border-[3.5px] border-slate-800 shadow-[0px_1px_5px_black] object-center flex justify-center items-center text-2xl font-bold text-slate-800"
                  />
                  <div className="text-justify  max-sm:w-[180px] grow">
                    <p className="text-1xl max-sm:text-[12px]  text-slate-700 text-justify font-semibold">
                      <span className="text-rose-600 font-bold">Today</span>,
                      <b className=" decoration-wavy">{` ${user.name} `}</b>
                      Birthday, Happy many many returns of the day. Good Bless
                      You! 🎂🎂🎊🎊
                    </p>
                  </div>
                </section>
              );
            }
          })
        ) : (
          <h2 className="bg-white w-full p-4 rounded shadow-[1px_1px_5px] text-slate-600 font-bold max-sm:text-[13px] text-justify">
            Looking at your upcoming birthday, I feel like there will be no
            birthday Today.....
          </h2>
        )}
      </section>
    </>
  );
};
export default Today;
