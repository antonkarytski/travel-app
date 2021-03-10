import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    label: string;
    value?: any;
    index?: any;
    className: string;
}

function TabPanel(props: TabPanelProps) {

    const { children, index, value, label, className, ...other } = props;

    const classes = "gogo"

    return (
        <div
            style={{display: value === index? 'flex': 'none'}}
            role={"tabpanel"}
            className={[classes ,className].join(' ')}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}


export default TabPanel