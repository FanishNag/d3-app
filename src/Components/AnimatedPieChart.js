import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';

export default function PieChart({data, lable, value}){
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
    const color = d3.scaleOrdinal().range(d3.schemeSet2)

    const pie = d3.pie()
      .value(d => d[value])
      .sort(null);

    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    const formattedData = pie(data);

    svg = svg.append('g')
        .attr('transform', `translate(${w/2}, ${h/2})`)

    // setting up data for svg
    svg.selectAll()
       .data(formattedData)
       .join('path')
       .transition()
        .duration(500)
        .delay(function(d,i) {
            return i * 500; })
        .attrTween("d", function (d, key) {
                var i = d3.interpolate(d.startAngle, d.endAngle)
                return function (t) {
                    d.endAngle = i(t)
                    return arcGenerator(d)
                }
            }
        )
        .style('background', '#fff')
        .attr('fill', d=> color(d.value))
        .on('end', function (d, i, nodes) {
            if (i === nodes.length - 1) { // Check if it's the last element
              // Update the labels after the last transition ends
              const texts = svg.selectAll('text')
                .data(formattedData);
   
              texts.enter()
                .append('text')
                .merge(texts)
                .attr('transform', d => `translate(${outerArc.centroid(d)})`)
                .attr('text-anchor', d => (outerArc.centroid(d)[0] > 0 ? 'start' : 'end'))
                .attr('text-anchor', 'middle')
                .attr('font-size', '12px')
                .attr('fill', 'white')
                .text(d => d.value);

              texts.exit().remove();
            }
          });

    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}