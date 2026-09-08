"use client";

import dynamic from "next/dynamic";
import { ResumeData, TemplateId } from "@/lib/types";
import { TemplateDocument } from "@/components/templates";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[75vh] max-h-[780px] items-center justify-center text-sm text-slate-400">
        미리보기를 준비하고 있어요...
      </div>
    ),
  }
);

export function PdfPreview({
  templateId,
  data,
  watermark,
}: {
  templateId: TemplateId;
  data: ResumeData;
  watermark: boolean;
}) {
  return (
    <PDFViewer
      className="h-[75vh] max-h-[780px] w-full rounded-xl border border-slate-200"
      showToolbar={false}
    >
      <TemplateDocument templateId={templateId} data={data} watermark={watermark} />
    </PDFViewer>
  );
}
