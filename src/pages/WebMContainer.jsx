const WebMContainer = ({ name }) => {
  const webmPath = `/images/${name}.webm`;

  console.log(webmPath);

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
