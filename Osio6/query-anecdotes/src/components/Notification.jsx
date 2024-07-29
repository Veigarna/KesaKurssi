const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={style}>
      <p>{props.message}</p>
    </div>
  )
}

export default Notification
