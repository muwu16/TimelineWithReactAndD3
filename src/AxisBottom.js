export const AxisBottom = ({ startScale, innerHeight }) =>
  startScale.ticks().map(tickValue => (
    <g className="tick" key={tickValue} transform={`translate(${startScale(tickValue)}, 0)`}>
      <line y1={0} y2={innerHeight} stroke="black" />
      <text style={{ textAnchor: 'middle' }} dy=".90em" y={innerHeight + 3 }>
        {(tickValue)}
      </text>
      <text style={{ textAnchor: 'middle' }} dy="-.32em" y={ 0}>
        {(tickValue)}
      </text>
    </g>
  ));