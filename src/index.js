import "./styles.css"

import * as d3 from "d3"

const update = (dataset, fancyEntry = false) => {
  console.log('update:', dataset.map(({x, y}) => `(${x}, ${y})`).join(' '))

  // DATA JOIN
  const svg = d3.select("#vis-svg")
    .selectAll("circle")
    .data(dataset, ({id}) => id)

  // ENTER - New circles for new data points
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


// Play with my update function
{
  const dataset = [
    { id: 0, x: 100, y: 300 },
    { id: 1, x: 300, y: 100 },
    { id: 2, x: 200, y: 200 },
    { id: 3, x: 150, y: 320 },
    { id: 4, x: 60, y: 120 }
  ]

  update(dataset)

  setTimeout(() => {
    // Delete a circle
    dataset.splice(Math.floor(Math.random() * dataset.length), 1)
    update(dataset, true)

    // Randomly nudge remaining circles
    let rand = () => Math.floor(50 - 100 * Math.random())
    dataset.forEach(p => { p.x += rand(); p.y += rand() })

    // Create a new circle
    dataset.push({ id: 5, x: 400, y: 400 })
    update(dataset, true)
  }, 1000)
}



