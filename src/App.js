import './App.css';
import Weather from './pages/Weather';

const App = () => {
  return (
    <div className='main-container'>
      <h2 className='site-title'>Weather Checker</h2>
      <Weather />
    </div>
  );
}

export default App;
