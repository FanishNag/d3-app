import React, {useState, useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function LineChart(){
    const data=[11,15,23,34,19,46,27,18,5]
    const svgRef = useRef()

    useEffect(()=>{
    // setting up svg
         const w = 500;
         const h = 200;
         const svg = d3.select(svgRef.current)
         .attr('width', w)
         .attr('height', h)
         .style('margin-top', '500')
         .style('background', '#d3d3d3')
         .style('overflow', 'visible')

    // setting up scaling
    const xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, w]);
    const yScale = d3.scaleLinear()
        .domain([0, 50])
        .range([h, 0]);
    const generateScaleLine= d3.line()
                                .x((d,i)=>xScale(i))
                                .y(yScale)
                                .curve(d3.curveCardinal);

    // setting the axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(i=>i)
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
    svg.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${h})`)
    svg.append('g')
        .call(yAxis)

    // setting up data for svg
    svg.selectAll('.line')
       .data([data])
       .join('path')
         .attr('d', d=>generateScaleLine(d))
         .attr('fill', 'none')
         .attr('stroke', 'blue')

    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}