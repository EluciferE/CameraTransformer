import asyncio
import websockets
from back.camera import Camera
from back.protocol import PROTOCOL

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
            if ans == PROTOCOL.negative_button:
                camera.add_mask(camera.NEGATIVE)
            if ans == PROTOCOL.mirror_x:
                camera.add_mask(camera.MIRROR_X)
            if ans == PROTOCOL.mirror_y:
                camera.add_mask(camera.MIRROR_Y)
            if ans == PROTOCOL.blur:
                camera.add_mask(camera.BLUR)

            await websocket.send(camera.get_frame())

    # TODO close server
    except ValueError as e:
        print(e)

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
