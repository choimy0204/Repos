"use client";

import { Document, Page, View, Text, StyleSheet, Svg, Line } from "@react-pdf/renderer";
import { ResumeData } from "@/lib/types";
import { registerPdfFonts } from "@/lib/pdf-fonts";
import { WATERMARK_TEXT } from "@/lib/premium";

registerPdfFonts();

const ACCENT = "#6b2737";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Pretendard",
    fontSize: 10,
    color: "#20262f",
    paddingTop: 54,
    paddingBottom: 50,
    paddingHorizontal: 58,
  },
  header: {
    alignItems: "center",
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: ACCENT,
    letterSpacing: 3,
  },
  title: {
    fontSize: 10.5,
    color: "#4b5563",
    marginTop: 6,
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 8,
  },
  contactItem: {
    fontSize: 8.5,
    color: "#5b6472",
  },
  dot: {
    fontSize: 8.5,
    color: "#c3c8d1",
  },
  headerRule: {
    marginTop: 18,
    marginBottom: 22,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontWeight: 700,
    color: ACCENT,
    letterSpacing: 2.6,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 10,
  },
  summary: {
    fontSize: 9.8,
    lineHeight: 1.65,
    color: "#333c47",
    textAlign: "center",
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
    fontSize: 10.3,
    fontWeight: 700,
    color: "#1a2230",
  },
  entryPeriod: {
    fontSize: 8.3,
    color: "#7a8290",
  },
  entryCompany: {
    fontSize: 9.3,
    color: ACCENT,
    marginTop: 1,
  },
  entryDescription: {
    fontSize: 9.3,
    lineHeight: 1.55,
    color: "#3c4552",
    marginTop: 4,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
  },
  skillItem: {
    fontSize: 9,
    color: "#333c47",
  },
  skillSep: {
    fontSize: 9,
    color: "#c3c8d1",
  },
  watermark: {
    position: "absolute",
    top: 340,
    left: -120,
    fontSize: 46,
    color: "#d3d7dd",
    opacity: 0.5,
    transform: "rotate(-32deg)",
  },
});

function Rule({ y = 0 }: { y?: number }) {
  return (
    <Svg width="100%" height="1" style={{ marginTop: y }}>
      <Line x1="0" y1="0" x2="479" y2="0" strokeWidth={1} stroke="#d6dae1" />
    </Svg>
  );
}

export function ClassicTemplate({
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

        <View style={styles.header}>
          <Text style={styles.name}>{data.name || "이름"}</Text>
          {data.title ? <Text style={styles.title}>{data.title}</Text> : null}

          {contacts.length > 0 && (
            <View style={styles.contactRow}>
              {contacts.map((c, i) => (
                <View key={i} style={{ flexDirection: "row", gap: 8 }}>
                  {i > 0 && <Text style={styles.dot}>·</Text>}
                  <Text style={styles.contactItem}>{c}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.headerRule}>
          <Rule />
          <Svg width="100%" height="1" style={{ marginTop: 2 }}>
            <Line x1="0" y1="0" x2="479" y2="0" strokeWidth={1} stroke="#d6dae1" />
          </Svg>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>소개</Text>
            <Text style={styles.summary}>{data.summary}</Text>
            <Rule y={13} />
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
            <Rule y={3} />
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
            <Rule y={3} />
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
            <Rule y={3} />
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
            <Rule y={3} />
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
            <Rule y={3} />
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>스킬</Text>
            <View style={styles.skillsRow}>
              {data.skills.map((skill, i) => (
                <View key={i} style={{ flexDirection: "row", gap: 5 }}>
                  {i > 0 && <Text style={styles.skillSep}>ㅣ</Text>}
                  <Text style={styles.skillItem}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
