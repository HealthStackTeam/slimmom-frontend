import Header from "../components/Header/Header";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DiaryDateCalendar from "../components/DiaryDateСalendar/DiaryDateСalendar";
import DiaryAddProductForm from "../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../components/DiaryProductsList/DiaryProductsList";
import { selectDiaryProducts } from "../redux/diary/selectors";
import { fetchDiary } from "../redux/diary/operations";


const DiaryPage = () => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    dispatch(fetchDiary(selectedDate));
  },[dispatch,selectedDate])
  
  return (
    
    <div>
      <DiaryDateCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}
      />
      <DiaryAddProductForm selectedDate={selectedDate} />
      
        <DiaryProductsList selectedDate={selectedDate}
        />
    </div>
  );
};

export default DiaryPage;