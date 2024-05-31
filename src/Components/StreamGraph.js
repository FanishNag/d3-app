import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function StreamGraph({data, lable, value}){
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
      
      const keys = ['year','Amanda','Ashley','Betty','Deborah','Dorothy','Helen','Linda','Patricia']
      const stack = d3.stack()
      .keys(keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetSilhouette);
     
      const series = stack(data);
      
      console.log(series)
      const isDate = data[0][lable] instanceof Date
      const DynamicXScale = isDate ? 
                            d3.scaleTime().domain(d3.extent(data, (d) => d[lable])).range([0, w]) : 
                            d3.scaleLinear().domain(d3.extent(data, function(d) { return d[lable]; })).range([ 0, w ]);

    // setting up scaling
    const xScale = DynamicXScale
    const yScale = d3.scaleLinear()
        .domain([-d3.max(series, d => d3.max(d, d => d[1])), d3.max(series, d => d3.max(d, d => d[1]))])
        .range([h, 0])
        .nice()

    const areaGenerator = d3.area()
                            .x((d)=>xScale(d.data.year))
                            .y0(d => yScale(d[0]))
                            .y1(d => yScale(d[1]))
                            // .curve(d3.curveCardinal);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

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
    // svg.append('g')
    //     .attr('transform', `translate(0, ${h})`)
    //     .attr("stroke-dasharray","4")
    //     .attr('color', 'orange')
    //     .attr("stroke-width", 0.2)
    //     .call(xAxisGrid)

    // svg.append('g')
    //     .attr("stroke-dasharray","4")
    //     .attr('color', 'orange')
    //     .attr("stroke-width", 0.2)
    //     .call(yAxisGrid)
    
    // axes lable
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
    svg.selectAll()
        .data(series)
        .join('path')
        .attr("class", function(d) { return "myArea " + d.key })
        .attr('d', d=>areaGenerator(d))
        .attr('fill', d=>color(d.key))
        .attr("fill-opacity", .3)
        .attr('stroke', 'white')
        .attr("stroke-width", 1.5)
        .attr("d", areaGenerator)
        .on("mouseover", function(event, d){areamouseover.call(this, d)})
        .on("mouseout", function(event, d){areamouseout.call(this, d)})

    function areamouseover(d){
        d3.selectAll(".myArea").style("fill-opacity", .1)
        d3.select(this)
        .style("fill-opacity", 1);
    }
    function areamouseout(d){
        d3.selectAll(".myArea").style("fill-opacity", .3)
        d3.select(this)
        .style("fill-opacity", .3);
    }
    
    var size = 20
    svg.selectAll("myrect")
      .data(keys)
      .enter()
      .append("rect")
        .attr("x", w+10)
        .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d)})
        .on("mouseover", function(event, d){highlight.call(this, d)})
        .on("mouseout", function(event, d){noHighlight.call(this, d)})

    function highlight(d){
        // reduce opacity of all groups
        d3.selectAll(".myArea").style("fill-opacity", .1)
        // expect the one that is hovered
        d3.select("."+d).style("fill-opacity", 1)
        }
    
        // And when it is not hovered anymore
        function noHighlight(d){
        d3.selectAll(".myArea").style("fill-opacity", .3)
        }


    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}