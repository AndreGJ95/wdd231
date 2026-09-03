// Array de objetos de cursos
const courses = [
  { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
  { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
  { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
  { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
  { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
  { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 2, completed: false }
];

document.addEventListener("DOMContentLoaded", () => {
  const courseContainer = document.querySelector('#course-container');
  const totalCreditsEl = document.querySelector('#total-credits');


  function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';

    filteredCourses.forEach(course => {
      const card = document.createElement('div');
      card.classList.add('course-card');
      if (course.completed) {
        card.classList.add('completed');
      }
      card.innerHTML = `<h3>${course.subject} ${course.number}</h3><p>${course.title}</p>`;
      courseContainer.appendChild(card);
    });

   
    const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;
  }

 
  document.querySelector('#all-btn').addEventListener('click', () => displayCourses(courses));
  document.querySelector('#cse-btn').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
  });
  document.querySelector('#wdd-btn').addEventListener('click', () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
  });

  
  document.querySelector('#currentyear').textContent = new Date().getFullYear();
  document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

  
  displayCourses(courses);
});