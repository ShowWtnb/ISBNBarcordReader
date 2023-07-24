import Scanner from "@/components/elements/barcord_reader/BarcordReader";
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function HomeComponent() {
    const [isbn, setIsbn] = useState<number>()
    const [scanError, setScanError] = useState<string>()
    useEffect(() => {
      if (scanError) {
        toast.error(`Error: ${scanError}`, {
          position: 'top-right',
        })
      }
    }, [scanError])
  
    return (
        <>
            <h1>Home Component</h1>
            <Scanner receiveIsbn={setIsbn} receiveError={setScanError}/>
        </>
    )
}