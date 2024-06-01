import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function BoxPlot({data, column, categerizedBy}){
    const svgRef =  useRef()
 
    useEffect(()=>{
      const width = 500;
      const height = 300;
      const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('margin', '10')
      .style('padding', '50')
      .style('border', '2px solid black')
      .style('background', '#000000')
      .style('overflow', 'visible')
    
    // setting up data
    var groupedData = d3.group(data, d => d[categerizedBy]);

    // Compute quartiles, median, interquantile range min and max for each group
    var sumstat = [];
    groupedData.forEach(function(values, key) {
      var q1 = d3.quantile(values.map(function(g) { return g[column]; }).sort(d3.ascending), 0.25);
      var median = d3.quantile(values.map(function(g) { return g[column]; }).sort(d3.ascending), 0.5);
      var q3 = d3.quantile(values.map(function(g) { return g[column]; }).sort(d3.ascending), 0.75);
      var interQuantileRange = q3 - q1;
      var min = q1 - 1.5 * interQuantileRange;
      var max = q3 + 1.5 * interQuantileRange;
      
      sumstat.push({Species: key, q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max});
    });

    // seting up scaling
    const xScale = d3.scaleBand()
        .domain(sumstat.map(d => d[categerizedBy]))
        .range([0, width])
        .paddingInner(1)
        .paddingOuter(1/2);

    const yScale = d3.scaleLinear()
        .domain([Math.min(...sumstat.map(obj => obj.min)) - 1 , Math.max(...sumstat.map(obj => obj.max)) + 1])
        .range([height, 0]);

    // setting up axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    // axes
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .attr('color', 'white')
        .call(xAxis);

    svg.append('g')
        .attr('color', 'white')
        .call(yAxis);

    // Show the main vertical line
    svg
    .selectAll("vertLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(xScale(d[categerizedBy]))})
      .attr("x2", function(d){return(xScale(d[categerizedBy]))})
      .attr("y1", function(d){return(yScale(d.min))})
      .attr("y2", function(d){return(yScale(d.max))})
      .attr("stroke", "#fff")
      .style("width", 40)

  // rectangle for the main box
  var boxWidth = 50
  svg
    .selectAll("boxes")
    .data(sumstat)
    .enter()
    .append("rect")
        .attr("x", function(d){return(xScale(d[categerizedBy])-boxWidth/2)})
        .attr("y", function(d){return(yScale(d.q3))})
        .attr("height", function(d){return(yScale(d.q1)-yScale(d.q3))})
        .attr("width", boxWidth)
        .attr("stroke", "#fff")
        .style("fill", "#69b3a2")
  
  // Show the median
  svg
    .selectAll("medianLines")
    .data(sumstat)
    .enter()
    .append("line")
      .attr("x1", function(d){return(xScale(d[categerizedBy])-boxWidth/2)})
      .attr("x2", function(d){return(xScale(d[categerizedBy])+boxWidth/2)})
      .attr("y1", function(d){return(yScale(d.median))})
      .attr("y2", function(d){return(yScale(d.median))})
      .attr("stroke", "red")

  },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}