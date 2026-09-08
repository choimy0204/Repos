"use client";

import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";
import { registerPdfFonts } from "@/lib/pdf-fonts";
import { WATERMARK_TEXT } from "@/lib/premium";

registerPdfFonts();

const ACCENT = "#e0522c";
const ACCENT_SOFT = "#fbe9e3";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 10,
    color: "#22262b",
  },
  headerBlock: {
    backgroundColor: ACCENT,
    paddingTop: 40,
    paddingBottom: 26,
    paddingHorizontal: 52,
  },
  name: {
    fontSize: 30,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 12,
    color: "#ffe4d9",
    fontWeight: 600,
    marginTop: 5,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    gap: 8,
  },
  contactPill: {
    fontSize: 8.3,
    color: "#ffffff",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 99,
  },
  body: {
    paddingTop: 26,
    paddingBottom: 44,
    paddingHorizontal: 52,
  },
  section: {
    marginBottom: 17,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: ACCENT,
    letterSpacing: 1,
    marginBottom: 9,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.55,
    color: "#33383e",
  },
  entry: {
    marginBottom: 11,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderLeftColor: ACCENT_SOFT,
  },
  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  entryRole: {
    fontSize: 10.5,
    fontWeight: 700,
    color: "#1a1e23",
  },
  entryPeriod: {
    fontSize: 8.3,
    color: "#868d94",
  },
  entryCompany: {
    fontSize: 9.5,
    color: ACCENT,
    fontWeight: 600,
    marginTop: 1,
  },
  entryDescription: {
    fontSize: 9.4,
    lineHeight: 1.5,
    color: "#3c424a",
    marginTop: 4,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  skillChip: {
    fontSize: 8.6,
    color: "#ffffff",
    fontWeight: 600,
    backgroundColor: ACCENT,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
  },
  watermark: {
    position: "absolute",
    top: 380,
    left: -120,
    fontSize: 46,
    color: "#00000022",
    transform: "rotate(-32deg)",
  },
});

export function BoldTemplate({
  data,
  watermark = false,
}: {
  data: ResumeData;
  watermark?: boolean;
}) {
  const contacts = [
    data.birthDate,
    data.email,
    data.phone,
    data.location,
    data.website,
  ].filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {watermark && <Text style={styles.watermark}>{WATERMARK_TEXT}</Text>}

        <View style={styles.headerBlock}>
          <Text style={styles.name}>{data.name || "이름"}</Text>
          {data.title ? <Text style={styles.title}>{data.title}</Text> : null}
          {contacts.length > 0 && (
            <View style={styles.contactRow}>
              {contacts.map((c, i) => (
                <Text key={i} style={styles.contactPill}>
                  {c}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.body}>
          {data.summary ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>소개</Text>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          ) : null}

          {data.experience.length > 0 && (
            <View style={styles.section}>
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
            <View style={styles.section}>
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

          {data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>학력</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.entry}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryRole}>{edu.school || "학교"}</Text>
                    <Text style={styles.entryPeriod}>{edu.period}</Text>
                  </View>
                  <Text style={styles.entryCompany}>{edu.degree}</Text>
                </View>
              ))}
            </View>
          )}

          {data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>자격증 및 어학</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.entry}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryRole}>{cert.name || "자격증명"}</Text>
                    <Text style={styles.entryPeriod}>{cert.date}</Text>
                  </View>
                  {cert.issuer ? <Text style={styles.entryCompany}>{cert.issuer}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {data.activities.length > 0 && (
            <View style={styles.section}>
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

          {data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>스킬</Text>
              <View style={styles.skillsRow}>
                {data.skills.map((skill, i) => (
                  <Text key={i} style={styles.skillChip}>
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
