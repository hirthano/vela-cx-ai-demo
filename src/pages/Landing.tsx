import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MessageSquare, Zap, Globe, Check, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const translations = {
  en: {
    nav: "VelaCX",
    heroTitle: "Online businesses need\nreliable Customer Service.",
    heroDesc:
      "No extra headcount. Fast, accurate chat responses — powered by AI and backed by professional agents, 24/7.",
    problems: [
      "Chat volume spikes during campaigns & promos",
      "Time and money wasted on repetitive questions",
      "Hard to build a team that's ready 24/7 year-round",
    ],
    features: [
      {
        icon: MessageSquare,
        title: "AI + Human Agents",
        desc: "AI auto-responds instantly; VelaCX agents handle complex complaints professionally.",
      },
      {
        icon: Zap,
        title: "Unified Dashboard",
        desc: "All chats from Shopee, Lazada, TikTok & social media in one place.",
      },
      {
        icon: Globe,
        title: "Full Seller Control",
        desc: "Monitor response quality, jump into chats anytime, and leverage chat history for smarter replies.",
      },
    ],
    bullets: [
      "Auto-answers on orders, shipping, returns & store policies",
      "Handles repetitive daily questions with smart AI",
      "Escalates tough complaints to professional VelaCX staff",
      "Tracks response speed & quality with clear daily reports",
    ],
    formTitle: "Try it with your store",
    formDesc:
      "We'll build a demo AI assistant from your website and email you the link.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    urlLabel: "Store / Website URL",
    urlPlaceholder: "https://shopee.com/your-store",
    urlHint: "TikTok Shop, Lazada, Shopee, or any public website",
    submit: "Get my AI demo",
    submitting: "Submitting…",
    successToast: "We'll send you an email shortly to get started!",
    footnote:
      "After submitting, our team will build your custom AI assistant and send you a link to test it — typically within 24 hours.",
  },
  id: {
    nav: "VelaCX",
    heroTitle: "Bisnis online butuh\nlayanan CS yang handal.",
    heroDesc:
      "Tanpa tambahan orang. Respon chat cepat dan akurat — didukung AI dan agen profesional, 24/7.",
    problems: [
      "Volume chat meningkat drastis saat campaign & promo",
      "Waktu dan biaya terbuang untuk pertanyaan berulang",
      "Sulit membentuk tim yang siap 24/7 sepanjang tahun",
    ],
    features: [
      {
        icon: MessageSquare,
        title: "AI + Agen Manusia",
        desc: "AI merespons otomatis; agen VelaCX menangani komplain yang rumit secara profesional.",
      },
      {
        icon: Zap,
        title: "Dashboard Terpadu",
        desc: "Semua chat dari Shopee, Lazada, TikTok & medsos dalam satu tempat.",
      },
      {
        icon: Globe,
        title: "Kendali Penuh Seller",
        desc: "Pantau kualitas respon, masuk ke chat kapan saja, dan manfaatkan histori chat.",
      },
    ],
    bullets: [
      "Auto-jawab soal pesanan, pengiriman, retur & kebijakan toko",
      "Tangani pertanyaan berulang setiap hari dengan AI cerdas",
      "Eskalasi komplain sulit ke staf profesional VelaCX",
      "Pantau kecepatan & kualitas respon dengan laporan harian",
    ],
    formTitle: "Coba dengan toko Anda",
    formDesc:
      "Kami akan membangun demo asisten AI dari situs web Anda dan mengirimkan tautannya via email.",
    nameLabel: "Nama",
    namePlaceholder: "Nama Anda",
    emailLabel: "Email",
    emailPlaceholder: "anda@perusahaan.com",
    urlLabel: "URL Toko / Situs Web",
    urlPlaceholder: "https://shopee.co.id/toko-anda",
    urlHint: "TikTok Shop, Lazada, Shopee, atau situs web publik",
    submit: "Dapatkan demo AI saya",
    submitting: "Mengirim…",
    successToast: "Kami akan segera mengirimkan email untuk memulai!",
    footnote:
      "Setelah mengirim, tim kami akan membangun asisten AI kustom Anda dan mengirimkan tautan untuk mengujinya — biasanya dalam 24 jam.",
  },
  vi: {
    nav: "VelaCX",
    heroTitle: "Kinh doanh online cần\ndịch vụ CSKH đáng tin cậy.",
    heroDesc:
      "Không cần thêm nhân sự. Phản hồi chat nhanh, chính xác — bởi AI và đội ngũ chuyên nghiệp, 24/7.",
    problems: [
      "Lượng chat tăng vọt trong các đợt khuyến mãi",
      "Lãng phí thời gian và chi phí cho câu hỏi lặp lại",
      "Khó xây dựng đội ngũ sẵn sàng 24/7 quanh năm",
    ],
    features: [
      {
        icon: MessageSquare,
        title: "AI + Nhân viên",
        desc: "AI phản hồi tự động; nhân viên VelaCX xử lý khiếu nại phức tạp chuyên nghiệp.",
      },
      {
        icon: Zap,
        title: "Dashboard hợp nhất",
        desc: "Tất cả chat từ Shopee, Lazada, TikTok & mạng xã hội trong một nơi.",
      },
      {
        icon: Globe,
        title: "Kiểm soát toàn diện",
        desc: "Theo dõi chất lượng phản hồi, tham gia chat bất cứ lúc nào, tận dụng lịch sử chat.",
      },
    ],
    bullets: [
      "Tự động trả lời về đơn hàng, vận chuyển, đổi trả & chính sách",
      "Xử lý câu hỏi lặp lại hàng ngày bằng AI thông minh",
      "Chuyển khiếu nại khó đến nhân viên VelaCX chuyên nghiệp",
      "Theo dõi tốc độ & chất lượng phản hồi qua báo cáo hàng ngày",
    ],
    formTitle: "Thử với cửa hàng của bạn",
    formDesc:
      "Chúng tôi sẽ xây dựng trợ lý AI demo từ trang web của bạn và gửi liên kết qua email.",
    nameLabel: "Tên",
    namePlaceholder: "Tên của bạn",
    emailLabel: "Email",
    emailPlaceholder: "ban@congty.com",
    urlLabel: "URL Cửa hàng / Trang web",
    urlPlaceholder: "https://shopee.vn/cua-hang-cua-ban",
    urlHint: "TikTok Shop, Lazada, Shopee, hoặc trang web công khai",
    submit: "Nhận bản demo AI",
    submitting: "Đang gửi…",
    successToast: "Chúng tôi sẽ sớm gửi email để bạn bắt đầu!",
    footnote:
      "Sau khi gửi, đội ngũ của chúng tôi sẽ xây dựng trợ lý AI tùy chỉnh và gửi liên kết để bạn kiểm tra — thường trong vòng 24 giờ.",
  },
};

type Lang = keyof typeof translations;

const langLabels: Record<Lang, string> = {
  en: "EN",
  id: "ID",
  vi: "VI",
};

const Landing = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>("en");
  const [form, setForm] = useState({ name: "", email: "", storeUrl: "" });
  const [submitting, setSubmitting] = useState(false);

  const t = translations[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.storeUrl.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(t.successToast);
      setTimeout(() => navigate("/demo"), 1200);
    }, 800);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-border px-6 py-3.5">
        <span
          className="text-lg font-semibold tracking-tight text-foreground"
          style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
        >
          {t.nav}
        </span>
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-0.5 rounded-full border border-border bg-secondary p-0.5">
            {(Object.keys(langLabels) as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  lang === l
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>
          <a
            href="https://reorc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-foreground bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-all hover:bg-transparent hover:text-foreground"
          >
            reorc.com
          </a>
        </div>
      </nav>

      {/* Main content — two columns */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:py-16">
        <div className="grid w-full max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left — USP */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl whitespace-pre-line">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-md">
              {t.heroDesc}
            </p>

            {/* Bullets */}
            <ul className="mt-8 space-y-3">
              {t.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
                  <span className="text-sm text-foreground">{b}</span>
                </li>
              ))}
            </ul>

            {/* Feature cards */}
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {t.features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-4"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <f.icon className="mb-2 h-4 w-4 text-accent-foreground" />
                  <h3 className="text-xs font-semibold text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div
              className="rounded-xl border border-border bg-card p-6 sm:p-8"
              style={{ boxShadow: "var(--shadow-chat)" }}
            >
              <h2 className="text-lg font-semibold text-foreground">
                {t.formTitle}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">{t.formDesc}</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    {t.nameLabel}
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    {t.emailLabel}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    {t.urlLabel}
                  </label>
                  <input
                    name="storeUrl"
                    type="url"
                    required
                    value={form.storeUrl}
                    onChange={handleChange}
                    placeholder={t.urlPlaceholder}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30"
                  />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    {t.urlHint}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? t.submitting : t.submit}
                  {!submitting && <ArrowRight className="h-3.5 w-3.5" />}
                </button>
              </form>
            </div>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
              {t.footnote}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
