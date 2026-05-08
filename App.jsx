import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Coffee,
  Facebook,
  Headphones,
  Home,
  Instagram,
  Mail,
  Menu,
  Mic2,
  Moon,
  PlayCircle,
  Search,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import "./style.css";

const navItems = [
  { id: "home", label: "หน้าแรก", icon: Home },
  { id: "articles", label: "บทความ", icon: BookOpen },
  { id: "podcast", label: "Podcast", icon: Mic2 },
  { id: "about", label: "เกี่ยวกับเรา", icon: Sparkles },
  { id: "contact", label: "ติดต่อ", icon: Mail },
];

const articles = [
  {
    id: 1,
    title: "ทำไมเราถึงหมดไฟ ทั้งที่ไม่ได้ขี้เกียจ",
    category: "ชีวิตการทำงาน",
    date: "8 พ.ค. 2026",
    readTime: "5 นาที",
    excerpt:
      "บางครั้งความเหนื่อยไม่ได้มาจากงานเยอะ แต่มาจากการใช้พลังใจกับสิ่งที่เราไม่เห็นความหมายอีกต่อไป",
    tags: ["หมดไฟ", "งาน", "ใจ"],
  },
  {
    id: 2,
    title: "สมองต้องการพัก ไม่ใช่แค่เวลาว่าง",
    category: "พัฒนาตัวเอง",
    date: "7 พ.ค. 2026",
    readTime: "4 นาที",
    excerpt:
      "เวลาว่างไม่ได้แปลว่าสมองได้พักเสมอไป โดยเฉพาะวันที่เรายังปล่อยให้ความคิดวิ่งอยู่ตลอดเวลา",
    tags: ["พักผ่อน", "สมอง", "สุขภาพใจ"],
  },
  {
    id: 3,
    title: "การโตเป็นผู้ใหญ่ คือการเลือกเหนื่อยให้ถูกเรื่อง",
    category: "มุมคิดชีวิต",
    date: "6 พ.ค. 2026",
    readTime: "6 นาที",
    excerpt:
      "เราอาจหลีกเลี่ยงความเหนื่อยไม่ได้ แต่เราเลือกได้ว่าจะเหนื่อยเพื่ออะไร และเพื่อใคร",
    tags: ["ชีวิต", "ผู้ใหญ่", "การเติบโต"],
  },
  {
    id: 4,
    title: "ทำไมตอนกลางคืน เราถึงคิดมากกว่าตอนกลางวัน",
    category: "จิตวิทยาใกล้ตัว",
    date: "5 พ.ค. 2026",
    readTime: "5 นาที",
    excerpt:
      "เมื่อโลกเงียบลง ความคิดที่เรากดไว้ทั้งวันมักดังขึ้น นี่อาจไม่ใช่ความอ่อนแอ แต่เป็นสัญญาณให้เราฟังตัวเอง",
    tags: ["คิดมาก", "กลางคืน", "จิตวิทยา"],
  },
];

const podcasts = [
  {
    ep: "EP.01",
    title: "เหนื่อยแบบไหนที่ควรพัก และเหนื่อยแบบไหนที่ควรไปต่อ",
    duration: "12:30",
  },
  {
    ep: "EP.02",
    title: "ทำไมคนเก่งหลายคนถึงไม่มั่นใจในตัวเอง",
    duration: "15:10",
  },
  {
    ep: "EP.03",
    title: "เลิกงานแล้ว แต่ใจยังไม่เลิกคิดเรื่องงาน",
    duration: "10:45",
  },
];

const categories = ["ทั้งหมด", "ชีวิตการทำงาน", "พัฒนาตัวเอง", "มุมคิดชีวิต", "จิตวิทยาใกล้ตัว"];

function Button({ children, variant = "primary", onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`btn btn-${variant} ${className}`}>
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="section-title">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchCategory = category === "ทั้งหมด" || article.category === category;
      const keyword = query.trim().toLowerCase();
      const matchQuery =
        !keyword ||
        article.title.toLowerCase().includes(keyword) ||
        article.excerpt.toLowerCase().includes(keyword) ||
        article.tags.join(" ").toLowerCase().includes(keyword);
      return matchCategory && matchQuery;
    });
  }, [query, category]);

  const goTo = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="site">
      <header className="header">
        <div className="header-inner">
          <button onClick={() => goTo("home")} className="brand">
            <div className="brand-icon"><Coffee size={22} /></div>
            <div>
              <p className="brand-title">samong หลังเลิกงาน</p>
              <p className="brand-subtitle">Samong after work</p>
            </div>
          </button>

          <nav className="desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className={activeSection === item.id ? "nav-active" : ""}
                >
                  <Icon size={16} /> {item.label}
                </button>
              );
            })}
          </nav>

          <div className="desktop-action">
            <Button onClick={() => goTo("contact")}>ติดตามเพจ</Button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-nav">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => goTo(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero">
          <div className="glow glow-main" />
          <div className="glow glow-side" />

          <div className="hero-grid">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="pill"><Moon size={16} /> คอนเทนต์สำหรับคนที่ยังอยากเติบโต หลังเลิกงาน</div>
              <h1>เติมความคิดดี ๆ ให้สมอง หลังวันที่เหนื่อยมาทั้งวัน</h1>
              <p className="hero-text">
                เว็บรวมบทความ พอดแคสต์ และมุมคิดสั้น ๆ สำหรับคนทำงานที่อยากเข้าใจตัวเอง เข้าใจงาน และใช้ชีวิตอย่างมีทิศทางมากขึ้น
              </p>
              <div className="hero-actions">
                <Button onClick={() => goTo("articles")}>เริ่มอ่านบทความ <ArrowRight size={18} /></Button>
                <Button variant="secondary" onClick={() => goTo("podcast")}><PlayCircle size={18} /> ฟัง Podcast</Button>
              </div>

              <div className="stats">
                <div><strong>5m</strong><span>อ่านจบไว</span></div>
                <div><strong>4</strong><span>หมวดหลัก</span></div>
                <div><strong>∞</strong><span>ไอเดียต่อยอด</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="feature-card">
                <div className="quote-card">
                  <p>Quote of the day</p>
                  <h2>“บางครั้งชีวิตไม่ได้ต้องการคำตอบใหม่ แค่ต้องการมุมมองใหม่”</h2>
                  <span>โดย samong หลังเลิกงาน</span>
                </div>
                <div className="mini-list">
                  {articles.slice(0, 3).map((article) => (
                    <div key={article.id}>
                      <small>{article.category}</small>
                      <p>{article.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="articles" className="section">
          <div className="container">
            <SectionTitle
              eyebrow="Articles"
              title="บทความล่าสุด"
              desc="คัดประเด็นจากชีวิต การทำงาน และจิตวิทยาใกล้ตัว มาเรียบเรียงใหม่ให้อ่านง่ายและเอาไปคิดต่อได้จริง"
            />

            <div className="filters">
              <div className="search-box">
                <Search size={20} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ค้นหาบทความ เช่น หมดไฟ, พักผ่อน, คิดมาก"
                />
              </div>
              <div className="category-list">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={category === item ? "category-active" : ""}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="article-grid">
              {filteredArticles.map((article) => (
                <article key={article.id} className="article-card">
                  <div className="article-meta">
                    <span>{article.category}</span>
                    <small>{article.readTime}</small>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-footer">
                    <span><CalendarDays size={16} /> {article.date}</span>
                    <ArrowRight size={20} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="podcast" className="section podcast-section">
          <div className="podcast-grid">
            <div className="podcast-feature">
              <Headphones size={56} />
              <h2>Podcast สำหรับคนที่คิดเยอะ หลังเลิกงาน</h2>
              <p>
                เล่าเรื่องชีวิต งาน และความคิดแบบเพื่อนคุยกัน เหมาะกับการฟังระหว่างเดินทาง ก่อนนอน หรือวันที่อยากมีใครสักคนช่วยจัดระเบียบความคิด
              </p>
              <Button variant="dark"><PlayCircle size={18} /> ฟังตอนล่าสุด</Button>
            </div>

            <div>
              <SectionTitle eyebrow="Podcast" title="ตอนแนะนำ" desc="สคริปต์และหัวข้อพร้อมต่อยอดเป็นคลิปสั้นหรือบทความต่อได้" />
              <div className="episode-list">
                {podcasts.map((podcast) => (
                  <div key={podcast.ep} className="episode-card">
                    <div className="episode-icon"><Mic2 /></div>
                    <div>
                      <p>{podcast.ep} · {podcast.duration}</p>
                      <h3>{podcast.title}</h3>
                    </div>
                    <button><PlayCircle /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="about-grid">
            <div>
              <p className="eyebrow">About</p>
              <h2>samong หลังเลิกงาน คืออะไร?</h2>
            </div>
            <div className="about-card">
              <p>
                samong หลังเลิกงาน คือพื้นที่สำหรับคนที่อยากใช้เวลาหลังเลิกงานเติมความคิดดี ๆ ให้ตัวเอง ผ่านบทความสั้น พอดแคสต์ และคอนเทนต์ที่หยิบเรื่องใกล้ตัวมาเล่าใหม่ให้น่าสนใจ เข้าใจง่าย และนำไปใช้ได้จริง
              </p>
              <div className="about-points">
                <div><strong>เรียบเรียงใหม่</strong><span>ไม่คัดลอกตรง ๆ แต่เล่าให้มีมุมมองและภาษาของแบรนด์</span></div>
                <div><strong>อ่านง่าย</strong><span>เหมาะกับคนทำงานที่มีเวลาน้อย แต่อยากได้ไอเดียดี ๆ</span></div>
                <div><strong>ต่อยอดได้</strong><span>ใช้ต่อเป็นโพสต์ คลิปสั้น Podcast หรือบทความยาวได้</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-wrap">
          <div className="contact-card">
            <Tag size={48} />
            <h2>มาเติมสมองหลังเลิกงานด้วยกัน</h2>
            <p>
              กดติดตามไว้ เพื่อรับบทความ พอดแคสต์ และไอเดียใหม่ ๆ สำหรับคนที่อยากเติบโตแบบไม่ต้องรีบ แต่ไม่หยุดเดิน
            </p>
            <div className="contact-actions">
              <Button variant="dark"><Facebook size={18} /> ติดตาม Facebook</Button>
              <Button variant="light"><Instagram size={18} /> ติดตาม Instagram</Button>
              <Button variant="light"><Mail size={18} /> รับข่าวสาร</Button>
            </div>
            <small>#สมองหลังเลิกงาน #samongหลังเลิกงาน #พัฒนาตัวเอง #Podcastไทย #บทความสั้น #ชีวิตการทำงาน</small>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 samong หลังเลิกงาน — Samong after work</p>
        <p>สร้างเพื่อบทความ Podcast และคอนเทนต์หลังเลิกงาน</p>
      </footer>
    </div>
  );
}
