import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { topRatedProducts } from "../actions/productActions";

function ProductCarousel() {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { errors, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(topRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : errors ? (
    <Message variant="danger">{errors}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiCzhZxes4VGFNxKCwc5dO285gwrgJmTWZAxbdfj8i&s`}
              alt={product.name}
              fluid
            />

            <Carousel.Caption className="carousel.caption">
              <h4>Shirt </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
