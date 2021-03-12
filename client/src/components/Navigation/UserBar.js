import React from 'react'
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

const UserBar = ({classes}) => {
    return (
        <div className={classes}>
            <AuthContext.Consumer>
                {value => !value.isAuthenticated ?
                    <NavLink to={"/login"}>Sign in</NavLink> :
                    <div>
                        <button
                            onClick={value.logout}
                        >Log out
                        </button>
                    </div>}

            </AuthContext.Consumer>
        </div>
    )
}

export default UserBar