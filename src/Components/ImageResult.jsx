import React, { useState } from "react";

export default function ImageResult(props) {
    let arr = props.imagesLink;
    const [isVisible,setIsVisible] = useState(false);
    return (<>
    {
        arr.map((e,index) => {
          return  <div className="img-con" onMouseEnter={()=>setIsVisible(true)} onMouseLeave={()=>setIsVisible(false)} key={index} >
                <img src={e} alt="img" ></img>
                {isVisible && <div className="popup" onClick={()=>{
                    props.bookmarks(prev=>{
                       return [...prev,e]
                    });
                    
                }}>BookMark</div>}
            </div>
        })
    }</>
    )
}