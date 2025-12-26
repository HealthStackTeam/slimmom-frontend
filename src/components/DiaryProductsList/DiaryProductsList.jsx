import React from 'react';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = ({ products, onDeleteProduct }) => {
  const totalCalories = products.reduce((sum, product) => 
    sum + (product.totalCalories || 0), 0
  );

  // Her satır için hesaplanan yükseklik
  const rowHeight = 60; // px
  const headerHeight = 50; // px
  const visibleRows = 5;
  const maxTableHeight = headerHeight + (visibleRows * rowHeight);

  return (
    <div className={styles.container}>
      {products.length === 0 ? (
        <p className={styles.emptyMessage}>No products have been added yet.</p>
      ) : (
        <>
          {/* TABLO ALANI - SADECE BURASI SCROLL EDİLECEK */}
          <div className={styles.tableArea}>
            <div 
              className={styles.tableWrapper}
              style={{ 
                maxHeight: products.length > 5 ? `${maxTableHeight}px` : 'none'
              }}
            >
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index} className={styles.row}>
                      <td className={styles.productCell}>
                        <div>
                          <strong>{product.title}</strong>
                        </div>
                      </td>
                      <td className={styles.amountCell}>{product.amount}g</td>
                      <td className={styles.totalCalorieCell}>
                        <strong>{product.totalCalories.toFixed(2)} kcal</strong>
                      </td>
                      <td className={styles.actionCell}>
                        <button 
                          onClick={() => onDeleteProduct(index)}
                          className={styles.deleteButton}
                          title="Sil"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiaryProductsList;