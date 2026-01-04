import { useEffect, useState } from 'react';
import CamelHump from './CamelHump';

export default function Camel({theme, setTheme}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('../../public/data/data.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className='text-wrap'>
      <p>Here I keep track of the price trends for a few items.</p>
      <p className='text-wrap'>Some I just want to buy at some point, others are just to see stable items over a long time.</p>
      <div className="container-fluid"></div>
      {Object.entries(data).length > 1 &&
        Object.entries(data).map((item, i) => (
          <CamelHump item={item} key={i} theme={theme} setTheme={setTheme}/>
        ))}
    </div>
  );
}
