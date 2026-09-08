"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ResumeForm } from "@/components/editor/ResumeForm";
import { PdfPreview } from "@/components/editor/PdfPreview";
import { DownloadButton } from "@/components/editor/DownloadButton";
import { PaywallModal } from "@/components/editor/PaywallModal";
import { templateList, getTemplateMeta } from "@/components/templates";
import { emptyResumeData, sampleResumeData } from "@/lib/sample-data";
import { ResumeData, TemplateId } from "@/lib/types";
import { usePremiumStatus } from "@/lib/use-premium";

const TEMPLATE_IDS: TemplateId[] = ["minimal", "modern", "classic", "compact", "bold"];

function isTemplateId(value: string | null): value is TemplateId {
  return TEMPLATE_IDS.includes(value as TemplateId);
}

export function EditorClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = isTemplateId(searchParams.get("template"))
    ? (searchParams.get("template") as TemplateId)
    : "minimal";

  const [data, setData] = useState<ResumeData>(sampleResumeData);
  const [formKey, setFormKey] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const isPremium = usePremiumStatus();

  const meta = useMemo(() => getTemplateMeta(templateId), [templateId]);

  function handleClear() {
    setData(emptyResumeData);
    setFormKey((k) => k + 1);
  }

  function handleLoadSample() {
    setData(sampleResumeData);
    setFormKey((k) => k + 1);
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <Link href="/" className="text-base font-bold text-slate-900">
          레주메핏
        </Link>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-500">템플릿</label>
          <select
            value={templateId}
            onChange={(e) => router.push(`/editor?template=${e.target.value}`)}
            className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-700"
          >
            {templateList.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))}
          </select>
          {isPremium && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
              프리미엄 이용중
            </span>
          )}
        </div>
      </header>

      <div className="grid flex-1 items-start grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {meta.name} 템플릿 내용 입력
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handleLoadSample}
                className="text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                예시 불러오기
              </button>
              <button
                onClick={handleClear}
                className="text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                모두 지우기
              </button>
            </div>
          </div>
          <ResumeForm key={formKey} data={data} onChange={setData} />
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-6">
          <div>
            <PdfPreview
              templateId={templateId}
              data={data}
              watermark={!isPremium}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <DownloadButton
              templateId={templateId}
              data={data}
              watermark={!isPremium}
              fileName={`${data.name || "resume"}.pdf`}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {isPremium ? "PDF 다운로드" : "무료로 다운로드 (워터마크)"}
            </DownloadButton>
            {!isPremium && (
              <button
                onClick={() => setShowPaywall(true)}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                워터마크 제거하고 다운로드
              </button>
            )}
          </div>
        </div>
      </div>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  );
}
