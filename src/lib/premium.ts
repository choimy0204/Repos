// 결제 게이트 모듈.
//
// 지금은 실제 PG 연동 전이라 localStorage 플래그로 잠금 해제 여부를 관리한다.
// 실서비스 전환 시 unlockPremium()의 구현부만 토스페이먼츠 결제창 호출 +
// 서버 검증(webhook)으로 교체하면 되도록 인터페이스를 분리해 두었다.

const STORAGE_KEY = "resumefit_premium_until";

/** 무료 다운로드에 표시되는 워터마크 문구 */
export const WATERMARK_TEXT = "RESUMEFIT.KR 무료 버전";

type Listener = () => void;
const listeners = new Set<Listener>();

/** usePremiumStatus 훅이 구독하는 자리. localStorage는 같은 탭에서 바뀌어도
 * storage 이벤트를 쏘지 않으므로 직접 알림을 보내야 한다. */
export function subscribePremium(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(): void {
  listeners.forEach((l) => l());
}

export function isPremiumUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const expiresAt = Number(raw);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

/**
 * 결제 성공 콜백에서 호출한다. days=0 이면 1회 다운로드권(24시간 유효),
 * days=30 이면 월 구독으로 취급한다.
 */
export function grantPremium(days: number): void {
  if (typeof window === "undefined") return;
  const durationMs = (days > 0 ? days : 1) * 24 * 60 * 60 * 1000;
  window.localStorage.setItem(STORAGE_KEY, String(Date.now() + durationMs));
  notify();
}

export function revokePremium(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  notify();
}

export type PricingPlan = {
  id: "single" | "subscription";
  name: string;
  price: number;
  unit: string;
  description: string;
  days: number;
  highlight?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "single",
    name: "1회 다운로드권",
    price: 3900,
    unit: "1회",
    description: "지금 만든 이력서를 워터마크 없이 PDF로 한 번 받아요.",
    days: 0,
  },
  {
    id: "subscription",
    name: "올인원 구독",
    price: 4900,
    unit: "월",
    description: "전체 템플릿 무제한 다운로드 + 새 템플릿 우선 제공.",
    days: 30,
    highlight: true,
  },
];
