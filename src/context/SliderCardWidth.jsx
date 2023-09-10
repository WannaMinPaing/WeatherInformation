import { createContext, useState } from "react";

export const SliderCardWidthContext = createContext({});

export const SliderCardWidthProvider = ({children})=>{
    const [cardWidth,setCardWidth]=useState();
    return (
        <SliderCardWidthContext.Provider value={{ cardWidth, setCardWidth }}>
            {children}
        </SliderCardWidthContext.Provider>
    )
}