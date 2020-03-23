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
            <ul>
              {data.products.map(product => (
                <li key={product._id}>
                  {product.name} <br />
                  {product.color} <br />

                <Link to={`/eyeglasses/${product._id}`}>{product.name}</Link>
                </li>
              ))}
            </ul>
            </div>
        );
      }}
    </Query>
  );
}

export default ProductIndex;