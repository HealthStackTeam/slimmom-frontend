import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDailyRate } from '../../redux/dailyRate/operations'; 
import styles from './CalculatorСalorieForm.module.css';

const CalculatorCalorieForm = () => {
  const dispatch = useDispatch();

  // Form State
  const [formData, setFormData] = useState({
    height: '',
    age: '',
    weight: '',
    targetWeight: '', 
    bloodType: '1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      height: Number(formData.height),
      age: Number(formData.age),
      weight: Number(formData.weight),
      targetWeight: Number(formData.targetWeight),
      bloodType: Number(formData.bloodType),
      gender: 'female', 
    };

    dispatch(fetchDailyRate(payload));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Calculate your daily calorie intake right now</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputsWrapper}>
          <div className={styles.column}>
            <label className={styles.label}>
              Height *
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </label>
            <label className={styles.label}>
              Age *
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </label>
            <label className={styles.label}>
              Current weight *
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </label>
          </div>
          
          <div className={styles.column}>
            <label className={styles.label}>
              Desired weight *
              <input
                type="number"
                name="targetWeight"
                value={formData.targetWeight}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </label>
            
            <div className={styles.radioGroup}>
              <p className={styles.radioTitle}>Blood type *</p>
              <div className={styles.radios}>
                {[1, 2, 3, 4].map((type) => (
                  <label key={type} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="bloodType"
                      value={type}
                      checked={formData.bloodType == type}
                      onChange={handleChange}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Start losing weight
        </button>
      </form>
    </div>
  );
};

export default CalculatorCalorieForm;