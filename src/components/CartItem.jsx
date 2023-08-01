import React, { useContext, useState } from 'react'
import "../style sheets/cart.css"
import { Appcontext } from '../context/Contexts'

function CartItem() {
    const vl = useContext(Appcontext)
    const q = vl.cartStatus
    function closeCart() {
        vl.toggleCart(q)
    }
    const emptyMessage = <div className='emptyMessage'>
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        <h1>Your cart is empty</h1>
        <p>It looks like you haven't added any items to your cart yet.</p>
    </div>
    return (
        <div className='cart-item' style={vl.cartPos}>
            <div className="center">
                <center><h3>Your Cart</h3></center>
                <div className="close-cart" datacount={0} onClick={closeCart}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <div className="cart-items-container">
                    {emptyMessage}
                </div>
            </div>

        </div>
    )
}

export default CartItem
