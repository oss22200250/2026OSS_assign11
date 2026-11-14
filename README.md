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


# 5 Feature Extension


# 6 Deployment


# 7 Weekly Review
