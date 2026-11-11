import { useState } from 'react'
import { ShoppingBag, X } from 'lucide-react'

export default function CartDrawer({ open, close, cart, changeQty, discountRate, applyPromo, checkout }) {
  const [code, setCode] = useState('')
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const discount = subtotal * discountRate
  return (
    <>
      {open && <div onClick={close} className="fixed inset-0 bg-black/50 z-50" />}
      <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col justify-between ${open ? '' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-warm-200 flex justify-between items-center bg-warm-50">
          <h3 className="font-bold text-warm-900 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-amber-800" /> Your Shopping Cart</h3>
          <button onClick={close}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {cart.length === 0 && <p className="text-center text-slate-400 py-12 text-sm">Your shopping cart is empty.</p>}
          {cart.map((i) => (
            <div key={i.id} className="flex items-center gap-3 bg-warm-50 p-3 rounded-xl border border-warm-200">
              <img src={i.cover} alt="" className="w-12 h-16 object-cover rounded" />
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-xs text-warm-900 truncate">{i.title}</h4>
                <p className="text-[10px] text-slate-500">${i.price.toFixed(2)} each</p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => changeQty(i.id, -1)} className="px-2 bg-white border border-slate-300 rounded text-xs font-bold">-</button>
                  <span className="text-xs font-bold">{i.qty}</span>
                  <button onClick={() => changeQty(i.id, 1)} className="px-2 bg-white border border-slate-300 rounded text-xs font-bold">+</button>
                </div>
              </div>
              <div className="text-xs font-bold">${(i.price * i.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-warm-200 bg-warm-50 space-y-3">
          <div className="flex gap-2">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Promo code (READMORE)" className="flex-grow px-3 py-1.5 border border-slate-300 rounded-lg text-xs" />
            <button onClick={() => applyPromo(code)} className="px-3 py-1.5 bg-warm-900 text-white text-xs font-semibold rounded-lg">Apply</button>
          </div>
          <div className="space-y-1 text-xs text-slate-600 border-t border-warm-200 pt-2">
            <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-emerald-700"><span>Discount:</span><span>-${discount.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-sm text-warm-900 border-t border-warm-200 pt-1"><span>Total:</span><span>${(subtotal - discount).toFixed(2)}</span></div>
          </div>
          <button onClick={checkout} className="w-full py-3 bg-amber-700 text-white font-bold text-sm rounded-xl hover:bg-amber-800">Proceed to Checkout</button>
        </div>
      </div>
    </>
  )
}