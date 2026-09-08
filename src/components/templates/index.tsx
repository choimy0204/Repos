import { ResumeData, TemplateId, TemplateMeta } from "@/lib/types";
import { MinimalTemplate } from "./MinimalTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { ClassicTemplate } from "./ClassicTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { BoldTemplate } from "./BoldTemplate";

export const templateList: TemplateMeta[] = [
  {
    id: "minimal",
    name: "미니멀",
    description: "여백 중심의 한 단 구성. 어떤 직무에도 무난하게 어울려요.",
    accent: "#33415c",
  },
  {
    id: "modern",
    name: "모던",
    description: "사이드바가 있는 2단 구성. 포트폴리오형 직무에 잘 맞아요.",
    accent: "#1f5f4f",
  },
  {
    id: "classic",
    name: "클래식",
    description: "정중앙 정렬의 격식 있는 구성. 공채·전통 기업 지원에 어울려요.",
    accent: "#6b2737",
  },
  {
    id: "compact",
    name: "컴팩트",
    description: "여백을 줄인 고밀도 한 장 구성. 경력이 많을 때 유용해요.",
    accent: "#52606d",
  },
  {
    id: "bold",
    name: "볼드",
    description: "컬러 헤더가 강조된 구성. 디자인·마케팅 직무에 잘 맞아요.",
    accent: "#e0522c",
  },
];

export function getTemplateMeta(id: TemplateId): TemplateMeta {
  return templateList.find((t) => t.id === id) ?? templateList[0];
}

export function TemplateDocument({
  templateId,
  data,
  watermark,
}: {
  templateId: TemplateId;
  data: ResumeData;
  watermark?: boolean;
}) {
  switch (templateId) {
    case "modern":
      return <ModernTemplate data={data} watermark={watermark} />;
    case "classic":
      return <ClassicTemplate data={data} watermark={watermark} />;
    case "compact":
      return <CompactTemplate data={data} watermark={watermark} />;
    case "bold":
      return <BoldTemplate data={data} watermark={watermark} />;
    default:
      return <MinimalTemplate data={data} watermark={watermark} />;
  }
}
