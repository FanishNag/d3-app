import React, { useEffect, useRef, useState} from "react";
import * as d3 from 'd3';
import RangeSlider from "./RangeSlider/RangeSlider";

export default function DynamicRangeLineChart({marketData}){
    const [limit, setLimit] = useState()
    let data = marketData.slice(0,limit)
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
    const xScale = d3.scaleTime()
        .domain([d3.min(data, function(d){return new Date(d.price_date)}), d3.max(data, function(d){return new Date(d.price_date)})])
        .range([0, w]);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d.modal_price})])
        .range([h, 0])

    const generateScaleLine= d3.line()
                                .x((d)=>xScale(new Date(d.price_date)))
                                .y((d)=>yScale(d.modal_price))
                                .curve(d3.curveCardinal);

    // setting the axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(8)
    const yAxis = d3.axisLeft(yScale)
    
    
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
        .attr('class', 'x-axis')
    svg.append('g')
        .attr('color', 'white')
        .call(yAxis)
        .attr('class', 'y-axis')

    // grid
    svg.append('g')
        .attr('transform', `translate(0, ${h})`)
        .attr("stroke-dasharray","4")
        .attr('color', 'orange')
        .attr("stroke-width", 0.2)
        .call(xAxisGrid)
        .attr('class', 'grid')

    svg.append('g')
        .attr("stroke-dasharray","4")
        .attr('color', 'orange')
        .attr("stroke-width", 0.2)
        .call(yAxisGrid)
        .attr('class', 'grid')

    // data-points 
    svg.selectAll()
    .data(data)
    .enter()
    .append("circle")
        .attr('class', 'data-points-2')
        .attr("fill", "white")
        .attr("stroke", "none")
        .attr("cx", function(d) { return xScale(new Date(d.price_date)) })
        .attr("cy", function(d) { return yScale(d.modal_price) })
        .attr("r", 3)
        .text(d=>d.modal_price)

    // setting up data for svg
    svg.selectAll()
       .data([data])
       .join('path')
         .attr('d', d=>generateScaleLine(d))
         .attr('fill', 'none')
         .attr('stroke', 'white')
         .attr("stroke-width", 1.5)
         .attr("class", 'line-graph-2')

    },[data, limit])

    d3.select('.line-graph-2').remove()
    d3.selectAll('.data-points-2').remove()
    d3.selectAll('.x-axis').remove()
    d3.selectAll('.y-axis').remove()
    d3.selectAll('.grid').remove()

    return(
        <div>
            <svg ref={svgRef}></svg>
            <RangeSlider limit={marketData.length} setLimit={setLimit}/>
        </div>
    )
}