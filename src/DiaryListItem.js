import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryListItem = ({ id, author, content, emotion, created_date }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);
  //수정 state
  const [isEdit, setIsEdit] = useState(false);
  //토글 반전연산
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //원래 내용을 수정 시에도 바로 띄워주기 -> useState에 content를 넣어주면 됨
  const [localContent, setLocalContent] = useState(content);

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  // 수정 취소 버튼 눌러도 기존 content 내용이 뜨도록 하는 메소드
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const LocalContentInput = useRef();

  const handleEdit = () => {
    if (localContent.length < 5) {
      LocalContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니가?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryListItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={LocalContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryListItem);
