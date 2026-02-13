
let ClassRoster = ["Alice", "Tom", "Charlie", "Diana", "Evan"];
console.log(ClassRoster.toString());
ClassRoster.push("Fiona", "Nancy");
ClassRoster.shift();
console.log(ClassRoster);
let length = ClassRoster.length;
console.log(length);

const classInfo = {
    className: "ENSF381: Full-Stack Web Development",
    instructor: "Dr. Smith",
    students: ClassRoster,
    details: {
        semester: "Winter",
        year: 2025
    }
};

classInfo.schedule = ["Monday", "Wednesday", "Friday"];
classInfo.instructor = "Dr. Abdellatif";

console.log(classInfo.className);
console.log(classInfo.instructor);
console.log(classInfo.students);
console.log(classInfo.details.semester);
console.log(classInfo);

const { className, students } = classInfo;
console.log(className);
console.log(students);

const { details: { semester, year } } = classInfo;
console.log(semester);
console.log(year);

const [student1, student2, ...remainingStudents] = ClassRoster;
console.log(student1);
console.log(student2);
console.log(remainingStudents);
