import React, {useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import  { scaleLinear, scaleBand, min, max, scaleOrdinal } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { Marks } from './Marks';
import './index.css';
import { ColorLegend } from './ColorLegend';
import { MarkText } from './MartText';

const width = 1866;
const height = 1000;
const margin = { top: 80, right: 280, bottom: 80, left: 80 };
const xAxisLabelOffset = 40;
const xLabelText = 'World History Timeline';

const initialMousePosition = { x: width / 2, y: height / 2 };
const fadeOpacity = 0.2;
const showInfo = ['civilization','start','end','region']



const App = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [markInfo, setMarkInfo] = useState(null);


  const handleMouseMove = useCallback((event) => {
    const { clientX, clientY } = event;
    if (clientX > margin.left && clientX < (width - margin.right ))
      setMousePosition({x: clientX, y: clientY }); 
    }, [setMousePosition]);

  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const startValue = d => d.start;
  const endValue = d => d.end;
  const colorValue = (d) => d.region;
  const idValue = (d) => d.civilization;
  
  const colorLegendLabel = 'Region';
  const filteredData = data.filter(d => hoveredValue === colorValue(d));
  const filteredDataById = data.filter(d => markInfo ? markInfo.id === idValue(d) : 1);

  const startScale = scaleLinear()
    .domain([min(data, startValue), max(data, endValue)])
    .range([0, innerWidth]);
  
  const endScale = scaleBand()
    .domain(data.map(d => d.civilization))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A', '#b2658c', '#4f8447', '#3b4896', "#88a149", '#aacfac']);

  // console.log(markInfo);
  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <g transform={`translate(${margin.left},${margin.top})`}>

        <line x1={mousePosition.x - margin.left} x2={mousePosition.x - margin.left} y1={0} y2={innerHeight} stroke="grey" />

        <AxisBottom startScale={startScale} innerHeight={innerHeight} />
        <text 
          x={innerWidth / 2} 
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
          className='axis-label'
          >
          {xLabelText}
        </text>


        <g transform={`translate(${innerWidth + 60}, 60)`}>
          <text
            x={35}
            y={-25}
            className="axis-label"
            textAnchor="middle"
          >
            {colorLegendLabel}
          </text>
          <ColorLegend
            tickSpacing={32}
            tickTextOffset={32}
            tickSize={endScale.bandwidth()}
            colorScale={colorScale}
            onHover={setHoveredValue}
            hoveredValue={hoveredValue}
            fadeOpacity={fadeOpacity}
          />
        </g>


        <g >  
          <Marks
            data={markInfo ? filteredDataById : filteredData}
            startScale={startScale}
            endScale={endScale}
            idValue={idValue}
            endValue={endValue}
            startValue={startValue}
            colorScale={colorScale}
            colorValue={colorValue}
          />
        </g>
        <g opacity={markInfo || hoveredValue ? fadeOpacity : 1}>  
          <Marks
            data={data}
            startScale={startScale}
            endScale={endScale}
            endValue={endValue}
            idValue={idValue}
            startValue={startValue}
            onHover={setMarkInfo}
            colorScale={colorScale}
            colorValue={colorValue}
          />
        </g>
        <MarkText markInfo={markInfo} data={data} showInfo={showInfo}/>
      </g>
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
