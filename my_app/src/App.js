// /Users/shin-junwoo/슈퍼코딩/코드 설명/250825/my_app/src/App.js

// 1. React와 필요한 훅(useCallback, useEffect, useState)들을 가져옵니다.
import React, { useCallback, useEffect, useState } from "react";

// 2. 자식 컴포넌트들을 가져옵니다.
import Tasks from "./components/Tasks/Tasks"; // 할 일 목록을 표시하는 컴포넌트
import NewTask from "./components/NewTask/NewTask"; // 새로운 할 일을 추가하는 컴포넌트
// 3. HTTP 요청 관련 로직을 분리한 커스텀 훅을 가져옵니다.
import useHttp from "./hooks/useHttp";

function App() {
  // 4. 할 일 목록(tasks)을 저장하기 위한 상태(state)를 정의합니다. 초기값은 빈 배열입니다.
  const [tasks, setTasks] = useState([]);

  // 5. `useCallback`을 사용하여 함수를 메모이제이션(memoization)합니다.
  //    이 함수는 Firebase에서 받아온 객체 형태의 데이터를 컴포넌트에서 사용하기 쉬운 배열 형태로 변환합니다.
  //    `useCallback`으로 감싸면, 이 컴포넌트가 리렌더링되어도 함수가 새로 생성되지 않아 불필요한 렌더링을 방지할 수 있습니다.
  //    (의존성 배열이 비어 있으므로, 이 함수는 컴포넌트 생애주기 동안 단 한 번만 생성됩니다.)
  const transformTasks = useCallback((taskObj) => {
    const loadedTasks = [];

    // Firebase에서 받은 데이터는 { key1: {text: '...'}, key2: {text: '...'} } 와 같은 객체 형태입니다.
    // for...in 루프를 사용해 객체의 각 키(taskKey)를 순회합니다.
    for (const taskKey in taskObj) {
      // 각 할 일을 { id: 'key', text: '...' } 형태의 객체로 만들어 배열에 추가합니다.
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    // 변환된 배열로 `tasks` 상태를 업데이트합니다.
    setTasks(loadedTasks);
  }, []); // 의존성 배열이 비어있습니다.

  // 6. `useHttp` 커스텀 훅을 사용합니다.
  //    이 훅은 HTTP 요청과 관련된 상태(isLoading, error)와 요청을 보내는 함수(sendRequest)를 반환합니다.
  //    가독성을 위해 `sendRequest` 함수의 이름을 `fetchTasks`로 변경하여 사용합니다.
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  // 7. `useEffect`를 사용하여 컴포넌트가 처음 렌더링될 때 할 일 목록을 가져옵니다.
  useEffect(() => {
    // `fetchTasks` 함수를 호출하여 데이터를 요청합니다.
    fetchTasks(
      {
        // 첫 번째 인자: 요청 설정 객체 (어디로 요청을 보낼지)
        url: "https://react-test-ea2ae-default-rtdb.firebaseio.com//tasks.json",
      },
      // 두 번째 인자: 데이터를 받은 후 실행할 콜백 함수 (데이터를 어떻게 변환할지)
      transformTasks
    );
  }, [fetchTasks]); // 8. 의존성 배열에 `fetchTasks`를 추가합니다.
  // `fetchTasks`는 `useHttp` 훅 내부에서 `useCallback`으로 감싸져 있으므로,
  // 이 `useEffect`는 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  // 9. `NewTask` 컴포넌트에서 새로운 할 일이 추가되었을 때 호출될 함수입니다.
  const taskAddHandler = (task) => {
    // 이전 할 일 목록(prevTasks)에 새로 추가된 할 일(task)을 합쳐서 상태를 업데이트합니다.
    // `concat`은 기존 배열을 변경하지 않고 새로운 배열을 반환합니다.
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  // 10. 화면에 렌더링할 JSX를 반환합니다.
  return (
    // 여러 컴포넌트를 묶기 위해 `React.Fragment`를 사용합니다.
    <React.Fragment>
      {/* 새로운 할 일을 추가하는 UI. `onAddTask` prop으로 핸들러 함수를 전달합니다. */}
      <NewTask onAddTask={taskAddHandler} />
      {/* 할 일 목록을 보여주는 UI. */}
      <Tasks
        items={tasks} // 할 일 목록 데이터
        loading={isLoading} // 로딩 상태
        error={error} // 에러 상태
        onFetch={fetchTasks} // 데이터를 다시 가져오는 함수 (예: 재시도 버튼)
      />
    </React.Fragment>
  );
}

export default App;
