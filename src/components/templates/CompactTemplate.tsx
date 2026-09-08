"use client";

import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";
import { registerPdfFonts } from "@/lib/pdf-fonts";
import { WATERMARK_TEXT } from "@/lib/premium";

registerPdfFonts();

const ACCENT = "#52606d";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 9,
    color: "#1f242b",
    paddingTop: 34,
    paddingBottom: 34,
    paddingHorizontal: 42,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
    flexWrap: "wrap",
  },
  name: {
    fontSize: 17,
    fontWeight: 700,
    color: "#12181f",
  },
  title: {
    fontSize: 10,
    color: ACCENT,
    fontWeight: 600,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 6,
  },
  contactItem: {
    fontSize: 8,
    color: "#5b6472",
  },
  contactSep: {
    fontSize: 8,
    color: "#c3c8ce",
  },
  section: {
    marginTop: 11,
  },
  sectionTitle: {
    fontSize: 8.3,
    fontWeight: 700,
    color: ACCENT,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    paddingBottom: 3,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#d7dce1",
  },
  summary: {
    fontSize: 8.7,
    lineHeight: 1.45,
    color: "#333a42",
  },
  entry: {
    marginBottom: 6,
  },
  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  entryLeft: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    flexShrink: 1,
  },
  entryRole: {
    fontSize: 9,
    fontWeight: 700,
    color: "#182028",
  },
  entryCompany: {
    fontSize: 9,
    color: ACCENT,
  },
  entryPeriod: {
    fontSize: 7.6,
    color: "#7a828a",
  },
  entryDescription: {
    fontSize: 8.4,
    lineHeight: 1.4,
    color: "#3c434b",
    marginTop: 2,
  },
  skillsLine: {
    fontSize: 8.7,
    color: "#333a42",
    lineHeight: 1.6,
  },
  watermark: {
    position: "absolute",
    top: 340,
    left: -120,
    fontSize: 46,
    color: "#dbdfe3",
    opacity: 0.5,
    transform: "rotate(-32deg)",
  },
});

export function CompactTemplate({
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

        <View style={styles.headerRow}>
          <Text style={styles.name}>{data.name || "이름"}</Text>
          {data.title ? <Text style={styles.title}>{data.title}</Text> : null}
        </View>

        {contacts.length > 0 && (
          <View style={styles.contactRow}>
            {contacts.map((c, i) => (
              <View key={i} style={{ flexDirection: "row", gap: 6 }}>
                {i > 0 && <Text style={styles.contactSep}>|</Text>}
                <Text style={styles.contactItem}>{c}</Text>
              </View>
            ))}
          </View>
        )}

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
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryRole}>{exp.role || "직무"}</Text>
                    {exp.company ? (
                      <Text style={styles.entryCompany}>· {exp.company}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.entryPeriod}>{exp.period}</Text>
                </View>
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
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryRole}>{proj.name || "프로젝트명"}</Text>
                    {proj.link ? (
                      <Text style={styles.entryCompany}>· {proj.link}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.entryPeriod}>{proj.period}</Text>
                </View>
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
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryRole}>{edu.school || "학교"}</Text>
                    {edu.degree ? (
                      <Text style={styles.entryCompany}>· {edu.degree}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.entryPeriod}>{edu.period}</Text>
                </View>
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
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryRole}>{cert.name || "자격증명"}</Text>
                    {cert.issuer ? (
                      <Text style={styles.entryCompany}>· {cert.issuer}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.entryPeriod}>{cert.date}</Text>
                </View>
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
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryRole}>{act.title || "활동명"}</Text>
                    {act.org ? <Text style={styles.entryCompany}>· {act.org}</Text> : null}
                  </View>
                  <Text style={styles.entryPeriod}>{act.period}</Text>
                </View>
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
            <Text style={styles.skillsLine}>{data.skills.join("  ·  ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
