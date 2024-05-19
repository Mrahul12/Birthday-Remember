import React, { useContext, useState,useRef } from "react";
import { Context } from "../Api/Birthdayevent";
import { LuUpload } from "react-icons/lu";


const Form = () => {
  const { handleSubmit, imageHandle } = useContext(Context);
  const [text, setText] = useState(false);
  const ref=useRef()

  const handleSuccess = () => {
    setText(true);
    setTimeout(() => {
      setText(false);
    }, 2000);
  };
  return (
    <>
      <article className="w-full h-screen flex justify-center ">
        <div></div>
        <form
          className="flex flex-col justify-evenly  border-[4px] w-full md:w-[50vw] h-[70vh] p-5 border-blue-600 rounded  shadow-[1px_1px_5px_gray]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <label
              htmlFor="upload"
              className="text-xl text-slate-900 font-semibold"
            >
              Upload Image(optional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="hidden "
              id="upload"
              onChange={imageHandle}
              ref={ref}
            />
            <div
              onClick={() => ref.current.click()}
              className=" border-4 border-slate-600 w-[70px] h-[70px] rounded-full flex justify-center items-center"
            >
              <LuUpload className="text-4xl border-slate-600" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="user"
              className="text-xl  whitespace-nowrap text-ellipsis text-slate-900 font-semibold"
            >
              Birthay Boy or Girl Name.
            </label>
            <input
              type="text"
              className="p-4 rounded border-[3px] border-blue-500 outline-none  text-slate-900 text-ellipsis"
              placeholder="Enter Birthday Boy & Girl Name"
              id="user"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="date"
              className="text-xl text-ellipsis text-slate-900 font-semibold"
            >
              Birthay Date...
            </label>
            <input
              type="date"
              className="p-4 rounded border-[3px] border-blue-500 outline-none text-slat-900"
              placeholder="Enter birthday date."
              id="date"
              required
            />
          </div>
          {text ? (
            <button
              className="bg-teal-700 p-4 rounded text-2xl text-gray-800 font-bold"
              onClick={handleSuccess}
            >
              🤗 Good Job!
            </button>
          ) : (
            <button
              className="bg-slate-700 p-4 rounded text-2xl text-white font-bold"
              onClick={handleSuccess}
            >
              SetBirthday
            </button>
          )}
        </form>
      </article>
    </>
  );
};
export default Form;
