// /Users/shin-junwoo/슈퍼코딩/코드 설명/250825/src/components/ForwardCounter.js

// 1. React의 훅(useState, useEffect)을 가져옵니다.
//    하지만 이 컴포넌트에서는 직접 사용되지 않고, `useCounter` 훅 내부에서 사용됩니다.
//    따라서 이 줄은 제거해도 무방합니다.
import { useState, useEffect } from "react";
// 2. 재사용 가능한 UI 컴포넌트인 Card를 가져옵니다.
//    이 컴포넌트는 내용을 감싸서 일관된 스타일(예: 카드 모양)을 적용하는 역할을 합니다.
import Card from "./UI/Card/Card";
// 3. 우리가 직접 만든 커스텀 훅(Custom Hook)인 `useCounter`를 가져옵니다.
//    이 훅은 카운터의 상태와 로직(1초마다 숫자 변경)을 캡슐화하고 있습니다.
import useCounter from "../hooks/useCounter";

// 4. `ForwardCounter`라는 이름의 함수형 컴포넌트를 정의합니다.
const ForwardCounter = () => {
  // 5. `useCounter` 훅을 호출합니다.
  //    인자로 `true`를 전달하여 카운터가 1씩 '증가'하도록 설정합니다.
  //    `useCounter` 훅은 현재 카운터 값을 반환하며, 이 값은 `counter` 상수에 저장됩니다.
  //    컴포넌트는 카운터가 어떻게 동작하는지 알 필요 없이, 그저 최신 값만 받아서 사용하면 됩니다.
  const counter = useCounter(true);

  // 6. 개발 중 확인을 위해 현재 카운터 값을 브라우저 콘솔에 출력합니다.
  console.log("counter", counter);

  // 7. 컴포넌트가 렌더링할 JSX를 반환합니다.
  //    `Card` 컴포넌트 안에 현재 카운터 값(`counter`)을 자식으로 넣어 표시합니다.
  return <Card>{counter}</Card>;
};

// 8. `ForwardCounter` 컴포넌트를 다른 파일에서 `import`하여 사용할 수 있도록 내보냅니다.
export default ForwardCounter;
