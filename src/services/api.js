// Google Apps Script Web App URL
// Vercel 환경변수 VITE_GAS_URL 에서 읽어옴 (없으면 콘솔 로그만 출력)
const GAS_URL = import.meta.env.VITE_GAS_URL || null;

/**
 * 구글 시트에 데이터를 POST로 전송하는 공통 함수
 * @param {Object} payload - 전송할 데이터 객체
 */
const postToSheet = async (payload) => {
  console.log('[VentiBag API] Sending to Google Sheets:', payload);

  if (!GAS_URL) {
    console.warn('[VentiBag API] VITE_GAS_URL 환경변수가 설정되지 않았습니다. 콘솔에만 출력합니다.');
    return { success: true, mock: true };
  }

  // Google Apps Script는 CORS 문제로 no-cors 사용 (응답 확인 불가하나 전송은 됨)
  try {
    await fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    console.log('[VentiBag API] 전송 완료:', payload.type);
    return { success: true };
  } catch (err) {
    console.error('[VentiBag API] 전송 실패:', err);
    throw err;
  }
};

const api = {
  /**
   * AI 추천 설문 완료 후 데이터 전송
   */
  saveSurvey: async ({ userType, aiRecommendation, feedback }) => {
    return postToSheet({
      type: 'AI_SURVEY',
      userType: userType || '',
      aiRecommendation: aiRecommendation || '',
      feedback: feedback || ''
    });
  },
};

export default api;
