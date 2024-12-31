"use client";

import { useEffect } from "react";

// The provided Sendpulse script sticks the form on the bottom of the page, below the footer. And it takes a few seconds to appear at all.
// Set an interval to keep looking for it, then when it's found, put it where it belongs and stop the interval.
export function SubscriptionForm() {
  useEffect(() => {
    const interval = setInterval(() => {
      const sendpulseContainer = document.getElementById("sendpulse-container");
      const sendpulseForm = document.getElementById("sp-form-240784");
      if (sendpulseContainer && sendpulseForm) {
        sendpulseContainer.appendChild(sendpulseForm);
        sendpulseForm.style.display = "block";
        console.log("sendpulse initialized");
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="sendpulse-container">
      <script
        src="//web.webformscr.com/apps/fc3/build/loader.js"
        async
        sp-form-id="c978012aad99409bc00e574763ca52a3c88feff2f49909a9e76fac2d10f23df0"
      ></script>
    </div>
  );
}
