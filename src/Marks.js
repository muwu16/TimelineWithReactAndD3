export const Marks = ({
  data,
  startScale,
  endValue ,
  endScale,
  startValue,
  colorScale,
  colorValue,
  idValue,
  onHover,
  strokeRed
}) =>
  data.map((d, i) => (
    
      <rect className='mark'
        stroke={strokeRed ? "red" : "none"}
        key={idValue(d)}
        onMouseEnter={() => {
          onHover({
            x: startScale(startValue(d)),
            y: endScale(d.civilization),
            index: i,
            id: d.civilization
          });
          }}
          onMouseOut={() => {
            onHover(null);
          }}

        
        x={startScale(startValue(d))}
        y={endScale(d.civilization)}
        fill={colorScale(colorValue(d))}
        width={startScale(endValue(d)) - startScale(startValue(d))}
        height={endScale.bandwidth()}
      >

        
        <title >{i}</title>
        
      
      </rect>
    

  ));
 
