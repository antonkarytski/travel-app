import React from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Avatar from '@material-ui/core/Avatar';

const UserBar = ({ classes, langExtraData }) => {
  return (
    <div className={classes.wrap}>
      <AppContext.Consumer>
        {(value) =>
          !value.isAuthenticated ? (
            <NavLink className={classes.logButton} to={"/login"}>
                {langExtraData.signIn}
            </NavLink>
          ) : (
            <div>
                <NavLink className={classes.avatar} to={"/user"}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </NavLink>

              {/*<button className={classes.logButton} onClick={value.logout}>{langExtraData.logOut}</button>*/}
            </div>
          )
        }
      </AppContext.Consumer>
    </div>
  );
};

export default UserBar;
