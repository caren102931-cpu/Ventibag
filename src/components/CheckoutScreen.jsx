import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const PAYMENT_METHODS = [
  { id: 'card', label: '신용/체크카드', pg: 'html5_inicis.INIpayTest', method: 'card' },
  { id: 'naverpay', label: '네이버페이', pg: 'html5_inicis.INIpayTest', method: 'naverpay' },
  { id: 'kakaopay', label: '카카오페이', pg: 'html5_inicis.INIpayTest', method: 'kakaopay' },
  { id: 'tosspay', label: '토스페이', pg: 'html5_inicis.INIpayTest', method: 'tosspay' },
];

// 개발/테스트 환경에서 결제 우회를 허용할지 여부
const IS_DEV = import.meta.env.DEV;

const CheckoutScreen = () => {
  const { orderData, setOrderData, setCurrentScreen, setPaymentResult } = useAppContext();
  const [payMethod, setPayMethod] = useState('card');
  const [isOfficeDelivery, setIsOfficeDelivery] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    if (!orderData.name || !orderData.phone || !orderData.address) {
      alert('배송 정보(이름, 연락처, 주소)를 모두 입력해주세요.');
      return;
    }
    if (!window.IMP) {
      alert('결제 모듈을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setIsProcessing(true);

    const IMP = window.IMP;
    IMP.init('imp55318151'); // 포트원 테스트 가맹점 코드

    const selectedMethod = PAYMENT_METHODS.find(m => m.id === payMethod);
    const merchantUid = 'venti_' + new Date().getTime();

    IMP.request_pay(
      {
        pg: selectedMethod.pg,
        pay_method: selectedMethod.method,
        merchant_uid: merchantUid,
        name: '벤티백 비즈니스 에디션',
        amount: orderData.amount,
        buyer_email: orderData.email || 'guest@ventibag.com',
        buyer_name: orderData.name,
        buyer_tel: orderData.phone,
        buyer_addr: orderData.address,
      },
      (rsp) => {
        setIsProcessing(false);

        if (rsp.success) {
          // ✅ 결제 성공: merchantUid 저장 후 즉시 구독 화면으로 이동
          // (구글 시트 전송은 구독 선택 후 SubscriptionScreen에서 수행)
          setPaymentResult(prev => ({
            ...prev,
            merchantUid: rsp.merchant_uid,
          }));
          setCurrentScreen('subscription');
        } else {
          alert('결제에 실패하였습니다.\n사유: ' + rsp.error_msg);
        }
      }
    );
  };

  return (
    <div className="app-container animate-fade-in">
      <div className="header" style={{ padding: '0 0 24px 0', borderBottom: 'none' }}>
        <h2 style={{ fontSize: '24px', margin: 0 }}>배송 및 결제</h2>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', marginBottom: '20px' }}>
        {/* 배송 정보 */}
        <div className="form-group">
          <label className="form-label">이름 *</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={orderData.name}
            onChange={handleChange}
            placeholder="받으시는 분 이름"
          />
        </div>

        <div className="form-group">
          <label className="form-label">연락처 *</label>
          <input
            type="tel"
            name="phone"
            className="form-input"
            value={orderData.phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">이메일</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={orderData.email}
            onChange={handleChange}
            placeholder="결제 내역 수신 이메일 (선택)"
          />
        </div>

        <div className="form-group" style={{ marginBottom: '8px' }}>
          <label className="form-label">배송지 주소 *</label>
          <input
            type="text"
            name="address"
            className="form-input"
            value={orderData.address}
            onChange={handleChange}
            placeholder="배송받으실 주소"
          />
        </div>

        <label className="checkbox-group" style={{ marginBottom: '32px' }}>
          <input
            type="checkbox"
            checked={isOfficeDelivery}
            onChange={(e) => setIsOfficeDelivery(e.target.checked)}
          />
          <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
            회사로 받기 (오피스 배송 최적화)
          </span>
        </label>

        {/* 결제 수단 */}
        <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>결제 수단</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          {PAYMENT_METHODS.map(method => (
            <div
              key={method.id}
              className={`card ${payMethod === method.id ? 'selected' : ''}`}
              onClick={() => setPayMethod(method.id)}
              style={{ padding: '16px', margin: 0, textAlign: 'center' }}
            >
              <div style={{ fontSize: '14px', fontWeight: '600' }}>{method.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 결제 버튼 */}
      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>총 결제 금액</span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent)' }}>
            {orderData.amount.toLocaleString()}원
          </span>
        </div>
        <button
          className="btn btn-primary"
          onClick={handlePayment}
          disabled={isProcessing}
          style={{ fontSize: '18px', padding: '18px' }}
        >
          {isProcessing ? '결제 요청 중...' : '결제하기'}
        </button>

        {/* 개발/테스트 전용 결제 우회 버튼 */}
        {IS_DEV && (
          <button
            onClick={() => {
              const mockUid = 'venti_test_' + new Date().getTime();
              setPaymentResult(prev => ({ ...prev, merchantUid: mockUid }));
              setCurrentScreen('subscription');
            }}
            style={{
              marginTop: '12px',
              width: '100%',
              padding: '12px',
              background: 'transparent',
              border: '1px dashed #555',
              borderRadius: '8px',
              color: '#888',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            🔧 [개발용] 결제 건너뛰고 다음 화면으로
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutScreen;
