import noImg from '../components/no-img.png'


export const handleImageError = (e) => {
    e.target.src = noImg;
}