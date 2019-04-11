import React, { useEffect } from "react";
import auth from "../../utils/auth"


export default function Home() {

  useEffect(() => {
    // Check to see if token needs refreshing every 15 seconds
    let interval = setInterval(() => {
      auth.checkRefresh()
    }, 15000)

    // On Dismount clear interval
    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div>
      <h2>A Protected Route?... Nice!</h2>
    </div>
  );
}