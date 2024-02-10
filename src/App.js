import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

// const dummyList = [
//   {
//     id: 1,
//     author: "정지은",
//     content: "방가방가방가워",
//     emotion: 5,
//     //현재 시간 기준 시간 객체 생성
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "정정정",
//     content: "방가방가방가워1",
//     emotion: 3,
//     //현재 시간 기준 시간 객체 생성
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "지지지",
//     content: "방가방가방가워2",
//     emotion: 4,
//     //현재 시간 기준 시간 객체 생성
//     created_date: new Date().getTime(),
//   },
// ];

// api  -> https://jsonplaceholder.typicode.com/comments

function App() {
  //일기 데이터 배열 관리
  const [data, setData] = useState([]);
  //id 값 할당 변수
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  //새로운 일기 작성 메소드
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  // 일기 삭제 메소드
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    //삭제하려는 id의 리스트를 제외한 다른 다이어리 리스트들을
    //filter 를 사용해서 새로운 다이어리 리스트 배열을 생성한다
    const newDiaryList = data.filter((it) => it.id !== targetId);
    //새로 생성된 다이어리 배열로 data 변경
    setData(newDiaryList);
  };

  // 일기 수정 메소드
  const onEdit = (targetId, newContent) => {
    setData(
      //수정 대상의 id의 일기 내용을 수정 후 기존의 일기들과
      //새로운 배열로 생성하여 setData에 전달한다
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      {/* <Lifecycle /> */}
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
