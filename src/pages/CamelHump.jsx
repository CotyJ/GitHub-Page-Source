export default function CamelHump({ item }) {
  console.log(item)
  return (
    <div className="row camel-hump max-w-xl">
      <div className="fs-3 camel-hump-tltle" data-bs-toggle="collapse" data-bs-target={`#${item[0]}`}>
        {item[0][0].toUpperCase().concat(item[0].slice(1))}
      </div>

      {/* This is collapsed */}
      <ul id={`${item[0]}`} className="collapse">

        {/* Description */}
        <li className="">{item[1].title}</li>

        {/* Price */}
        <li><div>{`Price today: ${item[1].history[0].price}`}</div></li>

        {/* Image */}
        <img src={item[1].url} className="item-image"></img>
      </ul>
    </div>
  );
}
