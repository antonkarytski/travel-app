import React from 'react'

const NavBar = ({classes, children}) => {
    return(
        <div className={classes}>
            {children}
        </div>
    )
}

export default NavBar