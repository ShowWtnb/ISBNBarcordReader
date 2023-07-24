import Scanner from "@/components/elements/barcord_reader/Scanner";
import { Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function BarcodeReader() {
    const [isbn, setIsbn] = useState<number>()
    const [isScannerVisible, setIsScannerVisible] = useState<boolean>(false)
    const [scanError, setScanError] = useState<string>()
    useEffect(() => {
        if (scanError) {
            toast.error(`Error: ${scanError}`, {
                position: 'top-right',
            })
        }
    }, [scanError])

    function onClickButton(event: any): void {
        setIsScannerVisible(true);
    }
    function onScanCanceled(event: any): void {
        setIsScannerVisible(false);
    }
    function onISBNRead(event: any): void {
        setIsScannerVisible(false);
        setIsbn(event);
    }
    return (
        <>
            <Box margin={1} textAlign='center'>
                <Grid container spacing={1} alignItems={'center'} alignContent={'center'} justifyContent={'center'}>
                    {/* <Grid item xs={12} >
                    <h1>Home Component</h1>
                </Grid> */}
                    <Grid item xs={12}>
                        <Box textAlign='center'>
                            <Button variant="outlined" onClick={onClickButton}>Read Barcode</Button>
                        </Box>
                    </Grid>
                    {
                        isScannerVisible ?
                            <></>
                            :
                            <Grid item xs={12}>
                                <Box textAlign='center'>
                                    <TextField id="outlined-basic" label="ISBN" variant="outlined" value={isbn} />
                                </Box>
                            </Grid>
                    }
                    {
                        isScannerVisible ?
                            <Grid item xs={12}>
                                <Box textAlign='center'>
                                    <Scanner receiveIsbn={onISBNRead} receiveError={setScanError} onCanceled={onScanCanceled} />
                                </Box>
                            </Grid>
                            :
                            <>
                            </>
                    }
                </Grid>
            </Box>

        </>
    );
}