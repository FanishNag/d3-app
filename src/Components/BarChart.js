import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function BarChart(){
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
    const xScale = d3.scaleBand()
        .domain(data.map((val,i)=>i+1))
        .range([0, w])
        .padding(0.8)
    const yScale = d3.scaleLinear()
        .domain([0, h])
        .range([h, 0]);

    // setting the axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
    //   .tickFormat(i=>i)
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
        .call(xAxis)
        .attr('transform', `translate(0, ${h})`)
        .attr('color', 'white')
        svg.append('g')
        .call(yAxis)
        .attr('color', 'white')
    
    // grid
    svg.append('g')
        .attr('transform', `translate(0, ${h})`)
        .attr("stroke-dasharray","4")
        .attr('color', 'orange')
        .call(xAxisGrid)

    svg.append('g')
        .attr("stroke-dasharray","4")
        .attr('color', 'orange')
        .call(yAxisGrid)

    // setting up data for svg
    svg.selectAll('.bar')
       .data(data)
       .join('rect')
         .attr('x', (val, i)=> xScale(i) )
         .attr('y', yScale )
         .attr('width', xScale.bandwidth() )
         .attr('height', val=> h-yScale(val) )
         .attr('fill', 'orange')
         .attr('stroke', 'orange')

    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}