export const AxisLeft = ({ yScale, innerWidth }) =>
  yScale.ticks().map(tickValue => (
    <g className="tick" transform={`translate(0, ${yScale(tickValue)})`}>
      <line x2={innerWidth} stroke="black" />
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-3}
        dy=".32em"
        y={yScale(tickValue)}
      >
        {tickValue}
      </text>
    </g>

  ));
