import React, { useEffect, useRef, useState } from 'react'

const fadeStyles = {
    fadeInSection: (duration, translateDir, translateValue) => ({
        opacity: 0,
        transition: `all ${duration}s ease-in-out`,
        transform: `translate${translateDir}(${translateValue}px)`
    }),
    loaded: () => ({
        opacity: 1,
        transform: `translate(0px)`,
    })
}

const ShowSectionFade = ({
    as: Component = 'div',
    children,
    className,
    duration = 0.25,
    translateDir = 'Y',
    translateValue = 200,
    rootMargin = "-100px 0px",
}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting && !isIntersecting)
                setIsIntersecting(entry.isIntersecting);
        }, 
        {rootMargin}    
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

    // const combinedClassName = `fade-in-section ${isIntersecting ? 'loaded' : ''} ${className || ''}`.trim();
    const style = {
        ...fadeStyles.fadeInSection(duration, translateDir, translateValue),
        ...(isIntersecting ? fadeStyles.loaded() : {})
    }
    return (
    <Component ref={ref} className={` ${className}`} style={style}>{children}</Component>
  );
}

export default ShowSectionFade