import WebMContainer from "./WebMContainer";

const Challenge = ({description, webMsource}) => {
  return (
    <div>
      <p>{`${description}`}</p>
      <WebMContainer webmSource={webMsource}/>
    </div>
  );
};

export default Challenge;
