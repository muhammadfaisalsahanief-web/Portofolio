/* ---- Data (edit here to update the site) ---- */
const skills = {
  "Programming Languages": ["Dart", "Java", "PHP", "JavaScript", "Python"],
  "Web Development": ["HTML", "CSS", "JavaScript", "PHP", "Laravel"],
  "Mobile Development": ["Flutter"],
  Database: ["MySQL", "Firebase"],
  "API & Backend": ["Laravel REST API", "API Integration"],
  "UI/UX & Design": ["Figma"],
  Tools: ["Visual Studio Code", "Git", "GitHub"],
};
/* Fields: name, description, technology[], category, image, github, demo */
const projects = [];

/* ---- Render skills ---- */
const sg = document.getElementById("skillGrid");
Object.entries(skills).forEach(([title, items]) => {
  const c = document.createElement("div");
  c.className = "card reveal";
  const h = document.createElement("h3");
  h.textContent = title;
  const b = document.createElement("div");
  b.className = "badges";
  items.forEach((t) => {
    const s = document.createElement("span");
    s.className = "badge";
    s.textContent = t;
    b.appendChild(s);
  });
  c.append(h, b);
  sg.appendChild(c);
});

/* ---- Render projects ---- */
if (projects.length) {
  document.getElementById("projectEmpty").remove();
  const pg = document.getElementById("projectGrid");
  projects.forEach((p) => {
    const c = document.createElement("div");
    c.className = "card reveal";
    const h = document.createElement("h3");
    h.textContent = p.name;
    const d = document.createElement("p");
    d.style.color = "var(--muted)";
    d.textContent = p.description;
    const b = document.createElement("div");
    b.className = "badges";
    (p.technology || []).forEach((t) => {
      const s = document.createElement("span");
      s.className = "badge";
      s.textContent = t;
      b.appendChild(s);
    });
    c.append(h, d, b);
    [
      ["GitHub", p.github],
      ["Demo", p.demo],
    ].forEach(([l, u]) => {
      if (u) {
        const a = document.createElement("a");
        a.href = u;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = l;
        a.className = "badge";
        a.style.marginRight = "8px";
        c.appendChild(a);
      }
    });
    pg.appendChild(c);
  });
}

/* ---- Navbar ---- */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
const burger = document.getElementById("burger"),
  links = document.getElementById("links");
burger.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
  }
});

/* ---- Scroll reveal + active link ---- */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
const navLinks = [...links.querySelectorAll("a")];
const so = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
document.querySelectorAll("main section").forEach((s) => so.observe(s));
