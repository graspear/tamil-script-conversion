import VatteluttuConverter from './components/VatteluttuConverter'
import './App.css'

function App() {
  const handleConverted = (convertedText) => {
    console.log('Converted text:', convertedText);
  };
  return (
    <>
      <h1>Vatteluttu Converter</h1>
      <VatteluttuConverter onConverted={handleConverted} />
    </>
  )
}

export default App
