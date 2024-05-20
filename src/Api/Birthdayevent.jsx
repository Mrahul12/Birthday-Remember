import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Main from "../Component/Main";
import { toast } from "react-toastify";

import music from "./../assets/news-ting-6832.mp3";
import "react-toastify/dist/ReactToastify.css";
const Context = createContext("No data");

const getValueLocalStorage = () => {
  let val = localStorage.getItem("birthday");
  if (typeof val == "string") {
    // ! JSON.parse   derived from an array, the method  that convert JSON string into javascript object.
    let vals = JSON.parse(localStorage.getItem("birthday")); // '[]' ==> []
    return vals;
  } else {
    return [];
  }
};
const getValueLocal = () => {
  let val = localStorage.getItem("birthdate");
  if (typeof val == "string") {
    // ! JSON.parse   derived from an array, the method  that convert JSON string into javascript object.
    let vals = JSON.parse(localStorage.getItem("birthdate")); // '[]' ==> []
    return vals;
  } else {
    return [];
  }
};

const Birthdayevent = (props) => {
  const [birth, setBirth] = useState(getValueLocalStorage());
  const [birthdate, setBirthdate] = useState(getValueLocal());
  const [show, setShow] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [buttons, setButtons] = useState(false);
  const[today,setToday]=useState(false)
  let audio = new Audio(music);
  const notify = () => {
    if (message.length > 0) {
      toast(`🎂${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      audio.play();
    }
  };
  // !=======show conditionally home ans dashboard======================
  const handleDisplay = (value) => {
    setShow(value);
    setButtons(value);
  };

  // !Image upload==================================================
  const imageHandle = (e) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageurl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ! Form Submit============================
  const handleSubmit = (e) => {
    e.preventDefault();
    const names = e.target[1].value;
    const name = names.toUpperCase();
    const birthday = e.target[2].value;
    const mon = birthday.slice(6, 7);
    setBirth([
      ...birth,
      {
        id: mon,
        name: name,
        birthdate: birthday,
        birthmonth: "This Month Birthday",
        picture: imageurl,
      },
    ]);
    setBirthdate([...birthdate, birthday]);
    setImageurl("");

    e.target[1].value = "";
    e.target[2].value = "";
  };

  // ! Set Birthday Notification=================================
  const setDates = birthdate;
  const getDate = setDates.sort();
  // console.log(getDate)
  const d = new Date();
  const ds = d.getDate();
  const ms = d.getMonth() + 1;
  const ys = d.getFullYear();

  // !===Auto Increment Year ======================================
  birth.map((date) => {
    if (date.birthdate.slice(0, 4) < ys) {
      let year = ys + 1;
      date.birthdate = `${year}-${date.birthdate.slice(5, 10)}`;
    }
  });
  // !===getUsername================================
  let currentD = `${ys}-0${ms}-${ds}`;
  let vi = currentD.slice(0, 10);
  let user;
  birth.map((username) => {
    if (vi.slice(5, 10) == username.birthdate.slice(5, 10)) {
      user = username.name;
    }
  });

  // !===useEffect Cookies==============================================
  let expiryDate;
  getDate.map((date) => {
    let dateWithTime = `${date}T11:52:00`;
    if (currentD.slice(5, 10) == date.slice(5, 10)) {
      expiryDate = new Date(dateWithTime);
    }
  });
  useEffect(() => {
    Cookies.set("myAutoCookie", "autoCookieValue", { expires: expiryDate });
    // console.log("Cookie automatically set with expiry date:", expiryDate);
    const checkAndRemoveCookie = () => {
      const currentDate = new Date();
      if (currentDate >= expiryDate) {
        Cookies.remove("myAutoCookie");
        setShowNotification(true);
        notify();
        setMessage(
          `${currentD
            .slice(0, 10)
            .split("-")
            .reverse()
            .join(
              "-"
            )},${user} Birthday.Check Birthday Remember Application. ThankYou Ji ! `
        );
        // console.log(  "Good job for cookies expire" );
        // !======Notification On device=======================\
        (async () => {
          function showNotification() {
            const getNotification = new Notification(
              `🎂 Today ${user} Birthday. Best Wishes From The Bottom Of My Heart❤️.`,
              {
                body: "Wishing you a day as bright as your smile.Wishing you a day full of love, laughter, and good times.",
              }
            );
            // ========close the notification
            setTimeout(() => {
              getNotification.close();
            }, 6 * 1000);

            //======= goto next url of website
            getNotification.addEventListener("click", (e) => {
              e.preventDefault();
              window.open();
            });
            audio.play();
          }

          // show error message============
          const sError = () => {
            alert(
              "Please enable the notification for new updated  because you block the notification."
            );
          };
          // Check permission================
          let granted = false;
          if (Notification.permission === "granted") {
            granted = true;
          } else if (Notification.permission !== "denied") {
            let permissions = await Notification.requestPermission();
            alert("Allow notification for new update message.");
            granted = permissions == "granted" ? true : false;
          }
          // ==========show notification and console.error();
          granted ? showNotification() : sError();
        })();
      }
    };
    checkAndRemoveCookie();
    const intervalId = setInterval(checkAndRemoveCookie, 3600 * 1000);
    return () => {
      clearInterval(intervalId);
      // console.log("Interval cleared on component unmount");
    };
  }, [expiryDate]);

  // !====================ServiceWorker=================================
  useEffect(() => {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.sync.register("check-cookie");
      });

      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data === "Cookie has been removed because it has expired.") {
          setShowNotification(true);
        }
      });
    }
  }, []);

  //  !====================================

  useEffect(() => {
    localStorage.setItem("birthday", JSON.stringify(birth)); //store like {item:'[]'}
    localStorage.setItem("birthdate", JSON.stringify(birthdate)); //store like {item:'[]'}
  }, [birth, birthdate]);
  // !====handleDelete===========================
  const handleDelete = (ind) => {
    const filterData = birth.filter((vs, inds) => {
      return inds !== ind;
    });
    setBirth(filterData);
  };
// !=====Today & Tomorrow=============================
 const handleShow = (shows) => {
  setToday(shows)
 };
  // !=========================================

  return (
    <Context.Provider
      value={{
        handleSubmit,
        birth,
        show,
        handleDisplay,
        showNotification,
        message,
        birthdate,
        currentD,
        imageHandle,
        buttons,
        handleDelete,
        setBirth,
        setBirthdate,
        handleShow,
        today
      }}
    >
      {props.children}
      <Main />
    </Context.Provider>
  );
};
export default Birthdayevent;
export { Context };
