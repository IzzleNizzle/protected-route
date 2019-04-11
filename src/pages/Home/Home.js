import React from "react";
import auth from "../../utils/auth"

export default function Home() {

  // Refresh token every 5 seconds
  setInterval(() => {
    console.log('refresh')
    auth.refreshToken()
  }, 5000)

  return (
    <div>
      <h2>A Protected Route?... Nice!</h2>
    </div>
  );
}