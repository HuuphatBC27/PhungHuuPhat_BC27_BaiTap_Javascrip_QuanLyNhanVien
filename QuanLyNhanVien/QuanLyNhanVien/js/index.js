function Staff(
  account,
  fullName,
  email,
  password,
  date,
  price,
  type,
  workTime
) {
  this.account = account;
  this.fullName = fullName;
  this.email = email;
  this.password = password;
  this.date = date;
  this.price = price;
  this.type = type;
  this.workTime = workTime;
}
Staff.prototype.totalSalary = function (type) {
  switch (this.type) {
    case "sep":
      return this.price * 3;

    case "truongPhong":
      return this.price * 2;

    case "nhanVien":
      return this.price * 2;

    default:
      return "không phải nhân viên";
  }
};

Staff.prototype.getRankStaff = function () {
  if (this.workTime >= 192) {
    return "nhân viên xuất sắc";
  } else if (this.workTime >= 176) {
    return "nhân viên giỏi";
  } else if (this.workTime >= 160) {
    return "nhân viên khá";
  } else {
    return "nhân viên trung bình";
  }
};

var staffs = [];
init();
function init() {
  // B1: Lấy data từ localStorage
  // Khi lấy data từ localStorage lên, nếu data là array/object (đã bị stringify) thì cần dùng hàm JSON.parse để chuyển data về lại array/object
  staffs = JSON.parse(localStorage.getItem("staffs")) || [];

  // Bởi vì JSON.stringify tự động loại bỏ các phương thức bên trong object => các object staff bên trong mảng bị mất hàm calcScore

  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    staffs[i] = new Staff(
      staff.account,
      staff.fullName,
      staff.email,
      staff.password,
      staff.date,
      staff.price,
      staff.type,
      staff.workTime
    );
  }

  display(staffs);
}

function addStaff() {
  //  B1 : DOM lấy value
  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var price = +document.getElementById("luongCB").value;
  var type = document.getElementById("chucvu").value;
  var workTime = +document.getElementById("gioLam").value;

  var isValid = validation();

  if (!isValid) {
    alert("vui lòng nhập thông tin nhân viên");
    return;
  }

  //B2 : khởi tạo đối tượng staff
  var staff = new Staff(
    account,
    fullName,
    email,
    password,
    date,
    price,
    type,
    workTime
  );

  //B3 : hiển thị staff vừa thêm lên trên giao diện (table)
  //thêm staff vừa tạo vào mảng table
  staffs.push(staff);
  localStorage.setItem("staffs", JSON.stringify(staffs));
  display(staffs);
}
function display(staffs) {
  var tbodyEl = document.getElementById("tableDanhSach");

  //chứa nội dung html sẽ được thêm vào tbody
  var html = "";

  //duyệt mảng staff
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    // với mỗi staff tạo ra 1 thẻ tr và từng thẻ td chứa thông tin  của chính staff đó

    html += `
      <tr>
      <td>${staff.account}</td>
      <td>${staff.fullName}</td>
      <td>${staff.email}</td>
      <td>${staff.date}</td>
      <td>${staff.type}</td>
      <td>${staff.totalSalary()}</td>
      <td>${staff.getRankStaff()}</td>
      <td>  <button
      class="btn btn-danger"
      onclick="deleteStaff('${staff.account}')"
    >
      Xoá
    </button></td>
     <td> <button  data-target ="#myModal" data-toggle="modal" class = "btn btn-success" onclick = "selectStaff('${
       staff.account
     }')"> cập nhật</button>
     </td>

  </tr>`;
  }
  //   Đưa nội dung html được tạo động từ các đối tượng staff vào bên trong tbody
  tbodyEl.innerHTML = html;
}
function validation() {
  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var price = +document.getElementById("luongCB").value;
  var type = document.getElementById("chucvu").value;
  var workTime = +document.getElementById("gioLam").value;
  var isValid = true;
  var element = document.getElementsByClassName("sp-thongbao");
  for (var i = 0; i < element.length; i++) {
    element[i].style.display = "block   ";
  }
  // Taikhoan không hợp lệ
  if (!isRequired(account)) {
    isValid = false;

    document.getElementById("tbTKNV").innerHTML =
      "tài khoản không được để trống";
  } else if (!minLength(account, 4)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Mã SV phải có ít nhất 4 kí tự";
  } else {
    document.getElementById("tbTKNV").innerHTML = "";
  }

  // Kiểm tra tên
  var letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(fullName)) {
    isValid = false;

    document.getElementById("tbTen").innerHTML = "Tên không được để trống";
  } else if (!letters.test(fullName)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên có kí tự không hợp lệ";
  } else {
    document.getElementById("tbTen").innerHTML = "";
  }

  // Dùng regex để kiểm tra email có đúng định dạng hay không
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;

    document.getElementById("tbEmail").innerHTML = "Email  không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML =
      "Email  không đúng định dạng";
  } else {
    document.getElementById("tbEmail").innerHTML = "";
  }

  // Dùng regex để kiểm tra mật khẩu có đúng định dạng hay không
  var pwPattern = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu không được để trống";
  } else if (!pwPattern.test(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu  không đúng định dạng";
  } else {
    document.getElementById("tbMatKhau").innerHTML = "";
  }

  // ngày làm không được để trống
  if (!isRequired(date)) {
    isValid = false;

    document.getElementById("tbNgay").innerHTML =
      " Ngày làm không được để trống";
  } else {
    document.getElementById("tbNgay").innerHTML = "";
  }

  // Lương cơ bản
  if (price < 1000000 || price > 20000000) {
    document.getElementById("tbLuongCB").innerHTML =
      "lương cơ bản không phù hợp";
  } else if (!isRequired(price)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "lương cơ bản không được để trống";
  } else {
    document.getElementById("tbLuongCB").innerHTML = "";
  }

  //chức vụ

  // số giờ làm
  if (workTime < 80 || workTime > 200) {
    document.getElementById("tbGiolam").innerHTML = "số giờ làm không hợp lệ";
  } else if (!isRequired(workTime)) {
    isValid = false;

    document.getElementById("tbGiolam").innerHTML =
      "số giờ làm không được  để trống";
  } else {
    document.getElementById("tbGiolam").innerHTML = "";
  }

  return isValid;
}

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

function deleteStaff(staffAccount) {
  console.log("typeof của staffAccount", typeof staffAccount);
  // Dùng id của staff tìm ra và xoá staff đó đi

  // Tìm chỉ mục của phần tử muốn xoá trong mảng staffs
  var index = findStaff(staffAccount);

  if (index !== -1) {
    // Xoá 1 phần tử ở 1 vị trí bất kì trong mảng
    staffs.splice(index, 1);
    localStorage.setItem("staffs", JSON.stringify(staffs));

    // Gọi lại hàm display để cập nhật giao diện mới
    display(staffs);
  }
}

function findStaff(staffAccount) {
  var index = -1;
  for (var i = 0; i < staffs.length; i++) {
    // Kiếm phần tử staff trong mảng nào có id khớp với staffAccount
    if (staffs[i].account === staffAccount) {
      index = i;
      break;
    }
  }
  return index;
}
function selectStaff(staffAccount) {
  // Dùng staffAccount để tìm staff muốn cập nhât
  var index = findStaff(staffAccount);
  // Lấy ra staff muốn cập nhật từ mảng staffs
  var staff = staffs[index];
  // Đưa thông tin của staff này lên giao diện
  document.getElementById("tknv").value = staff.account;
  document.getElementById("name").value = staff.fullName;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.date;
  document.getElementById("luongCB").value = staff.price;
  document.getElementById("chucvu").value = staff.type;
  document.getElementById("gioLam").value = staff.workTime;

  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}
function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}
// tìm kiếm loại học sinh
function searchStaff() {
  // B1: DOM lấy value
  var searchValue = document.getElementById("searchName").value;

  var newStaffs = [];
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];

    if (staff.getRankStaff().indexOf(searchValue) !== -1) {
      newStaffs.push(staff);
    }
  }
  // B3: Hiển thị ra giao diện danh sách sinh viên đã lọc
  display(newStaffs);
  resetForm();
}
function updateStaff() {
  // B1: DOM lấy value từ các input
  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var price = +document.getElementById("luongCB").value;
  var type = document.getElementById("chucvu").value;
  var workTime = +document.getElementById("gioLam").value;

  // B2: Khởi tạo đối tượng staff từ các giá trị input
  var staff = new Staff(
    account,
    fullName,
    email,
    password,
    date,
    price,
    type,
    workTime
  );
  // Viết B1 + B2 ra 1 hàm getStaff và return về staff
  // => var staff = getS()

  // B3: Cập nhật
  // Tìm index của sinh viên muốn cập nhật
  var index = findStaff(staff.account);
  // Cập nhật
  staffs[index] = staff;
  localStorage.setItem("staffs", JSON.stringify(staffs));

  // B4: Gọi hàm display để hiển thị kết quả mới nhất lên giao diện
  display(staffs);
  resetForm();
}
