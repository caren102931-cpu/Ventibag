import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const options = [
  {
    id: 'elementary',
    title: '초등 생존수영',
    desc: '초등학교 5~6학년 생존수영 실습에 적합한 옵션',
    features: ['물통 전용 사이드 포켓', '이름표', '젖은 수영용품 분리', '메쉬 목욕바구니'],
    note: '※ 수모 전용 포켓은 제외합니다.'
  },
  {
    id: 'laptop',
    title: '노트북 사용자',
    desc: '출근과 운동을 함께 하는 직장인',
    features: ['노트북 전용 수납', 'DRY/WET 완전 분리', '탈취팩']
  },
  {
    id: 'sports',
    title: '스포츠 장비 사용자',
    desc: '수영 롱핀, 배드민턴 라켓, 테니스 라켓 등 외부 스포츠 장비를 사용하는 사람',
    features: ['가방 정면 결착 스트랩']
  },
  {
    id: 'laptop_sports',
    title: '노트북 + 스포츠 장비',
    desc: '출근도 하고 운동도 하는 사용자',
    features: ['노트북 수납', 'DRY/WET 분리', '정면 결착 스트랩', '탈취팩']
  }
];

const SurveyScreen = () => {
  const { setAiData } = useAppContext();
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    
    // Save to context
    const selectedOption = options.find(o => o.id === id);
    setAiData(prev => ({
      ...prev,
      userType: selectedOption.title
    }));

    // Scroll to result after state updates
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="section-container animate-fade-in" style={{ padding: '80px 0 0 0' }}>
      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '8px' }}>
          당신의 라이프스타일을<br/>선택해 주세요.
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          AI가 가장 적합한 옵션을 추천해 드립니다.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {options.map((option) => (
            <div 
              key={option.id}
              className={`card ${selectedId === option.id ? 'selected' : ''}`}
              onClick={() => handleSelect(option.id)}
            >
              <div className="card-title">{option.title}</div>
              <div className="card-desc">{option.desc}</div>
              
              <ul className="card-features">
                {option.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
              {option.note && (
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
                  {option.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurveyScreen;
