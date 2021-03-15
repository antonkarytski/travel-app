import React from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const UserBar = ({ classes, langExtraData }) => {
  return (
    <div className={classes}>
      <AppContext.Consumer>
        {(value) =>
          !value.isAuthenticated ? (
            <NavLink to={"/login"}>{langExtraData.signIn}</NavLink>
          ) : (
            <div>
              <button onClick={value.logout}>{langExtraData.logOut}</button>
            </div>
          )
        }
      </AppContext.Consumer>
    </div>
  );
};

export default UserBar;
