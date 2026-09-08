"use client";

import { ChangeEvent, useState } from "react";
import { ResumeData } from "@/lib/types";

function fieldId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100";
const labelClass = "mb-1 block text-xs font-medium text-slate-500";
const sectionTitleClass = "text-sm font-semibold text-slate-900";

type FieldConfig<T> = {
  key: keyof T & string;
  placeholder: string;
  span2?: boolean;
  multiline?: boolean;
};

type WithId = { id: string };

function RepeatingSection<T extends WithId>({
  title,
  items,
  fields,
  makeEmptyItem,
  onChange,
}: {
  title: string;
  items: T[];
  fields: FieldConfig<T>[];
  makeEmptyItem: () => T;
  onChange: (items: T[]) => void;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className={sectionTitleClass}>{title}</h3>
        <button
          type="button"
          onClick={() => onChange([...items, makeEmptyItem()])}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          + {title} 추가
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded-lg border border-slate-200 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {title} {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => onChange(items.filter((x) => x.id !== item.id))}
                className="text-xs text-slate-400 hover:text-red-500"
              >
                삭제
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {fields.map((f) => {
                function handle(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) {
                  onChange(
                    items.map((x) =>
                      x.id === item.id ? { ...x, [f.key]: e.target.value } : x
                    )
                  );
                }
                const cls = `${inputClass} ${f.span2 ? "sm:col-span-2" : ""} ${
                  f.multiline ? "min-h-20 resize-y" : ""
                }`;
                return f.multiline ? (
                  <textarea
                    key={f.key}
                    className={cls}
                    value={String(item[f.key] ?? "")}
                    placeholder={f.placeholder}
                    onChange={handle}
                  />
                ) : (
                  <input
                    key={f.key}
                    className={cls}
                    value={String(item[f.key] ?? "")}
                    placeholder={f.placeholder}
                    onChange={handle}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ResumeForm({
  data,
  onChange,
}: {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}) {
  function update<K extends keyof ResumeData>(key: K, value: ResumeData[K]) {
    onChange({ ...data, [key]: value });
  }

  const [skillsText, setSkillsText] = useState(data.skills.join(", "));

  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>이름</label>
          <input
            className={inputClass}
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="홍길동"
          />
        </div>
        <div>
          <label className={labelClass}>직무 타이틀</label>
          <input
            className={inputClass}
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="프론트엔드 개발자"
          />
        </div>
        <div>
          <label className={labelClass}>생년월일</label>
          <input
            className={inputClass}
            value={data.birthDate}
            onChange={(e) => update("birthDate", e.target.value)}
            placeholder="1996.04.12"
          />
        </div>
        <div>
          <label className={labelClass}>이메일</label>
          <input
            className={inputClass}
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className={labelClass}>전화번호</label>
          <input
            className={inputClass}
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="010-0000-0000"
          />
        </div>
        <div>
          <label className={labelClass}>포트폴리오 / GitHub / 블로그</label>
          <input
            className={inputClass}
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="github.com/yourname"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>지역</label>
          <input
            className={inputClass}
            value={data.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="서울특별시"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>자기소개</label>
          <textarea
            className={`${inputClass} min-h-24 resize-y`}
            value={data.summary}
            onChange={(e) => update("summary", e.target.value)}
            placeholder="핵심 역량과 강점을 2~3문장으로 요약해주세요."
          />
        </div>
      </section>

      <RepeatingSection
        title="경력"
        items={data.experience}
        onChange={(items) => update("experience", items)}
        makeEmptyItem={() => ({
          id: fieldId("exp"),
          company: "",
          role: "",
          period: "",
          description: "",
        })}
        fields={[
          { key: "role", placeholder: "직무 (예: 프론트엔드 개발자)" },
          { key: "company", placeholder: "회사명" },
          { key: "period", placeholder: "근무 기간 (예: 2023.03 - 재직중)", span2: true },
          { key: "description", placeholder: "주요 성과 및 업무 내용", span2: true, multiline: true },
        ]}
      />

      <RepeatingSection
        title="프로젝트"
        items={data.projects}
        onChange={(items) => update("projects", items)}
        makeEmptyItem={() => ({
          id: fieldId("proj"),
          name: "",
          period: "",
          link: "",
          description: "",
        })}
        fields={[
          { key: "name", placeholder: "프로젝트명" },
          { key: "period", placeholder: "진행 기간" },
          { key: "link", placeholder: "링크 (선택)", span2: true },
          { key: "description", placeholder: "역할과 성과", span2: true, multiline: true },
        ]}
      />

      <RepeatingSection
        title="학력"
        items={data.education}
        onChange={(items) => update("education", items)}
        makeEmptyItem={() => ({
          id: fieldId("edu"),
          school: "",
          degree: "",
          period: "",
        })}
        fields={[
          { key: "school", placeholder: "학교명" },
          { key: "degree", placeholder: "전공 / 학위" },
          { key: "period", placeholder: "재학 기간", span2: true },
        ]}
      />

      <RepeatingSection
        title="자격증 및 어학"
        items={data.certifications}
        onChange={(items) => update("certifications", items)}
        makeEmptyItem={() => ({
          id: fieldId("cert"),
          name: "",
          issuer: "",
          date: "",
        })}
        fields={[
          { key: "name", placeholder: "자격증 / 어학시험명 (예: TOEIC)" },
          { key: "issuer", placeholder: "발급기관 / 점수" },
          { key: "date", placeholder: "취득일", span2: true },
        ]}
      />

      <RepeatingSection
        title="수상 및 활동"
        items={data.activities}
        onChange={(items) => update("activities", items)}
        makeEmptyItem={() => ({
          id: fieldId("act"),
          title: "",
          org: "",
          period: "",
          description: "",
        })}
        fields={[
          { key: "title", placeholder: "수상명 / 활동명" },
          { key: "org", placeholder: "주최 / 소속" },
          { key: "period", placeholder: "시기", span2: true },
          { key: "description", placeholder: "간단한 설명 (선택)", span2: true, multiline: true },
        ]}
      />

      <section>
        <h3 className={`${sectionTitleClass} mb-3`}>스킬</h3>
        <input
          className={inputClass}
          value={skillsText}
          placeholder="React, TypeScript, Figma (쉼표로 구분)"
          onChange={(e) => {
            setSkillsText(e.target.value);
            update(
              "skills",
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            );
          }}
        />
      </section>
    </div>
  );
}
