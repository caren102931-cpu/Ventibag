import React from 'react';

const HeroScreen = () => {
  return (
    <div className="section-container animate-fade-in" style={{ padding: '60px 0 0 0', justifyContent: 'space-between', backgroundColor: '#000' }}>
      
      {/* Hero Image Section */}
      <div style={{ flex: 1, position: 'relative', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <img 
          src="/images/01_main.jpg" 
          alt="Venti Bag Main" 
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
        
        {/* Text Section */}
        <div style={{ padding: '32px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', lineHeight: '1.3', marginBottom: '16px', letterSpacing: '-0.02em', color: '#fff' }}>
            AI가 당신의 라이프스타일에 맞는<br/>
            <span style={{ color: 'var(--accent)' }}>벤티백 구성</span>을 추천합니다.
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '0', fontWeight: '500' }}>
            생존수영 · 직장인 수영 · 롱핀 · 노트북 휴대까지
          </p>
        </div>
      </div>

      <div style={{ padding: '0 24px 32px 24px' }}>
        <button 
          className="btn btn-primary"
          onClick={() => document.getElementById('intro').scrollIntoView()}
        >
          벤티백 기본 소개 보기
        </button>
      </div>

    </div>
  );
};

export default HeroScreen;
