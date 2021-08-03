export const MarkText = ({markInfo, data, showInfo}) =>{
  if (markInfo === null){
    return null;
  }
  let maxLength = 0;
  showInfo.forEach(element => {
    if((data[markInfo.index][element].length + element.length) > maxLength){
      maxLength = data[markInfo.index][element].length + element.length + 3;
    }
  });

  if (markInfo){
    return <g>
        <line x1={markInfo.x + 30} y1={markInfo.y + 10} x2={markInfo.x + 30} y2={markInfo.y + 30} stroke="red"/>
          <rect 
            x={markInfo.x + 30} 
            y={markInfo.y + 30}
            fill="white"
            height={15 * showInfo.length}
            width={(maxLength) * 6}
            stroke="red"
            strokeWidth={1}>
          
          </rect>

          {showInfo.map((item, i) => <text 
            key={item}
            x={markInfo.x + 40} 
            y={markInfo.y + 15 * (i + 1)}
            dy={'2.2em'}
            className='mark-info'
            >
            {item + ': ' + data[markInfo.index][item]}
          </text>)}
      </g>;
  }
}