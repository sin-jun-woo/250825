// 1. React와 필요한 훅(useEffect, useState)을 가져옵니다.
import React, { useEffect, useState } from "react";

// 2. `useCounter`라는 이름의 커스텀 훅을 정의합니다.
// 커스텀 훅의 이름은 관례적으로 'use'로 시작합니다.
// `isForward`라는 boolean 타입의 인자를 받아서 카운터의 방향(증가 또는 감소)을 결정합니다.
const useCounter = (isForward) => {
  // 3. `useState`를 사용하여 카운터의 상태를 관리합니다.
  // `counter`는 현재 숫자 값, `setCounter`는 이 값을 변경하는 함수입니다. 초기값은 0입니다.
  const [counter, setCounter] = useState(0);

  // 4. `useEffect`를 사용하여 컴포넌트의 생명주기와 관련된 부수 효과(side effect)를 처리합니다.
  // 여기서는 타이머(setInterval)를 설정하는 작업을 합니다.
  useEffect(() => {
    // 5. 1000ms(1초)마다 콜백 함수를 실행하는 인터벌을 설정합니다.
    const interval = setInterval(() => {
      // 6. `setCounter`를 사용하여 `counter` 상태를 업데이트합니다.
      // `isForward`가 true이면 이전 값(prevCounter)에 1을 더하고, false이면 1을 뺍니다.
      setCounter((prevCounter) => prevCounter + 1 * (isForward ? 1 : -1));
    }, 1000);

    // 7. Cleanup 함수: `useEffect`는 컴포넌트가 사라지거나(unmount), 리렌더링되기 전에 이 함수를 실행합니다.
    // 여기서는 설정된 `interval`을 정리하여 메모리 누수를 방지합니다.
    return () => clearInterval(interval);
  }, [isForward]); // 8. 의존성 배열: 이 배열 안에 있는 값(`isForward`)이 변경될 때마다 useEffect가 다시 실행됩니다.

  return counter;
};

export default useCounter;
