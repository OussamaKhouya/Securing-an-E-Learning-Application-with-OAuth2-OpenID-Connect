import React, { useEffect, useState } from 'react';
import { addCourse, getCourses } from './authService';

function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getCourses()
      .then((data) => setCourses(data))
      .catch(() => setError('Erreur lors du chargement des cours.'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const result = await addCourse(JSON.stringify(newCourse));
      setMessage(result);
      setNewCourse('');
      const updated = await getCourses();
      setCourses(updated);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('Accès refusé (403) : rôle ADMIN requis.');
      } else {
        setError("Erreur lors de l'ajout du cours.");
      }
    }
  };

  return (
    <section className="page-card">
      <h2 className="page-title">Gestion des cours (ADMIN)</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <form className="course-form" onSubmit={handleSubmit}>
        <input
          className="course-input"
          type="text"
          placeholder="Nom du nouveau cours"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          required
        />
        <button className="btn-primary" type="submit">
          Ajouter
        </button>
      </form>

      <h3 className="section-title">Cours existants</h3>
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

export default AdminCoursesPage;
