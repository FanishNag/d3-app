import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function AnimatedLineChart({data, lable, value}){
    const svgRef =  useRef()
    console.log(data)
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
      
      const isDate = data[0][lable] instanceof Date
      console.log(isDate)

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
    //svg for line
        const svgUpdated = svg.selectAll('.line-main')
        .data([data])


        // create line path
        const path = svgUpdated.join('path')
        .attr('class', '.line-uc')
        .attr('d', d=>generateScaleLine(d))
        .attr('stroke-width', '2')
        .style('fill', 'none')
        .attr('stroke', '#ff6f3c');

        const length = path.node().getTotalLength()

        path.attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(1500)
        // .on("end", function(){dataPoints()})


    // svg.selectAll('.line')
    //    .data([data])
    //    .join('path')
    //      .attr('d', d=>generateScaleLine(d))
    //      .attr('fill', 'none')
    //      .attr('stroke', 'white')
    //      .attr("stroke-width", 1.5)
                    
    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}