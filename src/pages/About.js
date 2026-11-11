
import { useState } from 'react';
import '../styles/About.css';

const STORES = [
  {
    name: 'PageTurner Flagship SoHo',
    city: 'New York',
    address: '482 Broadway, New York, NY 10013',
    hours: 'Mon-Sat: 9am-9pm, Sun: 10am-7pm'
  },
  {
    name: 'PageTurner Back Bay',
    city: 'Boston',
    address: '215 Newbury St, Boston, MA 02116',
    hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm'
  },
  {
    name: 'PageTurner Michigan Ave',
    city: 'Chicago',
    address: '620 N Michigan Ave, Chicago, IL 60611',
    hours: 'Mon-Sat: 9am-8pm, Sun: 10am-6pm'
  },
];

const TIERS = [
  {
    name: 'Casual Reader',
    price: '$0',
    note: '/ forever',
    perks: [
      'Standard reward points',
      'Access to public catalog',
      'Monthly newsletter'
    ]
  },
  {
    name: 'Reader Club',
    price: '$9.99',
    note: '/ month',
    perks: [
      '10% off all physical books',
      'Free standard shipping',
      '1 free monthly eBook credit'
    ],
    popular: true
  },
  {
    name: 'VIP Bibliophile',
    price: '$19.99',
    note: '/ month',
    perks: [
      '20% off entire store',
      'Free same-day shipping',
      'Exclusive signed editions'
    ]
  },
];

function Banner({ title, text }) {
  return (
    <div className="page-banner">
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

export function About() {
  const stats = [
    ['150,000+', 'Books Delivered'],
    ['25,000+', 'Donated to Schools'],
    ['12', 'Physical Locations'],
    ['99.4%', 'Reader Satisfaction']
  ];

  return (
    <>
      <Banner
        title="Nurturing Readers Since 2012"
        text="We believe independent bookstores are the cultural heartbeat of any community."
      />

      <div className="about-stats">
        {stats.map(([number, label]) => (
          <div className="stat-card" key={label}>
            <div className="stat-number">{number}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export function Services({ toast }) {
  return (
    <>
      <Banner
        title="Membership, Shipping & Gift Cards"
        text="Tailored options for casual readers, bookworms, and gift givers."
      />

      <div className="membership-grid">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`membership-card ${
              tier.popular ? 'popular-tier' : ''
            }`}
          >
            <div>
              <h3>{tier.name}</h3>

              <div className="tier-price">
                <span>{tier.price}</span>
                <small>{tier.note}</small>
              </div>

              <ul className="tier-perks">
                {tier.perks.map((perk) => (
                  <li key={perk}>✓ {perk}</li>
                ))}
              </ul>
            </div>

            <button
              className="tier-button"
              onClick={() => toast(`Selected Tier: ${tier.name}.`)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export function Contact({ toast }) {
  const [city, setCity] = useState('all');

  const stores =
    city === 'all'
      ? STORES
      : STORES.filter((store) => store.city === city);

  const submit = (e) => {
    e.preventDefault();
    toast('Message sent! We will reply within 24 hours.');
    e.target.reset();
  };

  return (
    <>
      <Banner
        title="Customer Support & Locations"
        text="Questions about an order or want to visit us? We are here to help."
      />

      <div className="contact-container">

        {/* CONTACT FORM */}
        <form className="contact-form" onSubmit={submit}>
          <h2>Send Us a Message</h2>

          <input
            required
            type="text"
            placeholder="Full Name"
          />

          <input
            required
            type="email"
            placeholder="Email Address"
          />

          <textarea
            required
            rows="4"
            placeholder="How can we help you today?"
          />

          <button type="submit">
            Submit Inquiry
          </button>
        </form>

        {/* STORES */}
        <div className="stores-section">
          <h2>Find a Physical Store</h2>

          <div className="city-filters">
            {['all', 'New York', 'Boston', 'Chicago'].map((c) => (
              <button
                key={c}
                className={city === c ? 'active-city' : ''}
                onClick={() => setCity(c)}
              >
                {c === 'all' ? 'All Cities' : c}
              </button>
            ))}
          </div>

          {stores.map((store) => (
            <div className="store-card" key={store.name}>
              <h4>{store.name}</h4>
              <p>{store.address}</p>
              <p>{store.hours}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
