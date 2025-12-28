import DailyCalorieIntake from '../DailyCalorieIntake/DailyCalorieIntake';
import css from './DailyCaloriesForm.module.css';
import { useNavigate } from 'react-router-dom';

const DailyCaloriesForm = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
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
