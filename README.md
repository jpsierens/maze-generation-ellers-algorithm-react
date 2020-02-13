# maze-generation-ellers-algorithm-react
A visual maze generation in React. Following Eller's algorithm for generating mazes.

One of the cool things about this algorithm is that it can continue building rows for the maze infinitely without running out of memory. This is because it only needs to know about 2 rows at any given time. 

Reading about it made me create this showcase. I am making it so that everytime you reload the maze, it will generate a completely different one, yet it will always be a perfect maze. A perfect maze is a maze that has no unreachable areas inside it. It has no loops or isolated walls and there is always a unique path between any two points in the maze.

If you're wondering why there's no entrance or exit, it's because you can choose any two points in the maze's outer walls to open up and there will always be a path between the two.

WIP

TODO:
- fix some reocurring isolated walls and closed up cells
- reset the maze
- give user the ability to choose row size and maze height