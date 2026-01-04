import { useEffect } from 'react';
import {  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Line} from 'recharts';


export default function Chart({data, theme ,setTheme}) {

  const style = { width: '100%', maxWidth: '700px', maxHeight: '60vh', aspectRatio: 1.618 , margin: '0.1rem', padding: '0.5rem', fontSize: 'x-small'};

  const chartStyleLight = {stroke: "#000", fill: "rgba(18, 135, 220, 1)", color: "#111"};
  const chartStyleDark  = {stroke: "#3376c3ff", fill: "#384097ff", color: "#a4a"};


  useEffect(() => {
    console.log(theme);
  },[theme])

  return (
    <div className="chart">
      <AreaChart
        style={theme === 'dark ' ? style : style}
        // responsive // NOTE: this causes the slow stretching
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" style={theme === 'dark' ? {color: "#a33"} : {color: '#333'}}/>
        <YAxis width="auto" style={theme === 'dark' ? {color: "#a33"} : {color: '#a33'}}/>
        <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#888" />


        <Area type="monotone" dataKey="price"
          stroke={theme === 'dark' ? chartStyleDark.stroke : chartStyleLight.stroke}
          fill={theme === 'dark' ? chartStyleDark.fill : chartStyleLight.fill}
          style={{color: "#919"}}/>
        {/* <RechartsDevtools /> */}
      </AreaChart>
    </div>
  );
}
