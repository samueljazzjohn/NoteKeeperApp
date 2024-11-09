import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';

const LoadingScreen = () => {
    return (
        <>
            <div className='w-full min-h-screen absolute flex justify-center items-center z-50 bg-white opacity-60'>
                <Player
                    src='https://assets8.lottiefiles.com/packages/lf20_ylxavL0aGR.json'
                    className="player"
                    loop
                    autoplay
                />
            </div>
        </>
    )
}

export default LoadingScreen