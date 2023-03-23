type ClientColorProps = {
  color: string;
  size?: string;
  onClick?: () => void;
}

const ClientColor = (props: ClientColorProps) => {
  const { color, size='15px', onClick } = props;

  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius: '50%',
        height: size,
        width: size,
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    />
  );
};

export default ClientColor;