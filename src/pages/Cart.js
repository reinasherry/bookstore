
import { useState } from 'react'
import { ShoppingBag, X } from 'lucide-react'
import '../styles/Cart.css'

export default function CartDrawer({
  open,
  close,
  cart,
  changeQty,
  discountRate,
  applyPromo,
  checkout
}) {
  const [code, setCode] = useState('')

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = subtotal * discountRate

  return (
    <>
      {open && (
        <div className="cart-overlay" onClick={close}></div>
      )}

      <div className={`cart-drawer ${open ? 'cart-open' : ''}`}>

        {/* Header */}
        <div className="cart-header">
          <h3>
            <ShoppingBag className="cart-icon" />
            Your Shopping Cart
          </h3>

          <button onClick={close} className="cart-close">
            <X />
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">

          {cart.length === 0 && (
            <p className="empty-cart">
              Your shopping cart is empty.
            </p>
          )}

          {cart.map((i) => (
            <div key={i.id} className="cart-item">

              <img src={i.cover} alt={i.title} />

              <div className="cart-item-info">
                <h4>{i.title}</h4>

                <p>${i.price.toFixed(2)} each</p>

                <div className="quantity-controls">

                  <button onClick={() => changeQty(i.id, -1)}>
                    -
                  </button>

                  <span>{i.qty}</span>

                  <button onClick={() => changeQty(i.id, 1)}>
                    +
                  </button>

                </div>
              </div>

              <div className="item-total">
                ${(i.price * i.qty).toFixed(2)}
              </div>

            </div>
          ))}

        </div>

        {/* Cart Footer */}
        <div className="cart-footer">

          {/* Promo Code */}
          <div className="promo-section">

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Promo code (READMORE)"
            />

            <button onClick={() => applyPromo(code)}>
              Apply
            </button>

          </div>

          {/* Price Summary */}
          <div className="cart-summary">

            <div>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="discount-row">
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>

            <div className="total-row">
              <span>Total:</span>
              <span>${(subtotal - discount).toFixed(2)}</span>
            </div>

          </div>

          {/* Checkout */}
          <button className="checkout-button" onClick={checkout}>
            Proceed to Checkout
          </button>

        </div>

      </div>
    </>
  )
}
