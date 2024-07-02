import React, {useState} from 'react'

const ImageWithFade = ({src, alt, styles}) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const imageStyle = {
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
    };


  return (
    <img 
        src={src}
        alt={alt}
        style={imageStyle}
        className={styles}
        onLoad={() => setIsLoaded(true)}
    />
  )
}



export default ImageWithFade;