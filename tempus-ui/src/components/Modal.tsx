const Modal = ({ children }) => {

  const rootStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(1px)',
  };

  const contentStyle: React.CSSProperties = {
    border: '1px solid black',
    borderRadius: '1rem',
    backgroundColor: 'white',
    padding: '1rem'
  };

  return (
    <div style={rootStyle}>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
