import { render, screen, fireEvent } from '@testing-library/preact'
import { vi } from 'vitest'
import Sound from '../Sound'

// Правильный мок класса Audio
const playMock = vi.fn()
const pauseMock = vi.fn()

class MockAudio {
  constructor(src) {
    this.src = src
    this.loop = false
    this.currentTime = 0
  }

  play = playMock
  pause = pauseMock
}

vi.stubGlobal('Audio', MockAudio)

describe('Sound Component', () => {
  beforeEach(() => {
    playMock.mockClear()
    pauseMock.mockClear()
  })

  it('renders all audio options', () => {
    render(<Sound />)
    const sounds = [
      'Пение птиц',
      'Сток дождя по зонтику',
      'Гроза',
      'Дождь',
      'Ночная работа',
    ]
    for (const name of sounds) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }
  })

  it('starts playing audio on click', () => {
    render(<Sound />)
    const item = screen.getByText('Пение птиц')
    fireEvent.click(item)
    expect(playMock).toHaveBeenCalled()
  })

  it('stops audio on second click', () => {
    render(<Sound />)
    const item = screen.getByText('Пение птиц')
    fireEvent.click(item) // start
    fireEvent.click(item) // stop
    expect(pauseMock).toHaveBeenCalled()
  })

  it('plays hover sound on mouse enter', () => {
    render(<Sound />)
    const item = screen.getByText('Пение птиц')
    fireEvent.mouseEnter(item)
    expect(playMock).toHaveBeenCalled()
  })
})
