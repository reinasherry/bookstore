export default function Services() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Membership Tiers & Services</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ border: '1px solid #E2ECE6', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Free Reader</h2>
          <p>$0 / month</p>
          <ul style={{ listStyle: 'none', margin: '1rem 0', padding: 0 }}>
            <li>Standard Delivery</li>
            <li>Wishlist Access</li>
          </ul>
        </div>
        <div style={{ border: '2px solid #4A6B5B', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', background: '#F9F6F0' }}>
          <h2>Sage Scholar</h2>
          <p>$9.99 / month</p>
          <ul style={{ listStyle: 'none', margin: '1rem 0', padding: 0 }}>
            <li>Free Express Shipping</li>
            <li>10% off all books</li>
            <li>Monthly Book Club</li>
          </ul>
        </div>
        <div style={{ border: '1px solid #E2ECE6', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
          <h2>Collector</h2>
          <p>$19.99 / month</p>
          <ul style={{ listStyle: 'none', margin: '1rem 0', padding: 0 }}>
            <li>All Scholar Perks</li>
            <li>Signed First Ed. Access</li>
          </ul>
        </div>
      </div>
    </div>
  );
}