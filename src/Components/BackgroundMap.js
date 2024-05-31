import React, { useEffect, useRef} from "react";
import * as d3 from 'd3';
import { geoAiry, geoAitoff, geoArmadillo, geoAugust } from 'd3-geo-projection';

export default function BackgroundMap({data, lable, value}){
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
      .style('border', '2px solid #000000')
      .style('background', '#000000')
      .style('overflow', 'visible')

    // Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
    //   var projection = geoAiry().fitSize([w, h], data);
    //   .scale(w/1.6/Math.PI)
    //   .translate([w / 2, h / 2])
      
      // Load external data and boot
      const loadData = async () => {
          const data = await d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');

        // Map and projection. Try:  d3.geoAiry() / d3.geoAitoff() / d3.geoArmadillo() / d3.geoAugust() / d3.geoAzimuthalEqualArea() / d3.geoAzimuthalEquidistant() and more
        var projection = d3.geoNaturalEarth1().fitSize([w, h], data);
        // Draw the map
            svg.append("g")
            .selectAll("path")
            .data(data.features)
            .enter().append("path")
                .attr("fill", "#69b3a2")
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
                .style("stroke", "#fff")
    }
    loadData();
    },[data])

    return(
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}