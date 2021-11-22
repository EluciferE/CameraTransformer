import eel
from config import path_to_browser
from back.server import run_server
from threading import Thread

if __name__ == "__main__":
    server = Thread(target=run_server)
    server.start()

    eel.init('front')
    eel.browsers.set_path("chrome", path_to_browser)
    eel.start('index.html', size=(1200, 700))
