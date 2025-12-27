import { useEffect, useState } from 'react';

export default function Camel() {
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
    <div>
      <h4>Here are some products I'm watching out for!</h4>
      <div className="container-fluid"></div>

      {Object.entries(data).length > 1 &&
        Object.entries(data).map((item, i) => (
          <div key={i} className="row">
            <div className="col">{
              item[0][0].toUpperCase().concat(item[0].slice(1))
            }</div>
            <ul>
              <li>{item[1].title}</li>
              <img src={item[1].url}></img>

              <li>{item[1].history[0].price}</li>
            </ul>
          </div>
        ))}
    </div>
  );
}
