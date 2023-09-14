import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function PieChart(){
    const data=[
        { area:'a', value:200},
        { area:'b', value:250},
        { area:'c', value:190},
        { area:'d', value:100},
        { area:'e', value:120},
        { area:'f', value:80},
        { area:'g', value:210},
        { area:'h', value:75},
        { area:'i', value:39}
    ]
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
         .style('background', '#d3d3d3')

    // setting up chart
    const formattedData = d3.pie().value(d=>d.value)(data)
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)
    const color = d3.scaleOrdinal().range(d3.schemeSet2)

    // 
    svg = svg.append('g')
        .attr('transform', `translate(${w/2}, ${h/2})`)

    // setting up data for svg
    svg.selectAll()
       .data(formattedData)
       .join('path')
         .attr('d', arcGenerator)
         .attr('fill', d=> color(d.value))
         .style('opacity', 0.3)
         
    // setting up annotation
    svg.selectAll()
        .data(formattedData)
        .join('text')
            .text(d=>d.data.area)
            .attr('transform', d=>`translate(${arcGenerator.centroid(d)})`)
            .style('text-anchor', 'middle')

    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}