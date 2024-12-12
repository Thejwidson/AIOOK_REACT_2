

import { useState } from 'react';
import Student from './Student';
import { StudentClass, StudentType } from './types/Student';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';


export default function Students() {
  const listTitle = 'Students list';
  const [studentList,updateList]=useState([
    new StudentClass('Ala', 'Makota', 123485, new Date('2000-01-21')),
    new StudentClass('Jan', 'Kowlaski', 2345, new Date('1999-10-23')),
    new StudentClass('Adrian', 'Duda', 156789, new Date('2001-04-01'))
  ]);
  const [showAddForm,changeValue]=useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentClass | null>(null);

  const addNewStudent=(student:StudentClass)=>{
    changeValue(false)
    console.log("add fn invoked")
    //studentList.push(student);
    let students=[...studentList];
    students.push(student)
    updateList(students)
  }

  const saveEditedStudent = (updatedStudent: StudentClass) => {
    const students = studentList.map((student) =>
      student.Index_nr === updatedStudent.Index_nr ? updatedStudent : student
    );
    updateList(students);
    setEditingStudent(null);
  };
  return (
    <>
      {listTitle}
      {studentList.length > 0 && (
        <ul>
          {studentList.map((el) => (
            <li key={el.Index_nr}>
              {editingStudent?.Index_nr === el.Index_nr ? (
                <EditStudent
                  student={el}
                  onSave={saveEditedStudent}
                  onCancel={() => setEditingStudent(null)}
                />
              ) : (
                <>
                  <Student student={el} />
                  <button onClick={() => setEditingStudent(el)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      {studentList.length === 0 && <p>No students stored</p>}
      {!showAddForm && <button onClick={() => changeValue(true)}>Add student</button>}
      {showAddForm && <AddStudent addFn={addNewStudent} />}
    </>
  );
}
