import { useState } from 'react';
import CourseItem from './CourseItem.jsx';
import { initialCourses } from '../data/courses.js';

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState('');
  const [filter, setFilter] = useState('all'); // 상태별 필터

  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }

  // 추가 기능
  function handleAdd(event) {
    event.preventDefault();
    // 빈 입력 검사
    if(newName.trim()===''){alert('과목명 정확히 입력하십시오.'); return;}
    
    // id 부여 :: 존재하는 id 중 가장 큰 값의 +1
    const nextId = courses.length >0
      ? Math.max(...courses.map(course=> course.id)) +1
      : 1;

    // 새과목 객체 생성
    const newCourse = {
      id: nextId,
      name: newName,
      category: "Elective",
      complete: false
    };

    // setCourses 호출
    setCourses(previous => [...previous, newCourse]);

    // 입력창 초기화
    setNewName('');
  }

  // 완료 상태 변경 기능
  function handleToggle(id) {
    // completed를 반전해서 리턴
    setCourses(previous=> previous.map(course=> course.id === id ? {...course, completed: !course.completed} : course));
  }

  const doneCount = courses.filter(course => course.completed).length;

  // 선택된 값을 따라서 화면에 보여줄 배열 걸러냄
  const filteredCourses = courses.filter(course => {
    if(filter === 'active') return !course.completed;
    if(filter === 'completed') return course.completed;
    return true; // all인 경우에는 다 보여줌
  })
  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat"><span>전체 과목</span><strong>{courses.length}</strong></div>
        <div className="stat"><span>완료</span><strong className="green">{doneCount}</strong></div>
        <div className="stat"><span>진행 중</span><strong className="blue">{courses.length - doneCount}</strong></div>
      </section>
      <section className="panel">
        <div className="panel-header"><h2>My Courses</h2><span className="small-note">{courses.length} courses</span></div>
        <p className="todo">실습 과제: 아래 Add 버튼과 완료 체크박스의 기능을 직접 구현하세요.</p>
        <div className="tools"><select className="select input"
        value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">전체 과목 조회</option>
          <option value="active">미완료</option>
          <option value="completed">완료</option>          
          </select></div>
        <form className="add-form" onSubmit={handleAdd}>
          <input className="input" value={newName} onChange={event => setNewName(event.target.value)} placeholder="새 과목명을 입력하세요" aria-label="새 과목명" />
          <button className="btn primary" type="submit">+ Add Course</button>
        </form>
        <div className="list-head"><span>COURSE</span><span>CATEGORY</span><span>ACTIONS</span></div>
        {courses.length === 0 && <div className="empty">등록된 과목이 없습니다.</div>}
        {filteredCourses.map(course => ( // 출력부분 변경(필터)
          <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} />
        ))}
      </section>
    </>
  );
}
