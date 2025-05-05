from manim import *

class GeneratedScene(Scene):
    def construct(self):
        circle = Create(Circle(radius=2, color=YELLOW))
        self.play(Create(circle))
        self.wait(1)