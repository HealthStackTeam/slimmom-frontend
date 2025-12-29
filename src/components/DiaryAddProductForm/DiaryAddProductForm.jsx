// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import styles from './DiaryAddProductForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './DiaryAddProductForm.module.css';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/diary/operations';
import { setFilter } from '../../redux/filter/slice';
import { fetchProductsByQuery } from '../../redux/products/operations';

const ProductSchema = Yup.object().shape({
  productSearch: Yup.string()
    .required('Please enter a product name')
    .min(2, 'Too Short! Minimum 2 characters')
    .max(50, 'Too Long! Maximum 50 characters'),
  weight: Yup.number()
    .required('Amount is required')
    .min(1, 'Minimum 1 gram')
    .max(10000, 'Maximum 10000 grams')
    .integer('Must be a whole number'),
});

const DiaryAddProductForm = ({ selectedDate }) => {
  const [products, setProducts] = useState([]);

  console.log(selectedDate);

  const dispatch = useDispatch();

  const productNewId = useId();
  const weightId = useId();

  const handleSubmit = (values, actions) => {
    
    const valuesToSend = {
      date: selectedDate,
      productId: values.productId,
      weight: Number(values.weight),
    };

    console.log(valuesToSend);
    dispatch(addProduct(valuesToSend));
    actions.resetForm();
  };

  return (
    <div className={styles.container}>
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
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor={productNewId}></label>
              <Field
                className={styles.field}
                type="text"
                name="productSearch"
                id={productNewId}
                placeholder="Enter product name"
                value={values.productSearch}
                onChange={(e) => {
                  const v = e.target.value;
                  setFieldValue('productSearch', v);
                  dispatch(setFilter(v));
                  dispatch(fetchProductsByQuery(v)).then((action) => {
                    setProducts(action.payload?.data || []);
                  });
                }}
              />
              <ErrorMessage name="productSearch" component="div" className={styles.error} />
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
              />
              <ErrorMessage name="weight" component="div" className={styles.error} />
            </div>

            <div>
              <Field as="select" name="productId">
                <option value="">Select product</option>
                {products.map(({ _id, title }) => (
                  <option key={_id} value={_id}>
                    {title}
                  </option>
                ))}
              </Field>
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
