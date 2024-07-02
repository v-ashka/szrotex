import React, { useEffect, useRef, useState } from 'react'

const ShowSectionFade = ({children, className}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting && !isIntersecting)
                setIsIntersecting(entry.isIntersecting);
        }, 
        {rootMargin: "-300px"}    
    );
        // console.log(isIntersecting);
        if(ref.current)
            observer.observe(ref.current);

        return () => {
            if(ref.current){
                observer.unobserve(ref.current);
            }
            
        }
    }, [isIntersecting]);

    useEffect(() => {
        if(ref.current){
            if(isIntersecting){
                ref.current.classList.add("slide-in");
            }
        }
    }, [isIntersecting]);

    const combinedClassName = `fade-in-section ${isIntersecting ? 'loaded' : ''} ${className || ''}`.trim();
    return (
    <div ref={ref} className={combinedClassName}>{children}</div>
  );
}

export default ShowSectionFade