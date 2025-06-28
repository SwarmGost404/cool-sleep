import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import Alarm from '../Alarm'

describe('Alarm', () => {
    it('renders default state', () => {
        render(<Alarm />)
        expect(screen.getByText('--:--')).toBeInTheDocument()
    })

    it('shows error if trying to activate without setting time', () => {
        render(<Alarm />)
        const button = screen.getByText('OK')
        fireEvent.click(button)
        expect(screen.getByText(/Введите корректное время/i)).toBeInTheDocument()
    })

    it('allows typing time and activates alarm', () => {
        render(<Alarm />)

        // Set time to 08:30
        ;['0', '8', '3', '0'].forEach((digit) => {
            fireEvent.click(screen.getByText(digit))
        })

        expect(screen.getByText('08:30')).toBeInTheDocument()

        // Activate
        fireEvent.click(screen.getByText('OK'))

        expect(screen.queryByText(/Пожалуйста/)).not.toBeInTheDocument()
        const paragraph = screen.getByText(
            (_, el) => el.tagName.toLowerCase() === 'p' && el.textContent.includes('08:30'),
        )
        expect(paragraph).toBeInTheDocument()
    })

    it('clears time when Clear is clicked', () => {
        render(<Alarm />)
        ;['0', '9', '1', '5'].forEach((digit) => {
            fireEvent.click(screen.getByText(digit))
        })

        expect(screen.getByText('09:15')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Clear'))

        expect(screen.getByText('--:--')).toBeInTheDocument()
    })

    it('toggles alarm OFF after being ON', async () => {
        render(<Alarm />)
        ;['1', '2', '3', '4'].forEach((digit) => {
            fireEvent.click(screen.getByText(digit))
        })

        fireEvent.click(screen.getByText('OK'))

        expect(screen.getByText(/Будильник установлен на:/)).toBeInTheDocument()

        fireEvent.click(screen.getByText('OFF'))

        expect(screen.queryByText(/Будильник установлен на:/)).not.toBeInTheDocument()
    })
})
