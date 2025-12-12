import React, { useEffect, useState } from 'react';
import { getCourses } from './authService';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getCourses()
      .then((data) => {
        setCourses(data);
      })
      .catch(() => {
        setError('Erreur lors du chargement des cours.');
      });
  }, []);

  return (
    <section className="page-card">
      <h2 className="page-title">Cours disponibles</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="course-list">
        {courses.map((course, index) => (
          <li key={index} className="course-item">
            <span className="course-name">{course}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CoursesPage;
