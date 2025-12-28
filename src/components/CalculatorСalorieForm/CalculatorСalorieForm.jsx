import { useDispatch, useSelector } from 'react-redux';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { fetchDailyRate } from '../../redux/dailyRate/operations';
import styles from './CalculatorСalorieForm.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { fetchDailyRateUser } from '../../redux/dailyRate/operations';
import * as Yup from 'yup';
import css from './CalculatorСalorieForm.module.css';

const CalculatorCalorieForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const bloodTypes = ['A', 'B', 'AB', '0'];

  const heightFieldId = useId();
  const ageFieldId = useId();
  const weightFieldId = useId();
  const targetWeightFieldId = useId();

  const schema = Yup.object().shape({
    height: Yup.number()
      .min(100, 'Too short')
      .max(250, 'Too tall')
      .required('Required'),
    age: Yup.number()
      .min(18, 'Must be 18+')
      .max(100, 'Too old')
      .required('Required'),
    weight: Yup.number()
      .min(20, 'Too light')
      .max(500, 'Too heavy')
      .required('Required'),
    targetWeight: Yup.number()
      .min(20, 'Too light')
      .max(500, 'Too heavy')
      .required('Required'),
    bloodType: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
  });

  const handleSubmit = (values, actions) => {
    const payload = {
      ...values,
      height: Number(values.height),
      age: Number(values.age),
      weight: Number(values.weight),
      targetWeight: Number(values.targetWeight),
    };

    const action = isLoggedIn
      ? fetchDailyRateUser(payload)
      : fetchDailyRate(payload);

    dispatch(action)
      .unwrap()
      .then((response) => {
        if (onSuccess) onSuccess(response);
      })
      .catch(() => {});

    actions.resetForm();
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>
        Calculate your daily calorie intake right now
      </h2>
      <Formik
        initialValues={{
          height: '',
          age: '',
          weight: '',
          targetWeight: '',
          gender: 'female',
          bloodType: 'A',
        }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form className={css.form}>
          <div className={css.inputsWrapper}>
            <div className={css.column}>
              <label htmlFor="height" className={css.label}>
                Height *
                <Field
                  type="number"
                  name="height"
                  id={heightFieldId}
                  className={css.input}
                />
                <ErrorMessage name="height" component="span" />
              </label>

              <label htmlFor="age" className={css.label}>
                Age *
                <Field
                  type="number"
                  name="age"
                  id={ageFieldId}
                  className={css.input}
                />
                <ErrorMessage name="age" component="span" />
              </label>

              <label htmlFor="weight" className={css.label}>
                Weight *
                <Field
                  type="number"
                  name="weight"
                  id={weightFieldId}
                  className={css.input}
                />
                <ErrorMessage name="weight" component="span" />
              </label>
            </div>
            <div className={css.column}>
              <label htmlFor="targetWeight" className={css.label}>
                Target Weight *
                <Field
                  type="number"
                  name="targetWeight"
                  id={targetWeightFieldId}
                  className={css.input}
                />
                <ErrorMessage name="targetWeight" component="span" />
              </label>

              {/* Gender Selection */}
              <div className={styles.radioGroup}>
                <p className={styles.radioTitle}>Gender *</p>
                <div className={styles.radios}>
                  <label className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>Female</span>
                  </label>
                  <label className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      className={styles.radioInput}
                    />
                    <span className={styles.radioText}>Male</span>
                  </label>
                </div>
              </div>

              {/* Blood Type Selection */}
              <div className={styles.radioGroup}>
                <p className={styles.radioTitle}>Blood type *</p>
                <div className={styles.radios}>
                  {bloodTypes.map((type) => (
                    <label key={type} className={css.radioLabel}>
                      <Field
                        type="radio"
                        name="bloodType"
                        value={type}
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
        </Form>
      </Formik>
    </div>
  );
};

export default CalculatorCalorieForm;

/*const CalculatorCalorieForm = ({ onSuccess }) => {
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
            
            {/* CİNSİYET SEÇİMİ }
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

            {/* KAN GRUBU SEÇİMİ }
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

export default CalculatorCalorieForm;*/
