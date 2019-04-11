import React, { useEffect } from "react";
import auth from "../../utils/auth"


export default function Home() {

  useEffect(() => {
    // Refresh token every 5 seconds
    let interval = setInterval(() => {
      console.log('refresh')
      auth.refreshToken()
    }, 5000)

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