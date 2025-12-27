import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiaryDateCalendar from "../components/DiaryDateСalendar/DiaryDateСalendar";
import DiaryAddProductForm from "../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../components/DiaryProductsList/DiaryProductsList";
import { fetchDiary, addProduct, deleteProduct } from "../redux/diary/operations";
import { selectDiaryProducts, selectDiaryIsLoading } from "../redux/diary/selectors";


const DiaryPage = () => {
  const dispatch = useDispatch()
  
  // Redux'tan verileri al
  const diaryProducts = useSelector(selectDiaryProducts);
  const isLoading = useSelector(selectDiaryIsLoading);
  
  const allProducts = []; 
  
  // Local state for selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Component mount olduğunda verileri çek
  useEffect(() => {
    
    dispatch(fetchDiary());
    
    
  }, [dispatch]);

  // Ürün ekleme handler'ı
  const handleAddProduct = (productData) => {
    const diaryEntry = {
      date: selectedDate.toISOString().split('T')[0], // YYYY-MM-DD
      productId: productData.productId,
      weight: productData.amount,
    };
    
    console.log('Adding to diary:', diaryEntry);
    
    dispatch(addProduct(diaryEntry))
      .then(() => {
        // Başarılı olursa listeyi yenile
        dispatch(fetchDiary());
      })
      .catch(error => {
        console.error('Failed to add product:', error);
      });
  };

  // Ürün silme handler'ı - operations dailyId bekliyor
  const handleDeleteProduct = (dailyId) => {
    console.log('Deleting from diary:', dailyId);
    
    dispatch(deleteProduct(dailyId))
      .then(() => {
        // Silme başarılı olursa listeyi yenile
        dispatch(fetchDiary());
      })
      .catch(error => {
        console.error('Failed to delete product:', error);
      });
  };

  // Tarih değişikliği handler'ı
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Frontend'de tarihe göre filtreleme (geçici çözüm)
  const filteredProducts = diaryProducts.filter(product => {
    if (!product.date) return true;
    const productDate = new Date(product.date).toDateString();
    const selectedDateStr = selectedDate.toDateString();
    return productDate === selectedDateStr;
  });

  return (
    <div>
      <Header />
      <DiaryDateCalendar 
        onDateChange={handleDateChange}
        initialDate={selectedDate}
      />
      <DiaryAddProductForm 
        onAddProduct={handleAddProduct}
        products={allProducts} 
      />
      
        <DiaryProductsList
          products={filteredProducts} // Tarihe göre filtrelenmiş ürünler
          onDeleteProduct={handleDeleteProduct}
        />
    </div>
  );
};

export default DiaryPage;