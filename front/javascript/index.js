const PROTOCOL = {
    ready: "r",
    update_cam: "c",
    negative: "negative",
    mirror_x: "mirror_x",
    mirror_y: "mirror_y",
    blur: "blur",
    gray: "gray",
    update_times: "t",
};


let socket;
let num_frames = 0;
let output_time = 0;
setup();

function setup() {
    socket = new WebSocket('ws://localhost:8765');
    socket.addEventListener('message', function (event) {
        let json = JSON.parse(event.data);

        const type = json["type"];
        let data = json["data"];

        switch (type) {
            case PROTOCOL.update_cam:
                const t1 = new Date().getTime();

                const image = document.getElementById("camera");

                // Convert base64 to bytes
                data = atob(data);
                const len = data.length;
                const bytes = new Uint8Array(len);

                for (let i = 0; i < len; i++)
                    bytes[i] = data.charCodeAt(i);

                const blob = new Blob([bytes], {type: "image/jpeg"});
                image.src = URL.createObjectURL(blob);

                const t2 = new Date().getTime();
                output_time += (t2 - t1)/1000;

                num_frames += 1
                if (num_frames % 50 === 0) {
                    socket.send(PROTOCOL.update_times);
                }

                socket.send(PROTOCOL.update_cam);
                break;

            case PROTOCOL.update_times:
                let total_time = data["total_time"] + output_time
                document.getElementById("fps").innerText = "FPS: " +
                    ((num_frames/total_time).toFixed(2)).toString();

                document.getElementById("input_time").innerText = "Input time: " +
                    + (Math.round(data["input_time"] * 100)/100).toString() + "s (" +
                    (Math.round(data["input_time"]/total_time * 100)).toString() + "%)";

                document.getElementById("transform_time").innerText = "Transform time: " +
                    + (Math.round(data["transform_time"] * 100)/100).toString() + "s (" +
                    (Math.round(data["transform_time"]/total_time * 100)).toString() + "%)";

                document.getElementById("output_time").innerText = "Output time: " +
                    + (Math.round(output_time * 100)/100).toString() + "s (" +
                    (Math.round(output_time/total_time * 100)).toString() + "%)";

                num_frames = 0;
                output_time = 0;

                break;
        }
    });

    socket.onopen = function () {
        socket.send(PROTOCOL.ready);
        console.log("Connected to server");
        socket.send(PROTOCOL.update_cam);
    }
}


function negative_button() {
    if (document.getElementById("negative").style.backgroundColor === "rgb(128, 128, 128)")
        document.getElementById("negative").style.backgroundColor = "rgb(17, 16, 0)";
    else
        document.getElementById("negative").style.backgroundColor = "rgb(128, 128, 128)";
    socket.send(PROTOCOL.negative);
}

function mirror_x_button() {
    if (document.getElementById("mirror_x").style.backgroundColor === "rgb(128, 128, 128)")
        document.getElementById("mirror_x").style.backgroundColor = "rgb(17, 16, 0)";
    else
        document.getElementById("mirror_x").style.backgroundColor = "rgb(128, 128, 128)";
    socket.send(PROTOCOL.mirror_x);
}

function mirror_y_button() {
    if (document.getElementById("mirror_y").style.backgroundColor === "rgb(128, 128, 128)")
        document.getElementById("mirror_y").style.backgroundColor = "rgb(17, 16, 0)";
    else
        document.getElementById("mirror_y").style.backgroundColor = "rgb(128, 128, 128)";
    socket.send(PROTOCOL.mirror_y);
}

function blur_button() {
    if (document.getElementById("blur").style.backgroundColor === "rgb(128, 128, 128)")
        document.getElementById("blur").style.backgroundColor = "rgb(17, 16, 0)";
    else
        document.getElementById("blur").style.backgroundColor = "rgb(128, 128, 128)";
    socket.send(PROTOCOL.blur);
}

function gray_button() {
    if (document.getElementById("gray").style.backgroundColor === "rgb(128, 128, 128)")
        document.getElementById("gray").style.backgroundColor = "rgb(17, 16, 0)";
    else
        document.getElementById("gray").style.backgroundColor = "rgb(128, 128, 128)";
    socket.send(PROTOCOL.gray);
}
