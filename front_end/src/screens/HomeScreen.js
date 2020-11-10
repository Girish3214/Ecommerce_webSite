import React, { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from 'react-bootstrap';
import Product from "../components/Product";
import Message from "../components/Message";
import Spin from "../components/Spinner";
import { listProducts } from "../actions/productActions";
 


const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector( state => state.productList)
    const { loading, error, products } = productList

    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])

    return (
        <div>
        <h1>Latest Products</h1>
        {loading ? (<Spin />) : error ? (<Message variant= 'danger' >{error}</Message> ) :
        <Row>
        {products.map((product) =>(

                <Col key={product._id} sm={6} md={4} lg={4} xl={3}>
                   <Product product={product} />
                </Col>
         
        ))}
        </Row>
        
        }

            
        </div>
    )
}

export default HomeScreen
