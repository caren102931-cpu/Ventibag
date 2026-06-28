import React from 'react';

const IntroScreen = () => {
  return (
    <div className="section-container animate-fade-in" style={{ padding: '80px 0 0 0' }}>
      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
          벤티백 구조를 먼저 확인하세요.
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          벤티백은 젖은 물품과 마른 물품을 완전히 분리 보관하는 구조입니다.
        </p>

        {/* Images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <img src="/images/02_structure.jpg" alt="Venti Bag Structure" style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
          <img src="/images/03_wetzone.jpg" alt="Venti Bag Wet Zone" style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
          <img src="/images/04_dryzone.jpg" alt="Venti Bag Dry Zone" style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
        </div>

        {/* Core Features */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>벤티백 핵심 기능</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="feature-item">
              <span style={{ color: 'var(--accent)', marginRight: '12px', fontSize: '18px' }}>✔</span> DRY / WET 완전 분리
            </div>
            <div className="feature-item">
              <span style={{ color: 'var(--accent)', marginRight: '12px', fontSize: '18px' }}>✔</span> 3면 오픈 구조
            </div>
            <div className="feature-item">
              <span style={{ color: 'var(--accent)', marginRight: '12px', fontSize: '18px' }}>✔</span> 3면 에어벤트
            </div>
            <div className="feature-item">
              <span style={{ color: 'var(--accent)', marginRight: '12px', fontSize: '18px' }}>✔</span> 탈취팩 수납존
            </div>
            <div className="feature-item">
              <span style={{ color: 'var(--accent)', marginRight: '12px', fontSize: '18px' }}>✔</span> 생활방수 원단
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 24px 32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-primary)' }}>
          AI는 사용자의 라이프스타일에 맞춰<br/>벤티백 구성을 추천합니다.
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => document.getElementById('survey').scrollIntoView()}
        >
          내 벤티백 구성 추천받기
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
