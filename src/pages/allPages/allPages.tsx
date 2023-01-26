import { useEffect, useState } from "react"
import { getAllPages } from "../../api/allPages"
import { IAllPages } from "./types"

const AllPages = () =>{
    const [allpages, setAllPages] = useState<IAllPages[]|null>(null)
    useEffect(()=>{
        (async()=>{
            const {data} = await getAllPages()
            setAllPages(data)
        })()
    },[])
    return(
        <></>
    )
}

export default AllPages