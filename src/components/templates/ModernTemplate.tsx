"use client";

import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";
import { registerPdfFonts } from "@/lib/pdf-fonts";
import { WATERMARK_TEXT } from "@/lib/premium";

registerPdfFonts();

const ACCENT = "#1f5f4f";
const ACCENT_SOFT = "#e7efec";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 10,
    flexDirection: "row",
    color: "#1f2933",
  },
  sidebar: {
    width: "34%",
    backgroundColor: ACCENT,
    color: "#ffffff",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  main: {
    width: "66%",
    paddingVertical: 40,
    paddingHorizontal: 28,
  },
  name: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 1.25,
  },
  title: {
    fontSize: 10.5,
    color: "#cfe4dc",
    marginTop: 6,
  },
  sideSectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#bfe0d3",
    marginTop: 26,
    marginBottom: 8,
  },
  sideItem: {
    fontSize: 8.7,
    color: "#eaf3ef",
    marginBottom: 5,
    lineHeight: 1.4,
  },
  skillPill: {
    fontSize: 8.3,
    color: "#f2f8f5",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: ACCENT,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 18,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.55,
    color: "#33414c",
  },
  entry: {
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: ACCENT_SOFT,
  },
  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  entryRole: {
    fontSize: 10.5,
    fontWeight: 600,
    color: "#182028",
  },
  entryPeriod: {
    fontSize: 8.3,
    color: "#6b7885",
  },
  entryCompany: {
    fontSize: 9.5,
    color: ACCENT,
    marginTop: 1,
  },
  entryDescription: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: "#3c4a56",
    marginTop: 4,
  },
  watermark: {
    position: "absolute",
    top: 340,
    left: -100,
    fontSize: 44,
    color: "#00000022",
    transform: "rotate(-32deg)",
  },
});

export function ModernTemplate({
  data,
  watermark = false,
}: {
  data: ResumeData;
  watermark?: boolean;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {watermark && <Text style={styles.watermark}>{WATERMARK_TEXT}</Text>}

        <View style={styles.sidebar}>
          <Text style={styles.name}>{data.name || "이름"}</Text>
          {data.title ? <Text style={styles.title}>{data.title}</Text> : null}

          <Text style={styles.sideSectionTitle}>연락처</Text>
          {[data.birthDate, data.email, data.phone, data.location, data.website]
            .filter(Boolean)
            .map((c, i) => (
              <Text key={i} style={styles.sideItem}>
                {c}
              </Text>
            ))}

          {data.skills.length > 0 && (
            <>
              <Text style={styles.sideSectionTitle}>스킬</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
                {data.skills.map((skill, i) => (
                  <Text key={i} style={styles.skillPill}>
                    {skill}
                  </Text>
                ))}
              </View>
            </>
          )}

          {data.education.length > 0 && (
            <>
              <Text style={styles.sideSectionTitle}>학력</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.sideItem}>{edu.school}</Text>
                  <Text style={[styles.sideItem, { color: "#cfe4dc" }]}>
                    {edu.degree}
                  </Text>
                  <Text style={[styles.sideItem, { color: "#a9d3c4" }]}>
                    {edu.period}
                  </Text>
                </View>
              ))}
            </>
          )}

          {data.certifications.length > 0 && (
            <>
              <Text style={styles.sideSectionTitle}>자격증 및 어학</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 8 }}>
                  <Text style={styles.sideItem}>{cert.name}</Text>
                  <Text style={[styles.sideItem, { color: "#cfe4dc" }]}>
                    {cert.issuer}
                  </Text>
                  <Text style={[styles.sideItem, { color: "#a9d3c4" }]}>
                    {cert.date}
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>

        <View style={styles.main}>
          {data.summary ? (
            <View>
              <Text style={[styles.sectionTitle, { marginTop: 0 }]}>소개</Text>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>경력</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.entry}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryRole}>{exp.role || "직무"}</Text>
                    <Text style={styles.entryPeriod}>{exp.period}</Text>
                  </View>
                  <Text style={styles.entryCompany}>{exp.company}</Text>
                  {exp.description ? (
                    <Text style={styles.entryDescription}>{exp.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {data.projects.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>프로젝트</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.entry}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryRole}>{proj.name || "프로젝트명"}</Text>
                    <Text style={styles.entryPeriod}>{proj.period}</Text>
                  </View>
                  {proj.link ? <Text style={styles.entryCompany}>{proj.link}</Text> : null}
                  {proj.description ? (
                    <Text style={styles.entryDescription}>{proj.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {data.activities.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>수상 및 활동</Text>
              {data.activities.map((act) => (
                <View key={act.id} style={styles.entry}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryRole}>{act.title || "활동명"}</Text>
                    <Text style={styles.entryPeriod}>{act.period}</Text>
                  </View>
                  {act.org ? <Text style={styles.entryCompany}>{act.org}</Text> : null}
                  {act.description ? (
                    <Text style={styles.entryDescription}>{act.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
