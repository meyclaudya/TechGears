import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

// ─── Data Produk ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Mechanical\nKeyboard",
    price: "Rp 850.000",
    emoji: "⌨️",
    discount: true,
    imageUrl:
      "https://images.jamtangan.com/preset:sharp/resize:fit:462:492/dpr:1.5/width:462/height:492/resize:fit/plain/https://assets.jamtangan.com/images/product/magegee/6971969728349/1l_800x800.jpg",
    description:
      "Keyboard mekanikal dengan switch tactile Blue. Dilengkapi RGB backlight per-key, anti-ghosting 100%, dan frame aluminium premium. Cocok untuk coding marathon maupun gaming kompetitif.",
  },
  {
    id: 2,
    name: "Gaming\nMouse",
    price: "Rp 420.000",
    emoji: "🖱️",
    discount: false,
    imageUrl:
      "https://row.hyperx.com/cdn/shop/files/hyperx_pulsefire_core_1_main.jpg?v=1732516885",
    description:
      "Mouse gaming dengan sensor optik 16.000 DPI, 6 tombol yang dapat diprogram, dan berat hanya 78 gram. Desain ergonomis untuk tangan kanan dengan grip karet anti-selip.",
  },
  {
    id: 3,
    name: "USB-C Hub\n7-in-1",
    price: "Rp 310.000",
    emoji: "🔌",
    discount: false,
    imageUrl:
      "https://files.eci.id/documents/product/best/webhb02ggy/1744277994-1.webp",
    description:
      "Hub 7-in-1 dengan port: USB-C PD 100W, HDMI 4K@60Hz, USB-A 3.0 ×3, SD Card, dan MicroSD. Kompatibel dengan MacBook, laptop Windows, dan tablet modern. Plug-and-play, tanpa driver.",
  },
  {
    id: 4,
    name: 'LED Monitor\n24"',
    price: "Rp 2.100.000",
    emoji: "🖥️",
    discount: false,
    imageUrl:
      "https://files.eci.id/documents/product/best/webls24r350fzexxkgy/1702021127-1.webp",
    description:
      "Monitor IPS 24 inci Full HD 1080p dengan refresh rate 165Hz dan response time 1ms. Panel IPS menghadirkan warna akurat 99% sRGB, cocok untuk desainer grafis dan gamer profesional.",
  },
  {
    id: 5,
    name: "Webcam\nHD 1080p",
    price: "Rp 560.000",
    emoji: "📷",
    discount: true,
    imageUrl:
      "https://dynaquestpc.com/cdn/shop/products/Logitech_C922_01.jpg?v=1571552573&width=602",
    description:
      "Webcam Full HD 1080p@30fps dengan autofokus cepat dan mikrofon noise-cancelling built-in. Plug-and-play via USB-A/C, kompatibel dengan Zoom, Google Meet, dan OBS. Ideal untuk WFH dan streaming.",
  },
  {
    id: 6,
    name: "Headset\nGaming 7.1",
    price: "Rp 490.000",
    emoji: "🎧",
    discount: false,
    imageUrl:
      "https://row.hyperx.com/cdn/shop/files/hyperx_cloud_alpha_wireless_1_main.jpg?v=1745914432",
    description:
      "Headset gaming surround virtual 7.1 dengan driver 50mm. Bantalan memory foam yang nyaman dipakai berjam-jam, mikrofon retractable dengan LED merah saat mute. Jack 3.5mm + adaptor USB.",
  },
  {
    id: 7,
    name: "SSD External\n1 TB",
    price: "Rp 780.000",
    emoji: "💾",
    discount: false,
    imageUrl:
      "https://www.sinarphoto.com/prd/l/sandisk-extreme-portable-ssd-1tb-e61-01.jpg",
    description:
      "SSD eksternal NVMe 1TB dengan kecepatan baca hingga 1.050 MB/s via USB 3.2 Gen 2. Casing aluminium tahan benturan dan air (IP55). Ukuran saku, berat hanya 40 gram.",
  },
  {
    id: 8,
    name: "Mousepad\nXXL RGB",
    price: "Rp 195.000",
    emoji: "🟦",
    discount: false,
    imageUrl:
      "https://media.ldlc.com/r1600/ld/products/00/05/60/21/LD0005602103_2.jpg",
    description:
      "Mousepad XXL ukuran 900×400mm dengan pencahayaan RGB 14 mode yang dapat dikontrol. Permukaan kain halus optimal untuk sensor gaming, tepi dijahit agar tahan lama, dan alas karet anti-slip.",
  },
];

type Product = (typeof PRODUCTS)[0];

// ─── Modal Deskripsi Produk ───────────────────────────────────────────────────
function ProductModal({
  product,
  visible,
  onClose,
}: {
  product: Product | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!product) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={modal.overlay}>
        <View style={modal.box}>
          <Image
            source={{ uri: product.imageUrl }}
            style={modal.image}
            resizeMode="cover"
          />

          {product.discount && (
            <View style={modal.discountBadge}>
              <Text style={modal.discountText}>OFF</Text>
            </View>
          )}

          <View style={modal.content}>
            <Text style={modal.productName}>
              {product.name.replace("\n", " ")}
            </Text>
            <Text style={modal.productPrice}>{product.price}</Text>
            <View style={modal.divider} />
            <Text style={modal.descLabel}>Deskripsi Produk</Text>
            <Text style={modal.descText}>{product.description}</Text>
          </View>

          <TouchableOpacity style={modal.closeButton} onPress={onClose}>
            <Text style={modal.closeButtonText}>✕ Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Komponen Card Produk ─────────────────────────────────────────────────────
function ProductCard({
  product,
  cardWidth,
  onDetail,
}: {
  product: Product;
  cardWidth: number;
  onDetail: () => void;
}) {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      {product.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>OFF</Text>
        </View>
      )}

      <Image
        source={{ uri: product.imageUrl }}
        style={styles.cardImage}
        resizeMode="cover"
      />

      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{product.name}</Text>
        <View style={styles.divider} />
        <Text style={styles.cardPrice}>{product.price}</Text>

        <TouchableOpacity style={styles.detailButton} onPress={onDetail}>
          <Text style={styles.detailButtonText}>Lihat Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Komponen Baris Grid ──────────────────────────────────────────────────────
function ProductRow({
  products,
  cardWidth,
  onDetail,
}: {
  products: Product[];
  cardWidth: number;
  onDetail: (p: Product) => void;
}) {
  return (
    <View style={styles.productRow}>
      {products.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          cardWidth={cardWidth}
          onDetail={() => onDetail(item)}
        />
      ))}
    </View>
  );
}

// ─── Layar Utama ──────────────────────────────────────────────────────────────
export default function Index() {
  const { width } = useWindowDimensions();

  // State kontrol modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const PADDING = 24;
  const GAP = 12;
  const COLS = 2;
  const cardWidth = (width - PADDING * 2 - GAP * (COLS - 1)) / COLS;

  const row1 = PRODUCTS.slice(0, 2);
  const row2 = PRODUCTS.slice(2, 4);
  const row3 = PRODUCTS.slice(4, 6);
  const row4 = PRODUCTS.slice(6, 8);

  function handleDetail(product: Product) {
    setSelectedProduct(product);
    setModalVisible(true);
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0F" />

      <ProductModal
        product={selectedProduct}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingHorizontal: PADDING },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerBadge}>KATALOG RESMI</Text>
          <Text style={styles.headerTitle}>TechGears Store</Text>
          <Text style={styles.headerSubtitle}>
            Perangkat premium untuk kreator & gamer
          </Text>
          <View style={styles.headerAccent} />
        </View>

        <Text style={styles.sectionLabel}>Produk Pilihan</Text>

        <ProductRow
          products={row1}
          cardWidth={cardWidth}
          onDetail={handleDetail}
        />

        <ProductRow
          products={row2}
          cardWidth={cardWidth}
          onDetail={handleDetail}
        />

        <ProductRow
          products={row3}
          cardWidth={cardWidth}
          onDetail={handleDetail}
        />

        <ProductRow
          products={row4}
          cardWidth={cardWidth}
          onDetail={handleDetail}
        />

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 TechGears · All rights reserved
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── StyleSheet Utama ─────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0A0A0F" },
  container: {
    paddingTop: 56,
    paddingBottom: 40,
    flexDirection: "column",
    alignItems: "stretch",
  },

  // Header
  header: { alignItems: "center", marginBottom: 32 },
  headerBadge: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 3,
    color: "#00E5FF",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#7A7A8C",
    marginTop: 8,
    textAlign: "center",
  },
  headerAccent: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#00E5FF",
    marginTop: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#AFAFC0",
    letterSpacing: 1,
    marginBottom: 14,
  },

  // Grid row — flexDirection row
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  // Card
  card: {
    backgroundColor: "#14141E",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1E1E2E",
    position: "relative",
  },

  // Thumbnail gambar di card
  cardImage: {
    width: "100%",
    height: 85,
    backgroundColor: "#1E1E2E",
  },

  cardBody: { padding: 12 },

  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF3B5C",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    zIndex: 10,
  },
  discountText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  cardName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 17,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#1E1E2E",
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 12,
    fontWeight: "800",
    color: "#00E5FF",
    textAlign: "center",
    marginBottom: 10,
  },

  // Tombol Lihat Detail
  detailButton: {
    backgroundColor: "#00E5FF",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#0A0A0F",
    fontWeight: "900",
    fontSize: 11,
    letterSpacing: 0.5,
  },

  footer: { marginTop: 24, alignItems: "center" },
  footerText: { fontSize: 11, color: "#3A3A4C" },
});

// ─── StyleSheet Modal ─────────────────────────────────────────────────────────
const modal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.78)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  box: {
    width: "100%",
    backgroundColor: "#14141E",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1E1E2E",
  },

  // Gambar besar di modal
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#1E1E2E",
  },

  // Badge di modal
  discountBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "#FF3B5C",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 10,
  },
  discountText: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },

  content: { padding: 20, paddingTop: 16 },
  productName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: "#00E5FF",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#1E1E2E",
    marginBottom: 14,
  },
  descLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7A7A8C",
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  descText: {
    fontSize: 13,
    color: "#AFAFC0",
    lineHeight: 21,
  },

  // Tombol tutup
  closeButton: {
    margin: 16,
    marginTop: 4,
    backgroundColor: "#1E1E2E",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2A2A3A",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
});
