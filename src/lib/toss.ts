import { pricingPlans, PricingPlan } from "./premium";

// 결제위젯(v2) 공개 테스트 키. 토스페이먼츠 샘플 저장소에 공식 공개된 값이라
// 개발자센터 가입 없이 바로 테스트 결제를 시도해볼 수 있다.
// @docs https://docs.tosspayments.com/guides/v2/payment-widget/integration
// 실서비스 전환 시 개발자센터의 "내 결제위젯 연동 키 > 클라이언트 키"로 교체할 것.
export const TOSS_CLIENT_KEY =
  process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function getPlanById(planId: string): PricingPlan | undefined {
  return pricingPlans.find((p) => p.id === planId);
}

/** orderId에 planId를 실어 보내고, 서버 confirm 단계에서 다시 파싱해
 * 결제 금액이 실제 플랜 가격과 일치하는지 검증한다(위변조 방지).
 * 토스 orderId 규격: 영문자/숫자/-_ 6~64자. (base64는 +,/,= 가 섞여 규격 위반이라 사용 금지) */
export function buildOrderId(planId: string): string {
  const random = Math.random().toString(36).slice(2, 12);
  return `${planId}__${Date.now().toString(36)}${random}`;
}

export function parsePlanIdFromOrderId(orderId: string): string {
  return orderId.split("__")[0] ?? "";
}
