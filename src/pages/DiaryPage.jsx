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
  const formatDateForAPI = (date) => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const dateString = formatDateForAPI(selectedDate);
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
      date: formatDateForAPI(selectedDate),
      productId: productData.productSearch,
      weight: Number(productData.amount),
    };
    console.log('Backend format:', diaryEntry);
    dispatch(addProduct(diaryEntry))
    .then(() => {
      dispatch(fetchDiary(formatDateForAPI(selectedDate)));
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
        dispatch(fetchDiary(formatDateForAPI(selectedDate)));
      })
      .catch(error => {
        console.error('Failed to delete product:', error);
      });
  };
  return (
    
    <div>
      <DiaryDateCalendar 
        onDateChange={handleDateChange}
        selectedDate={selectedDate}
      />
      <DiaryAddProductForm 
       onAddProduct={handleAddProduct}
      />
      
        <DiaryProductsList
        products={diaryProducts || []}
        onDeleteProduct={handleDeleteProduct}
        />
    </div>
  );
};

export default DiaryPage;