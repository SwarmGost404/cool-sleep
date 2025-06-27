import { useEffect } from 'preact/hooks'
import Weather from '../vibe/component/Weather'
import Sound from '../vibe/component/Sound'
import Alarm from '../vibe/component/Alarm'

export const Home = () => {
    useEffect(() => {
        const style = document.createElement('style')
        style.innerHTML = `
            @media (max-width: 768px) {
                .responsive-container {
                    flex-direction: column !important;
                    align-items: center;
                }
            }
        `
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return (
        <div
            className="responsive-container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                padding: '16px',
            }}
        >
            <Weather />
            <Sound />
            <Alarm />
        </div>
    )
}
