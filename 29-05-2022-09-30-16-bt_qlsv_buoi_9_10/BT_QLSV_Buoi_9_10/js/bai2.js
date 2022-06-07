// Tạo mảng danh sách student
var students = [];
init();

// Hàm này sẽ tự động được gọi đầu tiên khi chương trình được chạy
// Hàm này dùng để lấy data từ local storage và gán lại cho mảng students sau đó hiển thị ra giao diện
function init() {
  // B1: Lấy data từ localStorage
  // Khi lấy data từ localStorage lên, nếu data là array/object (đã bị stringify) thì cần dùng hàm JSON.parse để chuyển data về lại array/object
  students = JSON.parse(localStorage.getItem("students")) || [];

  // Bởi vì JSON.stringify tự động loại bỏ các phương thức bên trong object => các object student bên trong mảng bị mất hàm calcScore

  for (var i = 0; i < students.length; i++) {
    var student = students[i];
    students[i] = new Student(
      student.id,
      student.name,
      student.email,
      student.password,
      student.dateOfBirth,
      student.course,
      student.math,
      student.physics,
      student.chemistry
    );
  }

  // students = [{id: 1, name: "Dan"}, {id: 2, name: "Hieu"}, {id: 3, name: "Thái"}]
  // Lần 1: i = 0 => students[0] => student = {id: 1, name: "Dan"}
  // students[0] = new Student(...)
  // [{Student}, {}, {}]

  // Lần 2: i = 1 => students[1] => student = {id: 2, name: "Hieu"}
  // students[1] = new Student(...)
  // [{Student}, {Student}, {}]

  // Lần 3: i = 2 => students[2] => student = {id: 3, name: "Thái"}
  // students[2] = new Student(...)

  // Kết quả: [{Student}, {Student}, {Student}]

  // B2: Gọi hàm display để hiển thị ra giao diện
  display(students);
}

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

  // Kiểm tra hợp lệ (validation)
  // Kĩ thuật đặt cờ hiệu
  // var isValid = true;
  // isValid = isValid && isRequired(id);
  // isValid &= isRequired(name);
  // isValid &= isRequired(email);
  // isValid &= isRequired(password);
  // isValid &= isRequired(dateOfBirth);
  // isValid &= isRequired(course);
  // isValid &= isRequired(math);
  // isValid &= isRequired(physics);
  // isValid &= isRequired(chemistry);

  var isValid = validation();

  if (!isValid) {
    alert("Vui lòng nhập vào các giá trị");
    return;
  }

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

  // B4: Lưu biến students xuống local storage
  // Local Storage cho phép lưu trữ data trong trình duyệt, data này sẽ không bị mất đi khi ta refresh hoặc tắt trình duyệt
  // localStorage.setItem(key, value) là hàm dùng để lưu data xuống Local Storage
  // JSON.stringify(value) là hàm dùng để chuyển 1 array/object thành 1 chuỗi dạng JSON
  localStorage.setItem("students", JSON.stringify(students));

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
          <button
            class="btn btn-success"
            onclick="selectStudent('${student.id}')"
          >
            Cập nhật
          </button>
          </td>
          <td>
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
  var index = findStudent(studentId);

  if (index !== -1) {
    // Xoá 1 phần tử ở 1 vị trí bất kì trong mảng
    students.splice(index, 1);
    // Lưu thông tin mảng students xuống localstorage
    localStorage.setItem("students", JSON.stringify(students));
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
  document.getElementById("txtMaSV").disabled = false;
  document.getElementById("btnAddStudent").disabled = false;
}

// function này được gọi khi click vào nút Cập Nhật của 1 sinh viên trên table
function selectStudent(studentId) {
  // Dùng studentId để tìm student muốn cập nhât
  var index = findStudent(studentId);
  // Lấy ra student muốn cập nhật từ mảng students
  var student = students[index];
  // Đưa thông tin của student này lên giao diện
  document.getElementById("txtMaSV").value = student.id;
  document.getElementById("txtTenSV").value = student.name;
  document.getElementById("txtEmail").value = student.email;
  document.getElementById("txtPass").value = student.password;
  document.getElementById("txtNgaySinh").value = student.dateOfBirth;
  document.getElementById("khSV").value = student.course;
  document.getElementById("txtDiemToan").value = student.math;
  document.getElementById("txtDiemLy").value = student.physics;
  document.getElementById("txtDiemHoa").value = student.chemistry;

  // disabled input Mã Sinh Viên và button Thêm Sinh Viên
  document.getElementById("txtMaSV").disabled = true;
  document.getElementById("btnAddStudent").disabled = true;
}

// function này nhận vào studentId và trả ra vị trí (index) của student bên trong mảng
function findStudent(studentId) {
  var index = -1;
  for (var i = 0; i < students.length; i++) {
    // Kiếm phần tử student trong mảng nào có id khớp với studentId
    if (students[i].id === studentId) {
      index = i;
      break;
    }
  }
  return index;
}

// Hàm nãy sẽ được gọi khi click vào nút Cập Nhật ở bên dưới form
function updateStudent() {
  // B1: DOM lấy value từ các input
  var id = document.getElementById("txtMaSV").value;
  var name = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var password = document.getElementById("txtPass").value;
  var dateOfBirth = document.getElementById("txtNgaySinh").value;
  var course = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physics = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  // B2: Khởi tạo đối tượng student từ các giá trị input
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
  // Viết B1 + B2 ra 1 hàm getStudent và return về student
  // => var student = getStudent()

  // B3: Cập nhật
  // Tìm index của sinh viên muốn cập nhật
  var index = findStudent(student.id);
  // Cập nhật
  students[index] = student;
  // Lưu thông tin mảng students xuống localstorage
  localStorage.setItem("students", JSON.stringify(students));

  // B4: Gọi hàm display để hiển thị kết quả mới nhất lên giao diện
  display(students);
  resetForm();
}

// Các hàm kiểm tra xem input có hợp lệ hay không
function validation() {
  var id = document.getElementById("txtMaSV").value;
  var name = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var password = document.getElementById("txtPass").value;
  var dateOfBirth = document.getElementById("txtNgaySinh").value;
  var course = document.getElementById("khSV").value;
  var math = +document.getElementById("txtDiemToan").value;
  var physics = +document.getElementById("txtDiemLy").value;
  var chemistry = +document.getElementById("txtDiemHoa").value;

  var isValid = true;

  // MaSV không hợp lệ
  if (!isRequired(id)) {
    isValid = false;
    document.getElementById("spanMaSV").innerHTML = "Mã SV không được để trống";
  } else if (!minLength(id, 3)) {
    isValid = false;
    document.getElementById("spanMaSV").innerHTML =
      "Mã SV phải có ít nhất 3 kí tự";
  }

  // Kiểm tra tên sinh viên
  // Dùng regex để tạo ra 1 chuỗi validate tên sinh viên (chỉ bao gồm các kí tự hoa và thường)
  // Cách kiểm tra: regex.test(value), nếu khớp trả ra true, ngược lại trả ra false
  var letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("spanTenSV").innerHTML =
      "Tên SV không được để trống";
  } else if (!minLength(name, 8)) {
    isValid = false;
    document.getElementById("spanTenSV").innerHTML =
      "Tên SV phải có ít nhất 8 kí tự";
  } else if (!letters.test(name)) {
    isValid = false;
    document.getElementById("spanTenSV").innerHTML =
      "Tên SV có kí tự không hợp lệ";
  }

  // Dùng regex để kiểm tra email có đúng định dạng hay không
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("spanEmailSV").innerHTML =
      "Email SV không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("spanEmailSV").innerHTML =
      "Email SV không đúng định dạng";
  }

  // Dùng regex để kiểm tra mật khẩu có đúng định dạng hay không
  var pwPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("spanMatKhau").innerHTML =
      "Mật khẩu  không được để trống";
  } else if (!pwPattern.test(password)) {
    isValid = false;
    document.getElementById("spanMatKhau").innerHTML =
      "Mật khẩu  không đúng định dạng";
  } else {
    // Đúng
    document.getElementById("spanMatKhau").innerHTML = "";
  }

  return isValid;
}

// Hàm kiểm tra input có rỗng hay không
function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}

// Hàm kiểm tra input có đủ độ dài hay không
function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }

  return true;
}
