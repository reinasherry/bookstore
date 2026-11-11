import { useState } from 'react'

const STORES = [
  { name: 'PageTurner Flagship SoHo', city: 'New York', address: '482 Broadway, New York, NY 10013', hours: 'Mon-Sat: 9am-9pm, Sun: 10am-7pm' },
  { name: 'PageTurner Back Bay', city: 'Boston', address: '215 Newbury St, Boston, MA 02116', hours: 'Mon-Sat: 10am-8pm, Sun: 11am-6pm' },
  { name: 'PageTurner Michigan Ave', city: 'Chicago', address: '620 N Michigan Ave, Chicago, IL 60611', hours: 'Mon-Sat: 9am-8pm, Sun: 10am-6pm' },
]
const TIERS = [
  { name: 'Casual Reader', price: '$0', note: '/ forever', perks: ['Standard reward points', 'Access to public catalog', 'Monthly newsletter'] },
  { name: 'Reader Club', price: '$9.99', note: '/ month', perks: ['10% off all physical books', 'Free standard shipping', '1 free monthly eBook credit'], popular: true },
  { name: 'VIP Bibliophile', price: '$19.99', note: '/ month', perks: ['20% off entire store', 'Free same-day shipping', 'Exclusive signed editions'] },
]
const Banner = ({ title, text }) => (
  <div className="bg-warm-100 py-12 border-b border-warm-200 text-center px-4">
    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-warm-900">{title}</h1>
    <p className="text-slate-600 text-sm max-w-2xl mx-auto mt-2">{text}</p>
  </div>
)

export function About() {
  return (
    <>
      <Banner title="Nurturing Readers Since 2012" text="We believe independent bookstores are the cultural heartbeat of any community." />
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[['150,000+', 'Books Delivered'], ['25,000+', 'Donated to Schools'], ['12', 'Physical Locations'], ['99.4%', 'Reader Satisfaction']].map(([n, l]) => (
          <div key={l} className="bg-white p-6 rounded-2xl border border-warm-200 shadow-sm">
            <div className="text-3xl font-serif font-bold text-amber-800">{n}</div>
            <div className="text-xs text-slate-500 font-medium uppercase mt-2">{l}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export function Services({ toast }) {
  return (
    <>
      <Banner title="Membership, Shipping & Gift Cards" text="Tailored options for casual readers, bookworms, and gift givers." />
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        {TIERS.map((t) => (
          <div key={t.name} className={`bg-white rounded-2xl p-8 flex flex-col justify-between shadow-sm ${t.popular ? 'border-2 border-amber-700 shadow-lg' : 'border border-warm-200'}`}>
            <div>
              <h3 className="font-bold text-xl text-warm-900">{t.name}</h3>
              <div className="my-6"><span className="text-4xl font-extrabold text-warm-900">{t.price}</span> <span className="text-slate-500 text-sm">{t.note}</span></div>
              <ul className="space-y-3 text-sm text-slate-600 mb-6">{t.perks.map((p) => <li key={p}>✓ {p}</li>)}</ul>
            </div>
            <button onClick={() => toast(`Selected Tier: ${t.name}.`)} className="w-full py-3 bg-amber-700 text-white font-semibold rounded-xl hover:bg-amber-800">Select</button>
          </div>
        ))}
      </div>
    </>
  )
}

export function Contact({ toast }) {
  const [city, setCity] = useState('all')
  const stores = city === 'all' ? STORES : STORES.filter((s) => s.city === city)
  const submit = (e) => { e.preventDefault(); toast('Message sent! We will reply within 24 hours.'); e.target.reset() }
  const field = 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm'
  return (
    <>
      <Banner title="Customer Support & Locations" text="Questions about an order or want to visit us? We are here to help." />
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12">
        <form onSubmit={submit} className="bg-white p-8 rounded-2xl border border-warm-200 shadow-sm space-y-4">
          <h2 className="font-serif text-2xl font-bold text-warm-900">Send Us a Message</h2>
          <input required placeholder="Full Name" className={field} />
          <input required type="email" placeholder="Email Address" className={field} />
          <textarea required rows="4" placeholder="How can we help you today?" className={field} />
          <button className="w-full py-3 bg-amber-700 text-white font-semibold rounded-xl hover:bg-amber-800">Submit Inquiry</button>
        </form>
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-warm-900">Find a Physical Store</h2>
          <div className="flex gap-2">
            {['all', 'New York', 'Boston', 'Chicago'].map((c) => (
              <button key={c} onClick={() => setCity(c)} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${city === c ? 'bg-amber-100 text-amber-900' : 'bg-white border border-warm-200'}`}>{c === 'all' ? 'All Cities' : c}</button>
            ))}
          </div>
          {stores.map((s) => (
            <div key={s.name} className="bg-white p-5 rounded-xl border border-warm-200 shadow-sm text-xs space-y-1">
              <h4 className="font-bold text-warm-900 text-sm">{s.name}</h4>
              <p className="text-slate-600">{s.address}</p>
              <p className="text-slate-500">{s.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}