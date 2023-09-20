import React from 'react';
import ReactSlider from 'react-slider';
import './slider.css';

export let lala = 0
const RangeSlider=({limit, setLimit})=>{
    return(
        <ReactSlider
            // orientation="vertical"
            max={limit}
            defaultValue={limit}
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            onAfterChange={(val)=>setLimit(val)}
            // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        />
    )
}

export default RangeSlider;