const getDuration = (length: number) => {
  const hours = Math.floor(length);
  const minutes = Math.round(length % 1 * 60);

  if (minutes < 10) {
    return `${hours}:0${minutes}`;
  }

  return `${hours}:${minutes}`;
};

export default getDuration;
