import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function LineChartHoverLine({data, lable, value}){
    const svgRef =  useRef()

    useEffect(()=>{
      // setting up svg
      const w = 500;
      const h = 300;
      const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('margin', '10')
      .style('padding', '50')
      .style('border', '2px solid black')
      .style('background', '#000000')
      .style('overflow', 'visible')

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
      
      const isDate = data[0][lable] instanceof Date

      const DynamicXScale = isDate ? 
                            d3.scaleTime().domain(d3.extent(data, (d) => d[lable])).range([0, w]) : 
                            d3.scaleLinear().domain([0, data.length]).range([0, w]);

    // setting up scaling
    const xScale = DynamicXScale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d[value]})])
        .range([h, 0])
        .nice()

    const generateScaleLine = d3.line()
                              .x((d)=>xScale(d[lable]))
                              .y((d)=>yScale(d[value]))
                              .curve(d3.curveCardinal)

    // setting the axes
    const xAxis = d3.axisBottom(xScale)
      
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
    
    // setting up grids
    const xAxisGrid = d3.axisBottom(xScale)
      .ticks(data.length)
      .tickSize(-h)
      .tickFormat('')

    const yAxisGrid = d3.axisLeft(yScale)
      .ticks(5)
      .tickSize(-w)
      .tickFormat('')
    
    // axes
    svg.append('g')
        .attr('transform', `translate(0, ${h})`)
        .attr('color', 'white')
        .call(xAxis)
    svg.append('g')
        .attr('color', 'white')
        .call(yAxis)

    // grid
    svg.append('g')
        .attr('transform', `translate(0, ${h})`)
        .attr("stroke-dasharray","4")
        .attr('color', 'orange')
        .attr("stroke-width", 0.2)
        .call(xAxisGrid)

    svg.append('g')
        .attr("stroke-dasharray","4")
        .attr('color', 'orange')
        .attr("stroke-width", 0.2)
        .call(yAxisGrid)
    
    // lable
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", w/2)
        .attr("y", h + 40)
        .style("color", '#fff')
        .text(lable?.toUpperCase())
        .style("font-size", '10px')
        .style("fill", 'white');
        
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("x", -h/2)
        .attr("y", -35)
        .attr("transform", "rotate(-90)")
        .text(value?.toUpperCase())
        .style("font-size", '10px')
        .style("fill", 'white');

    // setting up data for svg
    svg.selectAll('.line')
       .data([data])
       .join('path')
         .attr('d', d=>generateScaleLine(d))
         .attr('fill', 'none')
         .attr('stroke', 'white')
         .attr("stroke-width", 1.5)

    // add horizontal and verticle lines
    const verticalLine = svg.append('line')
    .attr('stroke', 'orange')
    .attr("stroke-dasharray","4")
    .attr("stroke-width", 1)
    .attr("class", 'bar-line');

    const horizontalLine = svg.append('line')
    .attr('stroke', 'orange')
    .attr("stroke-dasharray","4")
    .attr("stroke-width", 1)
    .attr("class", 'bar-line');

    const showLine=(event)=>{
        // add horizontal and verticle lines
            const [mouseX, mouseY] = d3.pointer(event);
            const x0 = xScale.invert(mouseX);
            const y0 = yScale.invert(mouseY);

            verticalLine
                .attr('x1', mouseX)
                .attr('y1',  0)
                .attr('x2', mouseX)
                .attr('y2',  h)
                .style("opacity", 1);
                
            horizontalLine
                .attr('x1', 0)
                .attr('y1', mouseY)
                .attr('x2', w)
                .attr('y2', mouseY)
                .style("opacity", 1);


            const toolTip=()=>{
                return `${"X"}: ${x0}<br>${"Y"}: ${y0}`
            }

            tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px")
            .style("visibility", "visible")
            .style("padding", "6px")
            .html(toolTip);
    }

    // Mouse out event
    const hideLine = () => {
        verticalLine.style("opacity", 0);
        horizontalLine.style("opacity", 0);
        tooltip.style("visibility", "hidden");
    };

    // Append a rect to capture mouse movements
    d3.select(svgRef.current)
        .append("rect")
        .attr("width", w)
        .attr("height", h)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mousemove", (event)=>{showLine(event)})
        .on("mouseout", hideLine);
                    
    },[data])
 
    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}