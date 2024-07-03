import React from 'react'
import ImageExample from '../img/categories/avatarEx.jpg'
import ImageExample2 from '../img/categories/avatarEx2.jpg'
import ImageWithFade from './common/ImageWithFade'
import ShowSectionFade from './common/ShowSectionFade'

const UserOpinions = () => {
  return (
    <section className="opinions">
        
                    <div>
                        <p className='text-2xl font-semibold md:text-4xl'>Co mówią o nas klienci?</p>
                        <ul className='py-8 flex flex-col md:flex-row gap-8'>
                                <ShowSectionFade as='li' className='opinion' duration={0.4}>
                                    <p className='opinion__item'>Aplikacja Szrotex to prawdziwy game-changer dla mojego biznesu. Od kiedy zacząłem jej używać, liczba sprzedanych części wzrosła o 50%! Bardzo łatwa obsługa, intuicyjny interfejs i szeroki zasięg to tylko niektóre z jej zalet. Polecam Szrotex każdemu właścicielowi szrotu</p>
                                    <div className='opinion__info'>
                                        <ImageWithFade src={ImageExample } styles={'w-12 rounded-full'}/>
                                        <div className='opinion__author'>Marek Adamski</div>
                                    </div>
                                </ShowSectionFade>
                                <ShowSectionFade as='li' className='opinion' duration={0.6}>
                                    <p className='opinion__item'>Szrotex to idealne narzędzie dla każdego mechanika. Dzięki tej aplikacji mogę błyskawicznie i bez problemu znaleźć potrzebne części do naprawy samochodów moich klientów. Ogromny wybór części, konkurencyjne ceny i szybka dostawa to duże atuty Szrotexu. Polecam!</p>
                                    <div className='opinion__info'>
                                        <ImageWithFade src={ImageExample2 } styles={'w-12 rounded-full'}/>
                                        <div className='opinion__author'>Adrianna Zimmerman</div>
                                    </div>
                                </ShowSectionFade>
                                <ShowSectionFade as='li' className='opinion' duration={0.8}>
                                    <p className='opinion__item'>Szrotex to świetna aplikacja dla każdego, kto szuka używanych części samochodowych. Znalazłem tu wszystkie potrzebne części do mojego auta w okazyjnych cenach. Aplikacja jest bardzo prosta w obsłudze, a wyszukiwanie części jest intuicyjne. Polecam Szrotex wszystkim, którzy chcą zaoszczędzić na naprawach auta!</p>
                                    <div className='opinion__info'>
                                        <ImageWithFade src={ImageExample } styles={'w-12 rounded-full'}/>
                                        <div className='opinion__author'>Janusz Popiołek</div>
                                    </div>
                                </ShowSectionFade>
                        </ul>
                    </div>
                </section>
  )
}

export default UserOpinions