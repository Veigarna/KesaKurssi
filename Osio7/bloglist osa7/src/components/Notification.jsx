//import React from 'react'
import { useSelector } from 'react-redux'
import './Notification.css'

//tyylit
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const shownNotification = useSelector(({ notification }) => {
    console.log('notification', notification)
    return notification
  })

  if (!shownNotification) {
    return <></>
  }

  return (
    <div className="container">
      {' '}
      <Alert variant="success">{shownNotification}</Alert>
    </div>
  )
}

export default Notification
