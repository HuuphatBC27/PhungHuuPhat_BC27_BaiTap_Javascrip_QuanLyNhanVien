// Định nghĩa lớp đối tượng Student
function Student(
  id,
  name,
  email,
  password,
  dateOfBirth,
  course,
  math,
  physics,
  chemistry
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.dateOfBirth = dateOfBirth;
  this.course = course;
  this.math = math;
  this.physics = physics;
  this.chemistry = chemistry;
}

Student.prototype.calcScore = function () {
  return (this.math + this.chemistry + this.physics) / 3;
};
