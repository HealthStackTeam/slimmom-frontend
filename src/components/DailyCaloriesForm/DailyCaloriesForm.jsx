import { useSelector } from 'react-redux';
import DailyCalorieIntake from '../DailyCalorieIntake/DailyCalorieIntake';
import css from './DailyCaloriesForm.module.css';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const DailyCaloriesForm = ({ onClose }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const handleClick = () => {
    if (isLoggedIn) {
      if (onClose) onClose();
      navigate('/diary');
      return;
    }

    if (onClose) onClose();
    navigate('/register');
  };

  return (
    <div>
      <DailyCalorieIntake />
      <button type="button" className={css.button} onClick={handleClick}>
        Start losing weight
      </button>
    </div>
  );
};

export default DailyCaloriesForm;
