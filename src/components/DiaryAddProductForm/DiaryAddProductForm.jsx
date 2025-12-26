import React, { useState, useEffect, useRef } from 'react';
import productsData from '../../data/products.json';
import styles from './DiaryAddProductForm.module.css';

const DiaryAddProductForm = ({ onAddProduct }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [amount, setAmount] = useState('100');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    setProducts(productsData);
    
    // Click outside listener
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (selectedProduct && numAmount > 0) {
      const totalCalories = (selectedProduct.calories * numAmount / 100).toFixed(2);
      
      const productToAdd = {
        ...selectedProduct,
        amount: numAmount,
        totalCalories: parseFloat(totalCalories),
        addedDate: new Date().toLocaleTimeString()
      };
      
      onAddProduct(productToAdd);
      setSelectedProduct(null);
      setSearchTerm('');
      setAmount('');
      setShowSuggestions(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    
    if (value === '' || value === '0') {
      setAmount('');
      return;
    }
    
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 10000) {
      setAmount(value);
    } else if (value === '') {
      setAmount('');
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchTerm(product.title);
    setShowSuggestions(false); 
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedProduct(null);
    setShowSuggestions(value.length > 0);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.product_form}>
        <div className={styles.formGroup} ref={suggestionsRef}>
          <label className={styles.label}></label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => {
              if (searchTerm.length > 0 && !selectedProduct) {
                setShowSuggestions(true);
              }
            }}
            placeholder="Enter product name"
            className={styles.input}
          />
          
          {showSuggestions && filteredProducts.length > 0 && (
            <ul className={styles.suggestions}>
              {filteredProducts.slice(0, 8).map(product => (
                <li 
                  key={product._id.$oid}
                  onClick={() => handleProductSelect(product)}
                  className={styles.suggestionItem}
                >
                  <div className={styles.suggestionContent}>
                    <span className={styles.productName}>{product.title}</span>
                    <span className={styles.productDetails}>
                      <span className={styles.productCalories}>{product.calories} kcal</span>
                      <span className={styles.productCategory}>{product.categories}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {showSuggestions && searchTerm && filteredProducts.length === 0 && (
            <div className={styles.noResults}>
              Product not found !!!
            </div>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}></label>
          <div className={styles.amountContainer}>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              onBlur={(e) => {
                if (e.target.value === '') {
                  setAmount('');
                }
              }}
              placeholder="Grams"
              className={styles.amountInput}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!selectedProduct || !amount || Number(amount) <= 0}
          className={styles.addButtonRound}
          title="Add product"
        >
          +
        </button>
      </form>
    </div>
  );
};

export default DiaryAddProductForm;