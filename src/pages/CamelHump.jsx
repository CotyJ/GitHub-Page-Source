import { useState } from "react";
import Chart from "./Chart";

const CamelHump = ({ item, theme, setTheme }) => {

  const [viewData, setViewData] = useState(false);

  // for clarity
  const itemName = item[0];
  const { history } = item[1];

  return (
    <div className="row camel-hump max-w-xl">
      <div className="fs-3 camel-hump-tltle" data-bs-toggle="collapse" data-bs-target={`#${itemName}`}>
        {itemName[0].toUpperCase().concat(itemName.slice(1))}
      </div>

      {/* This is collapsed */}
      <ul id={`${itemName}`} className="collapse">

        {/* Description */}
        <li className="">{`${item[1].title.slice(0,35)}...`}</li>

        {/* Price */}
        <li className="d-flex my-1 align-items-center">
          <div>{`Price today: ${item[1].history[history.length - 1].price}`}</div>
          <button className="mx-2 btn data-button" onClick={() => setViewData(!viewData)}>{viewData ? 'Image' : 'History'}</button>
        </li>

        {/* Image */}
        {/* Or data */}{ viewData === false ?
        <img src={item[1].url} className="item-image"></img> :
        <Chart data={history} theme={theme} setTheme={setTheme} />
}
      </ul>
    </div>
  );
}

export default CamelHump;