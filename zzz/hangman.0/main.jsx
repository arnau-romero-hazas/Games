const root = ReactDOM.createRoot(document.getElementById('root'))

const { useState } = React

function App() {
    const [view, setView] = useState('intro')
    const [status, setStatus] = useState('')
    const [feedback, setFeedback] = useState('')
    const [gameOver, setGameOver] = useState(false)
    const [attemptsLeft, setAttemptsLeft] = useState(data.constants.MAX_ATTEMPS)

    const handleStartSubmit = event => {
        event.preventDefault()
        const form = event.target
        const word = form.word.value

        try {
            logic.introduceWord(word)
            const status = logic.getStatus()
            setView('game')
            setStatus(status)
            setAttemptsLeft(data.constants.MAX_ATTEMPS)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleCharOrWordSubmit = event => {
        event.preventDefault()
        try {
            const { target: form } = event
            const { charOrWord: { value: charOrWord } } = form

         

            if (charOrWord.length === 1)
                logic.attemptCharacter(charOrWord.toLowerCase())
            else
                logic.attemptWord(charOrWord.toLowerCase())

            const status = logic.getStatus()
            setStatus(status)
            setAttemptsLeft(status.remainingAttemps)

            form.reset()

            const gameOver = logic.isGameOver()
            setFeedback(gameOver ? logic.isWon() ? 'You win!' : 'You lose!' : 'Keep trying...')
            setGameOver(gameOver)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleRestartClick = () => {
        try {
            logic.resetGame()
            setView('intro')
            setStatus('')
            setFeedback('')
            setGameOver(false)
            setAttemptsLeft(data.constants.MAX_ATTEMPS)
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <>
    <div className="title">
        <h1>Hangman Game</h1>
    </div>

    {view === "intro" &&
        <div className="intro">
            <form onSubmit={handleStartSubmit}>
                <label htmlFor="word">Guess word? </label>
                <input type="text" name="word" id="word" />
                <button type="submit">Start</button>
            </form>
        </div>
    }

    {view === 'game' && <>
        <div className="game-container">
            <div className="image-word">
            {/* Imagen del ahorcado a la izquierda */}
            <img 
                src={`./public/hangman-${6 - status.remainingAttemps}.jpg`} 
                alt={`Hangman stage ${6 - status.remainingAttemps}`} 
                className="hangman-image"
            />
            
            {/* Palabra en progreso a la derecha de la imagen */}
            <p className="word-status">{status.status}</p>
            </div>
        </div>

        {/* Formulario e intentos debajo */}
        <div className="attempt-section">
        <h2>{feedback}</h2> <p className="attempts">Remaining attempts: {status.remainingAttemps}</p>

            <form onSubmit={handleCharOrWordSubmit} className="input-form">
                <label htmlFor="charOrWord">Char or Word?</label>
                <input type="text" name="charOrWord" id="charOrWord" />
               {!gameOver && <button type="submit">Try</button> } {gameOver && <button type="button" onClick={handleRestartClick}>Restart</button>}
            </form>

            
            
        </div>
    </>}
</>

}

root.render(<App />)
