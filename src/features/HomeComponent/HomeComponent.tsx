import BarcodeReader from "@/components/elements/barcord_reader/BarcodeReader";
import Scanner from "@/components/elements/barcord_reader/Scanner";
import { AppBar, Button, Drawer, Grid, IconButton, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { ContentPaste, Copyright, Favorite, FormatListBulleted, GppMaybe, Info, Lightbulb, LocationOn, Menu, MenuOpen, Policy, PrivacyTip, Restore, Shuffle } from '@mui/icons-material';
import { allyProps } from "@/components/elements/Tab/AllyProps";
import { TabPanel } from "@/components/elements/Tab/TabPanel";

export default function HomeComponent() {
    const [value, setValue] = useState(0);
    const [drawerOpened, setDrawerOpened] = useState(false);
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };
    function onHamburgerClicked(event: any): void {
        setDrawerOpened(!drawerOpened);
    }
    return (
        <>
            <AppBar position="static">
                <Grid container spacing={0} alignItems="center" justifyContent="left">
                    <Grid item xs={1}>
                        <IconButton aria-label="shuffleBoard" onClick={onHamburgerClicked}>
                            <Menu />
                        </IconButton>
                    </Grid>
                    <Grid item xs={11}>
                        <Tabs variant="scrollable" scrollButtons allowScrollButtonsMobile value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Barcode reader" {...allyProps(0)} />
                            {/* <Tab label="Power Number chart" {...allyProps(1)} />
                            <Tab label="Odds calculator" {...allyProps(2)} />
                            <Tab label="Poker Table" {...allyProps(3)} /> */}
                        </Tabs>
                    </Grid>
                </Grid>
            </AppBar>
            <TabPanel value={value} index={0}>
                <BarcodeReader />
            </TabPanel>
            <div style={{ height: 20 }}></div>

            <Drawer
                anchor={'left'}
                open={drawerOpened}
                onClose={() => setDrawerOpened(false)}>
                <AppBar position="static">
                    <IconButton aria-label="shuffleBoard" onClick={onHamburgerClicked}>
                        <MenuOpen />
                    </IconButton>
                </AppBar>
                {/* <MenuItem onClick={onReadMeClicked}>
          <ListItemIcon>
            <Lightbulb fontSize="medium" />
          </ListItemIcon>
          <ListItemText>About Tool</ListItemText>
          <Typography variant="body2" color="text.secondary">{''}</Typography>
        </MenuItem>
        <MenuItem onClick={onLicenseClicked}>
          <ListItemIcon>
            <PrivacyTip fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Licenses</ListItemText>
          <Typography variant="body2" color="text.secondary">{''}</Typography>
        </MenuItem> */}
            </Drawer>
        </>
    )
}