import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { HomePage } from "./HomePage";
import { OrderPage } from "./OrderPage";
export function Layout(props) {
    const { cartItems, setCartItems, children } = props;
    

    return (
        <div>
            <NavMenu />
            <Container>
                <HomePage cartItems={cartItems} setCartItems={setCartItems} />
                <OrderPage cartItems={cartItems} setCartItems={setCartItems}  />
            </Container>
        </div>
    );

}
