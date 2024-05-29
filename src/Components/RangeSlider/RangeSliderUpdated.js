import React, { useEffect, useState } from 'react';

const Slider = ({ min, max, step = 1, value, onChange }) => {
const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event) => {
    onChange(Number(event.target.value));
  };

  return (
    <div style={{justifyContent:'center', display:'flex', alignItems:'center', margin:8, padding:2, flexDirection:'column'}}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
        onChange={(e)=>setSliderValue(Number(e.target.value))}
        onMouseUp={handleChange}
        style={{width:'100%'}}
      />
      <div className="min-w-[40px] text-center">{value}</div>
    </div>
  );
};

export default Slider;
