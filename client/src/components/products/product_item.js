import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from "react-apollo";
import { FETCH_PRODUCT } from '../../graphql/queries';

const ProductItem = (props) => {
  const itemId = props.match.params.id;
  return (
    <Query query={FETCH_PRODUCT} variables={{ _id: itemId }}>
      { ({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <div>
            <Link to="/">Back to Index</Link>


            <header>Product Details</header>
            <h1> {data.product.name} </h1>
            <h2>{data.product.color}</h2>
            <p>{data.product.description}</p>
            {data.product.measurement}
          </div>
        );
      }}
    </Query>
  );
}

export default ProductItem;