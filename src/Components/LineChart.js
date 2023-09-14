import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function LineChart(){
    const data=[200,250,190,100,120,80,210,75,39]
    const svgRef = useRef()

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

    // setting up scaling
    const xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, w]);
    const yScale = d3.scaleLinear()
        .domain([0, h])
        .range([h, 0])
        .nice()
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

    // setting up data for svg
    svg.selectAll('.line')
       .data([data])
       .join('path')
         .attr('d', d=>generateScaleLine(d))
         .attr('fill', 'none')
         .attr('stroke', 'white')
         .attr("stroke-width", 1.5)
                    
    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}