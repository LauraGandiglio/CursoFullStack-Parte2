const Notification = ({message}) => {
  
  if (message === null) {
    return null;
  }

  return (
    <div className={message === "This contact was already deleted from server"?`error`:`notification`}>
      {message}
    </div>
  );
};

export default Notification;
