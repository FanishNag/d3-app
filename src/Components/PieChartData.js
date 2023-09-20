import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function PieChartData({data}){
    const svgRef = useRef()

    useEffect(()=>{
    // setting up svg
         const w = 500;
         const h = 300;
         const radius = h/1.6;
         let svg = d3.select(svgRef.current)
         .attr('width', w)
         .attr('height', h)
         .style('margin', '10')
         .style('padding', '50')
         .style('overflow', 'visible')
         .style('border', '2px solid black')
         .style('background', '#000000')

    // setting up chart
    const pie = d3.pie()
    const pieArc = pie(data)
    const formattedData = d3.pie().value(d=>{return d.data.modal_price})(pieArc)
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)
    const color = d3.scaleOrdinal().range(d3.schemeSet3)

    // 
    svg = svg.append('g')
        .attr('transform', `translate(${w/2}, ${h/2})`)

    // setting up data for svg
    svg.selectAll()
       .data(formattedData)
       .join('path')
         .attr('d', arcGenerator)
         .attr('fill', d=> color(d.data))
         
    // setting up annotation
    svg.selectAll()
        .data(formattedData)
        .join('text')
            .text(d=>d.data.data.modal_price)
            .attr('transform', d=>`translate(${arcGenerator.centroid(d)})`)
            .style('text-anchor', 'middle')

    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}