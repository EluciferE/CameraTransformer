const PROTOCOL = {
    ready: "r",
    update_cam : "c",
    button_pressed : "b",
    negative_button: "negative",
    mirror_x: "mirror_x",
    mirror_y: "mirror_y",
    blur: "blur",
};


let socket;
setup();

function setup() {
    socket = new WebSocket('ws://localhost:8765');
    socket.addEventListener('message', function (event) {
        const image = document.getElementById("camera");
        const blob = new Blob([event.data], {type: "image/jpeg"});
        image.src = URL.createObjectURL(blob);
        socket.send(PROTOCOL.update_cam);
    });

    socket.onopen = function () {
        socket.send(PROTOCOL.ready);
        console.log("Open connection");
        socket.send(PROTOCOL.update_cam);
    }
}


function negative_button(){
    if (document.getElementById("negative").style.backgroundColor === "rgb(128, 128, 128)")
        document.getElementById("negative").style.backgroundColor = "rgb(17, 16, 0)";
    else
        document.getElementById("negative").style.backgroundColor = "rgb(128, 128, 128)";
    socket.send(PROTOCOL.negative_button);
}

function mirror_x_button(){
    if (document.getElementById("mirror_x").style.backgroundColor === "rgb(128, 128, 128)")
        document.getElementById("mirror_x").style.backgroundColor = "rgb(17, 16, 0)";
    else
        document.getElementById("mirror_x").style.backgroundColor = "rgb(128, 128, 128)";
    socket.send(PROTOCOL.mirror_x);
}

function mirror_y_button(){
    if (document.getElementById("mirror_y").style.backgroundColor === "rgb(128, 128, 128)")
        document.getElementById("mirror_y").style.backgroundColor = "rgb(17, 16, 0)";
    else
        document.getElementById("mirror_y").style.backgroundColor = "rgb(128, 128, 128)";
    socket.send(PROTOCOL.mirror_y);
}
function blur_button(){
    if (document.getElementById("blur").style.backgroundColor === "rgb(128, 128, 128)")
        document.getElementById("blur").style.backgroundColor = "rgb(17, 16, 0)";
    else
        document.getElementById("blur").style.backgroundColor = "rgb(128, 128, 128)";
    socket.send(PROTOCOL.blur);
}
