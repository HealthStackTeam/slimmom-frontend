import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './DiaryAddProductForm.module.css';

// Validation Schema
const ProductSchema = Yup.object().shape({
  productSearch: Yup.string(),
  productId: Yup.string().required('Bir ürün seçin'),
  amount: Yup.number()
    .required('Miktar gerekli')
    .min(1, 'Minimum 1 gram')
    .max(10000, 'Maksimum 10000 gram')
    .integer('Tam sayı olmalı'),
});

const DiaryAddProductForm = ({ onAddProduct, products = [] }) => {
  const suggestionsRef = useRef(null);

  // Form başlangıç değerleri
  const initialValues = {
    productSearch: '',
    productId: '',
    amount: '',
  };

  // Form submit 
  const handleSubmit = (values, { resetForm, setFieldValue }) => {
    if (values.productId && values.amount > 0) {
      
      const diaryEntry = {
        productId: values.productId,     
        amount: Number(values.amount),   
        date: new Date().toISOString(),  
      };
      
     
      onAddProduct(diaryEntry);
      
     
      resetForm();
      setFieldValue('amount', '');
    }
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        const suggestions = document.querySelector(`.${styles.suggestions}`);
        if (suggestions) {
          suggestions.style.display = 'none';
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, setFieldValue, handleChange }) => {
          
          const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(values.productSearch.toLowerCase())
          );

          
          const showSuggestions = values.productSearch.length > 0 && !values.productId;

          return (
            <Form className={styles.product_form}>
              {/* Ürün Arama Alanı*/}
              <div className={styles.formGroup} ref={suggestionsRef}>
                <label className={styles.label}></label>
                
            
                <Field type="hidden" name="productId" />
                
                {/* Arama Girişi */}
                <Field
                  type="text"
                  name="productSearch"
                  value={values.productSearch}
                  onChange={(e) => {
                    handleChange(e);
                    setFieldValue('productId', '');
                  }}
                  onFocus={() => {
                    if (values.productSearch.length > 0 && !values.productId) {
                      const suggestions = document.querySelector(`.${styles.suggestions}`);
                      if (suggestions) {
                        suggestions.style.display = 'block';
                      }
                    }
                  }}
                  placeholder="Enter product name"
                  className={styles.input}
                  autoComplete="off"
                />
                
                {/* Ürün Önerileri */}
                {showSuggestions && filteredProducts.length > 0 && (
                  <ul className={styles.suggestions}>
                    {filteredProducts.slice(0, 8).map(product => (
                      <li 
                        key={product._id.$oid}
                        onClick={() => {
                          setFieldValue('productId', product._id.$oid);
                          setFieldValue('productSearch', product.title);
                          const suggestions = document.querySelector(`.${styles.suggestions}`);
                          if (suggestions) {
                            suggestions.style.display = 'none';
                          }
                        }}
                        className={styles.suggestionItem}
                      >
                        <div className={styles.suggestionContent}>
                          <span className={styles.productName}>{product.title}</span>
                          <span className={styles.productDetails}>
                          
                            <span className={styles.productCalories}>
                              {product.calories} kcal/100g
                            </span>
                            <span className={styles.productCategory}>{product.categories}</span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Sonuç Yok Mesajı  */}
                {showSuggestions && filteredProducts.length === 0 && (
                  <div className={styles.noResults}>
                    Product not found !!!
                  </div>
                )}

                {/* Ürün Seçimi İçin Hata Mesajı */}
                <ErrorMessage name="productId">
                  {msg => <div className={styles.error}>{msg}</div>}
                </ErrorMessage>
              </div>

              {/* Miktar Alanı */}
              <div className={styles.formGroup}>
                <label className={styles.label}></label>
                <div className={styles.amountContainer}>
                  <Field
                    name="amount"
                    type="number"
                    min="1"
                    max="10000"
                    step="1"
                    value={values.amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || value === '0') {
                        setFieldValue('amount', '');
                      } else {
                        const numValue = parseInt(value, 10);
                        if (!isNaN(numValue) && numValue > 0 && numValue <= 10000) {
                          setFieldValue('amount', value);
                        }
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value === '') {
                        setFieldValue('amount', '');
                      }
                    }}
                    placeholder="Grams"
                    className={styles.amountInput}
                  />
                </div>
                
                {/* Miktar için Hata Mesajı */}
                <ErrorMessage name="amount">
                  {msg => <div className={styles.error}>{msg}</div>}
                </ErrorMessage>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={!values.productId || !values.amount || Number(values.amount) <= 0}
                className={styles.addButtonRound}
                title="Add product"
              >
                +
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default DiaryAddProductForm;