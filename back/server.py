import asyncio
import websockets
from back.camera import Camera
from back.protocol import PROTOCOL
from json import dumps
from base64 import b64encode

camera = Camera()


async def main(websocket, path):
    # START CONNECTION
    print("Connected")
    info = await websocket.recv()
    print(info)
    if info != PROTOCOL.ready:
        print("not ready")
        return
    else:
        print("Got Ready")

    try:
        while ...:
            ans = await websocket.recv()

            if ans == PROTOCOL.negative:
                camera.add_mask(camera.NEGATIVE)

            elif ans == PROTOCOL.mirror_x:
                camera.add_mask(camera.MIRROR_X)

            elif ans == PROTOCOL.mirror_y:
                camera.add_mask(camera.MIRROR_Y)

            elif ans == PROTOCOL.blur:
                camera.add_mask(camera.BLUR)

            elif ans == PROTOCOL.gray:
                camera.add_mask(camera.GRAY)

            elif ans == PROTOCOL.update_times:
                time1 = camera.total_time
                time2 = camera.input_time
                time3 = camera.transform_time
                camera.null_times()
                await websocket.send(dumps({"type": PROTOCOL.update_times,
                                            "data": {"total_time": time1,
                                                     "input_time": time2,
                                                     "transform_time": time3}}))

            if ans != PROTOCOL.update_times:
                await websocket.send(dumps({"type": PROTOCOL.update_cam,
                                            "data": b64encode(camera.get_frame()).decode()}))

    # TODO close server

    # keepalive ping failed
    except KeyError:
        pass

    except websockets.exceptions.ConnectionClosedError:
        print("Connection was closed")

    except websockets.exceptions.ConnectionClosedOK:
        print("Connection was closed")


def run_server():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    start_server = websockets.serve(main, "localhost", 8765)
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
