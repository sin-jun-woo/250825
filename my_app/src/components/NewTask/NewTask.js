// /Users/shin-junwoo/슈퍼코딩/코드 설명/250825/my_app/src/components/NewTask/NewTask.js

// 1. 필요한 컴포넌트와 커스텀 훅을 가져옵니다.
//    - Section: UI를 감싸는 재사용 가능한 컴포넌트입니다.
//    - TaskForm: 사용자가 할 일을 입력하는 폼 컴포넌트입니다.
//    - useHttp: HTTP 요청과 관련된 로직(로딩, 에러 처리 등)을 캡슐화한 커스텀 훅입니다.
import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/useHttp";

const NewTask = (props) => {
  // 2. `useHttp` 훅을 호출하여 HTTP 요청에 필요한 상태와 함수를 가져옵니다.
  //    - isLoading: 요청이 진행 중인지 여부를 나타내는 boolean 값입니다.
  //    - error: 요청 중 에러가 발생했는지 여부를 나타냅니다.
  //    - sendRequest: HTTP 요청을 보내는 함수입니다. 가독성을 위해 `sendTaskRequest`로 이름을 변경하여 사용합니다.
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  // 3. `TaskForm`에서 새로운 할 일이 제출되었을 때 실행될 핸들러 함수입니다.
  //    `taskText`는 사용자가 입력한 할 일 내용입니다.
  const enterTaskHandler = (taskText) => {
    // 4. 데이터를 성공적으로 생성한 후 실행될 콜백 함수를 정의합니다.
    //    이 함수는 `useHttp` 훅 내부에서 호출되며, 서버 응답 데이터(`taskData`)를 인자로 받습니다.
    const createData = (taskData) => {
      // Firebase는 데이터를 생성하면 고유한 ID를 'name' 속성에 담아 반환합니다.
      const generatedId = taskData.name;
      // 서버에서 받은 ID와 사용자가 입력한 텍스트를 조합하여 새로운 할 일 객체를 만듭니다.
      const createdTask = { id: generatedId, text: taskText };

      // 5. 부모 컴포넌트(App.js)로부터 받은 `onAddTask` 함수를 호출하여
      //    전체 할 일 목록 상태를 업데이트합니다. (Lifting State Up)
      props.onAddTask(createdTask);
    };

    // 6. `sendTaskRequest` 함수를 호출하여 서버에 POST 요청을 보냅니다.
    sendTaskRequest(
      {
        // 첫 번째 인자: 요청 설정 객체
        url: "https://react-test-ea2ae-default-rtdb.firebaseio.com//tasks.json",
        method: "POST", // 새로운 데이터를 생성하므로 POST 메서드를 사용합니다.
        body: JSON.stringify({ text: taskText }), // 요청 본문에 보낼 데이터 (JS 객체를 JSON 문자열로 변환)
        headers: {
          "Content-Type": "application/json", // 본문의 데이터 형식이 JSON임을 명시합니다.
        },
      },
      // 두 번째 인자: 요청이 성공했을 때 실행할 콜백 함수
      createData
    );
  };

  // 7. 화면에 렌더링할 JSX를 반환합니다.
  return (
    <Section>
      {/* 할 일 입력 폼. `onEnterTask`로 핸들러를, `loading`으로 로딩 상태를 전달합니다. */}
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {/* 에러가 발생했을 경우에만 에러 메시지를 화면에 표시합니다. */}
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
