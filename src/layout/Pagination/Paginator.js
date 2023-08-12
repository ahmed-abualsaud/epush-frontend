import { useState } from 'react'
import '../../assets/style/component/paginator.css'
import { isEmpty } from '../../utils/helper'

const Paginator = ({ links, perPage, total, getPageHandler }) => {

    const [currentIndex, setCurrentIndex] = useState(1)
    const [minIndex, setMinIndex] = useState(1)
    const [maxIndex, setMaxIndex] = useState(5)

    const setCurrentIndexHandler = (index) => {
        if (currentIndex > index) {
            let diff = currentIndex - index
            setMinIndex(minIndex - diff < 1 ? 1 : minIndex - diff)
            setMaxIndex(maxIndex - diff < 5 ? 5 : maxIndex - diff)
        }

        if (currentIndex < index) {
            let len = links.length - 2
            let diff = index - currentIndex
            setMinIndex(minIndex + diff > len - 5 ? len - 4 : minIndex + diff)
            setMaxIndex(maxIndex + diff > len ? len : maxIndex + diff)
        }
        setCurrentIndex(index)
    }

    return (
        <div className="pagination-wrapper">
            <div className="pagination">
                <a className="first page-numbers" onClick={() => {
                    getPageHandler(links[1].url.split("?")[0] + "?page=1" + "&take=" + perPage)
                    setCurrentIndexHandler(1)}
                }>first</a>
                {links?.map((link) => {

                    if (link.label.toLowerCase().includes("next") && ! isEmpty(link.url)) {
                        return (<a className="next page-numbers" onClick={() => {
                            getPageHandler(link.url + "&take=" + perPage)
                            setCurrentIndexHandler(currentIndex + 1)}
                        }>next</a>)
                    }

                    if (link.label.toLowerCase().includes("prev")  && ! isEmpty(link.url)) {
                        return (<a className="prev page-numbers" onClick={() => {
                            getPageHandler(link.url + "&take=" + perPage)
                            setCurrentIndexHandler(currentIndex - 1)}
                        }>prev</a>)
                    }

                    if (link.label.toLowerCase().includes("next") && isEmpty(link.url)) {
                        return (<a className="next page-numbers">next</a>)
                    }

                    if (link.label.toLowerCase().includes("prev")  && isEmpty(link.url)) {
                        return (<a className="prev page-numbers">prev</a>)
                    }

                    if (link.active === false && parseInt(link.label) <= maxIndex && parseInt(link.label) >= minIndex) {
                        return (<a className="page-numbers" onClick={() => {
                            getPageHandler(link.url + "&take=" + perPage)
                            setCurrentIndexHandler(parseInt(link.label))}
                        }>{link.label}</a>)
                    }

                    if (link.active === true) {
                        return (<a className="page-numbers current" aria-current="page">{link.label}</a>)
                    }
                })}
                <a className="last page-numbers" onClick={() => {
                    getPageHandler(links[1].url.split("?")[0] + "?page=" + (Math.ceil(parseFloat(total/perPage))) + "&take=" + perPage)
                    setCurrentIndexHandler(Math.ceil(parseFloat(total/perPage)))}
                }>last</a>
            </div>
        </div>
    )
}

export default Paginator