import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function StockBoxPlot({data, column, categerizedBy}){
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

    //  setting up for tooltip
      const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "visible")
      .style("background-color", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("z-index", 9999)
      .style("border-radius", "5px");
    
    // setting up data
    var groupedData = d3.group(data, d => `${d[categerizedBy].toISOString().split('T')[0]} ${d[categerizedBy].getHours()}:00`);

    // Compute quartiles, median, interquantile range min and max for each group
    var sumstat = [];
    groupedData.forEach(function(values, key) {
      const sortedValues = values.map(v => v[column]).sort(d3.ascending);
      var q1 = d3.quantile(sortedValues, 0.25);
      var median = d3.quantile(sortedValues, 0.5);
      var q3 = d3.quantile(sortedValues, 0.75);
      var interQuantileRange = q3 - q1;
      var min = q1 - 1.5 * interQuantileRange;
      var max = q3 + 1.5 * interQuantileRange;
      // const min = Math.max(d3.min(sortedValues), q1 - 1.5 * interQuantileRange);
      // const max = Math.min(d3.max(sortedValues), q3 + 1.5 * interQuantileRange);
      
      sumstat.push({[categerizedBy]: key, q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max});
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
        .call(xAxis)
        .selectAll("text")  
        .style("font-size", "8px")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-50)");

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
        .style("fill", "green")
        .attr('ry', 5)
        .on('mouseover', function(event, d){mouseover.call(this, d)})
        .on('mousemove', mousemove)
        .on('mouseout', mouseout)
  
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

  // tooltip functions
  function mouseover(d){
    console.log(d)
    const toolTip=()=>{
      return `${categerizedBy}: ${d[categerizedBy]}<br>Min: ${d.min}<br>Q1: ${d.q1}<br>Median: ${d.median}<br>Q3: ${d.q3}<br>Max: ${d.max}`;
    }

    tooltip
        .style("visibility", "visible")
        .html(toolTip);

    d3.select(this)
        .attr("stroke", "#fff");
}
function mousemove(event){
  tooltip
  .style("top", event.pageY - 10 + "px")
  .style("left", event.pageX + 10 + "px");
}
function mouseout(){
    tooltip.style("visibility", "hidden");

    d3.select(this)
        .attr("stroke", "none");
}

  },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}