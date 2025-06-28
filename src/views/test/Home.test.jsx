import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/preact'
import { Home } from '../Home'

vi.mock('../../vibe/component/Weather', () => ({
    default: () => <div data-testid="weather">MockWeather</div>,
}))
vi.mock('../../vibe/component/Sound', () => ({
    default: () => <div data-testid="sound">MockSound</div>,
}))
vi.mock('../../vibe/component/Alarm', () => ({
    default: () => <div data-testid="alarm">MockAlarm</div>,
}))

describe('<Home />', () => {
    beforeEach(() => {
        render(<Home />)
    })

    afterEach(() => {
        cleanup()
    })

    it('renders Weather, Sound, and Alarm components', () => {
        expect(screen.getByTestId('weather')).toBeInTheDocument()
        expect(screen.getByTestId('sound')).toBeInTheDocument()
        expect(screen.getByTestId('alarm')).toBeInTheDocument()
    })

    it('injects responsive CSS into document head', () => {
        const styleTag = [...document.head.querySelectorAll('style')].find((tag) =>
            tag.innerHTML.includes('.responsive-container'),
        )
        expect(styleTag).toBeTruthy()
        expect(styleTag?.innerHTML).toContain('@media (max-width: 768px)')
    })
})
