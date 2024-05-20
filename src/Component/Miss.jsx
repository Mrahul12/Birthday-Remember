useEffect(() => {
  Cookies.set("cookieBirth", "birthdayCookie", { expires: expiryDate });
  // console.log("Cookie automatically set with expiry date:", expiryDate);

  const checkAndRemoveCookie = (expiryDate) => {
    const currentDate = new Date();
    if (currentDate >= expiryDate) {
      Cookies.remove("cookieBirth");
      setShowNotification(true);
      notify();
      setMessage(`${currentD
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-")},${user} Birthday .   
        Check Birthday Remember Application. ThankYou Ji ! `);
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
          }, 5 * 1000);

          //======= goto next url of website
          getNotification.addEventListener("click", (e) => {
            e.preventDefault();
            window.open("http://localhost:5173/", "_self");
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

    // =================

    // =============
  };

  checkAndRemoveCookie(expiryDate);

  const intervalId = setInterval(checkAndRemoveCookie, 3600 * 1000);

  return () => {
    clearInterval(intervalId);
    // console.log("Interval cleared on component unmount");
  };
}, [expiryDate, user]);
