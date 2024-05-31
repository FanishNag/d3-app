import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function LineChartBrushZoom({ data, lable, value }) {
  const svgRef = useRef();

  useEffect(() => {
    // setting up svg
    const w = 500;
    const h = 300;

    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("margin", "10")
      .style("padding", "50")
      .style("border", "2px solid black")
      .style("background", "#000000")
      .style("overflow", "visible");

    // setting up scaling
    const isDate = data[0][lable] instanceof Date

    const DynamicXScale = isDate ? 
                            d3.scaleTime().domain(d3.extent(data, (d) => d[lable])).range([0, w]) : 
                            d3.scaleLinear().domain([0, data.length]).range([0, w]);
                            
    const xScale = DynamicXScale;
    const yScale = d3.scaleLinear()
                  .domain([0, d3.max(data, function(d){return d[value]})])
                  .range([h, 0])
                  .nice()
    const generateScaleLine = d3
      .line()
      .x((d, i) => xScale(d[lable]))
      .y((d, i) => yScale(d[value]))
      .curve(d3.curveCardinal);

    // setting the axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // setting up grids
    const xAxisGrid = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickSize(-h)
      .tickFormat("");

    const yAxisGrid = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(-w)
      .tickFormat("");

    // axes
    const x = svg
      .append("g")
      .attr("transform", `translate(0, ${h})`)
      .attr("color", "white")
      .call(xAxis);
    const y = svg.append("g").attr("color", "white").call(yAxis);

    // grid
    svg
      .append("g")
      .attr("transform", `translate(0, ${h})`)
      .attr("stroke-dasharray", "4")
      .attr("color", "orange")
      .attr("stroke-width", 0.2)
      .call(xAxisGrid);

    svg
      .append("g")
      .attr("stroke-dasharray", "4")
      .attr("color", "orange")
      .attr("stroke-width", 0.2)
      .call(yAxisGrid);

    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg
      .append("defs")
      .append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", w)
      .attr("height", h)
      .attr("x", 0)
      .attr("y", 0);

    // Add brushing
    var brush = d3
      .brushX()
      .extent([[0, 0], [w, h]])
      .on("end", updateChart); // Each time the brush selection changes, trigger the 'updateChart' function

    // Create the line variable: where both the line and the brush take place
    var line = svg.append("g")
                .attr("class", "line")
                .attr("clip-path", "url(#clip)");

    line
      .append("g")
      .attr("class", "brush")
      .call(brush);

    var idleTimeout;
    function idled() {
      idleTimeout = null;
    }

    function updateChart(event) {
      // What are the selected boundaries?
      const extent = event.selection;

      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if (!extent) {
        if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
        xScale.domain([0, data.length]);
      } else {
        xScale.domain([xScale.invert(extent[0]), xScale.invert(extent[1])]);
        line.select(".brush").call(brush.move, null); // This removes the grey brush area as soon as the selection has been done
      }

    // remove existance graph
    svg.selectAll(".tick").remove()
    svg.selectAll("path").remove()
    // Update axis and line position

      x.transition().duration(1000).call(d3.axisBottom(xScale));

    // axes
        svg
        .append("g")
        .attr("transform", `translate(0, ${h})`)
        .attr("color", "white")
        .call(xAxis);

        svg.append("g").attr("color", "white").call(yAxis);

    // grid
        svg
        .append("g")
        .attr("transform", `translate(0, ${h})`)
        .attr("stroke-dasharray", "4")
        .attr("color", "orange")
        .attr("stroke-width", 0.2)
        .call(xAxisGrid);

        svg
        .append("g")
        .attr("stroke-dasharray", "4")
        .attr("color", "orange")
        .attr("stroke-width", 0.2)
        .call(yAxisGrid);


        line
        .append("path")
        .datum(data)
        .attr("d", generateScaleLine)
        .transition()
        .duration(1000)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5);
    }
    
    // Initial rendering of the line
    line
      .append("path")
      .datum(data)
      .attr("d", generateScaleLine)
      .transition()
      .duration(1000)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);

      // If user double click, reinitialize the chart
    svg.on("dblclick",function(){
      isDate ?xScale.domain(d3.extent(data, function(d) { return d[lable]; })) : xScale.domain([0, data.length])
      x.transition().duration(1000).call(d3.axisBottom(xScale));
      line
      .append("path")
      .datum(data)
      .attr("d", generateScaleLine)
      .transition()
      .duration(1000)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);

      // extra code to prevent overlaping lables
      svg.selectAll(".tick").remove()
      // axes
      svg
      .append("g")
      .attr("transform", `translate(0, ${h})`)
      .attr("color", "white")
      .call(xAxis);

      svg.append("g").attr("color", "white").call(yAxis);

  // grid
      svg
      .append("g")
      .attr("transform", `translate(0, ${h})`)
      .attr("stroke-dasharray", "4")
      .attr("color", "orange")
      .attr("stroke-width", 0.2)
      .call(xAxisGrid);

      svg
      .append("g")
      .attr("stroke-dasharray", "4")
      .attr("color", "orange")
      .attr("stroke-width", 0.2)
      .call(yAxisGrid);


    });
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
