# Maze Generation with Eller's algorithm in Reactjs
> An interactive visual maze generation in React. Following Eller's algorithm for generating mazes.

![](http://jpsierens.me/wp-content/uploads/2020/03/ellers-algorithm.gif)

play around with a live example at: http://jpsierens.me/maze-generation/

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

## Background
One of the cool things about this algorithm is that it can continue building rows for the maze infinitely without running out of memory. This is because it only needs to know about 2 rows at any given time. 

Reading about it made me create this showcase. I am making it so that everytime you reload the maze, it will generate a completely different one, yet it will always be a perfect maze. A perfect maze is a maze that has no unreachable areas inside it. It has no loops or isolated walls and there is always a unique path between any two points in the maze.

I also took the time to make it visually show the steps the algorithm takes. You can see it generating cell by cell, giving each cell a set value, then deciding which ones to merge horizontally, and later vertically. I also gave you the ability to choose how slow the maze is generated, to see better how it works. Other settings are also the width and height, so you can make the maze reaaaally large if you want. Finally, I give you the choice to decide the merge chance, a value between 0 and 1. It's the chance to join cells horizontally. A high chance (like 0.9) tends to create horizontal mazes while a low chance creates more vertical ones.

If you're wondering why there's no entrance or exit, it's because you can choose any two points in the maze's outer walls to open up and there will always be a path between the two.

There's one thing I didn't implement according to the instructions given at any of the sources, they say to give atleast one vertical connection to each set, but personally I wasn't able to get perfect mazes when there was more than one vertical connection per set.

### Sources:
https://weblog.jamisbuck.org/2010/12/29/maze-generation-eller-s-algorithm

http://www.neocomputer.org/projects/eller.html

TODO:
- bigger maze sizes mess with the perfectness of the maze (maybe because you start reassigning sets?)
