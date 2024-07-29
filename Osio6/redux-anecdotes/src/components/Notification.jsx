import { useSelector } from 'react-redux'
//import { notificationChange } from '../reducers/notificationReducer'

const Notification = () => {
  const shownNotification = useSelector(({ notification }) => {
    console.log('notification', notification)
    return notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>{shownNotification}</div>
}

export default Notification
