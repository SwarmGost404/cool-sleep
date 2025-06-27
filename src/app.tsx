import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from './views/Home'

import './app.css'

const LinkStyle = {
    display: 'block',
    textDecoration: 'none',
    color: '#fff',
    padding: '10px',
}

export function App() {
    return (
        <>
            <BrowserRouter>
                <nav
                    className="blur"
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <Link style={LinkStyle} to="/">
                        Home
                    </Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
