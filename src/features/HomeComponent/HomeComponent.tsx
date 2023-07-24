import BarcodeReader from "@/components/elements/barcord_reader/BarcodeReader";
import Scanner from "@/components/elements/barcord_reader/Scanner";
import { Button } from "@mui/material";
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function HomeComponent() {

    return (
        <>
            <BarcodeReader />
        </>
    )
}