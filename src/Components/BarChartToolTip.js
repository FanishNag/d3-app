import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function BarChartTooTip(){
    const data=[200,250,190,100,120,80,210,75,39]
    const svgRef = useRef()
    const svgRef2 = useRef()

    useEffect(()=>{
    // setting up svg
    const w = 500;
    const h = 300;
    const svg = d3.select(svgRef.current)
         .attr('width', w)
         .attr('height', h)
         .style('margin', '10px')
         .style('padding', '50px')
         .style('border', '2px solid black')
         .style('background', '#000000')
         .style('overflow', 'visible')

    // setting up scaling
    const xScale = d3.scaleBand()
        .domain(data.map((val,i)=>i))
        .range([0, w])
        .padding(0.8)
    const yScale = d3.scaleLinear()
        .domain([0, h])
        .range([h, 0]);

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
        .attr("stroke-width", 0.2)
        .call(xAxisGrid)

    svg.append('g')
        .attr("stroke-dasharray","4")
        .attr('color', 'orange')
        .attr("stroke-width", 0.2)
        .call(yAxisGrid)

    // setting up data for svg
    const updateSvg = svg.selectAll('.bar')
       .data(data)

    const barGroup = updateSvg.join('g');
    const rect = barGroup.append('rect')
    .attr('x', (val, i)=> xScale(i))
    .attr('y', yScale )
    .attr('width', xScale.bandwidth())
    .attr('height', val=> h-yScale(val))
    .attr('fill', 'orange')
    .attr('stroke', 'orange')
    .style('color', 'black')

    const textSvg = barGroup.append('text')
    .attr('x', (val, i)=>xScale(i))
    .attr('y', (val, i)=>yScale(val)-10)
    .attr('text-anchor', 'start')
    .text((val, i)=>val)
    .style('fill', 'white')
    .style('font-size', '12px')
    .attr('class', 'text-value')
    
    barGroup.on('mouseenter', function mouseOver(event, i){
        d3.select(this).select('rect')
            .attr('stroke', 'orange')
            .attr('width', xScale.bandwidth()+5)
            
        d3.selectAll('.text-value')
          .text((val, key)=>(val-i)==0 ? null : val-i)

          svg.append('line')
          .attr('x1', 0)
          .attr('y1', yScale(i))
          .attr('x2', w)
          .attr('y2', yScale(i))
          .attr('stroke', 'orange')
          .attr("stroke-dasharray","4")
          .attr("stroke-width", 1.5)
          .attr("class", 'bar-line');

    } )
    .on('mouseout', (event, i)=>{
        rect
          .style('stroke-width', 0)
          .attr('width', xScale.bandwidth())
          
        d3.selectAll('.text-value').text((val, key)=>val)

        d3.selectAll('.bar-line')
        .remove()
    })
        

    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
            <div ref={svgRef2}></div>
        </div>
    )
}