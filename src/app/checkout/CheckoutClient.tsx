"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { loadTossPayments, ANONYMOUS, TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";
import { getPlanById, buildOrderId, TOSS_CLIENT_KEY } from "@/lib/toss";

export function CheckoutClient() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "single";
  const plan = getPlanById(planId);

  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plan) return;

    let cancelled = false;

    async function setup() {
      try {
        const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
        // 가입/로그인 없는 서비스라 회원 식별 없이 비회원 결제로 진행한다.
        const w = tossPayments.widgets({ customerKey: ANONYMOUS });
        if (cancelled) return;
        setWidgets(w);
      } catch {
        setError("결제 위젯을 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
      }
    }

    setup();
    return () => {
      cancelled = true;
    };
  }, [plan]);

  useEffect(() => {
    if (!widgets || !plan) return;

    let cancelled = false;

    async function render() {
      await widgets!.setAmount({ currency: "KRW", value: plan!.price });
      await Promise.all([
        widgets!.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets!.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);
      if (!cancelled) setReady(true);
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [widgets, plan]);

  if (!plan) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <p className="text-sm text-slate-500">존재하지 않는 요금제예요.</p>
        <Link href="/" className="mt-4 inline-block text-sm text-emerald-700 underline">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <Link href="/" className="text-base font-bold text-slate-900">
          레주메핏
        </Link>
      </header>

      <div className="mx-auto max-w-lg px-6 py-10">
        <p className="text-xs font-medium text-emerald-700">테스트 결제</p>
        <h1 className="mt-1 text-xl font-bold text-slate-900">{plan.name}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {plan.price.toLocaleString()}원 · {plan.description}
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div id="payment-method" />
          <div id="agreement" />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          disabled={!ready}
          onClick={async () => {
            if (!widgets) return;
            try {
              await widgets.requestPayment({
                orderId: buildOrderId(plan.id),
                orderName: `레주메핏 ${plan.name}`,
                successUrl: `${window.location.origin}/payment/success`,
                failUrl: `${window.location.origin}/payment/fail`,
                customerName: "게스트",
              });
            } catch (err) {
              console.error(err);
              setError("결제 요청에 실패했거나 취소됐어요. 다시 시도해주세요.");
            }
          }}
          className="mt-6 w-full rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-emerald-800"
        >
          {ready ? `${plan.price.toLocaleString()}원 결제하기` : "결제 수단을 불러오는 중..."}
        </button>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-400">
          현재는 토스페이먼츠 테스트 환경에 연결되어 있어 실제 금액이 청구되지
          않습니다. 테스트 카드 정보로 결제 흐름 전체를 확인할 수 있어요.
        </p>
      </div>
    </main>
  );
}
