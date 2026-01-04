const Home = () => {
  return (
    <div>

      <p>Hi, I'm Coty.</p>
      <p>This site is a work in progress. A place for experiments, small projects, and ideas I'm refining over time. Not everything here is polished (yet), but everything here is intentional. I'm also not a graphic designer, so feel free to enjoy the lovely selection of grays featured on this site.</p>
      <p>I'm a software engineer and what self-flagellating engineer doesn't have a public facing site to regret owning?</p>
      <p>If you're here from a <a href={`${import.meta.env.BASE_URL}Coty Janeway Resume.pdf`} target="_blank" rel="noopener"><strong>resume</strong></a> or just curious, feel free to explore — and if you want to reach me, you can find my links in the navbar on the right.</p>
      <p></p>
      <p>You can see some of my work and interests in the Challenges and Fun Stuff tabs above</p>
      <p>Or get to know me in the About page</p>
      <p>I like dark mode, but you can click on the lightbulb on the right to turn the lights on or off</p>
    </div>
  );
}

export default Home;
