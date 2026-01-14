const WebMContainer = ({ name }) => {
  const webmPath = `/images/${name}.webm`;

  return (
    <>
      {name.length > 0 && (
        <video
          src={webmPath}
          className=""
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: 'auto' }}
        />
      )}
    </>
  );
};

export default WebMContainer;
