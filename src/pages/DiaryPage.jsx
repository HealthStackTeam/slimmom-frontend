import Header from "../components/Header/Header";
import { useEffect,useState } from "react";
import { useDispatch} from "react-redux";
import DiaryDateCalendar from "../components/DiaryDateСalendar/DiaryDateСalendar";
import DiaryAddProductForm from "../components/DiaryAddProductForm/DiaryAddProductForm";
import DiaryProductsList from "../components/DiaryProductsList/DiaryProductsList";
import { fetchDiary } from "../redux/diary/operations";
import RightSidebar from "../components/RightSideBar/RightSideBar.jsx";

const DiaryPage = () => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (!selectedDate) return; // prevent sending empty date to API
    dispatch(fetchDiary(selectedDate));
  },[dispatch,selectedDate])
  
  return (
    
    <div>
      <DiaryDateCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}
      />
      <DiaryAddProductForm selectedDate={selectedDate} />
      
        <DiaryProductsList selectedDate={selectedDate}
      />
      <RightSidebar />
    </div>
  );
};

export default DiaryPage;