import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import api from '../services/api';

const SubscriptionScreen = () => {
  const { setCurrentScreen, orderData, paymentResult, setPaymentResult } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (subscribeYn) => {
    setIsProcessing(true);

    // 구독 선택 완료 → 구글 시트에 최종 데이터 전송 (백그라운드)
    const payload = {
      userEmail: orderData.email || 'guest@ventibag.com',
      merchantUid: paymentResult.merchantUid,
      amount: orderData.amount,
      subscribeYn,
    };

    // 화면 전환 먼저 (UX 우선), API 전송은 백그라운드
    setPaymentResult(prev => ({ ...prev, subscribeYn }));
    setCurrentScreen('complete');

    // 비동기 백그라운드 전송 (완료를 기다리지 않음)
    api.saveOrder(payload).catch(err =>
      console.error('[VentiBag] 구글 시트 전송 오류:', err)
    );
  };

  return (
    <div className="app-container animate-fade-in" style={{ justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '80px', marginBottom: '24px', lineHeight: 1 }}>✅</div>
        <h2 style={{ fontSize: '28px', marginBottom: '16px', lineHeight: '1.4' }}>
          결제가 완료되었습니다!
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-primary)' }}>
          매일 아침 뽀송한 출근을 위한 마지막 단계!
        </p>
      </div>

      {/* 구독 제안 카드 */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '16px',
        padding: '36px 20px 28px',
        textAlign: 'center',
        border: '2px solid var(--accent)',
        marginBottom: '40px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--accent)',
          color: '#fff',
          padding: '4px 16px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '800',
          whiteSpace: 'nowrap',
        }}>
          SPECIAL OFFER · 첫 달 무료
        </div>

        <div style={{ fontSize: '36px', marginBottom: '16px' }}>🧴</div>
        <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>벤티 전용 케어 탈취팩</h3>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.7' }}>
          가방 속 습기와 냄새를 완벽하게 잡아줍니다.<br />
          정기구독 하시면 <strong style={{ color: 'var(--text-primary)' }}>첫 달은 무료</strong>로 체험하세요.
        </p>
        <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)' }}>
          첫 달 무료 &nbsp;/&nbsp; 이후 월 4,900원
        </div>
      </div>

      {/* 버튼 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          className="btn btn-primary"
          onClick={() => handleSubscribe('Y')}
          disabled={isProcessing}
          style={{ fontSize: '16px', padding: '18px' }}
        >
          {isProcessing ? '처리 중...' : '좋아요! 첫 달 무료 구독하기'}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleSubscribe('N')}
          disabled={isProcessing}
        >
          괜찮습니다. 가방만 받을래요
        </button>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
