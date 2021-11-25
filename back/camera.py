import cv2
from time import time

# for noises
import random


class Camera:
    NEGATIVE = 1
    MIRROR_X = 2
    MIRROR_Y = 3
    BLUR = 4
    GRAY = 5

    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.masks = []
        self.num_frame = 0
        self.total_time = 0
        self.input_time = 0
        self.transform_time = 0

    def get_frame(self):
        start_time = time()
        ret_val, frame = self.video.read()

        input_time = time()
        self.input_time += input_time - start_time

        if self.NEGATIVE in self.masks:
            frame = 255 - frame
        if self.MIRROR_X in self.masks:
            frame = cv2.flip(frame, 1)
        if self.MIRROR_Y in self.masks:
            frame = cv2.flip(frame, 0)
        if self.BLUR in self.masks:
            frame = cv2.GaussianBlur(frame, (51, 51), 0)
        if self.GRAY in self.masks:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        image = cv2.imencode(".jpg", frame)[1].tobytes()

        end_time = time()
        self.transform_time += end_time - input_time
        self.total_time += end_time - start_time

        self.num_frame += 1

        return image

    def add_mask(self, mask):
        if mask in self.masks:
            self.masks.remove(mask)
        else:
            self.masks.append(mask)

    def null_times(self):
        self.total_time = 0
        self.input_time = 0
        self.transform_time = 0
