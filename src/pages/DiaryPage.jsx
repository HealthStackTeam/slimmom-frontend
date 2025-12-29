import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiaryDateCalendar from "../components/DiaryDateСalendar/DiaryDateСalendar";
import DiaryAddProductForm from "../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../components/DiaryProductsList/DiaryProductsList";
import { fetchDiary, addProduct, deleteProduct } from "../redux/diary/operations";
import { selectDiaryProducts } from "../redux/diary/selectors";



const DiaryPage = () => {
  const dispatch = useDispatch();
  const diaryProducts = useSelector(selectDiaryProducts);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log('Redux State - Diary Products:', diaryProducts);
  

  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    console.log('Fetching diary for date:', dateString);
    dispatch(fetchDiary(dateString));
  }, [dispatch, selectedDate]);

  useEffect(() => {
    dispatch(fetchDiary());
  }, [dispatch]);

  const handleDateChange = (newDate) => {
    console.log('Date changed to:', newDate);
    setSelectedDate(newDate);
  };
  const handleAddProduct = (productData) => {
    console.log('Adding product:', productData);
    const diaryEntry = {
      date: selectedDate().toISOString().split('T')[0],
      productId: productData.productSearch,
      weight: Number(productData.amount),
    };
    console.log('Backend format:', diaryEntry);
    dispatch(addProduct(diaryEntry))
    .then(() => {
      dispatch(fetchDiary(selectedDate.toISOString().split('T')[0]));
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
        dispatch(fetchDiary(selectedDate.toISOString().split('T')[0]));
      })
      .catch(error => {
        console.error('Failed to delete product:', error);
      });
  };

  const filteredProducts = diaryProducts?.filter(product => {
    if (!product || !product.date) return false;
    const productDate = new Date(product.date);
    return productDate.toDateString() === selectedDate.toDateString();
  }) || [];
  return (
    
    <div>
      <DiaryDateCalendar 
        onDateChange={handleDateChange}
        selectedDate={selectedDate}
      />
      <DiaryAddProductForm 
       onAddProduct={handleAddProduct}
       selectedDate={selectedDate}
      />
      
        <DiaryProductsList
        products={filteredProducts}
        onDeleteProduct={handleDeleteProduct}
        selectedDate={selectedDate}
        />
    </div>
  );
};

export default DiaryPage;