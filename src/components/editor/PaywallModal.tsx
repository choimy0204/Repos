"use client";

import Link from "next/link";
import { pricingPlans } from "@/lib/premium";

export function PaywallModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-1 flex items-start justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            워터마크 없이 다운로드
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
        <p className="mb-5 text-sm text-slate-500">
          하나만 선택해서 바로 깨끗한 PDF를 받아보세요.
        </p>

        <div className="flex flex-col gap-3">
          {pricingPlans.map((plan) => (
            <Link
              key={plan.id}
              href={`/checkout?plan=${plan.id}`}
              className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                plan.highlight
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {plan.name}
                  </span>
                  {plan.highlight && (
                    <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-medium text-white">
                      추천
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-500">{plan.description}</p>
              </div>
              <div className="whitespace-nowrap pl-3 text-right">
                <span className="text-base font-bold text-slate-900">
                  {plan.price.toLocaleString()}원
                </span>
                <span className="text-xs text-slate-400"> /{plan.unit}</span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-400">
          토스페이먼츠 테스트 환경으로 연결됩니다. 실제 금액은 청구되지 않아요.
        </p>
      </div>
    </div>
  );
}
