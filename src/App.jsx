import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div><p className="topline">Handong Global University 2026-2</p><h1>HS's Course Manager</h1><p className="subtitle">AI컴퓨터전자공학부 수강 관리</p></div>
        <span className="tag">Junior Year</span>
      </header>
      <CourseList />
      <footer className="bottom"><span>OSS Week 11 · React</span><span>Local state only · Refresh resets data</span></footer>
    </main>
  );
}
