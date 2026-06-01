import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import DeliveryOverview from './DeliveryOverview';

const states = [
  'Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Karnataka',
  'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'
].sort((a, b) => a.localeCompare(b));

const DeliveryModal = ({ product, onClose }) => {
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({
    name: '', number: '', location: '',
    landmark: '', state: '', pincode: ''
  });

  const [filtered, setFiltered] = useState([]);
  const [showSug, setShowSug] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSug(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'state') {
      const query = value.toLowerCase();
      const matches = states.filter(s =>
        s.toLowerCase().includes(query)
      );
      setFiltered(matches);
      setShowSug(matches.length > 0);
    }
  };

  const selectState = s => {
    setForm(prev => ({ ...prev, state: s }));
    setShowSug(false);
  };

  const handleContinue = e => {
    e.preventDefault();
    if (!/^\d{6}$/.test(form.pincode)) {
      alert('Pincode must be exactly 6 digits.');
      return;
    }
    if (!states.includes(form.state)) {
      alert('Please pick a valid state.');
      return;
    }
    setStep('overview');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-[#FFFBFA] rounded-2xl shadow-2xl border border-[#F0DFC8] w-full max-w-lg animate-fade-in-up overflow-hidden">
        {step === 'form' ? (
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Playfair_Display'] text-2xl text-[#C9954A]">Delivery Details</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#4A3F3A]/60 hover:text-[#4A3F3A] hover:bg-[#F0DFC8]/50 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#C9954A]" />
              <div className="w-16 h-px bg-[#C9954A]" />
              <div className="w-3 h-3 rounded-full bg-[#E8D5C0]" />
              <span className="text-[11px] text-[#6B5E54] ml-2 uppercase tracking-wider">Review</span>
            </div>

            <form onSubmit={handleContinue} className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="input-gold"
                required
              />

              <input
                name="number"
                placeholder="Phone Number"
                value={form.number}
                onChange={handleChange}
                className="input-gold"
                required
              />

              <input
                name="location"
                placeholder="Address / Location"
                value={form.location}
                onChange={handleChange}
                className="input-gold"
                required
              />

              <input
                name="landmark"
                placeholder="Nearby Landmark (optional)"
                value={form.landmark}
                onChange={handleChange}
                className="input-gold"
              />

              <div className="relative" ref={wrapperRef}>
                <input
                  name="state"
                  placeholder="Select or type state"
                  value={form.state}
                  onChange={handleChange}
                  onFocus={() => setShowSug(filtered.length > 0)}
                  className="input-gold"
                  required
                />
                <ul
                  className={`
                    absolute top-full left-0 right-0 mt-1 max-h-40 overflow-auto
                    bg-white border border-[#E8D5C0] rounded-lg shadow-lg z-10
                    transition-opacity duration-200 ease-in-out
                    ${showSug ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  `}
                >
                  {filtered.map(s => (
                    <li
                      key={s}
                      onClick={() => selectState(s)}
                      className="px-4 py-2.5 text-sm text-[#4A3F3A] hover:bg-[#FDF6EF] hover:text-[#C9954A] cursor-pointer transition-colors"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <input
                name="pincode"
                placeholder="6-digit Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="input-gold"
                required
              />

              <div className="flex justify-between gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-outline flex-1 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold flex-1 text-sm"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        ) : (
          <DeliveryOverview
            product={product}
            details={form}
            onBack={() => setStep('form')}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default DeliveryModal;