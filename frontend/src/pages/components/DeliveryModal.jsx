import React, { useState, useRef, useEffect } from 'react';
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

  // For custom suggestions
  const [filtered, setFiltered] = useState([]);
  const [showSug, setShowSug] = useState(false);
  const wrapperRef = useRef(null);

  // Close suggestions when clicking outside
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
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md animate-fade-in-up">

        {step === 'form' ? (
          <>
            <h2 className="text-2xl font-bold text-rose-700 mb-4 text-center">
              Delivery Details
            </h2>
            <form onSubmit={handleContinue} className="space-y-4">

              {/* ... other inputs ... */}
                            <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                name="number"
                placeholder="Phone Number"
                value={form.number}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                name="location"
                placeholder="Address / Location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />

              <input
                name="landmark"
                placeholder="Nearby Landmark (optional)"
                value={form.landmark}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />

              {/* State input with custom dropdown */}
              <div className="relative" ref={wrapperRef}>
                <input
                  name="state"
                  placeholder="Select or type state"
                  value={form.state}
                  onChange={handleChange}
                  onFocus={() => setShowSug(filtered.length > 0)}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <ul
                  className={`
                    absolute top-full left-0 right-0 mt-1 max-h-40 overflow-auto
                    bg-white text-black border border-gray-300 rounded shadow-lg
                    transition-opacity duration-200 ease-in-out
                    ${showSug ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  `}
                >
                  {filtered.map(s => (
                    <li
                      key={s}
                      onClick={() => selectState(s)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
                className="w-full px-4 py-2 border rounded"
                required
              />

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded
                             bg-gradient-to-br from-rose-400 via-rose-700 to-rose-400
                             hover:scale-105 transition"
                >
                  Continue
                </button>
              </div>
            </form>
          </>
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
