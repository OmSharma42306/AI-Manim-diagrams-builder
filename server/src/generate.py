# #from manimlib.mobject.geometry import Circle
from manim import *
class GeneratedScene(Scene):
    def construct(self):
        circle = Circle(radius=2, color=YELLOW)
        self.play(Create(circle))
        self.wait(1)