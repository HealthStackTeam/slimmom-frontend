import React from "react";
import Header from "../components/Header/Header";
import React, { useState } from 'react';
import DiaryDateCalendar from '../components/DiaryDateСalendar/DiaryDateСalendar';
import DiaryAddProductForm from '../components/DiaryAddProductForm/DiaryAddProductForm';
import DiaryProductsList from '../components/DiaryProductsList/DiaryProductsList';

const DiaryPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddProduct = (product) => {
    setSelectedProducts(prev => [...prev, product]);
  };

  const handleDeleteProduct = (index) => {
    setSelectedProducts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header />
      <DiaryDateCalendar />
      <DiaryAddProductForm onAddProduct={handleAddProduct} />
      <DiaryProductsList 
        products={selectedProducts} 
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default DiaryPage;
