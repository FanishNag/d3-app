import React, { useEffect, useRef, useState} from "react";
import * as d3 from 'd3';

function LineChartTest(props) {
    const { data, width, height } = props;
    const svgRef = useRef()
    const svgRef2 = useRef()
  
    useEffect(() => {
      drawChart();
    }, [data]);
    
    function drawChart() {
      // Add logic to draw the chart here
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const yMinValue = d3.min(data, d => d.value);
        const yMaxValue = d3.max(data, d => d.value);
        const xMinValue = d3.min(data, d => d.label);
        const xMaxValue = d3.max(data, d => d.label);

        const svg = d3
                .select(svgRef.current)
                .attr('width', width)
                .attr('height', height)
                .style('margin', '10')
                .style('padding', '50')
                .style('border', '2px solid white')
                .style('background', '#000000')
                .style('overflow', 'visible')

        const tooltip = d3
                .select(svgRef2.current)
                .style("position", "relative")
                .style("color", "white")
                .text("a simple tooltip")
                .attr('width', 100)
                .attr('height', 50)
                .attr('class', 'tooltip')

        // setting up scaling
        const xScale = d3.scaleLinear()
                        .domain([xMinValue, xMaxValue])
                        .range([0, width]);
        const yScale = d3.scaleLinear()
                        .domain([0, yMaxValue])
                        .range([height, 0]);
        const line = d3.line()
                        .x(d => xScale(d.label))
                        .y(d => yScale(d.value))    
                        .curve(d3.curveCardinal);
            
        // setting the axes
        svg.append('g')
            .call(d3.axisBottom(xScale).ticks(15))
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .attr('color', 'white')
        svg.append('g')
            .call(d3.axisLeft(yScale))
            .attr('class', 'y-axis')
            .attr('color', 'white')
        
        // setting up grids
        svg.append('g')
            .call(
                d3.axisBottom(xScale)
                .tickSize(-height)
                .tickFormat(''),
            )
            .attr('class', 'grid')
            .attr("stroke-dasharray","4")
            .attr('color', 'orange')
            .attr("stroke-width", 0.2)
            .attr('transform', `translate(0,${height})`);
        svg.append('g')
                .call(
                    d3.axisLeft(yScale)
                    .tickSize(-width)
                    .tickFormat('')
                )
                .attr('class', 'grid')
                .attr("stroke-dasharray","4")
                .attr('color', 'orange')
                .attr("stroke-width", 0.2);
        
        // setting up data for svg
        // two methods to create chart
        // 1.
        // svg.append('path')
        //         .datum(data)
        //         .attr('d', line)
        //         .attr('fill', 'none')
        //         .attr('stroke', 'white')
        //         .attr('stroke-width', 1.5)
        
        // 2.
        svg.selectAll('.line')
                .data([data])
                .join('path')
                .attr('d', line)
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-width', 1.5)
        
        // setting up tooltip pointer
        const focus = svg
                .append('g')
                .attr('class', 'focus')
                .style('display', 'none')
                .attr('stroke', 'white')
        focus.append('circle').attr('r', 5).attr('class', 'circle');
        
        // setting up mousemovement area and function
        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('opacity', 0)
            .on('mouseover',mousemove)
            .on('mouseout', () => {
                tooltip
                    .transition()
                    .duration(300)
                    .style('opacity', 0);
            })
        .on('mousemove', mousemove);
        
        function mousemove(event) {
            const bisect = d3.bisector(d => d.label).left;
            const xPos = d3.pointer(event)[0];
            console.log('xPos:: ', xPos)
            console.log('xScale.invert(xPos) :: ', xScale.invert(xPos))
            const x0 = bisect(data, xScale.invert(xPos));
            const d0 = data[x0];
            focus
            .attr('transform',`translate(${xScale(d0.label)},${yScale(d0.value)})`)
            .style('opacity', 1)
            .style('display', 'flex')
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip
                .html(d0.tooltipContent)
                .style('border', '1px solid black')
                .style('border-radius', '5px')
                .style('width', '80px')
                .style('height', '50px')
                .style('background', 'black')
                .style('color', 'white')
                .style(
                    'transform',
                    `translate(${xScale(d0.label)}px,${yScale(d0.value)-300}px)`,
            );
        }

    }

    return(
        <div>
            <svg ref={svgRef}></svg>
            <div ref={svgRef2}></div>
        </div>
    )
  }

export default function LineChartToolTip(){
    const [data, setData] = useState([]);

    useEffect(() => {
        regenerateData();
    }, []);
console.log(data)
    function regenerateData() {
        const chartData = [];
        for (let i = 0; i < 20; i++) {
        const value = Math.floor(Math.random() * i + 3);
        chartData.push({
            label: i,
            value,
            tooltipContent: `<b>x: </b>${i}<br><b>y: </b>${value}`
        });
        }
        setData(chartData)
    }

    return (
        <div style={{display:"flex", flexDirection:'row',background:'black'}}>
            <LineChartTest data={data} width={500} height={300} />
            <button style={{height:300, marginTop:50}} onClick={()=>(regenerateData(), window.location.reload()) }>Change Data</button>
        </div>
    );
}