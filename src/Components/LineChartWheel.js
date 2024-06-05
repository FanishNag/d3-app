import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function LineChartWheel({data, lable, value}){
    const svgRef =  useRef()
    
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

      const DynamicXScale = isDate ? 
                            d3.scaleTime().domain(d3.extent(data, (d) => d[lable])).range([0, w]) : 
                            d3.scaleLinear().domain([0, data.length]).range([0, w]);

    // setting up scaling
    const xScale = DynamicXScale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){return d[value]})])
        .range([h, 0])
        .nice()

    // setting the axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
    
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

    const zoom = d3.zoom()
    .scaleExtent([0.5, 32])
    .on("zoom", zoomed);
        
    svg.call(zoom).call(zoom.transform, d3.zoomIdentity);
  
    function zoomed({transform}) {
      const zx = transform.rescaleX(xScale).interpolate(d3.interpolateRound);
      const zy = transform.rescaleY(yScale).interpolate(d3.interpolateRound);

        // remove existance graph
        svg.selectAll(".tick").remove()
        svg.selectAll(".dots").remove()
        svg.selectAll("path").remove()

        // axes
        svg.append('g')
        .attr('transform', `translate(0, ${h})`)
        .attr('color', 'white')
        .call(xAxis.scale(zx))
    
        svg.append('g')
        .attr('color', 'white')
        .call(yAxis.scale(zy))

        // clip-path
        svg
        .append("defs")
        .append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", w)
        .attr("height", h)
        .attr("x", 0)
        .attr("y", 0);


        const generateScaleLine = d3.line()
                              .x((d)=>zx(d[lable]))
                              .y((d)=>zy(d[value]))
                              .curve(d3.curveCardinal)

        // setting up data for svg
        var line = svg.append("g")
                .attr("class", "line")
                .attr("clip-path", "url(#clip)");

        line
        .append("path")
        .datum(data)
        .attr("d", generateScaleLine)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5);
        
    }

                    
    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}