import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: "📦", value: "500+", label: "Produk Tersedia" },
  { icon: "🤝", value: "12K+", label: "Pelanggan Puas" },
  { icon: "⭐", value: "4.9", label: "Rating Toko" },
  { icon: "🚚", value: "2 Hari", label: "Estimasi Kirim" },
];

const VALUES = [
  {
    icon: "🔒",
    title: "Garansi Resmi",
    desc: "Semua produk bergaransi resmi distributor minimal 1 tahun. Klaim mudah, proses cepat.",
  },
  {
    icon: "💳",
    title: "Pembayaran Aman",
    desc: "Mendukung transfer bank, QRIS, kartu kredit, dan dompet digital. Transaksi terenkripsi SSL.",
  },
  {
    icon: "📞",
    title: "CS 7 Hari",
    desc: "Tim customer service siap membantu setiap hari pukul 08.00–21.00 WIB via chat & telepon.",
  },
  {
    icon: "♻️",
    title: "Retur 7 Hari",
    desc: "Tidak puas? Kembalikan produk dalam 7 hari sejak diterima, kami proses refund penuh.",
  },
];


// ─── Komponen ─────────────────────────────────────────────────────────────────

function StatCard({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <View style={styles.valueCard}>
      <View style={styles.valueIconBox}>
        <Text style={styles.valueIcon}>{icon}</Text>
      </View>
      <View style={styles.valueText}>
        <Text style={styles.valueTitle}>{title}</Text>
        <Text style={styles.valueDesc}>{desc}</Text>
      </View>
    </View>
  );
}

function TeamCard({
  name,
  role,
  emoji,
}: {
  name: string;
  role: string;
  emoji: string;
}) {
  return (
    <View style={styles.teamCard}>
      <View style={styles.teamAvatar}>
        <Text style={styles.teamEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.teamName}>{name}</Text>
      <Text style={styles.teamRole}>{role}</Text>
    </View>
  );
}

// ─── Layar Utama ──────────────────────────────────────────────────────────────

export default function ExploreScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO ── */}
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>TENTANG KAMI</Text>
          <Text style={styles.heroTitle}>TechGears</Text>
          <Text style={styles.heroSubtitle}>Store</Text>
          <View style={styles.heroDivider} />
          <Text style={styles.heroDesc}>
            Didirikan sejak 2019, TechGears hadir sebagai destinasi utama
            perangkat teknologi premium di Indonesia. Kami percaya bahwa
            alat yang tepat menghasilkan karya terbaik.
          </Text>
        </View>

        {/* ── STATISTIK ── */}
        <View style={styles.statsGrid}>
          {STATS.map((s) => (
            <StatCard key={s.label} icon={s.icon} value={s.value} label={s.label} />
          ))}
        </View>

        {/* ── MISI ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MISI KAMI</Text>
          <View style={styles.missionBox}>
            <Text style={styles.missionText}>
              "Menghadirkan perangkat teknologi berkualitas tinggi dengan
              harga terjangkau, layanan jujur, dan pengalaman belanja yang
              menyenangkan — untuk setiap kreator, gamer, dan profesional
              di Indonesia."
            </Text>
          </View>
        </View>

        {/* ── KEUNGGULAN ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>KEUNGGULAN KAMI</Text>
          {VALUES.map((v) => (
            <ValueCard key={v.title} icon={v.icon} title={v.title} desc={v.desc} />
          ))}
        </View>


        {/* ── KONTAK ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>HUBUNGI KAMI</Text>
          <View style={styles.contactBox}>
            <View style={styles.contactRow}>
              <Text style={styles.contactIcon}>📧</Text>
              <Text style={styles.contactText}>hello@techgears.id</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactIcon}>📱</Text>
              <Text style={styles.contactText}>+62 812-3456-7890</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactIcon}>📍</Text>
              <Text style={styles.contactText}>Jl. Sampul No. 12, Medan</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactIcon}>🕐</Text>
              <Text style={styles.contactText}>Senin – Minggu, 08.00 – 21.00 WIB</Text>
            </View>
          </View>
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 TechGears · All rights reserved</Text>
          <Text style={styles.footerSub}>Made in Indonesia</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── StyleSheet ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0A0A0F" },
  container: {
    paddingTop: 56,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },

  // Hero
  hero: { alignItems: "center", marginBottom: 32 },
  heroEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#00E5FF",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
    lineHeight: 44,
  },
  heroSubtitle: {
    fontSize: 42,
    fontWeight: "900",
    color: "#00E5FF",
    letterSpacing: 2,
    lineHeight: 44,
  },
  heroDivider: {
    width: 48,
    height: 3,
    backgroundColor: "#00E5FF",
    borderRadius: 2,
    marginVertical: 16,
  },
  heroDesc: {
    fontSize: 14,
    color: "#7A7A8C",
    textAlign: "center",
    lineHeight: 22,
  },

  // Stats grid
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 36,
    gap: 10,
  },
  statCard: {
    width: "47%",
    backgroundColor: "#14141E",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E1E2E",
    padding: 16,
    alignItems: "center",
  },
  statIcon: { fontSize: 26, marginBottom: 6 },
  statValue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#00E5FF",
    marginBottom: 2,
  },
  statLabel: { fontSize: 11, color: "#7A7A8C", textAlign: "center" },

  // Section
  section: { marginBottom: 36 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#00E5FF",
    textTransform: "uppercase",
    marginBottom: 14,
  },

  // Mission
  missionBox: {
    backgroundColor: "#14141E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E1E2E",
    borderLeftWidth: 3,
    borderLeftColor: "#00E5FF",
    padding: 20,
  },
  missionText: {
    fontSize: 14,
    color: "#AFAFC0",
    lineHeight: 24,
    fontStyle: "italic",
  },

  // Values
  valueCard: {
    flexDirection: "row",
    backgroundColor: "#14141E",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E1E2E",
    padding: 16,
    marginBottom: 10,
    alignItems: "flex-start",
    gap: 14,
  },
  valueIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#1E1E2E",
    alignItems: "center",
    justifyContent: "center",
  },
  valueIcon: { fontSize: 22 },
  valueText: { flex: 1 },
  valueTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  valueDesc: { fontSize: 12, color: "#7A7A8C", lineHeight: 18 },

  // Team
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  teamCard: {
    flex: 1,
    backgroundColor: "#14141E",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E1E2E",
    padding: 14,
    alignItems: "center",
  },
  teamAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#1E1E2E",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  teamEmoji: { fontSize: 26 },
  teamName: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 3,
  },
  teamRole: { fontSize: 10, color: "#7A7A8C", textAlign: "center" },

  // Contact
  contactBox: {
    backgroundColor: "#14141E",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E1E2E",
    padding: 18,
    gap: 14,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactIcon: { fontSize: 18, width: 28 },
  contactText: { fontSize: 13, color: "#AFAFC0" },

  // Footer
  footer: { alignItems: "center", marginTop: 8 },
  footerText: { fontSize: 11, color: "#3A3A4C" },
  footerSub: { fontSize: 11, color: "#3A3A4C", marginTop: 4 },
});