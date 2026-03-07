import { useState } from "react";

const NAVY = "#1A2332";
const GOLD = "#D4AF37";
const WHITE = "#FFFFFF";
const LIGHT = "#F8F9FA";
const DARK_GRAY = "#2C3E50";
const MED_GRAY = "#6C757D";

const categories = [
  {
    id: "brain",
    icon: "🧠",
    title: "AI Brain (Core Engine)",
    subtitle: "Your strategic thinking & content partner",
    tools: [
      {
        name: "Claude (Anthropic)",
        role: "PRIMARY — Strategy, proposals, copywriting, translations, data analysis",
        price: "Pro $20/mo",
        why: "You're already using me. Best for long-form reasoning, multilingual content (EN/CN/JP), proposals, and business strategy. Strongest writing quality.",
        priority: "NOW",
        automation: "Zapier integration, API available for custom workflows",
      },
      {
        name: "ChatGPT Plus (OpenAI)",
        role: "SECONDARY — Image generation, quick tasks, brainstorming",
        price: "Plus $20/mo",
        why: "GPT Image 1.5 is the best conversational image generator in 2026. Generate social media graphics, property listing visuals, and marketing materials inside the chat. Also great for quick tasks.",
        priority: "NOW",
        automation: "Deep Zapier integration, API for automation",
      },
    ],
  },
  {
    id: "image",
    icon: "🎨",
    title: "Image & Visual Generation",
    subtitle: "Social posts, property visuals, branding assets",
    tools: [
      {
        name: "ChatGPT Image Generation",
        role: "PRIMARY — Social media graphics, Xiaohongshu visuals, WhatsApp banners",
        price: "Included in ChatGPT Plus $20/mo",
        why: "Conversational editing: 'make it more luxury', 'change to navy blue', 'add Chinese text'. Perfect for iterating on brand visuals without learning complex tools. Best text-in-image accuracy.",
        priority: "NOW",
        automation: "Generate via API → auto-post to social channels",
      },
      {
        name: "Midjourney",
        role: "SECONDARY — Premium hero images, artistic property renders, luxury aesthetics",
        price: "Basic $10/mo",
        why: "Unmatched 'luxury feel' and cinematic quality. Use for website hero images, brochure covers, and premium marketing materials where artistic quality matters most.",
        priority: "MONTH 2",
        automation: "Discord-based (manual), but connectors exist via Zapier",
      },
      {
        name: "Canva Pro",
        role: "DESIGN HUB — Templates, brand kit, social media sizing, quick edits",
        price: "$12/mo",
        why: "All-in-one design platform. Upload your SLM brand kit (colors, fonts, logo). One-click resize for Xiaohongshu, WeChat, FB, WhatsApp. Magic Design AI for quick posts. Your VA can use this without design skills.",
        priority: "NOW",
        automation: "Zapier integration for automated design workflows",
      },
    ],
  },
  {
    id: "presentation",
    icon: "📊",
    title: "Presentations & Proposals",
    subtitle: "Client pitch decks, investor presentations, service proposals",
    tools: [
      {
        name: "Gamma",
        role: "PRIMARY — AI-generated pitch decks, client proposals, service presentations",
        price: "Plus $8/mo",
        why: "Type a prompt like 'SLM tenancy management proposal for Mont Kiara landlord with 3BR condo' and get a polished deck in minutes. Exports to PPTX/PDF. Brand controls for SLM colors. Best prompt-to-deck quality.",
        priority: "NOW",
        automation: "Zapier integration — auto-generate decks from Google Docs or CRM data",
      },
      {
        name: "Canva Presentations",
        role: "BACKUP — Quick presentations with drag-and-drop from template library",
        price: "Included in Canva Pro",
        why: "Use when you need more design control than Gamma offers, or when building from existing Canva templates.",
        priority: "NOW",
        automation: "Same Canva ecosystem",
      },
    ],
  },
  {
    id: "docs",
    icon: "📄",
    title: "Documents & PDFs",
    subtitle: "Contracts, reports, service agreements, tenancy documents",
    tools: [
      {
        name: "Claude (via Artifacts/Computer Use)",
        role: "PRIMARY — Generate professional .docx, .pdf, .xlsx documents",
        price: "Included in Claude Pro",
        why: "I just built your CI guide as a .docx. I can generate contracts, tenancy reports, financial summaries, inspection checklists — all branded with SLM formatting. No extra tool needed.",
        priority: "NOW",
        automation: "Prompt-to-document, downloadable instantly",
      },
      {
        name: "Google Workspace",
        role: "OPERATIONAL HUB — Docs, Sheets, Drive for day-to-day operations",
        price: "Business Starter $7/user/mo",
        why: "Shared Drive for team files, Google Sheets for tenant/property tracking, Google Docs for editable templates. Gemini AI built-in for quick edits. Essential operational backbone.",
        priority: "NOW",
        automation: "Deep Zapier integration for everything",
      },
    ],
  },
  {
    id: "video",
    icon: "🎬",
    title: "Video & Short-Form Content",
    subtitle: "Xiaohongshu reels, property walkthroughs, explainer videos",
    tools: [
      {
        name: "CapCut (ByteDance)",
        role: "PRIMARY — Short-form video editing for Xiaohongshu, TikTok, Reels",
        price: "Free (Pro $8/mo)",
        why: "Chinese-market native tool. Best for Xiaohongshu video content. AI auto-captions in Chinese/English/Japanese. Auto-cut, effects, trending templates. Your #1 content driver.",
        priority: "NOW",
        automation: "Manual editing but AI-assisted",
      },
      {
        name: "Synthesia",
        role: "FUTURE — AI avatar videos for property tours, training, client onboarding",
        price: "Starter $22/mo",
        why: "Create professional presenter videos without camera. AI avatars speak EN/CN/JP. Use for: 'Welcome to SLM' onboarding videos, service explainers, property management tutorials. Impressive for client trust.",
        priority: "MONTH 3-4",
        automation: "API available for automated video generation",
      },
    ],
  },
  {
    id: "content",
    icon: "✍️",
    title: "Multilingual Content & SEO",
    subtitle: "Blog posts, SEO articles, social media copy in 3 languages",
    tools: [
      {
        name: "Claude",
        role: "PRIMARY — Blog posts, SEO content, Xiaohongshu captions, WeChat articles",
        price: "Included in Claude Pro",
        why: "Best multilingual quality for EN/CN/JP. Understands cultural nuance (writes casual Chinese for Xiaohongshu, formal for WeChat, polite keigo for Japanese). SEO-aware content generation.",
        priority: "NOW",
        automation: "Pair with Zapier for content pipeline automation",
      },
      {
        name: "Semrush / Ubersuggest",
        role: "SEO RESEARCH — Keyword research, competitor analysis, ranking tracking",
        price: "Ubersuggest $29/mo or Semrush $140/mo",
        why: "Track 'property management KL' rankings, find long-tail keywords expats search, monitor competitor SEO. Start with Ubersuggest (cheaper), upgrade to Semrush when revenue justifies it.",
        priority: "MONTH 2-3",
        automation: "Zapier integration for automated SEO reporting",
      },
    ],
  },
  {
    id: "crm",
    icon: "🤝",
    title: "CRM & Client Management",
    subtitle: "Lead tracking, client pipeline, tenant management",
    tools: [
      {
        name: "HubSpot CRM",
        role: "PRIMARY — Lead pipeline, client tracking, email sequences, deal management",
        price: "Free tier (Starter $15/mo)",
        why: "Free CRM with contact management, deal pipeline, and email tracking. Upgrade for sequences (automated follow-up emails). Track every lead from Xiaohongshu → WhatsApp → Client.",
        priority: "MONTH 1-2",
        automation: "Best-in-class Zapier integration. Auto-create contacts from WhatsApp, forms, etc.",
      },
      {
        name: "Notion",
        role: "INTERNAL OPS — SOPs, knowledge base, project management, team wiki",
        price: "Plus $10/mo",
        why: "Build your operational backbone: service checklists, vendor contacts, maintenance workflows, meeting notes. AI built-in for quick summaries. Single source of truth for SLM operations.",
        priority: "NOW",
        automation: "Zapier integration for automated task creation",
      },
    ],
  },
  {
    id: "automation",
    icon: "⚡",
    title: "Automation & Integration Layer",
    subtitle: "Connect everything together — the glue that makes it all seamless",
    tools: [
      {
        name: "Zapier",
        role: "PRIMARY ORCHESTRATOR — Connect all tools, automate workflows, AI agents",
        price: "Starter $20/mo → Professional $49/mo",
        why: "THE most critical tool for future automation. 8,000+ app integrations. Examples for SLM: New WhatsApp inquiry → auto-create HubSpot contact → send Claude-generated welcome message → log in Google Sheet. Or: New tenant signed → auto-generate welcome pack → schedule key collection → notify maintenance team.",
        priority: "MONTH 2",
        automation: "This IS the automation layer",
      },
      {
        name: "WhatsApp Business API (via 360dialog or Twilio)",
        role: "CLIENT CHANNEL — Automated responses, broadcast messages, chatbot",
        price: "360dialog from $5/mo + per-message",
        why: "Upgrade from basic WhatsApp Business to API for: automated welcome messages, broadcast campaigns, chatbot for FAQs, integration with CRM. Critical for scaling client communication.",
        priority: "MONTH 3-4",
        automation: "Full Zapier integration. Build a WhatsApp AI chatbot powered by Claude.",
      },
    ],
  },
];

const phases = [
  {
    phase: "Phase 1: NOW",
    timeline: "Week 1-2",
    color: "#27AE60",
    tools: "Claude Pro + ChatGPT Plus + Canva Pro + Gamma + CapCut + Google Workspace + Notion",
    cost: "~RM 350/mo (~$77)",
    focus: "Content creation, proposals, basic operations",
  },
  {
    phase: "Phase 2: GROWTH",
    timeline: "Month 2-3",
    color: GOLD,
    tools: "+ HubSpot CRM + Zapier + Midjourney + Ubersuggest",
    cost: "~RM 620/mo (~$137)",
    focus: "Lead tracking, automation, SEO, premium visuals",
  },
  {
    phase: "Phase 3: SCALE",
    timeline: "Month 3-6",
    color: "#E74C3C",
    tools: "+ WhatsApp API + Synthesia + Semrush upgrade",
    cost: "~RM 1,100/mo (~$243)",
    focus: "Full automation, AI chatbot, video content, enterprise SEO",
  },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("brain");
  const [showPhases, setShowPhases] = useState(false);

  const activeData = categories.find((c) => c.id === activeCategory);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: LIGHT, minHeight: "100vh", padding: "24px 16px" }}>
      {/* Header */}
      <div style={{ background: NAVY, borderRadius: 16, padding: "32px 24px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle, ${GOLD}22 0%, transparent 70%)`, borderRadius: "0 16px 0 0" }} />
        <div style={{ fontSize: 13, color: GOLD, letterSpacing: 3, fontWeight: 600, marginBottom: 8 }}>STANDARD LIVING MANAGEMENT · 臻享家</div>
        <h1 style={{ color: WHITE, fontSize: 26, margin: "0 0 8px", fontWeight: 700, lineHeight: 1.2 }}>AI Tech Stack Blueprint</h1>
        <p style={{ color: MED_GRAY, fontSize: 14, margin: 0, lineHeight: 1.5 }}>Every AI platform you need — what to use, when to adopt, and how it all connects for automation.</p>
      </div>

      {/* Phase Toggle */}
      <button
        onClick={() => setShowPhases(!showPhases)}
        style={{
          width: "100%", padding: "14px 20px", marginBottom: 16, borderRadius: 12,
          border: `2px solid ${GOLD}`, background: showPhases ? GOLD : WHITE,
          color: showPhases ? NAVY : GOLD, fontWeight: 700, fontSize: 14,
          cursor: "pointer", transition: "all 0.2s",
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}
      >
        <span>{showPhases ? "▼" : "▶"} Rollout Roadmap & Budget</span>
        <span style={{ fontSize: 12, opacity: 0.8 }}>3 Phases → RM 350 to RM 1,100/mo</span>
      </button>

      {showPhases && (
        <div style={{ marginBottom: 24 }}>
          {phases.map((p, i) => (
            <div key={i} style={{
              background: WHITE, borderRadius: 12, padding: "16px 20px", marginBottom: 10,
              borderLeft: `5px solid ${p.color}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: NAVY, fontSize: 15 }}>{p.phase}</span>
                <span style={{ background: p.color + "20", color: p.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{p.timeline}</span>
              </div>
              <div style={{ fontSize: 13, color: DARK_GRAY, marginBottom: 6 }}>{p.tools}</div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: MED_GRAY }}>{p.focus}</span>
                <span style={{ fontWeight: 700, color: NAVY }}>{p.cost}</span>
              </div>
            </div>
          ))}
          {/* Total ROI note */}
          <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, borderRadius: 12, padding: "14px 18px", marginTop: 6 }}>
            <div style={{ fontSize: 13, color: NAVY, fontWeight: 600, marginBottom: 4 }}>💡 ROI Perspective</div>
            <div style={{ fontSize: 12, color: DARK_GRAY, lineHeight: 1.6 }}>
              One tenancy management client at RM 8,000/mo rental = RM 550/mo revenue (5% + RM150). That single client covers your entire Phase 2 tech stack. By client #3, your tools pay for themselves 3x over.
            </div>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: "8px 14px", borderRadius: 20, border: "none",
              background: activeCategory === cat.id ? NAVY : WHITE,
              color: activeCategory === cat.id ? GOLD : DARK_GRAY,
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              boxShadow: activeCategory === cat.id ? `0 4px 12px ${NAVY}40` : "0 1px 4px rgba(0,0,0,0.08)",
              transition: "all 0.2s", whiteSpace: "nowrap",
            }}
          >
            {cat.icon} {cat.title.split("(")[0].split("—")[0].trim()}
          </button>
        ))}
      </div>

      {/* Active Category Content */}
      {activeData && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ color: NAVY, fontSize: 20, margin: "0 0 4px", fontWeight: 700 }}>
              {activeData.icon} {activeData.title}
            </h2>
            <p style={{ color: MED_GRAY, fontSize: 13, margin: 0 }}>{activeData.subtitle}</p>
          </div>

          {activeData.tools.map((tool, i) => (
            <div key={i} style={{
              background: WHITE, borderRadius: 14, padding: "20px", marginBottom: 14,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              borderTop: `3px solid ${tool.priority === "NOW" ? "#27AE60" : tool.priority.includes("2") ? GOLD : "#E74C3C"}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <h3 style={{ color: NAVY, fontSize: 16, margin: "0 0 4px", fontWeight: 700 }}>{tool.name}</h3>
                  <div style={{ fontSize: 12, color: GOLD, fontWeight: 600 }}>{tool.role}</div>
                </div>
                <span style={{
                  background: tool.priority === "NOW" ? "#27AE6020" : tool.priority.includes("2") ? `${GOLD}20` : "#E74C3C20",
                  color: tool.priority === "NOW" ? "#27AE60" : tool.priority.includes("2") ? "#B8860B" : "#E74C3C",
                  padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                }}>
                  {tool.priority}
                </span>
              </div>

              <p style={{ fontSize: 13, color: DARK_GRAY, lineHeight: 1.6, margin: "0 0 12px" }}>{tool.why}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <span style={{ background: NAVY + "10", color: NAVY, padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600 }}>
                  💰 {tool.price}
                </span>
                <span style={{ background: "#3498DB15", color: "#2980B9", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600 }}>
                  🔗 {tool.automation}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Key Automation Workflows */}
      <div style={{ background: NAVY, borderRadius: 14, padding: "24px 20px", marginTop: 24 }}>
        <h3 style={{ color: GOLD, fontSize: 16, margin: "0 0 16px", fontWeight: 700 }}>⚡ Top 5 Automation Workflows (Future State via Zapier)</h3>
        {[
          { flow: "New WhatsApp inquiry → Auto-create HubSpot contact → Claude generates personalized response → Log in Google Sheet", impact: "Save 15 min/lead" },
          { flow: "New tenant signed → Auto-generate welcome pack (Claude) → Schedule key collection (Calendar) → Notify maintenance", impact: "Save 2 hrs/tenant" },
          { flow: "Monthly rent due → Auto-send reminder (WhatsApp API) → Track payment (Sheets) → Alert if overdue (Day 3/7/14)", impact: "Zero missed follow-ups" },
          { flow: "New blog post draft (Claude) → Auto-create Xiaohongshu visual (ChatGPT Image) → Schedule post (Buffer/Later)", impact: "Content pipeline on autopilot" },
          { flow: "Defect check completed → Auto-generate report (Claude) → Email PDF to landlord → Create follow-up reminder", impact: "Professional delivery in minutes" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < 4 ? `1px solid ${NAVY}88` : "none" }}>
            <div style={{ fontSize: 13, color: WHITE, lineHeight: 1.5, marginBottom: 4 }}>
              <span style={{ color: GOLD, fontWeight: 700 }}>{i + 1}.</span> {item.flow}
            </div>
            <div style={{ fontSize: 11, color: "#27AE60", fontWeight: 600 }}>→ {item.impact}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px 0 8px", fontSize: 11, color: MED_GRAY }}>
        Standard Living Management (臻享家) · AI Tech Stack v1.0 · Feb 2026
      </div>
    </div>
  );
}
