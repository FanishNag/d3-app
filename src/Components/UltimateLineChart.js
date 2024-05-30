import React, { useEffect, useRef, useState} from "react";
import * as d3 from 'd3';
import Slider from "./RangeSlider/RangeSliderUpdated";

export default function UltimateLineChart({data}){
    const svgRef = useRef()
    const [sliderValue, setSliderValue] = useState(100);

    function updateChart(maxValue){
        const filteredData = data?.data.filter((_, index) => index < data.data.length * (maxValue / 100));
        console.log(filteredData)
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
        .style('overflow', 'visible');

   // setting up for tooltip
       const tooltip = d3
       .select("body")
       .append("div")
       .attr("class", "tooltip")
       .style("position", "absolute")
       .style("visibility", "hidden")
       .style("background-color", "rgba(0, 0, 0, 0.7)")
       .style("color", "white")
       .style("border-radius", "5px");

   // setting up scaling
   const xScale = d3.scaleTime()
       .domain(d3.extent(filteredData, function(d){return new Date(d.price_date)}))
       .range([0, w]);
   const yScale = d3.scaleLinear()
       .domain([0, d3.max(filteredData, function(d){return d.modal_price})])
       .range([h, 0])

   const generateScaleLine= d3.line()
                               .x((d)=>xScale(new Date(d.price_date)))
                               .y((d)=>yScale(d.modal_price))
                               .curve(d3.curveCardinal);

   // setting the axes
   const xAxis = d3.axisBottom(xScale)
     .ticks(8)
   const yAxis = d3.axisLeft(yScale)
   
   
   // setting up grids
   const xAxisGrid = d3.axisBottom(xScale)
     .ticks(filteredData.length)
     .tickSize(-h)
     .tickFormat('')

   const yAxisGrid = d3.axisLeft(yScale)
     .ticks(5)
     .tickSize(-w)
     .tickFormat('')
   
   // axes
   svg.append('g')
       .attr("class", "x-uc")
       .attr('transform', `translate(0, ${h})`)
       .attr('color', 'white')
       .call(xAxis)
   svg.append('g')
        .attr("class", "y-uc")
        .attr('color', 'white')
        .call(yAxis)

   // grid
   svg.append('g')
   .attr("class", "gx-uc")
       .attr('transform', `translate(0, ${h})`)
       .attr("stroke-dasharray","4")
       .attr('color', 'orange')
       .attr("stroke-width", 0.2)
       .call(xAxisGrid)

   svg.append('g')
   .attr("class", "gy-uc")
       .attr("stroke-dasharray","4")
       .attr('color', 'orange')
       .attr("stroke-width", 0.2)
       .call(yAxisGrid)

   //svg for line
   const svgUpdated = svg.selectAll('.line-main')
                         .data([filteredData])
   
   
   // create line path
   const path = svgUpdated.join('path')
               .attr('class', 'line-uc')
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
   .on("end", function(){dataPoints()})
   
   function dataPoints(){
       // tooltip-functions
       function mouseover(d){
           const toolTip=()=>{
                   return `${"X"}: ${d.price_date}<br>${"Y"}: ${d.modal_price}`
           }

           tooltip
           .style("visibility", "visible")
           .style("padding", "6px")
           .html(toolTip);
   
           d3.select(this)
              .attr("stroke", "steelblue") 
              .attr("stroke-width", 4);
       }
   
       function mousemove(event){
           tooltip
           .style("top", event.pageY - 10 + "px")
           .style("left", event.pageX + 10 + "px");
       }
       
       function mouseout(){
           tooltip.style("visibility", "hidden");
   
           d3.select(this).
           attr("stroke", "none"); // Restore default stroke color on mouseout
       }

       // data-points
       svg.selectAll('.dot')
       .data(filteredData)
       .enter()
       .append("circle")
           .attr('class', 'data-points-uc')
           .attr("fill", "white")
           .attr("stroke", "none")
           .attr("cx", function(d) { return xScale(new Date(d.price_date)) })
           .attr("cy", function(d) { return yScale(d.modal_price) })
           .attr("r", 3)
           .text(d=>d.modal_price)
           .on("mouseover", function(event, d){mouseover.call(this, d)})
           .on("mousemove", function(event){mousemove(event)})
           .on("mouseout", function(){ mouseout.call(this)})        
   }

}
    
    useEffect(()=>{
        updateChart(sliderValue)
    },[data, sliderValue])
    
    const removeElements=()=>{
        d3.select(".line-uc").remove()
        d3.selectAll(".data-points-uc").remove()
        d3.select(".x-uc").remove()
        d3.select(".y-uc").remove()
        d3.select(".gx-uc").remove()
        d3.select(".gy-uc").remove()
    }

    const handleSliderChange = (newValue) => {
        setSliderValue(newValue);
        };
    removeElements()

    return(
        <div>
            <svg ref={svgRef}></svg>
            <Slider
                min={0}
                max={100}
                value={sliderValue}
                onChange={handleSliderChange}
            />
        </div>
    )
}