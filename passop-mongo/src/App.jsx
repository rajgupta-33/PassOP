// import { useState } from 'react'
// import './App.css'
// import Navbar from './components/Navbar'
// import Manager from './components/Manager'
// import Footer from './components/Footer'

// function App() {

//   return (
//     <>
//       <Navbar />
//       <div className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
//         <Manager />
//       </div>
//       <Footer />
//     </>
//   )
// }

// export default App


// import React, { useState } from "react";
// import Login from "./components/Login";
// import Manager from "./components/Manager";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <Manager />
//       ) : (
//         <Login onLoginSuccess={() => setIsLoggedIn(true)} />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Login from "./components/Login";
import Manager from "./components/Manager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Page reload hone pe bhi check karlo agar token hai to logged in maana
    return !!localStorage.getItem("token");
  });

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");  // Token hatao
    setIsLoggedIn(false);               // Login state false karo
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button
            onClick={handleLogout}
            style={{ margin: "10px", padding: "8px 12px", cursor: "pointer" }}
          >
            Logout
          </button>
          <Manager />
        </>
      ) : (
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;

