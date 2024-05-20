import React, { useContext } from "react";
import { Context } from "../Api/Birthdayevent";
import Birthday from "./Birthday";
const Datacollect = () => {
  const {
    birth,
    showNotification,
    message,
    birthdate,
    currentD,
    handleDelete,
    setBirth,
    setBirthdate,
  } = useContext(Context);
  let v = currentD.slice(0, 10);
  let vss = v.slice(5, 7);
  let dss = v.slice(8, 10);
  let births = birth.sort((a, b) => a.id - b.id);

  const clearLocalstorage = () => {
    let a = confirm("Really, You want to delete all.");

    if (a == true) {
      window.localStorage.clear();
      setBirth([]);
      setBirthdate([]);
    }
  };

  return (
    <>
      <section className="w-full lg:w-[50vw] h-screen flex flex-col justify-center items-center gap-2 ">
        <Birthday />
        <h2 className="text-xl font-bold text-slate-800 bg-yellow-300 w-full text-center rounded py-1 shadow-[1px_1px_5px_black] flex justify-evenly flex-wrap gap-2">
          Upcoming Birthday!
          <button
            className="bg-white px-2  rounded text-1xl font-semibold text-red-600 shadow-[0px_0px_5px_black] hover:scale-[1.1] whitespace-nowrap"
            onClick={clearLocalstorage}
          >
            All Clear
          </button>{" "}
        </h2>
        <section className="w-full flex flex-col gap-3 overflow-y-scroll overflow-x-hidden px-2 pt-4 pb-[200px] h-[80vh] scrollars">
          {birth.length > 0 ? (
            births.map((val, ind) => {
              return (
                <section key={ind}>
                  {vss == val.birthdate.slice(5, 7) ? (
                    <section className="bg-pink-600 w-full px-4 pb-4 rounded shadow-[1px_1px_5px_black] flex justify-center flex-col items-center  gap-1 relative">
                      <h2 className="bg-white leading-none w-full text-center p-1 font-semibold rounded-bl rounded-br text-[15px] shadow-[0px_1px_5px_black] text-green-600">
                        {dss <= val.birthdate.slice(8, 10)
                          ? dss == val.birthdate.slice(8, 10)
                            ? "Today Birthday........"
                            : "Upcoming Birthday......."
                          : "Waiting for next year"}
                      </h2>

                      <div className="flex justify-between  w-full items-center">
                        <img
                          src={val.picture}
                          alt={val.name.slice(0, 2)}
                          className="w-[60px] h-[60px] rounded-[50%] border-[3.5px] border-slate-800 shadow-[0px_1px_5px_black] object-center flex justify-center items-center text-2xl font-bold text-slate-800"
                        />
                        <p className="text-1xl font-semibold text-slate-900 text-center">
                          {val.name}
                        </p>
                        <p className="text-[15px] font-semibold text-slate-900 text-center">
                          {val.birthdate.split("-").reverse().join("-")}
                        </p>
                      </div>
                      <button
                        className="absolute right-1 bottom-[0.15rem] bg-white px-2 rounded text-red-600  font-semibold shadow-[0px_0px_5px] "
                        onClick={() => handleDelete(ind)}
                      >
                        Delete
                      </button>
                    </section>
                  ) : (
                    <section className="bg-slate-50 w-full p-4 rounded shadow-[1px_1px_5px_black] flex justify-between items-center relative ">
                      <img
                        src={val.picture}
                        alt={val.name.slice(0, 2)}
                        className="w-[60px] h-[60px] rounded-[50%] border-[3.5px] border-slate-700 shadow-[0px_1px_5px_black] object-center flex justify-center items-center text-2xl font-bold text-slate-600"
                      />

                      <p className="text-1xl font-semibold text-slate-700 text-center">
                        {val.name}
                      </p>
                      <p className="text-[13px] font-semibold text-slate-700 text-center">
                        {val.birthdate.split("-").reverse().join("-")}
                      </p>
                      <button
                        className="absolute right-1 bottom-[0.15rem] bg-white px-2 rounded text-red-600  font-semibold shadow-[0px_0px_5px] "
                        onClick={() => handleDelete(ind)}
                      >
                        Delete
                      </button>
                    </section>
                  )}
                </section>
              );
            })
          ) : (
            <h2 className="bg-white w-full p-4 rounded shadow-[1px_1px_5px] text-slate-600 font-bold max-sm:text-[13px] text-justify">
              Add your friends' birthdays ThankYou.....
            </h2>
          )}
        </section>
      </section>
    </>
  );
};
export default Datacollect;
