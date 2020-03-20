# Maze Generation with Eller's algorithm in Reactjs
> An interactive visual maze generation in React. Following Eller's algorithm for generating mazes.

:construction: WIP :construction:

## Install
clone this repo
```
git clone https://github.com/jpsierens/maze-generation-ellers-algorithm-react.git
```

You must have Nodejs and npm installed. If so, go into the project's root and do
```
npm install
```

## Use
In the root directory
```
npm start
```

## The bla bla
One of the cool things about this algorithm is that it can continue building rows for the maze infinitely without running out of memory. This is because it only needs to know about 2 rows at any given time. 

Reading about it made me create this showcase. I am making it so that everytime you reload the maze, it will generate a completely different one, yet it will always be a perfect maze. A perfect maze is a maze that has no unreachable areas inside it. It has no loops or isolated walls and there is always a unique path between any two points in the maze.

If you're wondering why there's no entrance or exit, it's because you can choose any two points in the maze's outer walls to open up and there will always be a path between the two.

There's one thing I didn't implement according to the instructions given at any of the sources, they say to give atleast one vertical connection to each set, but personally I wasn't able to get perfect mazes when there was more than one vertical connection per set.

### Sources:
https://weblog.jamisbuck.org/2010/12/29/maze-generation-eller-s-algorithm
http://www.neocomputer.org/projects/eller.html

TODO:
- github interaction
- deal with overflow for wider mazes