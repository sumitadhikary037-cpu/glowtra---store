      import React, { useState } from 'react';

const products = [
  { id: 1, name: "Neem & Charcoal Face Wash", price: 299, img: "🧴", desc: "Deep cleansing, anti-acne formula" },
  { id: 2, name: "Sandalwood Beard Oil", price: 349, img: "🪒", desc: "Nourishing & fragrant beard care" },
  { id: 3, name: "Multani Mitti Clay Mask", price: 249, img: "🌿", desc: "Oil control & skin brightening" },
  { id: 4, name: "Rose Water Toner", price: 199, img: "🌹", desc: "Hydrating & pore tightening" },
  { id: 5, name: "Matte Sunscreen SPF 50", price: 399, img: "☀️", desc: "Lightweight, no white cast" },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('home');
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const handlePayment = () => {
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill all details');
      return;
    }
    const options = {
      key: 'rzp_test_T6CKG4IjLTheIh',
      amount: total * 100,
      currency: 'INR',
      name: 'Glowtra',
      description: 'Skincare Order',
      handler: function () {
        setOrderPlaced(true);
        setCart([]);
        setPage('home');
      },
      prefill: { name: form.name, contact: form.phone },
      theme: { color: '#1a3a6b' },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const styles = {
    app: { fontFamily: 'Georgia, serif', maxWidth: 480, margin: '0 auto', background: '#fffef9', minHeight: '100vh' },
    header: { background: 'linear-gradient(135deg, #1a3a6b, #0d2244)', color: '#f0c040', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    logo: { fontSize: 22, fontWeight: 'bold', cursor: 'pointer', color: '#f0c040', letterSpacing: 1 },
    cartBtn: { background: 'rgba(240,192,64,0.15)', border: '1px solid #f0c040', color: '#f0c040', padding: '8px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 14 },
    productGrid: { padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
    card: { border: '1px solid #e8e0cc', borderRadius: 12, padding: 12, textAlign: 'center', boxShadow: '0 2px 12px rgba(26,58,107,0.08)', background: '#fff' },
    emoji: { fontSize: 40, marginBottom: 8 },
    productName: { fontSize: 13, fontWeight: 'bold', color: '#0d2244', marginBottom: 4 },
    productDesc: { fontSize: 11, color: '#888', marginBottom: 8 },
    price: { color: '#b8860b', fontWeight: 'bold', fontSize: 15, marginBottom: 8 },
    addBtn: { background: 'linear-gradient(135deg, #1a3a6b, #0d2244)', color: '#f0c040', border: 'none', padding: '6px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 12, width: '100%', fontWeight: 'bold' },
    cartItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f0f0f0' },
    removeBtn: { background: 'none', border: 'none', color: '#1a3a6b', cursor: 'pointer', fontSize: 18 },
    totalBar: { padding: '16px', background: '#eef2fa', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#0d2244' },
    checkoutBtn: { background: 'linear-gradient(135deg, #1a3a6b, #0d2244)', color: '#f0c040', border: 'none', padding: '14px', width: '100%', fontSize: 16, cursor: 'pointer', fontWeight: 'bold' },
    input: { width: '100%', padding: '10px', margin: '6px 0', borderRadius: 8, border: '1px solid #c8d4e8', fontSize: 14, boxSizing: 'border-box' },
    payBtn: { background: 'linear-gradient(135deg, #b8860b, #8b6508)', color: '#fff', border: 'none', padding: '14px', width: '100%', fontSize: 16, cursor: 'pointer', borderRadius: 8, marginTop: 8, fontWeight: 'bold' },
    banner: { background: 'linear-gradient(135deg, #1a3a6b, #0d2244)', padding: '28px 16px', textAlign: 'center' },
    emptyCart: { textAlign: 'center', padding: 40, color: '#888' },
  };

  return (
    <div style={styles.app}>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

      <div style={styles.header}>
        <span style={styles.logo} onClick={() => setPage('home')}>✦ Glowtra</span>
        <button style={styles.cartBtn} onClick={() => setPage('cart')}>
          🛒 {cartCount > 0 ? `Cart (${cartCount})` : 'Cart'}
        </button>
      </div>

      {orderPlaced && (
        <div style={{ background: '#e8f5e9', padding: 12, textAlign: 'center', color: '#2e7d32', fontWeight: 'bold' }}>
          ✅ Order placed successfully! Thank you!
        </div>
      )}

      {page === 'home' && (
        <>
          <div style={styles.banner}>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: '#f0c040', letterSpacing: 1 }}>Glow Naturally ✦</div>
            <div style={{ color: '#c8d4e8', marginTop: 6, fontSize: 14 }}>Premium skincare made for India</div>
          </div>
          <div style={styles.productGrid}>
            {products.map(p => (
              <div key={p.id} style={styles.card}>
                <div style={styles.emoji}>{p.img}</div>
                <div style={styles.productName}>{p.name}</div>
                <div style={styles.productDesc}>{p.desc}</div>
                <div style={styles.price}>₹{p.price}</div>
                <button style={styles.addBtn} onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </>
      )}

      {page === 'cart' && (
        <div>
          <div style={{ padding: '12px 16px', fontWeight: 'bold', fontSize: 18, color: '#0d2244' }}>Your Cart</div>
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <div style={{ fontSize: 40 }}>🛒</div>
              <p>Cart is empty</p>
              <button style={styles.addBtn} onClick={() => setPage('home')}>Shop Now</button>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: 13, color: '#0d2244' }}>{item.name}</div>
                    <div style={{ color: '#888', fontSize: 12 }}>Qty: {item.qty} × ₹{item.price}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 'bold', color: '#b8860b' }}>₹{item.price * item.qty}</span>
                    <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
                  </div>
                </div>
              ))}
              <div style={styles.totalBar}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              <div style={{ padding: 16 }}>
                <button style={styles.checkoutBtn} onClick={() => setPage('checkout')}>
                  Proceed to Checkout →
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {page === 'checkout' && (
        <div style={{ padding: 16 }}>
          <div style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, color: '#0d2244' }}>Checkout</div>
          <input style={styles.input} placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input style={styles.input} placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <textarea style={{ ...styles.input, height: 80 }} placeholder="Delivery Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <div style={{ background: '#eef2fa', padding: 12, borderRadius: 8, marginBottom: 8, display: 'flex', justifyContent: 'space-between', color: '#0d2244' }}>
            <span>Order Total</span>
            <strong>₹{total}</strong>
          </div>
          <button style={styles.payBtn} onClick={handlePayment}>
            Pay ₹{total} with Razorpay
          </button>
        </div>
      )}
    </div>
  );
    }  
