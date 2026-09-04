export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden bg-grid-pattern">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-amber-200/30 via-orange-100/40 to-emerald-100/30 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-brand-border shadow-subtle backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="text-xs font-semibold tracking-wide uppercase text-brand-slate">
              National Open Knowledge Repository
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-brand-saffron flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                verified
              </span>
              142,800+ Primary Citations
            </span>
          </div>
        </div>
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-brand-navy leading-[1.08] mb-6">
            Knowledge About India,{" "}
            <br />
            <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-saffron via-amber-700 to-brand-navy">
              Source-Backed &amp; Open For All.
            </span>
          </h1>
          <p className="font-sans text-base sm:text-lg lg:text-xl text-brand-slate max-w-2xl mx-auto leading-relaxed font-normal">
            Impartial, structured, citation-verified dossiers documenting the
            leaders, institutions, history, constitutional precedents, and
            living cultures that shape the subcontinent.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative bg-white rounded-2xl p-2.5 shadow-card border border-brand-border ring-4 ring-black/[0.02] hover:ring-brand-saffron/20 transition-all duration-300">
            <div className="flex items-center gap-3 px-3 py-2">
              <span className="material-symbols-outlined text-2xl text-brand-saffron">
                search
              </span>
              <input
                className="w-full bg-transparent border-none text-base text-brand-navy placeholder:text-slate-400 focus:outline-none focus:ring-0 font-normal"
                id="main-knowledge-search"
                placeholder="Search 28,400+ people, landmark constitutional judgments, historic battles, ISRO missions..."
                type="text"
              />
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-cream-warm border border-brand-border text-brand-slate text-xs font-mono">
                <span>↵</span>
                <span>Enter</span>
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-brand-navy text-white text-sm font-semibold hover:bg-brand-saffron transition-colors shadow-subtle shrink-0 flex items-center gap-1.5">
                <span>Search</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2 pt-2.5 pb-1 px-3 border-t border-brand-border/60 overflow-x-auto text-xs">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0">
                Popular:
              </span>
              <a
                className="px-2.5 py-1 rounded-lg bg-brand-cream hover:bg-brand-navy hover:text-white text-brand-slate font-medium transition-colors shrink-0"
                href="#featured-people"
              >
                Dr. Kalam
              </a>
              <a
                className="px-2.5 py-1 rounded-lg bg-brand-cream hover:bg-brand-navy hover:text-white text-brand-slate font-medium transition-colors shrink-0"
                href="#featured-people"
              >
                Constitution of 1950
              </a>
              <a
                className="px-2.5 py-1 rounded-lg bg-brand-cream hover:bg-brand-navy hover:text-white text-brand-slate font-medium transition-colors shrink-0"
                href="#featured-people"
              >
                Mahatma Gandhi
              </a>
              <a
                className="px-2.5 py-1 rounded-lg bg-brand-cream hover:bg-brand-navy hover:text-white text-brand-slate font-medium transition-colors shrink-0"
                href="#explore-categories"
              >
                ISRO Missions
              </a>
              <a
                className="px-2.5 py-1 rounded-lg bg-brand-cream hover:bg-brand-navy hover:text-white text-brand-slate font-medium transition-colors shrink-0"
                href="#explore-categories"
              >
                22 Scheduled Languages
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-xs font-medium text-brand-slate">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">
                verified
              </span>
              Peer-Reviewed Records
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-brand-saffron">
                library_books
              </span>
              Primary Gazette Archives
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">
                block
              </span>
              Zero Ads or Sponsored Bias
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">
                public
              </span>
              Creative Commons Open Access
            </span>
          </div>
        </div>
        <KnowledgeGraph />
      </div>
    </section>
  );
}

function KnowledgeGraph() {
  return (
    <div className="relative bg-white rounded-3xl border border-brand-border shadow-elevation p-4 sm:p-8 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-border gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-saffron" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">
              The Sovereign Bharat Knowledge Graph
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-brand-slate mt-0.5">
            Explore semantic cross-references between leaders, treaties,
            science programs, and institutions.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">
              auto_graph
            </span>
            Live Relational Mesh
          </span>
          <span className="px-3 py-1 rounded-lg bg-brand-cream border border-brand-border text-brand-navy text-xs font-semibold">
            12,400 Entity Dossiers
          </span>
        </div>
      </div>
      <div className="relative w-full h-[520px] sm:h-[540px] mt-4 rounded-2xl bg-gradient-to-b from-brand-cream/90 via-white to-brand-cream-warm/60 border border-brand-border/70 overflow-hidden flex items-center justify-center select-none shadow-inner">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1000 540"
        >
          <defs>
            <linearGradient
              id="grad-saffron-core"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0a1324" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient
              id="grad-blue-mesh"
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0a1324" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient
              id="core-glow-pulsing"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.24" />
              <stop offset="50%" stopColor="#f97316" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="radar-beam"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </linearGradient>
            <filter
              id="glow-filter"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <path
              id="path-core-to-kalam"
              d="M 500 270 Q 370 170 230 115"
            />
            <path
              id="path-core-to-isro"
              d="M 500 270 Q 640 170 780 115"
            />
            <path
              id="path-core-to-ambedkar"
              d="M 500 270 Q 330 360 190 410"
            />
            <path
              id="path-core-to-acts"
              d="M 500 270 Q 660 360 810 410"
            />
            <path
              id="path-kalam-to-isro"
              d="M 230 115 Q 500 60 780 115"
            />
            <path
              id="path-ambedkar-to-acts"
              d="M 190 410 Q 500 470 810 410"
            />
          </defs>

          <circle
            cx="500"
            cy="270"
            r="240"
            fill="url(#core-glow-pulsing)"
          />
          <circle
            className="animate-ripple-1"
            cx="500"
            cy="270"
            r="60"
            fill="none"
            stroke="#ea580c"
            strokeWidth="1.5"
          />
          <circle
            className="animate-ripple-2"
            cx="500"
            cy="270"
            r="60"
            fill="none"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <circle
            cx="500"
            cy="270"
            r="160"
            stroke="#e2ded4"
            strokeWidth="1"
            strokeDasharray="4 6"
            fill="none"
          />
          <circle
            cx="500"
            cy="270"
            r="240"
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeDasharray="3 8"
            fill="none"
            opacity="0.7"
          />

          <g className="animate-radar">
            <line
              x1="500"
              y1="270"
              x2="500"
              y2="30"
              stroke="url(#radar-beam)"
              strokeWidth="2"
            />
            <polygon
              points="500,270 480,30 520,30"
              fill="url(#radar-beam)"
              opacity="0.4"
            />
          </g>

          <path
            className="animate-dash-forward"
            d="M 500 270 Q 370 170 230 115"
            fill="none"
            stroke="#ea580c"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.85"
          />
          <path
            className="animate-dash-forward"
            d="M 500 270 Q 640 170 780 115"
            fill="none"
            stroke="#059669"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.85"
          />
          <path
            className="animate-dash-reverse"
            d="M 500 270 Q 330 360 190 410"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.85"
          />
          <path
            className="animate-dash-reverse"
            d="M 500 270 Q 660 360 810 410"
            fill="none"
            stroke="#d97706"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.85"
          />

          <path
            className="animate-dash-forward"
            d="M 500 270 Q 500 160 500 75"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            className="animate-dash-reverse"
            d="M 500 270 Q 500 390 500 465"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            className="animate-dash-forward"
            d="M 500 270 Q 290 270 130 265"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            className="animate-dash-reverse"
            d="M 500 270 Q 720 270 870 265"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          <path
            className="animate-dash-forward"
            d="M 230 115 Q 500 60 780 115"
            fill="none"
            stroke="#e2ded4"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity="0.9"
          />
          <path
            className="animate-dash-reverse"
            d="M 190 410 Q 500 470 810 410"
            fill="none"
            stroke="#e2ded4"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity="0.9"
          />
          <path
            d="M 230 115 Q 160 190 130 265"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <path
            d="M 130 265 Q 150 340 190 410"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <path
            d="M 780 115 Q 830 190 870 265"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <path
            d="M 870 265 Q 850 340 810 410"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          <line
            x1="230"
            y1="115"
            x2="105"
            y2="75"
            stroke="#ea580c"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.75"
          />
          <line
            x1="780"
            y1="115"
            x2="910"
            y2="75"
            stroke="#059669"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.75"
          />
          <line
            x1="190"
            y1="410"
            x2="90"
            y2="460"
            stroke="#2563eb"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.75"
          />
          <line
            x1="810"
            y1="410"
            x2="920"
            y2="460"
            stroke="#d97706"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            opacity="0.75"
          />

          <circle
            cx="500"
            cy="270"
            r="6"
            fill="#ea580c"
            filter="url(#glow-filter)"
          />
          <circle cx="230" cy="115" r="5" fill="#ea580c" />
          <circle cx="780" cy="115" r="5" fill="#059669" />
          <circle cx="190" cy="410" r="5" fill="#2563eb" />
          <circle cx="810" cy="410" r="5" fill="#d97706" />
          <circle cx="500" cy="75" r="4" fill="#0a1324" />
          <circle cx="500" cy="465" r="4" fill="#0a1324" />
          <circle cx="130" cy="265" r="4.5" fill="#059669" />
          <circle cx="870" cy="265" r="4.5" fill="#ea580c" />

          <circle r="4" fill="#f97316" filter="url(#glow-filter)">
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-core-to-kalam" />
            </animateMotion>
          </circle>
          <circle r="3" fill="#ffffff">
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-core-to-kalam" />
            </animateMotion>
          </circle>
          <circle r="4" fill="#10b981" filter="url(#glow-filter)">
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-core-to-isro" />
            </animateMotion>
          </circle>
          <circle r="3" fill="#ffffff">
            <animateMotion
              dur="2.8s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-core-to-isro" />
            </animateMotion>
          </circle>
          <circle r="4" fill="#3b82f6" filter="url(#glow-filter)">
            <animateMotion
              dur="3.6s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-core-to-ambedkar" />
            </animateMotion>
          </circle>
          <circle r="3" fill="#ffffff">
            <animateMotion
              dur="3.6s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-core-to-ambedkar" />
            </animateMotion>
          </circle>
          <circle r="4" fill="#f59e0b" filter="url(#glow-filter)">
            <animateMotion
              dur="3.4s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-core-to-acts" />
            </animateMotion>
          </circle>
          <circle r="3" fill="#ffffff">
            <animateMotion
              dur="3.4s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-core-to-acts" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#ea580c" filter="url(#glow-filter)">
            <animateMotion
              dur="4.8s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-kalam-to-isro" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#2563eb" filter="url(#glow-filter)">
            <animateMotion
              dur="5.2s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#path-ambedkar-to-acts" />
            </animateMotion>
          </circle>
        </svg>

        <div className="absolute top-3 left-4 right-4 hidden md:flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-white/95 border border-brand-border text-[10px] font-mono font-semibold text-brand-slate shadow-subtle flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LATENT DENSITY: 98.4%
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/95 border border-brand-border text-[10px] font-mono font-semibold text-brand-slate shadow-subtle backdrop-blur-md">
              12,400 CLUSTERS
            </span>
          </div>
          <div className="px-3 py-1 rounded-full bg-white/95 border border-brand-border text-[10px] font-mono font-semibold text-brand-saffron shadow-subtle flex items-center gap-1.5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-saffron animate-ping" />
            <span className="material-symbols-outlined text-[13px]">
              share
            </span>
            142,800+ CITATION EDGES
          </div>
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-brand-navy text-white shadow-2xl ring-4 ring-brand-saffron/80 ring-offset-4 ring-offset-white cursor-pointer group hover:scale-105 transition-all">
          <span className="text-[9px] font-mono tracking-widest text-amber-300 uppercase font-semibold">
            SOVEREIGN
          </span>
          <span className="font-serif font-bold text-base sm:text-xl tracking-tight text-white">
            BHARAT
          </span>
          <span className="text-[8px] uppercase tracking-wider text-slate-300">
            CORE VAULT
          </span>
          <span className="mt-0.5 text-[8px] font-mono text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-white/10 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
            LIVE MESH
          </span>
        </div>

        <div className="node-float-1 absolute top-10 left-3 sm:left-14 z-20 bg-white/95 backdrop-blur p-2.5 sm:p-3 rounded-2xl shadow-card border border-brand-border hover:border-brand-saffron transition-all hover:scale-105 cursor-pointer group">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-orange-100 text-brand-saffron flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-brand-saffron/20">
              APJ
            </span>
            <div>
              <div className="text-xs font-bold text-brand-navy group-hover:text-brand-saffron leading-tight flex items-center gap-1.5">
                <span>Dr. A.P.J. Kalam</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                118th President • Space Scientist
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 left-44 sm:left-56 z-10 hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/95 border border-brand-border text-[10px] text-brand-slate shadow-subtle hover:border-brand-saffron cursor-pointer backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-saffron animate-pulse" />
          <span className="font-medium">Pokhran-II Strategic</span>
        </div>

        <div className="node-float-2 absolute top-10 right-3 sm:right-14 z-20 bg-white/95 backdrop-blur p-2.5 sm:p-3 rounded-2xl shadow-card border border-brand-border hover:border-emerald-600 transition-all hover:scale-105 cursor-pointer group">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 ring-2 ring-emerald-500/20">
              <span className="material-symbols-outlined text-[18px]">
                rocket_launch
              </span>
            </span>
            <div>
              <div className="text-xs font-bold text-brand-navy group-hover:text-emerald-700 leading-tight flex items-center gap-1.5">
                <span>ISRO Aerospace</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                SLV-3 &amp; Space Research
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-44 sm:right-56 z-10 hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/95 border border-brand-border text-[10px] text-brand-slate shadow-subtle hover:border-emerald-600 cursor-pointer backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-medium">Sriharikota Range (SHAR)</span>
        </div>

        <div className="node-float-3 absolute bottom-16 left-3 sm:left-14 z-20 bg-white/95 backdrop-blur p-2.5 sm:p-3 rounded-2xl shadow-card border border-brand-border hover:border-blue-600 transition-all hover:scale-105 cursor-pointer group">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-blue-500/20">
              BR
            </span>
            <div>
              <div className="text-xs font-bold text-brand-navy group-hover:text-blue-800 leading-tight flex items-center gap-1.5">
                <span>Dr. B.R. Ambedkar</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Drafting Committee • Law
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-28 left-40 sm:left-52 z-10 hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/95 border border-brand-border text-[10px] text-brand-slate shadow-subtle hover:border-blue-600 cursor-pointer backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="font-medium">Constituent Assembly (1946–50)</span>
        </div>

        <div className="node-float-4 absolute bottom-16 right-3 sm:right-14 z-20 bg-white/95 backdrop-blur p-2.5 sm:p-3 rounded-2xl shadow-card border border-brand-border hover:border-amber-600 transition-all hover:scale-105 cursor-pointer group">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 ring-2 ring-amber-500/20">
              <span className="material-symbols-outlined text-[18px]">
                history_edu
              </span>
            </span>
            <div>
              <div className="text-xs font-bold text-brand-navy group-hover:text-amber-800 leading-tight flex items-center gap-1.5">
                <span>1947 Sovereign Act</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Parliamentary Gazette &amp; Treaties
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-28 right-40 sm:right-52 z-10 hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/95 border border-brand-border text-[10px] text-brand-slate shadow-subtle hover:border-amber-600 cursor-pointer backdrop-blur">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
          <span className="font-medium">National Archive Shelfmarks</span>
        </div>

        <div className="hidden sm:flex absolute top-10 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full border border-brand-border shadow-subtle items-center gap-2 hover:border-brand-navy transition-colors cursor-pointer">
          <span className="w-2 h-2 rounded-full bg-brand-saffron animate-pulse" />
          <span className="text-xs font-semibold text-brand-navy">
            New Delhi • Constitutional Center
          </span>
        </div>

        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-2 z-10 bg-white/95 backdrop-blur p-2 rounded-xl border border-brand-border shadow-subtle items-center gap-2 hover:border-blue-600 transition-all cursor-pointer">
          <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-[10px] font-bold">
            CVR
          </span>
          <div>
            <div className="text-[11px] font-bold text-brand-navy">
              Raman Research
            </div>
            <div className="text-[9px] text-slate-400">
              Nobel Physics (1930)
            </div>
          </div>
        </div>

        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-2 z-10 bg-white/95 backdrop-blur p-2 rounded-xl border border-brand-border shadow-subtle items-center gap-2 hover:border-brand-saffron transition-all cursor-pointer">
          <span className="w-6 h-6 rounded-lg bg-orange-50 text-brand-saffron flex items-center justify-center text-[10px] font-bold">
            ASI
          </span>
          <div>
            <div className="text-[11px] font-bold text-brand-navy">
              Archaeological Survey
            </div>
            <div className="text-[9px] text-slate-400">Monument Archives</div>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 right-4 sm:left-auto sm:right-auto bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-brand-border shadow-subtle text-xs text-brand-slate flex items-center justify-center gap-2 z-20 text-center">
          <span
            className="material-symbols-outlined text-[18px] text-brand-saffron shrink-0 animate-spin"
            style={{ animationDuration: "12s" }}
          >
            hub
          </span>
          <span>
            <strong>Interactive Semantic Knowledge Graph:</strong> Explore
            68,000+ cross-linked relationships between leaders, constitutional
            articles, scientific missions, and archival gazettes.
          </span>
        </div>
      </div>
    </div>
  );
}
