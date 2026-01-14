const WebMContainer = ({webmSource}) => {
  return (
    <video
      src={webmSource}
      autoPlay
      loop
      muted
      playsInline
      style={{ width: '300px', height: 'auto' }}
    />
  );
};

export default WebMContainer;
