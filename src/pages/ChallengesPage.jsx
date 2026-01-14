import WebMContainer from './WebMContainer';

const ChallengesPage = ({repo}) => {
  const {name, nickname, ghURL, demoURL, description} = repo;
  return (
    <div>
      <h1><a href={`https://github.com/CotyJ/${nickname}`}> <strong>{nickname}</strong> </a></h1>
      <p>{description}</p>
        <WebMContainer name={name} />
    </div>
  );
};

export default ChallengesPage;
