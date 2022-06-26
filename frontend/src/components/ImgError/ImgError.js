import noImg from './no-img.png'
import noImg280x150 from './noimg-280x150.png'

export const handleImageError = (e) => {
    e.target.src = noImg;
}

export const handleUserImageError = (e) => {
    e.target.src = noImg280x150;
}