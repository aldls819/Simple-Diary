import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "정지은",
    content: "방가방가방가워",
    emotion: 5,
    //현재 시간 기준 시간 객체 생성
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "정정정",
    content: "방가방가방가워1",
    emotion: 3,
    //현재 시간 기준 시간 객체 생성
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "지지지",
    content: "방가방가방가워2",
    emotion: 4,
    //현재 시간 기준 시간 객체 생성
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
