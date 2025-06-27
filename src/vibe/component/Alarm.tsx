import { useEffect, useRef, useState } from 'preact/hooks'

const Alarm = () => {
    const [alarmTime, setAlarmTime] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [isTriggered, setIsTriggered] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const alarmAudio = useRef(new Audio('/alarm.mp3'))
    const hoverButton = useRef(new Audio('/keybatton.mp3'))

    const btn = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', isActive ? 'OFF' : 'OK']

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isActive || !alarmTime) return

            const now = new Date()
            const current = now.toTimeString().slice(0, 5)
            if (current === alarmTime && !isTriggered) {
                alarmAudio.current.play()
                setIsTriggered(true)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [alarmTime, isActive, isTriggered])

    const playHoverSound = () => {
        const audio = hoverButton.current
        audio.currentTime = 0
        audio.play()
    }

    const handleToggle = () => {
        if (!isActive && alarmTime === '') {
            setError('Пожалуйста, выберите время будильника')
            return
        }
        setIsActive(!isActive)
        setIsTriggered(false)
        setError(null)
    }

    const handleKeyPress = (key: string) => {
        if (key === 'Clear') {
            setAlarmTime('')
            return
        }

        if (key === 'OK' || key === 'OFF') {
            if (!isActive && (alarmTime.length !== 5 || !alarmTime.includes(':'))) {
                setError('Введите корректное время (например, 08:30)')
                return
            }
            handleToggle()
            return
        }

        let cleaned = alarmTime.replace(':', '')
        if (cleaned.length < 4) {
            const updated = cleaned + key
            if (updated.length === 4) {
                const formatted = updated.slice(0, 2) + ':' + updated.slice(2)
                setAlarmTime(formatted)
            } else {
                setAlarmTime(updated)
            }
        }
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
            <span
                style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '1.5em',
                    marginBottom: 10,
                }}
            >
                {alarmTime || '--:--'}
            </span>

            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

            {isActive && alarmTime && (
                <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <p>
                        Будильник установлен на: <strong>{alarmTime}</strong>
                    </p>
                    {isTriggered && <p style={{ color: 'red' }}>!!!Up!!!</p>}
                </div>
            )}

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    marginTop: '20px',
                }}
            >
                {btn.map((key) => (
                    <button
                        key={key}
                        onMouseEnter={playHoverSound}
                        onClick={() => handleKeyPress(key)}
                        style={{
                            padding: '16px',
                            fontSize: '1.2em',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                        }}
                    >
                        {key}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Alarm
