import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import {addToCart, removeFromCart}  from "../actions/cartActions";




const CartScreen = ({ match, location, history }) => {
    const productId  = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1 ;

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeCartItem = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = ()=>{
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 
                    ? (<Message>Your cart is Empty <Link to="/">Go Back</Link></Message>) : 
                    (<ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key="item.product">
                                <Row>
                                    <Col md={3}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`} >{item.name}</Link> 
                                    </Col>
                                    <Col md={3}>₹{item.price}</Col>
                                    <Col md={3}>
                                        <Button type="button" variant="light" onClick={()=>{
                                            removeCartItem(item.product)
                                        }}>
                                        <i className="fas fa-trash"></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup> )
                }
            </Col>
            <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Total ({cartItems.reduce((acc, item)=> acc + item.qty, 0 )}) Items</h2>
                        ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0 ).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type="button" classname="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to checkout</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>

            </Col>
        </Row>
    )
}

export default CartScreen
