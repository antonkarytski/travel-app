import React from 'react'
import {NavLink} from "react-router-dom";
import {AppContext} from "../../context/AppContext";

const UserBar = ({classes}) => {
    return (
        <div className={classes}>
            <AppContext.Consumer>
                {value => !value.isAuthenticated ?
                    <NavLink to={"/login"}>Sign in</NavLink> :
                    <div>
                        <button
                            onClick={value.logout}
                        >Log out
                        </button>
                    </div>}
            </AppContext.Consumer>
        </div>
    )
}

export default UserBar