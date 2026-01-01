import { useDispatch, useSelector } from 'react-redux';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { fetchDailyRate, fetchDailyRateUser } from '../../redux/dailyRate/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
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

    // kullanıcı giriş yapmamışsa verileri sakla
    if (!isLoggedIn) {
      localStorage.setItem('calcData', JSON.stringify(payload));
    }

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
                <ErrorMessage
                  name="height"
                  component="span"
                  className={css.error}
                />
              </label>

              <label htmlFor="age" className={css.label}>
                Age *
                <Field
                  type="number"
                  name="age"
                  id={ageFieldId}
                  className={css.input}
                />
                <ErrorMessage name="age" component="span" className={css.error} />
              </label>

              <label htmlFor="weight" className={css.label}>
                Weight *
                <Field
                  type="number"
                  name="weight"
                  id={weightFieldId}
                  className={css.input}
                />
                <ErrorMessage
                  name="weight"
                  component="span"
                  className={css.error}
                />
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
                <ErrorMessage
                  name="targetWeight"
                  component="span"
                  className={css.error}
                />
              </label>

              {/* Gender Selection */}
              <div className={css.radioGroup}>
                <p className={css.radioTitle}>Gender *</p>
                <div className={css.radios}>
                  <label className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      className={css.radioInput}
                    />
                    <span className={css.radioText}>Female</span>
                  </label>
                  <label className={css.radioLabel}>
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      className={css.radioInput}
                    />
                    <span className={css.radioText}>Male</span>
                  </label>
                </div>
              </div>

              {/* Blood Type Selection */}
              <div className={css.radioGroup}>
                <p className={css.radioTitle}>Blood type *</p>
                <div className={css.radios}>
                  {bloodTypes.map((type) => (
                    <label key={type} className={css.radioLabel}>
                      <Field
                        type="radio"
                        name="bloodType"
                        value={type}
                        className={css.radioInput}
                      />
                      <span className={css.radioText}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className={css.submitBtn}>
            Start losing weight
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CalculatorCalorieForm;