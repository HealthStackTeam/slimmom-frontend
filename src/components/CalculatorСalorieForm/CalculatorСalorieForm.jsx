import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyRate } from '../../redux/dailyRate/operations'; 
import styles from './CalculatorСalorieForm.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { fetchDailyRateUser } from '../../redux/dailyRate/operations';

const CalculatorCalorieForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const bloodTypes = ['A', 'B', 'AB', 'O'];

  const [formData, setFormData] = useState({
    height: '',
    age: '',
    weight: '',
    targetWeight: '', 
    bloodType: 'A',
    gender: 'female',
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
      bloodType: formData.bloodType,
      gender: formData.gender,
    };
    console.log(isLoggedIn);

    if (isLoggedIn) {
      dispatch(fetchDailyRateUser(payload))
    } else {
      dispatch(fetchDailyRate(payload))
      .unwrap()
      .then(() => {
        if (onSuccess) {
           onSuccess(); 
        }
      })
      .catch(() => {
      });
    }

    
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
            
            {/* CİNSİYET SEÇİMİ */}
            <div className={styles.radioGroup}>
              <p className={styles.radioTitle}>Gender *</p>
              <div className={styles.radios}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>Female</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>Male</span>
                </label>
              </div>
            </div>

            {/* KAN GRUBU SEÇİMİ */}
            <div className={styles.radioGroup}>
              <p className={styles.radioTitle}>Blood type *</p>
              <div className={styles.radios}>
                {bloodTypes.map((type) => (
                  <label key={type} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="bloodType"
                      value={type}
                      checked={formData.bloodType === type}
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