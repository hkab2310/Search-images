import React, { useEffect, useState } from "react";
import ImageResult from "./ImageResult";

export default function Main() {
    let [searchParam, setSearchParam] = useState("");
    let [imagesLink, setImagesLink] = useState([]);
    let [bookmarks, setBookmarks] = useState([]);
    let [displayBM, setDisplayBM] = useState(false);
    function setQuery(e) {
        setSearchParam(e.target.value);
        // console.log(searchParam);
    }

    useEffect(() => {
        console.log(bookmarks);
    }, [bookmarks]);

    useEffect(() => {
        console.log(displayBM)
    }, [displayBM])

    async function onButtonClick(e) {
        e.preventDefault()
        setImagesLink([]);
        setDisplayBM(false);
        // console.log("Onclick")
        await fetch(`https://api.unsplash.com/search/photos?query=${searchParam}`, {
            headers: {
                Authorization: "Client-ID hzw_HhKO4Fzb-2mPU_vKU_M00rzWGkO5wWdZXuiDd-4"
            }
        }).then(res => res.json()).then((res) => {
            // console.log(res.results);
            let arr = [];
            for (let i = 0; i < res.results.length; i++) {
                arr.push(res.results[i].urls.regular);
            }
            // console.log(arr);
            // imagesLink = arr;
            setImagesLink([...arr]);
            // console.log(imagesLink);
        })
    }
    return (<>
        <div className="Header">
            <p>React Photo Search</p>
            <a href="#" onClick={() => {
                setImagesLink([]);
                setDisplayBM(true);
            }}>Bookmarks</a>
        </div>
        <div className="form-cont">
            <form>
                <input type="text" id="search-query" value={searchParam} onChange={setQuery} placeholder="Search free high resolution images">
                </input>
                <button onClick={onButtonClick}>
                    Search
                </button>
            </form>
        </div>
        {imagesLink && <div className="search-result">
            <ImageResult imagesLink={imagesLink} bookmarks={setBookmarks} />
        </div>}
        <div className="bookmark-imgs">
            {displayBM && bookmarks.map((e, index) => {
                return <img src={e} alt="bookmark-img" key={index} width="400px" height="300px" style={{ display: "block", margin: "auto"}}></img>
            })}
        </div>
    </>
    )
}