import React, { useState } from 'react';
import styles from './DiaryProductsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectDiaryProducts } from '../../redux/diary/selectors';
import { deleteProduct } from '../../redux/diary/operations';
import toast from 'react-hot-toast';

const DiaryProductsList = () => {
  const products = useSelector(selectDiaryProducts);
  const dispatch = useDispatch();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productNameToDelete, setProductNameToDelete] = useState('');

  const handleDeleteClick = (productId, productTitle) => {
    setProductToDelete(productId);
    setProductNameToDelete(productTitle);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      const deletedProductName = productNameToDelete;

      dispatch(deleteProduct(productToDelete))
        .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            toast.success(`"${deletedProductName}" successfully deleted!`, {
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
            // Silme sonrası products array'ini göster
            setTimeout(() => {
              const updatedProducts = selectDiaryProducts({
                diary: { products },
              });
              console.log('Güncel ürün listesi:', updatedProducts);
            }, 500);
          }
        })
        .catch((error) => {
          console.error('Delete error:', error);
          toast.error(`Error deleting "${deletedProductName}"`, {
            duration: 3000,
            position: 'top-right',
            styles: {
              background: '#ff4444',
              color: '#fff',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '14px',
            },
          });
        });
    }

    setShowConfirmModal(false);
    setProductToDelete(null);
    setProductNameToDelete('');
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setProductToDelete(null);
    setProductNameToDelete('');
  };

  const calculateTotalCalories = (productCalories, weight) => {
    return Math.round(productCalories * (weight / 100));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tableArea}>
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
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className={styles.emptyMessage}>
                    No products added yet
                  </td>
                </tr>
              ) : (
                products.map(({ _id, weight, product }) => (
                  <tr key={_id}>
                    <td>{product.title}</td>
                    <td>{weight}g</td>
                    <td>
                      {calculateTotalCalories(product.calories, weight)} kcal
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteClick(_id, product.title)}
                        className={styles.deleteButton}
                        aria-label={`Delete ${product.title}`}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Delete Product</h3>
              <p className={styles.modalMessage}>
                Are you sure you want to delete "
                <strong>{productNameToDelete}</strong>"?
              </p>
              <div className={styles.modalButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className={styles.confirmButton}
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiaryProductsList;
