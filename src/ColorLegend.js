export const ColorLegend = ({
  colorScale,
  tickSpacing = 30,
  tickSize = 10,
  tickTextOffset = 30,
  onHover,    
  hoveredValue,
  fadeOpacity
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g className="legend"  key={domainValue} transform={`translate(0,${i * tickSpacing})`}
      onMouseEnter={() => {
        onHover(domainValue);
      }}
      onMouseOut={() => {
        onHover(null);
      }}
      opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
      >
      <rect fill={colorScale(domainValue)} width={10 * 2} height={10 * 2} />
      <text x={tickTextOffset} dy="1.0em">
        {domainValue}
      </text>
    </g>
  ));
