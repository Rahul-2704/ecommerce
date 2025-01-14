'use client'
import React, { useState } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number;
  onChange: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ initialQuantity = 1, onChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={decrement} className="bg-gray-300 text-black px-2 py-1 rounded">-</button>
      <span className="text-lg">{quantity}</span>
      <button onClick={increment} className="bg-gray-300 text-black px-2 py-1 rounded">+</button>
    </div>
  );
};

export default QuantitySelector;