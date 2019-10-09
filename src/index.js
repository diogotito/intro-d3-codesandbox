import "./styles.css"

import * as d3 from "d3"

const data = [
  { id: 0, x: 100, y: 300 },
  { id: 1, x: 300, y: 100 },
  { id: 2, x: 200, y: 200 },
  { id: 3, x: 150, y: 320 },
  { id: 4, x: 60, y: 120 }
]


const update = (data, fancyEntry = false) => {
  console.log('update:', data.map(({x, y}) => `(${x}, ${y})`).join(' '))

  // DATA JOIN
  const svg = d3.select("#vis-svg")
    .selectAll("circle")
    .data(data, ({id}) => id)

  // ENTER - New circles for new data
  svg.enter().append("circle")
    .attr("stroke", "orange")
    .attr("stroke-width", 3)
    .attr("cx", ({x}) => x)
    .attr("cy", ({y}) => y)
    .attr("fill-opacity", 0.7)
  // ENTER TRANSITION - spawn animation
    .attr("r", 0)
    .transition()
      .attr("stroke", fancyEntry ? "yellow" : "orange")
      .attr("r", fancyEntry ? 50 : 20)
    .transition()
      .attr("stroke", "orange")
      .attr("r", 20)
  
  // Moving circles
  svg.transition().duration(200)
      .attr("stroke", "blue")
      .attr("stroke-width", 10)
    .transition().duration(600)
      .attr("cx", ({x}) => x)
      .attr("cy", ({y}) => y)
    .transition().duration(200)
      .attr("stroke", "orange")
      .attr("stroke-width", 3)

  // EXIT
  svg.exit()
    .transition()
      .attr("stroke", "red")
      .attr("stroke-width", 30)
    .transition()
      .attr("r", 0)
      .attr("stroke-width", 0)
    .remove()
}

update(data)

setTimeout(() => {
  data.splice(Math.floor(Math.random() * data.length), 1)
  update(data, true)
  let rand = () => Math.floor(50 - 100 * Math.random())
  data.forEach(p => { p.x += rand(); p.y += rand() })
  data.push({ id: 5, x: 400, y: 400 })
  update(data, true)
}, 1000)

