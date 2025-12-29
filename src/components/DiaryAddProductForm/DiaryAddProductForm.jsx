import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from './DiaryAddProductForm.module.css'
import { useId } from "react";
import * as Yup from "yup";


const ProductSchema = Yup.object().shape({
  productSearch: Yup.string().required('Please enter a product name'),
  amount: Yup.number().required('Amount is required')
  .min(1,'Minimum 1 gram')
  .max(10000,'Maximum 10000 grams')
  .integer('Must be a whole number'),
})
const DiaryAddProductForm = ({ onAddProduct, products = [] }) => {
  const productId = useId();
  const amountId = useId();
  
  const initialValues = {
  productSearch:'',
  amount:'',
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    const selectedProduct = products.find(
      p => p.title && p.title.toLowerCase() === values.productSearch.toLowerCase()
    );
    if (selectedProduct) {
      console.log(selectedProduct);
      const productData ={
        ...values,
        productId: selectedProduct._id || selectedProduct.id
      };
      onAddProduct(productData);
    }
     else{
      onAddProduct(values);
     }
    
    actions.resetForm();
  };
 return (
  <div className={styles.container}>
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ProductSchema}>
    <Form className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor={productId}></label>
      <Field className={styles.field} type="text" name="productSearch" id={productId} placeholder="Enter product name" />
      <ErrorMessage name=" productSearch" component="div" className={styles.error} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor={amountId}></label>
      <Field className={styles.amountField} type="number" name="amount" id={amountId}  placeholder="Grams" min="1" max="10000"/>
      <ErrorMessage name="amount" component="div" className={styles.error} />
      </div>
      

      <button className={styles.button} type="submit">+</button>
    </Form>
  </Formik>
  </div>
  
 )
}
export default DiaryAddProductForm;