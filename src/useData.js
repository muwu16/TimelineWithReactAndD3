import { useState, useEffect } from 'react';
import { csv, sort } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/muwu16/2a8b0af4177b6d2ec6cd56f95f309e4e/raw/07d2c1fae38b0070478f881adffc8476c513ca0f/history-timeline.csv'
export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {

      d.end = + d.end;
      d.start = + d.start;

      // d.sepal_length = +d.sepal_length;
      // d.sepal_width = +d.sepal_width;
      // d.petal_length = +d.petal_length;
      // d.petal_width = +d.petal_width;
      return d;
    };
    csv(csvUrl, row).then(d => {
      const d_sort = sort(d, d => d.start);
      setData(d_sort);
    });
  }, []);
  
  return data;
};