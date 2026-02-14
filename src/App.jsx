import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import { PageTransitionProvider } from './components/PageTransition'

const LandingAnimation = lazy(() => import('./components/LandingAnimation'))
const Home = lazy(() => import('./pages/Home'))
const EventPage = lazy(() => import('./pages/EventPage'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

function AppContent() {
    const location = useLocation()

    return (
        <>
            <div className="noise-bg" />
            <Navbar />
            <Suspense fallback={
                <div className="h-screen w-full bg-void flex items-center justify-center">
                    <div className="w-7 h-7 border-2 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
                </div>
            }>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<LandingAnimation />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/events/:slug" element={<EventPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Suspense>
        </>
    )
}

function App() {
    return (
        <Router>
            <PageTransitionProvider>
                <AppContent />
            </PageTransitionProvider>
        </Router>
    )
}

export default App
