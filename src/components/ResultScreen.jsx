import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const ResultScreen = () => {
  const { aiData, setAiData } = useAppContext();
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    if (!aiData.userType) return;
    
    let rec = '';
    switch (aiData.userType) {
      case '초등 생존수영':
        rec = '물통 전용 포켓 + 젖은 수영용품 분리 기능을 추천합니다.';
        break;
      case '노트북 사용자':
        rec = '노트북 보호 수납 + 탈취팩 기능을 추천합니다.';
        break;
      case '스포츠 장비 사용자':
        rec = '스포츠 장비 결착 스트랩 기능 추천합니다.';
        break;
      case '노트북 + 스포츠 장비':
        rec = '노트북 보호 수납 + 스포츠 장비 결착 스트랩을 추천합니다.';
        break;
      default:
        rec = '최적의 벤티백 옵션을 추천합니다.';
    }
    
    setRecommendation(rec);
    setAiData(prev => ({ ...prev, aiRecommendation: rec }));
  }, [aiData.userType, setAiData]);

  const handleNext = () => {
    setAiData(prev => ({ ...prev, showComplete: true }));
    setTimeout(() => {
      document.getElementById('complete')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="section-container animate-fade-in" style={{ padding: '80px 0 0 0' }}>
      <div style={{ padding: '32px 24px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px', lineHeight: '1.4' }}>
          AI 분석 완료
        </h2>
        
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '16px',
          padding: '40px 24px',
          border: '1px solid var(--border-color)',
          marginBottom: '32px'
        }}>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            {aiData.userType}의 라이프스타일을 위한<br/>맞춤형 제안
          </p>
          <h3 style={{ fontSize: '20px', color: 'var(--accent)', fontWeight: '600', lineHeight: '1.4' }}>
            "{recommendation}"
          </h3>
        </div>
      </div>

      <div style={{ padding: '0 24px 32px 24px' }}>
        <button 
          className="btn btn-primary"
          onClick={handleNext}
        >
          추천 옵션 설명 및 의견 남기기
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
