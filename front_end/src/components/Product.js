import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Rating from "./Rating"

const Product = ({product}) => {
    return (
        <Card className="my-3 px-1 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>
            <Card.Body>
                <Card.Title>
                    <Link to={`/product/${product._id}`}>
                        <div id="productname"><strong>{product.name}{' '}</strong></div>
                    </Link>
                </Card.Title>

                <Card.Text as="div">
                    <Rating 
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                        color="gold"
                    />
                </Card.Text>

                <Card.Text as="h3" className="h3" >₹{Math.floor(product.price)}</Card.Text>

            </Card.Body>
        </Card>
        
    )
}

export default Product
