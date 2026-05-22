import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function ThreeDTooth() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full max-w-[580px] lg:max-w-[640px] h-[600px] lg:h-[720px] mx-auto flex items-center justify-center select-none">
      {/* Immersive glow background behind the tooth */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-radial from-[rgba(255,255,255,0.85)] via-[rgba(234,239,245,0.55)] to-transparent blur-3xl pointer-events-none -translate-y-12" />

      {/* Dynamic Tooth Container */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative z-10 w-full h-full flex items-center justify-center transform-gpu"
      >
        {/* Render High Fidelity Pseudo-3D SVG Dental Implant */}
        <svg
          id="implat-svg"
          viewBox="0 0 400 500"
          className="w-full h-full max-h-[620px] drop-shadow-[0_30px_50px_rgba(33,33,33,0.14)]"
        >
          <defs>
            {/* Crown Gradients */}
            <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#F5F8FA" />
              <stop offset="70%" stopColor="#D9E2EC" />
              <stop offset="100%" stopColor="#BCCCDC" />
            </linearGradient>

            <linearGradient id="crownInnerGrad" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="85%" stopColor="#C4D1DB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A4B8C4" stopOpacity="0.95" />
            </linearGradient>

            <radialGradient id="specularGlow" cx="25%" cy="25%" r="40%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="rightShadow" cx="80%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#8DA2B3" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#8DA2B3" stopOpacity="0" />
            </radialGradient>

            {/* Titanium Metal Gradients for the Implant Screw */}
            <linearGradient id="metalSilver" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3E4C59" />
              <stop offset="12%" stopColor="#CBD5E1" />
              <stop offset="28%" stopColor="#F1F5F9" />
              <stop offset="45%" stopColor="#94A3B8" />
              <stop offset="68%" stopColor="#475569" />
              <stop offset="88%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>

            <linearGradient id="metalThreadShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#475569" stopOpacity="0.2" />
              <stop offset="80%" stopColor="#0F172A" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="screwCap" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Light reflection filter */}
            <radialGradient id="rimLight" cx="50%" cy="100%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            <filter id="toothGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* BACKGROUND DROPSHADOW FOR SCREW */}
          <ellipse cx="200" cy="425" rx="55" ry="12" fill="rgba(33, 33, 33, 0.22)" filter="url(#toothGlow)" />

          <g transform="translate(0, 5)">
            {/* TITANIUM SCREW IMPLANT (Stacked 3D Rings tapering downward) */}
            {/* Abutment (Middle golden/silver ring matching crown join) */}
            <path
              d="M 160 216 L 240 216 L 232 232 L 168 232 Z"
              fill="url(#metalSilver)"
            />
            {/* Mirror edge highlight on the collar connector */}
            <ellipse cx="200" cy="216" rx="40" ry="5" fill="#E2E8F0" opacity="0.6" />
            <ellipse cx="200" cy="232" rx="32" ry="4" fill="#475569" opacity="0.5" />

            {/* Screw Thread Ring 1 */}
            <path
              d="M 170 234 h 60 c 0,0 8,11 6,18 c -1,4 -5,8 -12,12 c -8,4 -36,4 -48,0 c -7,-4 -11,-8 -12,-12 c -2,-7 6,-18 6,-18 Z"
              fill="url(#metalSilver)"
            />
            <path
              d="M 170 234 h 60 c 0,0 8,11 6,18 c -1,4 -5,8 -12,12 c -8,4 -36,4 -48,0 c -7,-4 -11,-8 -12,-12 c -2,-7 6,-18 6,-18 Z"
              fill="url(#metalThreadShadow)"
              mixed-blend-mode="multiply"
            />
            
            {/* Screw Thread Ring 2 */}
            <path
              d="M 172 258 h 56 c 0,0 7,11 5,18 c -1,4 -5,8 -11,12 c -8,4 -34,4 -44,0 c -6,-4 -10,-8 -11,-12 c -2,-7 5,-18 5,-18 Z"
              fill="url(#metalSilver)"
              transform="translate(0, 20)"
            />
            <path
              d="M 172 258 h 56 c 0,0 7,11 5,18 c -1,4 -5,8 -11,12 c -8,4 -34,4 -44,0 c -6,-4 -10,-8 -11,-12 c -2,-7 5,-18 5,-18 Z"
              fill="url(#metalThreadShadow)"
              transform="translate(0, 20)"
            />

            {/* Screw Thread Ring 3 */}
            <path
              d="M 174 278 h 52 c 0,0 6,10 5,16 c -1,4 -5,7 -10,11 c -7,3 -32,3 -42,0 c -5,-4 -9,-7 -10,-11 c -1,-6 5,-16 5,-16 Z"
              fill="url(#metalSilver)"
              transform="translate(0, 40)"
            />
            <path
              d="M 174 278 h 52 c 0,0 6,10 5,16 c -1,4 -5,7 -10,11 c -7,3 -32,3 -42,0 c -5,-4 -9,-7 -10,-11 c -1,-6 5,-16 5,-16 Z"
              fill="url(#metalThreadShadow)"
              transform="translate(0, 40)"
            />

            {/* Screw Thread Ring 4 */}
            <path
              d="M 176 298 h 48 c 0,0 6,9 5,15 c -1,3 -4,7 -9,10 c -7,3 -30,3 -39,0 c -5,-3 -8,-7 -9,-10 c -1,-6 4,-15 4,-15 Z"
              fill="url(#metalSilver)"
              transform="translate(0, 60)"
            />
            <path
              d="M 176 298 h 48 c 0,0 6,9 5,15 c -1,3 -4,7 -9,10 c -7,3 -30,3 -39,0 c -5,-3 -8,-7 -9,-10 c -1,-6 4,-15 4,-15 Z"
              fill="url(#metalThreadShadow)"
              transform="translate(0, 60)"
            />

            {/* Screw Thread Ring 5 */}
            <path
              d="M 178 318 h 44 c 0,0 5,8 4,13 c -1,3 -4,6 -8,8 c -6,3 -28,3 -36,0 c -4,-2 -7,-5 -8,-8 c -1,-5 4,-13 4,-13 Z"
              fill="url(#metalSilver)"
              transform="translate(0, 80)"
            />
            <path
              d="M 178 318 h 44 c 0,0 5,8 4,13 c -1,3 -4,6 -8,8 c -6,3 -28,3 -36,0 c -4,-2 -7,-5 -8,-8 c -1,-5 4,-13 4,-13 Z"
              fill="url(#metalThreadShadow)"
              transform="translate(0, 80)"
            />

            {/* Screw Tip */}
            <path
              d="M 182 414 c 10,14 26,14 36,0 l -5,12 c -2,4 -7,6 -13,6 h -10 c -6,0 -11,-2 -13,-6 Z"
              fill="url(#metalSilver)"
            />
            <path
              d="M 182 414 c 10,14 26,14 36,0 l -5,12 c -2,4 -7,6 -13,6 h -10 c -6,0 -11,-2 -13,-6 Z"
              fill="url(#metalThreadShadow)"
            />

            {/* Vertical Silver Ridge Highlights to emphasize Cylinder Curve */}
            <path d="M 186 233 L 186 414" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.32" />
            <path d="M 191 233 L 191 414" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
            <path d="M 214 233 L 214 414" stroke="#000000" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

            {/* WHITE CERAMIC CROWN (Beautiful High-gloss sculpting) */}
            <g>
              {/* Outer Crown Base Path */}
              <path
                d="M 160 216 
                   C 142 216, 126 195, 122 170 
                   C 117 140, 126 100, 150 78 
                   C 166 63, 185 70, 200 84 
                   C 215 70, 234 63, 250 78 
                   C 274 100, 283 140, 278 170 
                   C 274 195, 258 216, 240 216 
                   Z"
                fill="url(#crownGrad)"
              />

              {/* Inner highlight blend for volumetric depth */}
              <path
                d="M 162 212 
                   C 146 212, 131 193, 127 169 
                   C 123 141, 131 104, 152 83 
                   C 167 69, 185 75, 200 88 
                   C 215 75, 233 69, 248 83 
                   C 269 104, 277 141, 273 169 
                   C 269 193, 254 212, 238 212 
                   Z"
                fill="url(#crownInnerGrad)"
              />

              {/* Back lighting rim shade on the right */}
              <path
                d="M 200 88 
                   C 215 75, 233 69, 248 83 
                   C 269 104, 277 141, 273 169 
                   C 269 193, 254 212, 238 212 
                   C 230 200, 222 170, 225 140
                   C 228 110, 215 95, 200 88 Z"
                fill="url(#rightShadow)"
              />

              {/* Left Face Shiny Reflection Ribbon (Faux-3D curved highlight) */}
              <path
                d="M 132 165 C 130 140, 138 100, 158 84 C 160 83, 162 85, 160 88 C 144 104, 138 138, 140 165 C 140 167, 133 167, 132 165 Z"
                fill="#FFFFFF"
                opacity="0.9"
              />

              {/* Center Shiny Reflection Spot */}
              <ellipse cx="165" cy="118" rx="14" ry="24" transform="rotate(-15 165 118)" fill="url(#specularGlow)" />
              <ellipse cx="160" cy="112" rx="6" ry="12" transform="rotate(-15 160 112)" fill="#FFFFFF" opacity="0.95" />

              {/* Micro specs of glare mirroring studio lighting */}
              <circle cx="235" cy="105" r="5" fill="#FFFFFF" opacity="0.5" />
              <circle cx="245" cy="120" r="3" fill="#FFFFFF" opacity="0.4" />
              <ellipse cx="218" cy="190" rx="12" ry="4" transform="rotate(15 218 190)" fill="url(#rimLight)" />

              {/* Bottom crown light wrap overlay */}
              <path
                d="M 160 216 
                   C 170 216, 185 214, 200 210
                   C 215 214, 230 216, 240 216
                   C 240 216, 235 210, 225 208
                   C 215 206, 185 206, 175 208
                   C 165 210, 160 216, 160 216 Z"
                fill="#FFFFFF"
                opacity="0.8"
              />
            </g>
          </g>
        </svg>

        {/* Orbit Ring A (Solid clean ellipse wrapping behind / in front) */}
        <div className="absolute w-[440px] h-[130px] border border-[#CBD5E1] rounded-full top-[215px] -rotate-12 pointer-events-none opacity-60 flex items-center justify-center">
          {/* Animated dot moving along the orbit */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-full h-full"
          >
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-slate-400 shadow-md flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>
          </motion.div>
        </div>

        {/* Orbit Ring B (Dashed elegant circle tilted around crown) */}
        <div className="absolute w-[520px] h-[190px] border border-dashed border-[#94A3B8]/40 rounded-full top-[170px] rotate-12 pointer-events-none opacity-50" />

        {/* ANNOTATIONS / LABELS (Positioned left and right matching design in Russian) */}
        
        {/* Annotation Left (Lifetime Guarantee) */}
        <div className="absolute left-[-50px] sm:left-[-100px] top-[180px] flex flex-col items-end pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-sans text-stone-600 uppercase tracking-widest text-right leading-tight font-medium">
              Пожизненная<br />Гарантия
            </span>
            <div className="w-6 h-[1px] bg-stone-400" />
            <div className="min-w-3.5 min-h-3.5 w-3.5 h-3.5 rounded-full bg-slate-800 outline outline-4 outline-white/90 shrink-0" />
          </div>
          <p className="text-[10px] text-stone-400 text-right mt-1 max-w-[140px] leading-relaxed hidden sm:block">
            Пожизненное сопровождение имплантации от доктора Jevgeni Abramovits.
          </p>
        </div>

        {/* Annotation Right (Official representative) */}
        <div className="absolute right-[-50px] sm:right-[-100px] top-[290px] flex flex-col items-start pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="min-w-3.5 min-h-3.5 w-3.5 h-3.5 rounded-full bg-slate-800 outline outline-4 outline-white/90 shrink-0" />
            <div className="w-6 h-[1px] bg-stone-400" />
            <span className="text-[11px] font-sans text-stone-600 uppercase tracking-widest text-left leading-tight font-medium">
              Официальный представитель<br />Premium Rimplants
            </span>
          </div>
          <p className="text-[10px] text-stone-400 text-left mt-1 max-w-[150px] leading-relaxed hidden sm:block">
            Официальный партнер швейцарских костных технологий в Эстонии.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
