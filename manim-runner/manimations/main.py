from manim import *

class GeneratedScene(Scene):
    def construct(self):
        sender_text = Text("Sender").scale(2)
        server_text = Text("Email Server (SMTP)").scale(2)
        receiver_text = Text("Receiver").scale(2)

        sender_square = Square(side_length=4).shift(LEFT * 4)
        server_square = Square(side_length=4).shift(UP * 3)
        receiver_square = Square(side_length=4).shift(RIGHT * 4)

        sender_arrow = Arrow(sender_square.get_right(), server_square.get_left(), color=YELLOW)
        server_arrow = Arrow(server_square.get_right(), receiver_square.get_left(), color=TEAL)

        self.play(Write(sender_text), Write(sender_square))
        self.play(Write(server_text), Write(server_square))
        self.play(Write(receiver_text), Write(receiver_square))

        sender_arrow.put_start_and_end_on(sender_square.get_right(), server_square.get_left())
        server_arrow.put_start_and_end_on(server_square.get_right(), receiver_square.get_left())

        self.play(Create(sender_arrow), Create(server_arrow))
        self.wait(1)
