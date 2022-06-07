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

// Tạo mảng danh sách student
var students = [];

function addStudent() {
  // B1: DOM lấy value
  var id = document.getElementById("txtMaSV").value;
  var name = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var password = document.getElementById("txtPass").value;
  var dateOfBirth = document.getElementById("txtNgaySinh").value;
  var course = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physics = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  // B2: Khởi tạo đối tượng student từ lớp đối tượng Student
  var student = new Student(
    id,
    name,
    email,
    password,
    dateOfBirth,
    course,
    math,
    physics,
    chemistry
  );

  // B3: Hiển thị student vừa thêm lên trên giao diện (table)
  // Thêm student vừa tạo vào mảng students
  students.push(student);
  console.log(students);
  // Gọi hàm display và truyền vào mảng students để hiển thị lên trên table
  display(students);
  // Gọi hàm resetForm để set giá trị của các input về rỗng
  resetForm();
}

function display(students) {
  var tbodyEl = document.getElementById("tbodySinhVien");
  // Chứa nội dung html sẽ được thêm vào bên trong tbody
  var html = "";

  // Duyệt mảng students
  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    // Với mỗi student tạo ra 1 thẻ tr và từng thẻ td chứa thông tin của chính student đó
    console.log(student);
    html += `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.dateOfBirth}</td>
        <td>${student.course}</td>
        <td>${student.calcScore()}</td>
        <td>
          <button class="btn btn-success">Cập nhật</button>
          <button
            class="btn btn-danger"
            onclick="deleteStudent('${student.id}')"
          >
            Xoá
          </button>
        </td>
      </tr>
    `;
  }

  // Đưa nội dung html được tạo động từ các đối tượng student vào bên trong tbody
  tbodyEl.innerHTML = html;
}

function deleteStudent(studentId) {
  console.log("typeof của studentId", typeof studentId);
  // Dùng id của student tìm ra và xoá student đó đi

  // Tìm chỉ mục của phần tử muốn xoá trong mảng students
  var index = -1;
  for (var i = 0; i < students.length; i++) {
    // Kiếm phần tử student trong mảng nào có id khớp với studentId
    if (students[i].id === studentId) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    // Xoá 1 phần tử ở 1 vị trí bất kì trong mảng
    students.splice(index, 1);
    // Gọi lại hàm display để cập nhật giao diện mới
    display(students);
  }
}

function searchStudent() {
  // B1: DOM lấy value
  var searchValue = document.getElementById("txtSearch").value;
  searchValue = searchValue.toLowerCase();
  // B2: Lọc ra 1 mảng mới thoả mãn điều kiện giá trị searchValue phải bằng với tên SV
  // 'Nguyễn Đức Hiếu'.indexOf("Hiếu") => 11
  // 'Nguyễn Đức Hiếu'.indexOf("Khải") => -1

  var newStudents = [];
  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    var studentName = student.name.toLowerCase();
    if (studentName.indexOf(searchValue) !== -1) {
      newStudents.push(student);
    }
  }
  // B3: Hiển thị ra giao diện danh sách sinh viên đã lọc
  display(newStudents);
}

function resetForm() {
  document.getElementById("txtMaSV").value = "";
  document.getElementById("txtTenSV").value = "";
  document.getElementById("txtEmail").value = "";
  document.getElementById("txtPass").value = "";
  document.getElementById("txtNgaySinh").value = "";
  document.getElementById("khSV").value = "";
  document.getElementById("txtDiemToan").value = "";
  document.getElementById("txtDiemLy").value = "";
  document.getElementById("txtDiemHoa").value = "";
}







