import { useEffect, useRef } from 'react';
import '../../assets/style/component/home-content.css'
import videoPath from '../../assets/video/epush-video.mp4'
import {getElement} from '../../utils/dom'

const HomeContent = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        // const body = document.querySelector('body');
        // body.addEventListener('click', function() {
        //     getElement("epush-video").muted=false
        // });
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    return (
        <div className="home-content">
            <video id="epush-video" autoPlay loop muted>
                <source src={videoPath} type="video/mp4"></source>
            </video>
        </div>
    );
  };
  
  export default HomeContent;