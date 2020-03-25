import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import { FETCH_PRODUCTS } from '../../graphql/queries';

const ProductIndex = () => {
  return (
    <Query query={FETCH_PRODUCTS}>
      { ({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div className="product-index-container">
              {data.products.map(product => (
                <ul className="product-index-item" key={product._id}>
                  <li>
                    <Link to={`/eyeglasses/${product._id}`}>{product.name}</Link>
                  </li>
                  <li>
                    { product.color }
                  </li>
                </ul>
              ))}
            </div>
        );
      }}
    </Query>
  );
}

export default ProductIndex;