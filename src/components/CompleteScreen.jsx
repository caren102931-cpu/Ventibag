import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import api from '../services/api';

const CompleteScreen = () => {
  const { aiData, setAiData } = useAppContext();
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      ...aiData,
      feedback: feedback
    };

    setAiData(payload); // Context 업데이트

    try {
      await api.saveSurvey(payload);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submit Error:', error);
      alert('제출 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="section-container animate-fade-in" style={{ padding: '80px 0 0 0', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '80px', marginBottom: '24px', lineHeight: 1 }}>🎉</div>
          <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>소중한 의견 감사합니다!</h1>
          <p style={{ fontSize: '16px', color: 'var(--text-primary)', lineHeight: '1.8' }}>
            향후 정식 판매 및 기능 고도화에<br />
            적극 반영하도록 하겠습니다.
          </p>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setAiData({ userType: '', aiRecommendation: '', feedback: '', showComplete: false });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          처음으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="section-container animate-fade-in" style={{ padding: '80px 0 0 0' }}>
      <div style={{ padding: '32px 24px', flex: 1 }}>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
          AI 추천이 완료되었습니다.
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
          추천해 드린 옵션에 만족하시나요?<br/>
          개선 의견을 남겨주시면 큰 도움이 됩니다.
        </p>

        <div className="form-group">
          <label className="form-label" style={{ marginBottom: '16px', fontSize: '16px', color: 'var(--text-primary)' }}>
            벤티백에 추가되었으면 하는 기능이 있으신가요?
          </label>
          <textarea 
            className="form-input" 
            placeholder="자유롭게 입력해 주세요."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
      </div>

      <div style={{ padding: '0 24px 32px 24px' }}>
        <button 
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '제출 중...' : '제출하기'}
        </button>
      </div>
    </div>
  );
};

export default CompleteScreen;
