export const Marks = ({
  data,
  startScale,
  endValue ,
  endScale,
  startValue,
  colorScale,
  colorValue,
  onHover
}) =>
  data.map((d, i) => (
    
      <rect className='mark'
        onMouseEnter={() => {
          onHover({
            x: startScale(startValue(d)),
            y: endScale(d.civilization),
            index: i,
            id: d.civilization
          });
          // console.log(i);
        }}
      onMouseOut={() => {
          // console.log();
          onHover(null);
          
        }}
        // key={yValue(d)}
        
        x={startScale(startValue(d))}
        y={endScale(d.civilization)}
        fill={colorScale(colorValue(d))}
        width={startScale(endValue(d)) - startScale(startValue(d))}
        height={endScale.bandwidth()}
      >

        
        <title >{(d.civilization)}</title>
        
      
      </rect>
    

  ));
 
