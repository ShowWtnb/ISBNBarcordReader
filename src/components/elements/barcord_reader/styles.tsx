import styled from 'styled-components'

const config = {
  infoColor: 'rgba(255, 255, 255, 0.5)',
  infoSize: '1rem',
  borderColor: 'rgba(255, 255, 255, 0.6)',
  borderWidth: '0.4rem',
  borderRadius: '3rem',
  markerPositionLeftRight: '3rem',
  markerPositionTopButtom: '4rem',
}

export const Container = styled.section`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 20%;
  left: 0%;
  width: 100%;
  height: 60%;
`

export const Video = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: black;
  video {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
  }
  canvas {
    display: none;
  }
`

export const ScanMarker = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 80%;
  height: 90%;
`

export const Marker = styled.span`
  display: flex;
  &:after,
  &:before {
    content: ' ';
    position: absolute;
    width: 20%;
    height: 20%;
  }

  &:nth-of-type(1),
  &:nth-of-type(2) {
    width: 25%;
    height: 100%;
  }

  &:nth-of-type(1) {
    &:after,
    &:before {
      left: ${config.markerPositionLeftRight};
    }
    &:after {
      content: ' ';
      bottom: ${config.markerPositionTopButtom};
      border-bottom-left-radius: ${config.borderRadius};
      border-bottom: ${config.borderWidth} solid ${config.borderColor};
      border-left: ${config.borderWidth} solid ${config.borderColor};
    }
    &:before {
      top: ${config.markerPositionTopButtom};
      border-top-left-radius: ${config.borderRadius};
      border-top: ${config.borderWidth} solid ${config.borderColor};
      border-left: ${config.borderWidth} solid ${config.borderColor};
    }
  }
  &:nth-of-type(2) {
    &:after,
    &:before {
      right: ${config.markerPositionLeftRight};
    }
    &:after {
      bottom: ${config.markerPositionTopButtom};
      border-bottom-right-radius: ${config.borderRadius};
      border-bottom: ${config.borderWidth} solid ${config.borderColor};
      border-right: ${config.borderWidth} solid ${config.borderColor};
    }
    &:before {
      top: ${config.markerPositionTopButtom};
      border-top-right-radius: ${config.borderRadius};
      border-top: ${config.borderWidth} solid ${config.borderColor};
      border-right: ${config.borderWidth} solid ${config.borderColor};
    }
  }
`

export const Info = styled.p`
  color: ${config.infoColor};
  font-size: ${config.infoSize};
`
