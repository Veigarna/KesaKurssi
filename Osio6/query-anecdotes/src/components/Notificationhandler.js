import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const useShowNotification = () => {
  const [notifiaction, notificationDispatch] = useContext(NotificationContext)
  //apufunktio viestille, aika 5sek
  const ShowNotification = (type) => {
    console.log('in ShowNotification', type)

    //asetetaan viesti

    notificationDispatch({ type: type })
    setTimeout(() => {
      //clear
      notificationDispatch({ type: 'NULL' })
    }, 5 * 1000)
  }
  return ShowNotification
}
export default useShowNotification
