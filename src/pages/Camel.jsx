import PRODUCTS from '../config/products';

const data = await fetch('../../src/data/data.json').then(r => r.json());

export default function Camel() {
  return (
    <div>
      <h4>Here are some products I'm watching out for!</h4>
      <div className="container-fluid"></div>

      {Object.values(data).map((product, index) => (
        <div key={index} className="row">
          <div className="col">{PRODUCTS[product.name]}</div>
          {/* <div className="col">{product.price}</div> */}
        </div>
      ))}
    </div>
  );
}
