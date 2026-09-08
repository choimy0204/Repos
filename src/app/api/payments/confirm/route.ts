import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { pricingPlans } from "@/lib/premium";

/** orderId로부터 고정된 UUID v4 형태의 Idempotency-Key를 만든다.
 * 같은 orderId로 confirm이 중복 호출돼도(예: 성공 페이지 리렌더) 토스 서버가
 * 같은 키로 인식해 첫 응답을 그대로 반환하므로 결제가 중복 승인되지 않는다.
 * @docs https://docs.tosspayments.com/reference/using-api/authorization#멱등키-헤더 */
function idempotencyKeyFor(orderId: string): string {
  const hash = createHash("sha256").update(orderId).digest();
  const bytes = Buffer.from(hash.subarray(0, 16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// 결제위젯(v2) 공개 테스트 시크릿 키. 실서비스 전환 시 반드시 환경변수
// TOSS_WIDGET_SECRET_KEY 로 개발자센터에서 발급받은 실제 시크릿 키를 주입할 것.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const WIDGET_SECRET_KEY =
  process.env.TOSS_WIDGET_SECRET_KEY || "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const paymentKey = body?.paymentKey;
  const orderId = body?.orderId;
  const amount = Number(body?.amount);

  if (!paymentKey || !orderId || !Number.isFinite(amount)) {
    return NextResponse.json({ message: "잘못된 요청이에요." }, { status: 400 });
  }

  // 결제 금액이 클라이언트에서 위변조되지 않았는지, 우리가 아는 플랜 가격과
  // 대조해서 확인한다. DB 없이도 최소한의 무결성 검증을 할 수 있는 방법이다.
  const planId = String(orderId).split("__")[0];
  const plan = pricingPlans.find((p) => p.id === planId);

  if (!plan || plan.price !== amount) {
    return NextResponse.json({ message: "결제 금액이 올바르지 않아요." }, { status: 400 });
  }

  const authHeader = "Basic " + Buffer.from(`${WIDGET_SECRET_KEY}:`).toString("base64");

  const tossResponse = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKeyFor(orderId),
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });

  const result = await tossResponse.json();

  if (!tossResponse.ok) {
    return NextResponse.json(result, { status: tossResponse.status });
  }

  return NextResponse.json({ ok: true, planId: plan.id, days: plan.days });
}
