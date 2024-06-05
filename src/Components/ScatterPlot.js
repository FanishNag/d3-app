import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function ScatterPlot({ data, lable, value }) {
  const svgRef = useRef();
  data = data.slice(0,50)
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
      .style("border", "2px solid #000000")
      .style("background", "#000000")
      .style("overflow", "visible");

      // setting up for tooltip
      const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(0, 0, 0, 0.7)")
      .style("color", "white")
      .style("border-radius", "5px");

    // setting up scaling
    const isDate = data[0][lable] instanceof Date;
    
    const xScale = isDate ? 
                    d3.scaleTime().domain(d3.extent(data, (d) => d[lable])) : 
                    d3.scaleLinear().domain([0, d3.max(data, d=>Number(d[lable]))])
                   .range([0, w]);

    const yScale = d3.scaleLinear()
                  .domain([0, d3.max(data, d=>Number(d[value]))])
                  .range([h, 0])
                  .nice();

    // setting the axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);


    // Add dots
    function mouseover(d){
      const toolTip=()=>{
              return `${"X"}: ${d[lable]}<br>${"Y"}: ${d[value]}`
      }

      tooltip
      .style("visibility", "visible")
      .style("padding", "6px")
      .html(toolTip);

      d3.select(this)
          .attr("stroke", "steelblue") 
          .attr("stroke-width", 5);
  }

  function mousemove(event){
      tooltip
      .style("top", event.pageY - 10 + "px")
      .style("left", event.pageX + 10 + "px");
  }
  
  function mouseout(){
      tooltip.style("visibility", "hidden");

      d3.select(this).
      attr("stroke", "none"); // Restore default stroke color on mouseout
  }

  const zoom = d3.zoom()
      .scaleExtent([0.5, 32])
      .on("zoom", zoomed);
      
  svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

  function zoomed({transform}) {
    const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
    const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);
    
    // remove existance graph
    svg.selectAll(".tick").remove()
    svg.selectAll(".dots").remove()
    
    // axes
    svg
      .append("g")
      .attr("transform", `translate(0, ${h})`)
      .attr("color", "white")
      .call(xAxis.scale(zx));

    svg.append("g")
    .attr("color", "white")
    .call(yAxis.scale(zy));

    // clip-path
    svg
    .append("defs")
    .append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", w)
    .attr("height", h)
    .attr("x", 0)
    .attr("y", 0);
    
    // dots
    svg.append('g')
      .attr("clip-path", "url(#clip)")
      .selectAll('.dots')
      .data(data)
      .enter()
      .append('circle')
      .attr("class", "dots")
      .attr("cx", d=>xScale(d[lable]))
      .attr("cy", d=>yScale(d[value]))
      .attr("fill", "#69b3a2")
      .attr("r", 3)
      .on("mouseover", function(event, d){mouseover.call(this, d)})
      .on("mousemove", function(event){mousemove(event)})
      .on("mouseout", function(){ mouseout.call(this)})
      .attr("transform", transform)

  }

  }, [data, lable, value]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
