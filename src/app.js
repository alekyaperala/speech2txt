import './App.css'
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition'
import useClipboard from 'react-use-clipboard'
import {useState} from 'react'

const App = () => {
  const [textToCopy, setTextToCopy] = useState('')
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  })
  const startListening = () =>
    SpeechRecognition.startListening({continuous: true, language: 'en-IN'})
  const {transcript, browserSupportsSpeechRecognition} = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  return (
    <div className="container">
      <h2>Speech to Text Converter</h2>
      <br />
      <p>
        converts speech from the microphone to text and makes it available to
        your React components.
      </p>

      <div
        className="main-content"
        role="textbox"
        tabIndex="0"
        onClick={() => setTextToCopy(transcript)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            setTextToCopy(transcript)
          }
        }}
      >
        {transcript}
      </div>

      <div className="btn-style">
        <button
          type="button"
          onClick={setCopied}
          style={{background: isCopied ? 'green' : 'rgb(17 166 131)'}}
        >
          {isCopied ? 'Copied!' : 'Copy to clipboard'}
        </button>
        <button
          type="button"
          onClick={startListening}
          style={{background: 'rgb(17 166 131)'}}
        >
          Start Listening
        </button>
        <button
          type="button"
          onClick={SpeechRecognition.stopListening}
          style={{background: 'rgb(17 166 131)'}}
        >
          Stop Listening
        </button>
      </div>
    </div>
  )
}

export default App
