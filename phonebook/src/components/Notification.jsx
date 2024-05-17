const Notification = ({message}) => {
  
  if (message === null) {
    return null;
  }

  return (
    <div className={message === "This contact was already deleted from server" || message.indexOf("failed") !== -1 || message.indexOf("missing") !== -1 ?`error`:`notification`}>
      {message}
    </div>
  );
};

export default Notification;
