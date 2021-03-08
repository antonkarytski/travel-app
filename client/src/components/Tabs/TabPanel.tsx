import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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
            role={"tabpanel"}
            className={[classes ,className].join(' ')}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


export default TabPanel