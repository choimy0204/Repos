import Link from "next/link";
import { pricingPlans } from "@/lib/premium";

export const metadata = {
  title: "환불정책 — 레주메핏",
};

export default function RefundPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
        ← 홈으로
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">환불정책</h1>
      <p className="mt-1 text-sm text-slate-400">시행일: 2026년 9월 9일</p>

      <div className="mt-8 flex flex-col gap-8 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">1. 판매 상품의 특성</h2>
          <p>
            레주메핏이 판매하는 상품은 다운로드 즉시 이용 가능한 디지털
            콘텐츠(워터마크 없는 PDF 다운로드 권한)입니다. 전자상거래 등에서의
            소비자보호에 관한 법률 제17조에 따라, 콘텐츠의 제공이 개시된
            디지털 콘텐츠는 청약철회가 제한될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">2. 환불 기준</h2>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border-b border-slate-200 px-3 py-2">상황</th>
                  <th className="border-b border-slate-200 px-3 py-2">환불 가능 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-slate-100 px-3 py-2">
                    결제 후, 워터마크 없는 PDF를 다운로드하기 전
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 font-medium text-emerald-700">
                    전액 환불 가능
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-slate-100 px-3 py-2">
                    워터마크 없는 PDF를 1회 이상 다운로드한 경우
                  </td>
                  <td className="border-b border-slate-100 px-3 py-2 font-medium text-slate-500">
                    원칙적으로 환불 불가
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    서비스 오류로 결제는 됐으나 다운로드가 불가능했던 경우
                  </td>
                  <td className="px-3 py-2 font-medium text-emerald-700">전액 환불</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">3. 상품별 환불 안내</h2>
          <ul className="list-disc space-y-1 pl-5">
            {pricingPlans.map((plan) => (
              <li key={plan.id}>
                <strong>{plan.name}</strong> ({plan.price.toLocaleString()}원): 다운로드
                전 환불 요청 시 결제 취소, 다운로드 후에는 위 기준에 따릅니다.
                {plan.id === "subscription" &&
                  " 구독 기간 중 다운로드 이력이 없다면 남은 기간에 대해 일할 환불이 가능합니다."}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-base font-semibold text-slate-900">4. 환불 신청 방법</h2>
          <p>
            아래 문의처로 결제 시 사용한 주문번호(또는 결제 일시, 결제
            금액)를 알려주시면 확인 후 영업일 기준 3일 이내에 처리해
            드립니다. 환불은 결제하신 수단으로 동일하게 이루어집니다.
          </p>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt className="text-slate-400">문의</dt>
            <dd>[고객 문의용 이메일을 입력해주세요]</dd>
          </dl>
        </section>
      </div>
    </main>
  );
}
