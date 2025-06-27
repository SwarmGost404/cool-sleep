import { useState, useRef, useEffect } from 'preact/hooks'
// import { lazy, Suspense } from "preact/compat"

// Rename interface to avoid conflict with built-in Audio type
interface AudioItem {
    url: string
    name: any
}

const Sound = () => {
    // const umbrella = lazy(() => import("../../assets/umbrella-svgrepo-com.svg"))
    // const keyboard = lazy(() => import("../../assets/full-moon-svgrepo-com.svg"))
    // const birds = lazy(() => import("../../assets/spring-svgrepo-com.svg"))
    // const rain = lazy(() => import("../../assets/rain-svgrepo-com.svg"))
    // const thunderstorm = lazy(() => import("../../assets/lightening-svgrepo-com.svg"))

    const audioSound: AudioItem[] = [
        { url: '/birds.mp3', name: 'Пение птиц' },
        { url: '/umbrella.mp3', name: 'Сток дождя по зонтику' },
        { url: '/thunderstorm.mp3', name: 'Гроза' },
        { url: '/rain.mp3', name: 'Дождь' },
        { url: '/keyboard.mp3', name: 'Ночная работа' },
    ]

    const [isActive, setIsActive] = useState<boolean[]>(Array(audioSound.length).fill(false))

    const audioRefs = useRef(
        audioSound.map((sound) => {
            const audio = new Audio(sound.url)
            audio.loop = true
            return audio
        }),
    )

    const hoverButton = useRef(new Audio('/keybatton.mp3'))

    const playHoverSound = () => {
        const audio = hoverButton.current
        audio.currentTime = 0
        audio.play()
    }

    useEffect(() => {
        playHoverSound()
    }, [])

    const startAudio = (index: number) => {
        const newState = [...isActive]
        newState[index] = true
        setIsActive(newState)
        audioRefs.current[index].play()
    }

    const stopAudio = (index: number) => {
        const newState = [...isActive]
        newState[index] = false
        setIsActive(newState)
        const audio = audioRefs.current[index]
        audio.pause()
        audio.currentTime = 0
    }

    return (
        <div
            style={{
                margin: 'auto',
                width: '300px',
                border: '1px solid',
                padding: 16,
                fontFamily: 'sans-serif',
                height: '400px',
                marginTop: '50px',
            }}
            className="blur"
        >
            {audioSound.map((sound, index: number) => (
                <div
                    key={index}
                    onClick={() => (isActive[index] ? stopAudio(index) : startAudio(index))}
                    onMouseEnter={playHoverSound}
                    className="underHover"
                    style={{
                        cursor: 'pointer',
                        padding: 10,
                        background: isActive[index] ? '#def' : 'transparent',
                        borderRadius: 8,
                        marginBottom: 8,
                        border: '1px solid',
                        textAlign: 'center',
                    }}
                >
                    {sound.name}
                </div>
            ))}
        </div>
    )
}

export default Sound
