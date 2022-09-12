import { useEffect, useState } from "react";

function useDebounce(value,delay) {
    const [debounceValue,setDebonceValue]=useState(value)
    useEffect(()=>{
        const handler=setTimeout(()=>setDebonceValue(value),delay)

        return ()=> clearTimeout(handler)
    },[value])
    // console.log('value-deb',debounceValue)
    // console.log('val',value)
    return  debounceValue;
}
export default useDebounce