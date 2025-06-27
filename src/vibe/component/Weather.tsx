import axios from 'axios'
import { useState, useEffect, useRef } from 'preact/hooks'
import { type JSX } from 'preact/jsx-runtime'

const OPENWEATHER_API_KEY: string = 'a33d2cfcf48f2b8bd87b0209bdb123e5'

interface WeatherData {
    name: string
    main: { temp: number }
    weather: { description: string; icon: string }[]
}

const Weather = () => {
    const [city, setCity] = useState<string>('Moscow')
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isTomorrow, setIsTomorrow] = useState<boolean>(true)

    const fetchWeather = async () => {
        setLoading(true)
        setError(null)

        try {
            let url = ''
            let params: Record<string, string> = {
                q: city,
                appid: OPENWEATHER_API_KEY,
                units: 'metric',
                lang: 'ru',
            }

            if (isTomorrow) {
                // Получаем прогноз на завтра
                url = 'https://api.openweathermap.org/data/2.5/forecast'
            } else {
                // Текущая погода
                url = 'https://api.openweathermap.org/data/2.5/weather'
            }

            const response = await axios.get(url, { params })

            if (isTomorrow) {
                const list = response.data.list
                const tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                const targetDateStr = tomorrow.toISOString().split('T')[0] + ' 12:00:00'

                const forecastForTomorrow = list.find((item: any) => item.dt_txt === targetDateStr)

                if (forecastForTomorrow) {
                    setWeather({
                        ...response.data,
                        main: forecastForTomorrow.main,
                        weather: forecastForTomorrow.weather,
                        dt_txt: forecastForTomorrow.dt_txt,
                    })
                } else {
                    throw new Error('Прогноз на завтра не найден')
                }
            } else {
                setWeather(response.data)
            }
        } catch (err) {
            setWeather(null)
            setError('Не удалось загрузить погоду')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    const hoverButton = useRef(new Audio('/keybatton.mp3'))

    const playHoverSound = () => {
        const audio = hoverButton.current
        audio.currentTime = 0
        audio.play()
    }

    const handleChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        playHoverSound()
        setCity(event.currentTarget.value)
    }

    return (
        <div
            style={{
                margin: 'auto',
                width: '300px',
                border: '1px solid ',
                padding: 16,
                fontFamily: 'sans-serif',
                height: '400px',
                marginTop: '50px',
            }}
            className="blur"
        >
            <div style={{ marginBottom: 10 }}>
                <input
                    type="text"
                    value={city}
                    onChange={handleChange}
                    onFocus={() => setCity('')}
                    placeholder="Введите город"
                    style={{ padding: 8, width: '70%' }}
                />

                <button
                    onClick={() => {
                        fetchWeather()
                        playHoverSound()
                    }}
                    onMouseEnter={playHoverSound}
                    style={{ padding: 8, marginLeft: 8 }}
                >
                    Поиск
                </button>
            </div>

            {loading && <div>Загрузка...</div>}

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {weather && !loading && (
                <div style={{ textAlign: 'center' }}>
                    <h2>{weather.name}</h2>
                    <h1>{Math.round(weather.main.temp)}°C</h1>
                    <p style={{ textTransform: 'capitalize' }}>{weather.weather[0].description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    />
                    <label
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5em',
                            cursor: 'pointer',
                            fontSize: '0.95em',
                            userSelect: 'none',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={isTomorrow}
                            onChange={() => setIsTomorrow(!isTomorrow)}
                            style={{ display: 'none' }}
                        />
                        <span
                            style={{
                                width: '40px',
                                height: '22px',
                                backgroundColor: isTomorrow ? '#0077ff' : '#ccc',
                                borderRadius: '999px',
                                position: 'relative',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            <span
                                style={{
                                    content: '',
                                    position: 'absolute',
                                    top: '2px',
                                    left: isTomorrow ? '20px' : '2px',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    backgroundColor: '#fff',
                                    transition: 'left 0.25s ease',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                }}
                            />
                        </span>
                        <span>Показать погоду на завтра</span>
                    </label>
                </div>
            )}
        </div>
    )
}

export default Weather
