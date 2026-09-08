"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { ResumeData, TemplateId } from "@/lib/types";
import { TemplateDocument } from "@/components/templates";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <span className="inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-medium text-slate-400">
        준비 중...
      </span>
    ),
  }
);

export function DownloadButton({
  templateId,
  data,
  watermark,
  fileName,
  className,
  children,
}: {
  templateId: TemplateId;
  data: ResumeData;
  watermark: boolean;
  fileName: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <PDFDownloadLink
      document={
        <TemplateDocument templateId={templateId} data={data} watermark={watermark} />
      }
      fileName={fileName}
      className={className}
    >
      {({ loading }) => (loading ? "PDF 생성 중..." : children)}
    </PDFDownloadLink>
  );
}
