"use client";

import { Document, Page, View, Text, StyleSheet, Svg, Line } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";
import { registerPdfFonts } from "@/lib/pdf-fonts";
import { WATERMARK_TEXT } from "@/lib/premium";

registerPdfFonts();

const ACCENT = "#33415c";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 10,
    color: "#1f2933",
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 52,
  },
  name: {
    fontSize: 27,
    fontWeight: 700,
    color: "#12181f",
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 12,
    color: ACCENT,
    fontWeight: 600,
    marginTop: 5,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 14,
  },
  contactItem: {
    fontSize: 9,
    color: "#5b6b78",
  },
  rule: {
    marginTop: 16,
    marginBottom: 18,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 9,
  },
  sectionTitleMark: {
    width: 8,
    height: 8,
    backgroundColor: ACCENT,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontWeight: 700,
    color: "#12181f",
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.55,
    color: "#33414c",
  },
  entry: {
    marginBottom: 10,
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
    fontSize: 8.5,
    color: "#6b7885",
  },
  entryCompany: {
    fontSize: 9.5,
    color: ACCENT,
    fontWeight: 600,
    marginTop: 1,
  },
  entryDescription: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: "#3c4a56",
    marginTop: 4,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillChip: {
    fontSize: 8.5,
    color: ACCENT,
    fontWeight: 600,
    backgroundColor: "#eef1f4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
  },
  watermark: {
    position: "absolute",
    top: 340,
    left: -120,
    fontSize: 46,
    color: "#c2c9d1",
    opacity: 0.45,
    transform: "rotate(-32deg)",
  },
});

export function MinimalTemplate({
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

        <Text style={styles.name}>{data.name || "이름"}</Text>
        {data.title ? <Text style={styles.title}>{data.title}</Text> : null}

        {contacts.length > 0 && (
          <View style={styles.contactRow}>
            {contacts.map((c, i) => (
              <Text key={i} style={styles.contactItem}>
                {c}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.rule}>
          <Svg width="100%" height="3">
            <Line x1="0" y1="0" x2="32" y2="0" strokeWidth={3} stroke={ACCENT} />
            <Line x1="0" y1="2.5" x2="495" y2="2.5" strokeWidth={1} stroke="#e1e5ea" />
          </Svg>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionTitleMark} />
              <Text style={styles.sectionTitle}>소개</Text>
            </View>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionTitleMark} />
              <Text style={styles.sectionTitle}>경력</Text>
            </View>
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
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionTitleMark} />
              <Text style={styles.sectionTitle}>프로젝트</Text>
            </View>
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
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionTitleMark} />
              <Text style={styles.sectionTitle}>학력</Text>
            </View>
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
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionTitleMark} />
              <Text style={styles.sectionTitle}>자격증 및 어학</Text>
            </View>
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
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionTitleMark} />
              <Text style={styles.sectionTitle}>수상 및 활동</Text>
            </View>
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
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionTitleMark} />
              <Text style={styles.sectionTitle}>스킬</Text>
            </View>
            <View style={styles.skillsRow}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillChip}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
