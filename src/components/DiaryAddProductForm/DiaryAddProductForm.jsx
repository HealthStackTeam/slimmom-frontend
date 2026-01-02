import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './DiaryAddProductForm.module.css';
import { useId, useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/diary/operations';
import { setFilter } from '../../redux/filter/slice';
import { fetchProductsByQuery } from '../../redux/products/operations';

const ProductSchema = Yup.object().shape({
  productSearch: Yup.string()
    .required('Please enter a product name')
    .min(2, 'Too Short! Minimum 2 characters')
    .max(100, 'Too Long! Maximum 100 characters'),
  weight: Yup.number()
    .required('Amount is required')
    .min(1, 'Minimum 1 gram')
    .max(10000, 'Maximum 10000 grams')
    .integer('Must be a whole number'),
});

const DiaryAddProductForm = ({ selectedDate, onProductAdded, onFormError, isFullPage = false }) => {
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const productNewId = useId();
  const weightId = useId();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (values, actions) => {
    const valuesToSend = {
      date: selectedDate,
      productId: values.productId,
      weight: Number(values.weight),
    };
    
    // GEÇERLİ ÜRÜN SEÇİLMİŞ Mİ KONTROLÜ
  if (!products.some(p => p._id === values.productId)) {
    const errorMsg = 'Please enter a product name!';
    
    if (isFullPage && onFormError) {
      onFormError(errorMsg);
    } else {
      toast.error(errorMsg, {
        duration: 4000,
              position: isFullPage ? 'top-center' : 'top-right',
              styles: {
                background: '#ff4444',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
              },
      });
    }
    return;
  }

    dispatch(addProduct(valuesToSend)).then((result) => {
    if (result.meta.requestStatus === 'fulfilled') {
      // Başarılı ekleme
      if (!isFullPage) {
        toast.success('Product entry successful!!', {
          duration: 2000,
          position: 'top-right',
          styles: {
                background: '#4CAF50',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
              },
        });
      }
      actions.resetForm();
      setProducts([]);
      setShowDropdown(false);
      
      if (isFullPage && onProductAdded) {
        onProductAdded();
      }
    }});
  };

  const handleProductSelect = (productId, productTitle, setFieldValue) => {
    setFieldValue('productId', productId);
    setFieldValue('productSearch', productTitle);
    setShowDropdown(false);
  };
  

  return (
    <div className={`${styles.container} ${isFullPage ? styles.fullPage : ''}`}>
      <Formik
        initialValues={{
          productSearch: '',
          productId: '',
          date: "",
          weight: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={ProductSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className={`${styles.form} ${isFullPage ? styles.fullPageForm : ''}`}>
            <div className={`${styles.formGroup} ${isFullPage ? styles.fullPageFormGroup : ''}`} ref={dropdownRef}>
              <label htmlFor={productNewId}></label>
              <Field
                className={styles.field}
                type="text"
                name="productSearch"
                id={productNewId}
                placeholder="Enter product name"
                value={values.productSearch}
                autoComplete="off"
                onChange={async (e) => {
                  const v = e.target.value;
                  setFieldValue('productSearch', v);
                  dispatch(setFilter(v));
                  
                  if (v.length >= 2) {
                    setIsSearching(true);
                    setShowDropdown(true);
                    try {
                      const action = await dispatch(fetchProductsByQuery(v));
                      setProducts(action.payload?.data || []);
                    } catch (error) {
                      console.error('Search error:', error);
                      setProducts([]);
                    } finally {
                      setIsSearching(false);
                    }
                  } else {
                    setProducts([]);
                    setShowDropdown(false);
                  }
                }}
                onFocus={() => {
                  if (values.productSearch.length >= 2 && products.length > 0) {
                    setShowDropdown(true);
                  }
                }}
              />
              <ErrorMessage name="productSearch" component="div" className={`${styles.error} ${isFullPage ? styles.fullPageError : ''}`} />
              
              {/* Product Selection Dropdown */}
              {showDropdown && (
                <div className={styles.dropdown}>
                  {isSearching ? (
                    <div className={styles.dropdownItem}>Searching...</div>
                  ) : products.length > 0 ? (
                    <>
                    
                      {products.map(({ _id, title }) => (
                        <div
                          key={_id}
                          value={_id}
                          className={styles.dropdownItem}
                          onClick={() => handleProductSelect(_id, title, setFieldValue)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {title}
                        </div>
                      ))}
                    </>
                  ) : values.productSearch.length >= 2 ? (
                    <div className={styles.dropdownItem}>No products found</div>
                  ) : null}
                </div>
              )}
              
              
              
              
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={weightId}></label>
              <Field
               className={styles.amountField}
               type="number"
               name="weight"
               id={weightId}
               placeholder="Grams"
               min="1"
               max="10000"
               onKeyPress={(e) => {
                 if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                   }
                 }}
               inputMode="numeric"
              />
              <ErrorMessage name="weight" component="div" className={`${styles.error} ${isFullPage ? styles.fullPageError : ''}`} />
            </div>

            <button className={styles.button} type="submit">
              +
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DiaryAddProductForm;