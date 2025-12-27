import React from 'react';
import styles from './DiaryProductsList.module.css';

const DiaryProductsList = ({ products, onDeleteProduct }) => {
  // Backend'den gelen toplam kaloriyi hesapla
  const totalCalories = products.reduce((sum, product) => 
    sum + (product.calories || 0), 0
  );

  return (
    <div className={styles.container}>
      {products.length === 0 ? (
        <p className={styles.emptyMessage}>
          No products added for this date.
        </p>
      ) : (
        <div className={styles.tableArea}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className={styles.row}>
                    {/* ÜRÜN ADI */}
                    <td className={styles.productCell}>
                      <div>
                        <strong>
                          {product.title || product.product?.title || "Unnamed Product"}
                        </strong>
                      </div>
                    </td>
                    
                    {/* GRAM */}
                    <td className={styles.amountCell}>
                      {product.weight || product.amount || 0}g
                    </td>
                    
                    {/* KALORİ */}
                    <td className={styles.totalCalorieCell}>
                      <strong>{product.calories?.toFixed(0) || "0"} kcal</strong>
                    </td>
                    
                    {/* SİLME BUTONU */}
                    <td className={styles.actionCell}>
                      <button 
                        onClick={() => onDeleteProduct(product._id)}
                        className={styles.deleteButton}
                        title="Delete"
                        aria-label="Delete product"
                      >
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryProductsList;