import { AppProvider, useAppContext } from './context/AppContext';
import HeroScreen from './components/HeroScreen';
import IntroScreen from './components/IntroScreen';
import SurveyScreen from './components/SurveyScreen';
import ResultScreen from './components/ResultScreen';
import CompleteScreen from './components/CompleteScreen';
import './index.css';

const AppRouter = () => {
  const { aiData } = useAppContext();

  return (
    <>
      <div className="header-fixed">
        <div className="logo" onClick={() => window.scrollTo(0,0)} style={{ cursor: 'pointer' }}>Venti<span>Bag</span></div>
      </div>
      
      {/* 
        Fixed header takes up some space, but we can let sections handle their padding.
        Hero section is typically full screen.
      */}
      <div id="hero"><HeroScreen /></div>
      <div id="intro"><IntroScreen /></div>
      <div id="survey"><SurveyScreen /></div>
      
      {aiData.userType && (
        <div id="result"><ResultScreen /></div>
      )}
      
      {aiData.showComplete && (
        <div id="complete"><CompleteScreen /></div>
      )}
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
