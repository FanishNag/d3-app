import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function LineChartNew({data}){
    const svgRef = useRef()

    useEffect(()=>{
    // setting up svg
         const w = 500;
         const h = 300;
         const svg = d3.select('#babu')
         .append('svg')
         .style('width', w+'px')
         .style('height', h+'px')
         .style('border', '2px solid black')
         .text('lkjhghfhfjhgfjhgf')
          .style('border', '2px solid red')
         
        //  svg
        //  .attr('width', w)
        //  .attr('height', h)
        //  .style('margin', '10')
        //  .style('padding', '50')
        //  .style('background', '#fff')
        //  .style('overflow', 'visible')



    // setting up scaling
    const xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, w]);
    const yScale = d3.scaleLinear()
        .domain([0, h])
        .range([h, 0])
        .nice()
    const generateScaleLine= d3.line()
                                .x((d,i)=>xScale(i))
                                .y(yScale)
                                .curve(d3.curveCardinal);


                    
    },[data])
    d3.selectAll('#babu').remove()
    return(
        <div id="babu"/>
        //     <svg ref={svgRef}></svg>
        // </div>
    )
}