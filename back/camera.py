import cv2


class Camera:
    NEGATIVE = 1
    MIRROR_X = 2
    MIRROR_Y = 3
    BLUR = 4

    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.masks = []

    def get_frame(self):
        ret_val, frame = self.video.read()

        if self.NEGATIVE in self.masks:
            frame = 255 - frame
        if self.MIRROR_X in self.masks:
            frame = cv2.flip(frame, 1)
        if self.MIRROR_Y in self.masks:
            frame = cv2.flip(frame, 0)
        if self.BLUR in self.masks:
            frame = cv2.GaussianBlur(frame, (51, 51), 0)

        image = cv2.imencode(".jpg", frame)[1].tobytes()
        return image

    def add_mask(self, mask):
        if mask in self.masks:
            self.masks.remove(mask)
        else:
            self.masks.append(mask)
