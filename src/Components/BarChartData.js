import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';
import moment from "moment/moment";

export default function BarChartData({data}){
    console.log(data)
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
        .domain(d3.extent(data, function(d){return  new Date(d.price_date)}))
        .rangeRound([0, w])
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d.modal_price}) + 200 ])
        .range([h, 0]);

    // setting the axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(10)

    const yAxis = d3.axisLeft(yScale)
      .ticks(6)

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
    console.log(d3.max(data, function(d){return d.modal_price}))
    svg.selectAll('.bar')
       .data(data)
       .join('rect')
         .attr('x', (val, i)=> xScale(new Date(val.price_date)) )
         .attr('y', (val, i)=> yScale(val.modal_price) )
         .attr('width', 10 )
         .attr('height', val=> h - yScale(val.modal_price) )
         .attr('fill', 'orange')
         .attr('stroke', 'orange')

    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}