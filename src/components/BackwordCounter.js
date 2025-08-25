// /Users/shin-junwoo/슈퍼코딩/코드 설명/250825/src/components/BackwordCounter.js

// 1. React의 훅(useState, useEffect)을 가져옵니다.
//    하지만 이 컴포넌트에서는 직접 사용되지 않고, `useCounter` 훅 내부에서만 사용됩니다.
//    따라서 이 줄은 제거해도 코드가 정상적으로 동작합니다.
import { useState, useEffect } from "react";
// 2. 재사용 가능한 UI 컴포넌트인 Card를 가져옵니다.
//    이 컴포넌트는 내용을 감싸서 일관된 스타일을 적용하는 역할을 합니다.
import Card from "./UI/Card/Card";
// 3. `ForwardCounter`와 동일한 커스텀 훅(Custom Hook)인 `useCounter`를 가져옵니다.
//    이 훅은 카운터의 상태와 로직(1초마다 숫자 변경)을 캡슐화하고 있습니다.
import useCounter from "../hooks/useCounter";

// 4. `BackwardCounter`라는 이름의 함수형 컴포넌트를 정의합니다.
const BackwardCounter = () => {
  // 5. `useCounter` 훅을 호출합니다.
  //    `ForwardCounter`와는 다르게 인자로 `false`를 전달하여 카운터가 1씩 '감소'하도록 설정합니다.
  //    `useCounter` 훅은 현재 카운터 값을 반환하며, 이 값은 `counter` 상수에 저장됩니다.
  //    이처럼 훅에 전달하는 인자만 바꿔서 완전히 다른 동작을 구현할 수 있습니다.
  const counter = useCounter(false);

  // 6. 컴포넌트가 렌더링할 JSX를 반환합니다.
  //    `Card` 컴포넌트 안에 현재 카운터 값(`counter`)을 자식으로 넣어 표시합니다.
  return <Card>{counter}</Card>;
};

// 7. `BackwardCounter` 컴포넌트를 다른 파일에서 `import`하여 사용할 수 있도록 내보냅니다.
export default BackwardCounter;
