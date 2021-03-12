import React, {useState} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {Tab} from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));


const VerticalTabs = ({children}) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    let TabLabels = null;
    let TabsContent = null;
    if(children){
        TabLabels = children.map((child, index) => {
            return (<Tab label={child.props.label} key = {index} {...a11yProps(index)} />)
        })
        TabsContent = children.map((child, index) => {
            return React.cloneElement(child, {value: value, key: index, index})
        })
    }



    return (
        <div className={classes.root}>
            <Tabs
                style={{minWidth: '200px'}}
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {TabLabels}
            </Tabs>
            {TabsContent}
        </div>
    );
}


export default VerticalTabs