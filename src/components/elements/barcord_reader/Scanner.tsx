import React, { useEffect } from 'react'
import Quagga from '@ericblade/quagga2'
import { Container, Video, ScanMarker, Marker, Info } from './styles'
import { validationIsbn } from '@/utils/isbn'
import { Button, IconButton, Tooltip } from '@mui/material'
import { Close } from '@mui/icons-material'

interface PropsI {
  receiveIsbn: any
  receiveError: any
  onCanceled: any
}

const retryCountMax = 10;

const Scanner: React.FC<PropsI> = ({ receiveIsbn, receiveError, onCanceled }) => {
  let scannerAttempts = 0

  const onDetected = (response: any): void => {
    Quagga.offDetected(onDetected)

    const isbnCode = response.codeResult.code
    console.log(isbnCode);

    if (validationIsbn(isbnCode)) {
      console.log('isbn read', isbnCode);
      receiveIsbn(isbnCode)
    } else if (scannerAttempts >= retryCountMax) {
      // console.log('It is not possible to read the code of the book');
      receiveError('ISBN\'s barcode start with 978. If this message appears repeatedly, you should cover other unrelated barcode up.')
    }
    scannerAttempts++
    Quagga.onDetected(onDetected)
  }

  useEffect(() => {
    const initCamera = () => {
      // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      if (navigator.mediaDevices) {
        console.log('Scanner navigator.mediaDevices', navigator.mediaDevices);
        navigator.mediaDevices.enumerateDevices().then((device) => {
          console.log('Scanner navigator.mediaDevices', device);
        })

        Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: '#video',
              constraints: {
                facingMode: 'environment',
              },
            },
            numOfWorkers: 1,
            locate: true,
            decoder: {
              readers: ['ean_reader'],
            },
          },
          (err: any) => {
            if (err) {
              console.error(err)
              return
            }
            Quagga.start()
            Quagga.onDetected(onDetected)
          },
        )
      }
    }
    initCamera()
  },[])

  function onCloseClick(event: any): void {
    // console.log('Scanner onCloseClick');
    onCanceled();
  }

  return (
    <>
      <Video id="video" />
      <Container>
        <ScanMarker>
          <Marker />
          <Marker />
        </ScanMarker>
        <Info>Point to the book barcode</Info>
        <Tooltip title={'Close Camera'}>
          <IconButton aria-label="close" onClick={onCloseClick}>
            <Close />
          </IconButton>
        </Tooltip>
      </Container>
    </>
  )
}

export default Scanner
