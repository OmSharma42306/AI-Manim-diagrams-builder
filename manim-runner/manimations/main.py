from manim import *

class GeneratedScene(Scene):
    def construct(self):
        triangle = Polygon(
            start=DOWN,
            end=UP,
            color=YELLOW,
            stroke_width=2,
            fill_opacity=1
        )

        label_a = Tex("A").next_to(triangle.points[0], DOWN)
        label_b = Tex("B").next_to(triangle.points[1], UP)
        label_c = Tex("C").next_to(triangle.points[2], LEFT)

        self.play(
            Create(triangle),
            Write(label_a),
            Write(label_b),
            Write(label_c)
        )

        self.wait(1)