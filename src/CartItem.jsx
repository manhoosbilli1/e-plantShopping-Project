import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      // Extract numeric value from cost string (e.g., "$12" -> 12)
      const costValue = parseFloat(item.cost.substring(1));
      total += costValue * item.quantity;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping();
    }
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      // If quantity would drop to 0, remove the item
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const costValue = parseFloat(item.cost.substring(1));
    return costValue * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black", textAlign: "center", marginBottom: "30px" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div className="cart-items-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <div className="cart-item-header">
              <h3>{item.name}</h3>
            </div>
            <div className="cart-item-content">
              <div className="cart-item-price">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                <strong>Total: ${calculateTotalCost(item)}</strong>
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-buttons">
        <button
          className="continue-shopping-btn"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
