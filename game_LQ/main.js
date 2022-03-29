//
var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var scoreshow = document.getElementById('score');

var birdimg = new Image();
var hinhnenchinh = new Image();
var ongtren = new Image();
var ongduoi = new Image();
// nạp các hình 
birdimg.src = "images/piz.png";
hinhnenchinh.src = "images/fennik.jpg";
ongtren.src = "images/trux.png";
ongduoi.src = "images/trud.png";

//khoảng cách 2 ống
var score = 0;
var khoangcachhaiong = 240;
var khoangcachdenongduoi;
// tao ra vật
var bird = {
    x: hinhnenchinh.width / 5,
    y: hinhnenchinh.height / 2
}
var ong = []; //tạo mảng ống để chứa các ống di chuyển
ong[0] = {
    x: canvas.width,
    y: 0 // khởi tạo ống đầu tiên nằm bên phải ngoài cùng và y=0;
}

//tạo function để chạy trò chơi
function run() {
    // load hình ảnh vào
    context.drawImage(hinhnenchinh, 0, 0);
    context.drawImage(birdimg, bird.x, bird.y);

    for (var i = 0; i < ong.length; i++) {
        khoangcachdenongduoi = ongtren.height + khoangcachhaiong;
        context.drawImage(ongtren, ong[i].x, ong[i].y);
        // vẽ ống trên theo tọa độ của ống đó
        //  ống dưới phụ thuộc ống trên
        context.drawImage(ongduoi, ong[i].x, ong[i].y + khoangcachdenongduoi);

        // ống dưới vì tí nữa mình random nó lên xuống
        ong[i].x -= 10; //để ống di chuyển

        // lập trình thêm ống khi ống di chuyển đến giữa
        // sẽ tạo thêm 1 ống nữa
        if (ong[i].x == canvas.width / 2) {
            ong.push({
                x: canvas.width,
                y: Math.floor(Math.random() * ongtren.height) - ongtren.height


            })
        }
        if (ong[i].x == 0) ong.splice(0, 1);
        // nếu ống đụng lề trái thì xóa nó đi để tránh mảng ống

        if (ong[i].x == bird.x) score++;
        // điều kiện khi thua
        if (bird.y + birdimg.height == canvas.height ||
            bird.x + birdimg.width >= ong[i].x && bird.x <= ong[i].x + ongtren.width
            && (bird.y <= ong[i].y + ongtren.height ||
                bird.y + birdimg.height >= ong[i].y + khoangcachdenongduoi)
        ) {
            return;
        }
    }
    scoreshow.innerHTML = "score: " + score;
    // cho cho vật rơi xuống
    bird.y += 3.25;
    requestAnimationFrame(run);
}
//thêm function để nó bay lên khi nhấn
document.addEventListener("keydown", function () {
    bird.y -= 65;
})

run();




