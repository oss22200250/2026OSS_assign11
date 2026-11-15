# 1 Project Information
리액트를 이용한 Course Manager. 과목 조회/추가/삭제 기능이 있으며, 과목별 상태 변경이 가능하다.
### [원본 sample URL](https://github.com/2026-2-OSS/week11_sample_project)


# 2 Installation
npm install로 설치, npm run dev로 실행
### 실행 화면
![실행 화면](./Screenshot.png)


# 3 Source Code Exploration
## 1 Project Structure
- **App.jsx** : 최상위 컨테이너, 제목과 푸터를 감싸며, 메인 컨텐츠인 <CourseList/> 컴포넌트를 화면 중앙에 불러와 배치.
- **CourseList.jsx** : 목록 관리, 과목들의 목록을 useState로 갖는 핵심 파일. 데이터를 가공하는 함수를 정의하고, 배열의 개수만큼 <CourseItem/>을 찍어냄.
- **CourseItem.jsx** : 개별 UI, 과목 하나의 UI를 그리는 틀. 부모에서 정의한 대로 화면에 데이터 보여주고, 버튼이 눌리면 부모에게서 받은 함수를 대신 실행.

## 2 Component & Props
CourseList는 보유한 배열 데이터를 .map() 함수로 여러 개 CourseItem을 생성. 이때 Props를 내려보내는데, 다음이 포함됨.  
course: 과목 이름, ID, 상태가 담긴 객체 데이터  
onDelete, onToggle: 부모에 있는 handleDelete와 handleToggle을 컨트롤.  
CourseItem은 Props를 받아두었다가 사용자가 Delete 버튼을 클릭하면 onClick={() => onDelete(course.id)}를 통해 부모의 삭제 함수 대신 작동.

## 3 State & Event
상태(useState): CourseList는 [courses, setCourses] = useState(initialCourses) 통해 과목 배열 기억. 화면 다시 그리기 위해 setCourses 통해 상태 변경.  
이벤트 흐름: 자식 컴포넌트에서 삭제 버튼 눌리면 이벤트 발생, 부모의 handleDelete(id) 실행. js의 filter() 메서드 이용.

## 4 Code Analysis
**코드**  
const doneCount = courses.filter(course => course.completed).length;

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat"><span>전체 과목</span><strong>{courses.length}</strong></div>
        <div className="stat"><span>완료</span><strong className="green">{doneCount}</strong></div>
        <div className="stat"><span>진행 중</span><strong className="blue">{courses.length - doneCount}</strong></div>
      </section>  
- 현재 상태인 courses 배열에서 filter 메서드 이용해 completed 속성이 true인 과목만 걸러 그 length를 doneCount에 담음. 변수는 화면 상단 '완료' 뱃지 숫자로 렌더링, 과목 데이터 업데이트되면 실시간으로 다시 계산되어 통계 유지.  

**코드**
function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }  
- 브라우저 팝업을 띄워 실수 방지. '취소'를 누르면 함수 종료, '확인'을 누르면 이전 상태에서 넘어온 id와 다른 항목만 남기는 filter 수행. 새 배열을 setCourses에 넣어 화면 업데이트.


# 4 Customizing
- 초기 과목 데이터 배열 변경  
- 제목 및 설명 변경  
- CSS 스타일 변경: 메인 버튼 색상 / 과목 리스트 / 완료 과목 스타일

# 5 Feature Extension
**1. Create**
- handleAdd 함수 내 `event.preventDefault()`로 새로고침을 방지, `newName.trim()`을 통해 빈 문자열 등록 예외 처리. nextId로 고유 ID를 부여한 객체를 생성, 전개 연산자(`...previous`)를 활용하여 기존 상태 배열 불변성 유지하며 새 과목을 추가.

**2. Update**
- handleToggle 함수 내 map() 메서드 활용. 전달받은 `id`와 일치하는 객체만 찾아 전개 연산자(`...course`)로 기존 속성을 복사, `completed: !course.completed`로 상태 반전시켜 React의 불변성 법칙 준수하며 UI 렌더링을 갱신.

**3. Filter**
- filter라는 새로운 `useState`를 선언('all', 'active', 'completed'), UI에 `<select>` 드롭다운을 추가하여 상태를 연동. 렌더링 직전에 원본 `courses` 배열을 `filter()` 메서드로 가공한 `filteredCourses` 배열을 생성, 이를 화면(map)에 출력하여 뷰만 다르게 보여주는 필터링 기능 구현.

# 6 Deployment
[Vercel URL](https://2026-oss-assign11-green.vercel.app/)

# 7 Weekly Review
## 새롭게 배운 내용
- 불변성 유지하는 Update 로직: map()이나 filter() 이용하여 기존 데이터 훼손하지 않는 것  
- 필터 처리: 선택 과제 필터 기능을 구현하며, courses 자체를 수정하지 않고 filter 조건을 걸어 새 배열을 화면에 출력하는 방식을 통해 원본 데이터를 훼손하지 않는 프론트엔드의 기초를 익힘  
- 고유 ID 관리: ID를 부여하고, 삭제 시 이를 다루는 것에 조금 혼란이 있었는데, React에서 컴포넌트를 원활히 식별할 수 있도록 Math.max()를 활용하여 ID가 겹치지 않게 하는 로직을 배움

## 어려웠던 점과 해결 방법
- CSS 수정이 적용 안 되어 당황했는데, 데스크탑과 모바일 전용 CSS가 분리되어 있었음. 정확한 클래스 위치를 다시 찾아서 코드를 수정함으로써 새로운 스타일 UI를 화면에 띄울 수 있었다.  
- ID를 부여하거나 삭제할 때, ID의 중복 여부로 인한 꼬임의 문제가 있었음. 데이터별로 절대 ID가 겹치지 않도록, Math.max()를 활용하여 가장 큰 ID값에 +1을 더하여 새 ID를 부여하도록 로직을 수정.

## AI 활용
- Text와 CSS 변경 어떻게 할지 아이디어 도움받음  
- CSS 수정 시에 적용이 안 돼서, 다시 파일 내용을 주며 확인시켰는데 데스크탑/모바일 전용 CSS 분리되어 있음을 확인해줌

## 느낀 점
기능은 완벽하게 짰는데 모바일 미디어 쿼리 쪽 CSS가 꼬여서 화면이 깨지거나, 새로운 과목을 추가할 때 고유 ID 부여 방식이 꼬여서 삭제 기능에 버그가 날 뻔한 순간들이 있었다. 하지만 개발자 도구로 요소 위치를 추적, Math.max()를 활용해 안전한 ID 로직을 고민해 보면서 단순히 돌아가는 코드가 아니라 예외 상황까지 고려하는 탄탄한 로직의 중요성을 배웠다.