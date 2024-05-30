import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function BarChart({data, lable, value}){
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
    const isDate = data[0][lable] instanceof Date
    const dateFormat = d3.timeFormat('%d/%m/%y')

    const xScale = d3.scaleBand()
        .domain(data.map((d,i)=>isDate ? dateFormat(d[lable]) : d[lable]))
        .range([0, w])
        .padding(0.8)
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d[value]})])
        .range([h, 0]);

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
        .call(xAxis)
        .attr('transform', `translate(0, ${h})`)
        .attr('color', 'white')
        .selectAll("text")  
        .style("font-size", "8px")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-50)");

        svg.append('g')
        .call(yAxis)
        .attr('color', 'white')
    
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
    svg.selectAll('.bar')
       .data(data)
       .join('rect')
         .attr('x', (d)=> xScale(isDate ? dateFormat(d[lable]) : d[lable]) )
         .attr('y', (d)=> yScale(d[value]) )
         .attr('width', xScale.bandwidth() )
         .attr('height', d=> h-yScale(d[value]) )
         .attr('fill', 'orange')
         .attr('stroke', 'orange')

    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}