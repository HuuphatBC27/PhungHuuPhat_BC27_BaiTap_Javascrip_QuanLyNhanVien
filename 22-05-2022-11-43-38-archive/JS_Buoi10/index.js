var studentA = {
  // thuộc tính
  name: "Nguyễn Văn A",
  email: "a@gmail.com",
  math: 8,
  literature: 6,
  // phương thức
  calcScore: function () {
    return (this.math + this.literature) / 2;
  },
};

var studentB = {
  // thuộc tính
  name: "Trần Văn B",
  email: "b@gmail.com",
  math: 9,
  literature: 8,
  // phương thức
  calcScore: function () {
    return (this.math + this.literature) / 2;
  },
};

// Lớp đối tượng (function constructor)
// Lưu ý: lớp đối tượng phải viết hoa chữ cái đầu
function Student(name, email, math, literature) {
  // Ngầm định JS sẽ tự động tạo ra 1 object: this = {}

  // Khai báo các thuộc tính (properties) cho đối tượng
  this.name = name;
  this.email = email;
  this.math = math;
  this.literature = literature;

  // this.calcScore = function () {
  //   return (this.math + this.literature) / 2;
  // };

  // Ngầm định JS sẽ tự động return về this
}

// Khai báo các phương thức (methods) cho đối tượng
Student.prototype.calcScore = function () {
  return (this.math + this.literature) / 2;
};

// Tạo đối tượng từ lớp đối tượng
var studentC = new Student("Lê Văn C", "c@gmail.com", 7, 9);
console.log("Student C:", studentC);
console.log("Student C calcScore:", studentC.calcScore());
var studentD = new Student("Nguyễn Văn D", "d@gmail.com", 7, 6);
console.log("Student D:", studentD);
console.log("Student D calcScore:", studentD.calcScore());
