import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';
import {render} from "react-dom/profiling";

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  // Only show nav when logged in
  if (!user) return null;

  

  function CustomerNav() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-myColor-500 px-3">
        <div className="navbar-nav">
          <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
          <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>
        </div>
      </nav>
    );
  }

    function photographer(){
        return <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/account/imageupload" id="upload" className="nav-item nav-link">Upload images</NavLink>
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logout</button>
            </div>
        </nav>
    }
    function admin() {
        return <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/users" id="users" className="nav-item nav-link">Users</NavLink>
                <NavLink href="/account/imageupload" id="upload" className="nav-item nav-link">Upload images</NavLink>
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link ">Logout</button>
            </div>
        </nav>
    }

    if (user.userType === "customer") {
        return (CustomerNav());
    }else if (user.userType === "photographer"){
        return (photographer());
    }
    return (admin());


  if (user.userType === "customer") {
    return <CustomerNav />;
  } else if (user.userType === "photographer") {
    return <PhotographerNav />;
  }


  return <AdminNav />;
}