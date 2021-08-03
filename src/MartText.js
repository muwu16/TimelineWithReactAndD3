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
          <rect 
            x={markInfo.x + 30} 
            y={markInfo.y + 30}
            fill="white"
            height={30 * showInfo.length}
            width={(maxLength) * 13}
            stroke="red"
            strokeWidth={1}>
          
          </rect>

          {showInfo.map((item, i) => <text 
            x={markInfo.x + 40} 
            y={markInfo.y + 30 * (i + 1)}
            dy={'0.9em'}
            className='mark-info'
            >
            
            {item + ': ' + data[markInfo.index][item]}
          
          </text>)}
  

      </g>;
  }
}