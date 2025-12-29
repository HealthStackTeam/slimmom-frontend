import Header from "../components/Header/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiaryDateCalendar from "../components/DiaryDateСalendar/DiaryDateСalendar";
import DiaryAddProductForm from "../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../components/DiaryProductsList/DiaryProductsList";
import { fetchDiary, addProduct, deleteProduct } from "../redux/diary/operations";
import { selectDiaryProducts } from "../redux/diary/selectors";
import { fetchAllProducts } from "../redux/products/operations";
import { selectProducts } from "../redux/products/selectors";


const DiaryPage = () => {
  const dispatch = useDispatch();
  const diaryProducts = useSelector(selectDiaryProducts);
  const allProducts = useSelector(selectProducts);
  console.log('Redux State - Diary Products:', diaryProducts);
  console.log('Redux State - All Products:', allProducts);

  useEffect(() => {
    dispatch(fetchDiary());
    dispatch(fetchAllProducts());
  }, [dispatch]);
  const handleAddProduct = (productData) => {
    console.log('Adding product:', productData);
    const diaryEntry = {
      date: new Date().toISOString().split('T')[0],
      productId: productData.productSearch,
      weight: Number(productData.amount),
    };
    console.log('Backend format:', diaryEntry);
    dispatch(addProduct(diaryEntry))
    .then(() => {
      dispatch(fetchDiary());
    })
    .catch(error => {
      console.error('Failed to add product:', error);
    });
    
  };

  const handleDeleteProduct = (productId) => {
    console.log('Deleting product ID:', productId);
    dispatch(deleteProduct(productId))
      .unwrap()
      .then(() => {
        console.log('Product deleted successfully');
        dispatch(fetchDiary());
      })
      .catch(error => {
        console.error('Failed to delete product:', error);
      });
  };

  return (
    
    <div>
      <DiaryDateCalendar 
      />
      <DiaryAddProductForm 
       onAddProduct={handleAddProduct}
       products={allProducts}
      />
      
        <DiaryProductsList
        products={diaryProducts}
        onDeleteProduct={handleDeleteProduct}
        />
    </div>
  );
};

export default DiaryPage;