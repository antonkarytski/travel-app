import React, {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import Avatar from '@material-ui/core/Avatar';

const UserBar = ({classes, langExtraData}) => {
    const [logoutVisibility, setLogoutVisibility] = useState(false)
    const userImageLink = "https://travel-app-24.s3.eu-north-1.amazonaws.com/"
    const {userData} = useContext(AppContext)


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
                            <NavLink
                                isActive={(match) => {
                                    if(match){
                                        setLogoutVisibility(true)
                                    } else {
                                        setLogoutVisibility(false)
                                    }
                                }}
                                className={classes.avatar}
                                to={"/user"}>
                                {
                                    !logoutVisibility ?
                                        <Avatar
                                            alt={userData?.name?.toUpperCase() || userData?.email?.toUpperCase()}
                                            src={userImageLink+userData?.image}
                                        /> : null
                                }

                            </NavLink>
                            {logoutVisibility ?
                                <NavLink to={"/"} className={classes.logButton} onClick={value.logout}>
                                    {langExtraData.logOut}
                                </NavLink> : null
                            }

                        </div>

                    )
                }
            </AppContext.Consumer>
        </div>
    );
};

export default UserBar;
