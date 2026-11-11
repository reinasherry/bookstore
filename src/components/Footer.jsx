import { BookMarked, Instagram, Twitter, Facebook } from "lucide-react";

const quickLinks = [
  { label: "Home", view: "home" },
  { label: "Browse Catalog", view: "catalog" },
  { label: "VIP Perks & Membership", view: "services" },
  { label: "Our Story & Literacy", view: "about" },
];

const helpLinks = [
  { label: "Contact Support", view: "contact" },
  { label: "Store Locations", view: "contact" },
  { label: "Shipping Policy" },
  { label: "Returns & Exchanges" },
];

const socials = [
  { label: "Instagram", Icon: Instagram },
  { label: "Twitter", Icon: Twitter },
  { label: "Facebook", Icon: Facebook },
];

function FooterLink({ label, view, onNavigate }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (view) onNavigate(view);
  };

  return (
    <li>
      <a href="#" onClick={handleClick} className="hover:text-amber-300">
        {label}
      </a>
    </li>
  );
}

export default function Footer({ onNavigate = () => {} }) {
  return (
    <footer className="bg-warm-900 text-warm-200 text-xs border-t border-warm-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-400" />
            <span className="font-serif text-lg font-bold text-white">PageTurner</span>
          </div>
          <p className="text-warm-300 leading-relaxed">
            Your neighborhood independent bookstore online. Dedicated to fostering a love for
            reading across generations.
          </p>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
            Quick Navigation
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <FooterLink key={link.label} {...link} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>

        {/* Help & Policies */}
        <div>
          <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
            Help & Policies
          </h4>
          <ul className="space-y-2">
            {helpLinks.map((link) => (
              <FooterLink key={link.label} {...link} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
            Connect With Us
          </h4>
          <div className="flex space-x-3 mb-4">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="p-2 bg-warm-800 rounded-lg text-warm-300 hover:text-white hover:bg-amber-800 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p className="text-warm-300">Subscribe to weekly newsletter for 10% off your first order.</p>
        </div>
      </div>

      <div className="border-t border-warm-800 py-4 text-center text-warm-400">
        &copy; 2026 PageTurner Bookstore Inc. All rights reserved.
      </div>
    </footer>
  );
}