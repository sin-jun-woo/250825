// /Users/shin-junwoo/슈퍼코딩/코드 설명/250825/my_app/src/hooks/useHttp.js

// 1. React와 필요한 훅(useCallback, useState)을 가져옵니다.
import React, { useCallback, useState } from "react";

// 2. `useHttp`라는 이름의 커스텀 훅을 정의합니다.
//    이 훅은 HTTP 요청을 보내고, 로딩 상태와 에러 상태를 관리하는 모든 로직을 캡슐화합니다.
const useHttp = () => {
  // 3. `useState`를 사용하여 로딩 상태와 에러 상태를 관리합니다.
  const [isLoading, setIsLoading] = useState(false); // 요청이 진행 중인지 여부
  const [error, setError] = useState(null); // 요청 중 발생한 에러 메시지

  // 4. 주석 처리된 코드: 이 훅이 원래 특정 컴포넌트(예: Tasks) 내부에 있다가
  //    재사용을 위해 분리되었음을 암시합니다. 지금은 데이터를 직접 관리하지 않고,
  //    데이터를 사용하는 컴포넌트에 그 처리를 위임합니다.
  //   const [tasks, setTasks] = useState([]);

  // 5. `sendRequest` 함수를 `useCallback`으로 감싸서 메모이제이션합니다.
  //    이 함수가 `useEffect`의 의존성 배열에 사용될 때, 불필요한 재실행을 방지하여 성능을 최적화합니다.
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    // 6. 요청 시작: 로딩 상태를 true로 설정하고, 이전 에러를 초기화합니다.
    setIsLoading(true);
    setError(null);
    try {
      // 7. `fetch` API를 사용하여 비동기 HTTP 요청을 보냅니다.
      //    `requestConfig` 객체로부터 URL, 메서드, 헤더, 본문(body)을 받아 동적으로 요청을 구성합니다.
      const response = await fetch(requestConfig.url, {
        // 메서드가 지정되지 않으면 기본값으로 'GET'을 사용합니다.
        method: requestConfig?.method ? requestConfig.method : "GET",
        // 헤더가 지정되지 않으면 빈 객체를 사용합니다.
        headers: requestConfig?.headers ? requestConfig.headers : {},
        // 본문이 지정되지 않으면 null을 사용합니다.
        body: requestConfig?.body ? requestConfig.body : null,
      });

      // 8. 응답 상태가 'ok'(예: 200)가 아니면 에러를 발생시킵니다.
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      // 9. 응답 본문을 JSON 형태로 파싱합니다.
      const data = await response.json();

      // 10. [핵심] 매개변수로 받은 `applyData` 함수를 호출하여, 가져온 데이터를 전달합니다.
      //     이 콜백 함수 덕분에 `useHttp` 훅은 '어떤' 데이터를 가져오는지만 책임지고,
      //     '어떻게' 처리할지는 이 훅을 사용하는 컴포넌트가 결정할 수 있습니다. (관심사 분리)
      applyData(data);

      // 11. 주석 처리된 코드: 데이터 변환 로직이 이 훅에서 제거되고,
      //     `applyData` 콜백(예: App.js의 transformTasks)으로 위임되었음을 보여줍니다.
      //   const loadedTasks = [];
      //   for (const taskKey in data) {
      //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      //   }
      //   setTasks(loadedTasks);
    } catch (err) {
      // 12. `try` 블록에서 에러가 발생하면 에러 상태를 설정합니다.
      setError(err.message || "Something went wrong!");
    }
    // 13. 요청 종료: 성공하든 실패하든 로딩 상태를 false로 설정합니다.
    setIsLoading(false);
  }, []); // 의존성 배열이 비어있으므로, 이 함수는 컴포넌트 생애주기 동안 단 한 번만 생성됩니다.

  // 14. 이 훅을 사용하는 컴포넌트가 필요로 하는 상태와 함수를 객체 형태로 반환합니다.
  return {
    isLoading, // 로딩 상태
    error, // 에러 상태
    sendRequest, // 요청을 보내는 함수
  };
};

export default useHttp;
