import CalculatorCalorieForm from "../components/CalculatorСalorieForm/CalculatorСalorieForm";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import Header from "../components/Header/Header";

const CalculatorPage = () => {
  return (
    <div>
      <div>
        <CalculatorCalorieForm />
      </div>

      <div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default CalculatorPage;
