from manim import *

class GeneratedScene(Scene):
    def construct(self):
        circle = Create( Circle(radius = 2) )
        self.play(Create(circle))
        self.wait(1)