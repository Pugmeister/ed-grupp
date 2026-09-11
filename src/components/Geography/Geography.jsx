import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { regions } from '../../data/regions'
import { getProjectBySlug } from '../../data/projects'

export default function Geography() {
  const [activeId, setActiveId] = useState(regions[0].id)
  const mapGroupRef = useRef(null)
  const active = regions.find((r) => r.id === activeId)
  const activeProject = active ? getProjectBySlug(active.projectSlug) : null

  useEffect(() => {
    if (!mapGroupRef.current || !active) return

    const { x, y } = active.coords
    const offsetX = (600 - x) * 0.45
    const offsetY = (350 - y) * 0.45
    const scale = 1.55

    const el = mapGroupRef.current
    el.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.transformOrigin = `${x}px ${y}px`
    el.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
  }, [activeId, active])

  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 md:px-12 bg-ink overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            ГЕОГРАФИЯ
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl">
            7 регионов России и Азербайджан. Международный опыт компании.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 space-y-3">
            {regions.map((region) => {
              const isActive = region.id === activeId
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setActiveId(region.id)}
                  className={`w-full text-left p-5 sm:p-6 border transition-all duration-300 interactive-hover ${
                    isActive
                      ? 'border-accent bg-accent/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="font-display text-xl sm:text-2xl font-bold text-paper block">
                        {region.name}
                      </span>
                      {isActive && (
                        <p className="mt-2 text-sm text-gray-400">{region.description}</p>
                      )}
                    </div>
                    <span
                      className={`text-2xl shrink-0 transition-colors duration-300 ${
                        isActive ? 'text-accent' : 'text-white/20'
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#0a0a0a] border border-white/10 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              <svg
                viewBox="0 0 1200 700"
                className="w-full h-full relative z-10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1c1c1c" />
                    <stop offset="50%" stopColor="#161616" />
                    <stop offset="100%" stopColor="#111" />
                  </linearGradient>
                  <linearGradient id="landStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#333" />
                    <stop offset="50%" stopColor="#444" />
                    <stop offset="100%" stopColor="#333" />
                  </linearGradient>
                  <filter id="markerGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="softGlow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g ref={mapGroupRef}>
                  {/* Материковая часть России — реальные очертания береговой линии,
                      откалиброванные по географическим координатам городов из regions.js */}
                  <path
                    d="M 791.4 44.3 L 793.2 50.9 L 799.6 47.7 L 820.1 47.8 L 835.9 54.3 L 841.5 59.2 L 839.7 66.1 L 832.0 70.0 L 813.6 77.3 L 808.4 81.2 L 817.0 83.1 L 827.4 86.4 L 833.7 83.9 L 837.2 92.4 L 840.3 89.0 L 851.5 86.9 L 873.9 89.0 L 875.6 95.2 L 904.9 97.2 L 905.3 87.1 L 920.1 89.4 L 931.3 89.3 L 942.6 96.3 L 945.8 104.7 L 941.7 110.3 L 950.5 120.7 L 961.5 126.0 L 968.2 112.2 L 979.4 118.1 L 991.4 114.6 L 1004.9 118.6 L 1010.0 114.9 L 1021.5 116.8 L 1016.4 104.5 L 1025.7 98.8 L 1088.8 107.4 L 1094.8 115.2 L 1113.1 125.3 L 1141.4 122.8 L 1155.3 125.0 L 1161.1 130.4 L 1160.3 140.1 L 1168.9 143.8 L 1178.2 141.1 L 1190.6 140.8 L 1203.8 143.4 L 1217.1 141.9 L 1229.3 153.6 L 1238.0 149.4 L 1232.3 141.0 L 1235.4 135.1 L 1257.7 138.8 L 1272.3 138.0 L 1292.4 144.3 L 1302.2 150.1 L 1302.2 202.7 L 1302.1 202.7 L 1293.2 208.5 L 1284.1 207.6 L 1290.4 214.6 L 1294.6 225.5 L 1297.8 229.0 L 1298.6 234.5 L 1296.8 238.0 L 1283.8 235.1 L 1264.2 245.1 L 1258.0 246.6 L 1247.3 255.9 L 1237.1 264.0 L 1234.6 270.0 L 1224.6 260.8 L 1206.3 271.2 L 1203.1 266.3 L 1196.4 271.9 L 1187.1 270.1 L 1184.8 278.8 L 1176.4 291.6 L 1176.7 296.9 L 1184.6 299.9 L 1183.7 319.1 L 1177.2 319.6 L 1174.2 330.6 L 1177.1 336.3 L 1164.9 343.1 L 1162.4 358.1 L 1152.0 361.3 L 1149.9 374.8 L 1139.8 387.1 L 1137.3 378.0 L 1134.3 358.7 L 1130.4 329.4 L 1133.7 311.1 L 1139.6 303.2 L 1140.0 297.0 L 1150.9 294.1 L 1163.3 277.4 L 1175.4 263.9 L 1188.0 253.3 L 1193.6 234.7 L 1185.1 235.8 L 1180.9 246.7 L 1163.1 261.2 L 1157.4 245.0 L 1139.4 249.5 L 1121.9 271.6 L 1127.6 279.7 L 1112.0 283.1 L 1101.2 284.5 L 1101.7 275.0 L 1090.8 272.9 L 1082.2 279.4 L 1060.8 277.2 L 1037.8 281.1 L 1015.1 306.8 L 988.3 338.0 L 999.3 339.6 L 1002.8 347.9 L 1009.6 350.8 L 1014.0 344.2 L 1021.7 345.1 L 1031.8 359.6 L 1032.0 370.9 L 1026.6 384.0 L 1026.0 399.8 L 1022.8 420.9 L 1012.3 440.0 L 1009.9 449.1 L 1000.4 464.5 L 991.0 479.7 L 986.5 487.5 L 977.2 495.3 L 972.8 495.5 L 968.4 489.0 L 959.0 498.7 L 957.9 503.1 L 956.9 500.8 L 956.9 494.1 L 960.5 493.7 L 961.5 478.1 L 959.6 466.8 L 965.6 462.2 L 974.1 464.5 L 978.8 451.7 L 981.2 437.2 L 983.9 432.4 L 987.6 420.5 L 976.0 424.4 L 970.0 429.6 L 959.4 429.6 L 956.5 417.2 L 948.2 407.8 L 936.1 403.6 L 933.5 390.6 L 931.0 382.5 L 928.4 376.9 L 924.1 363.5 L 918.0 358.7 L 907.5 354.7 L 898.2 355.1 L 889.5 357.5 L 883.7 364.1 L 887.6 367.2 L 887.7 374.5 L 883.8 378.7 L 877.5 392.7 L 877.5 398.5 L 867.7 406.9 L 859.3 401.9 L 850.9 403.0 L 847.3 398.6 L 843.1 397.1 L 832.8 406.4 L 823.6 408.6 L 817.2 411.9 L 808.4 409.7 L 801.9 409.9 L 797.6 403.1 L 790.8 396.8 L 783.8 395.0 L 774.9 396.8 L 768.3 399.2 L 758.4 393.7 L 757.0 383.8 L 748.8 380.4 L 742.5 378.8 L 734.6 373.4 L 727.4 387.1 L 730.2 394.8 L 723.4 404.0 L 713.3 400.7 L 706.3 400.2 L 701.7 394.1 L 694.4 393.9 L 688.3 389.8 L 677.6 396.0 L 664.3 407.4 L 656.9 409.7 L 654.2 410.8 L 650.5 402.7 L 641.5 404.5 L 638.5 398.9 L 633.6 396.3 L 630.2 388.7 L 626.4 386.3 L 616.3 389.7 L 606.7 382.1 L 602.9 389.0 L 587.3 355.5 L 578.4 345.3 L 581.0 341.1 L 563.4 353.6 L 556.7 354.3 L 557.3 347.1 L 548.3 342.6 L 541.0 345.8 L 538.8 332.2 L 526.2 329.3 L 519.9 334.8 L 502.4 339.7 L 499.0 342.9 L 472.9 347.5 L 469.6 352.0 L 474.7 361.1 L 468.0 364.5 L 469.3 368.1 L 462.6 374.5 L 473.9 383.6 L 472.2 389.9 L 462.3 389.3 L 460.3 393.2 L 451.4 386.4 L 440.3 386.6 L 432.8 392.2 L 424.6 386.9 L 409.1 377.7 L 398.2 378.1 L 383.8 392.4 L 382.9 402.1 L 375.7 394.4 L 370.1 408.9 L 372.2 411.6 L 368.1 421.6 L 374.1 430.6 L 379.3 430.2 L 383.7 439.0 L 383.0 445.8 L 386.6 447.9 L 383.4 455.8 L 376.6 457.9 L 369.6 471.6 L 376.0 484.1 L 375.3 493.0 L 383.0 508.5 L 378.8 513.8 L 377.6 517.2 L 374.5 516.3 L 369.7 508.3 L 367.7 507.8 L 363.3 504.8 L 361.2 499.4 L 354.6 496.6 L 350.4 498.7 L 349.2 496.2 L 339.7 489.9 L 329.4 487.8 L 323.4 485.5 L 322.6 487.1 L 313.7 475.9 L 305.7 470.9 L 299.6 463.2 L 304.7 461.1 L 310.5 450.0 L 306.6 444.8 L 316.9 439.4 L 316.8 436.5 L 310.5 438.7 L 310.7 432.8 L 314.3 429.1 L 321.1 428.1 L 322.2 423.7 L 320.6 416.5 L 323.5 409.5 L 323.4 405.7 L 313.1 401.4 L 309.0 401.5 L 304.7 395.3 L 299.3 397.4 L 290.4 392.8 L 290.6 390.2 L 288.1 384.5 L 282.5 383.8 L 281.9 379.7 L 283.7 377.1 L 279.2 369.6 L 272.0 370.9 L 269.8 370.2 L 268.1 373.2 L 265.4 372.7 L 263.7 364.2 L 262.1 359.8 L 263.4 358.6 L 269.1 359.1 L 271.8 356.2 L 269.8 352.6 L 265.1 350.3 L 265.5 347.9 L 262.6 345.5 L 258.3 336.9 L 259.8 333.3 L 259.1 327.1 L 252.2 324.0 L 248.6 325.6 L 247.6 322.3 L 240.2 319.0 L 238.0 311.2 L 237.4 304.8 L 234.0 301.7 L 237.0 297.6 L 234.9 285.2 L 239.9 277.6 L 238.8 275.3 L 246.8 268.0 L 239.5 261.8 L 254.4 244.9 L 260.9 237.3 L 263.6 230.6 L 253.2 221.5 L 256.1 212.9 L 249.8 203.1 L 254.5 191.8 L 246.3 176.7 L 252.8 166.8 L 242.1 158.0 L 243.1 148.7 L 248.8 147.5 L 260.7 142.2 L 267.9 137.6 L 279.4 145.6 L 298.5 148.8 L 324.9 163.7 L 330.3 170.0 L 330.8 178.8 L 323.0 185.7 L 311.6 189.2 L 280.4 179.2 L 275.2 180.9 L 286.6 190.5 L 287.1 196.6 L 287.5 210.1 L 296.5 214.2 L 302.0 217.6 L 302.9 211.2 L 298.7 205.5 L 303.2 200.5 L 320.1 208.7 L 326.0 205.5 L 321.2 195.8 L 337.5 182.9 L 344.0 183.7 L 350.5 188.3 L 354.6 179.2 L 348.8 171.4 L 352.2 163.5 L 347.1 155.3 L 366.6 159.5 L 370.6 166.9 L 361.8 168.5 L 361.8 175.9 L 367.3 180.4 L 378.1 177.5 L 379.8 169.1 L 394.4 162.8 L 418.9 151.5 L 424.1 152.1 L 417.2 160.1 L 425.9 161.5 L 430.9 157.0 L 444.0 156.6 L 454.4 151.2 L 462.4 159.1 L 470.3 150.4 L 463.0 142.7 L 466.6 138.4 L 487.3 142.4 L 497.0 146.5 L 522.3 161.6 L 527.0 154.7 L 519.9 147.7 L 519.7 144.9 L 511.3 143.6 L 513.6 137.3 L 509.8 127.0 L 509.6 122.8 L 522.5 110.9 L 527.1 98.9 L 532.3 96.3 L 550.9 99.8 L 552.3 107.1 L 545.7 117.8 L 550.0 122.0 L 552.3 131.2 L 550.7 149.3 L 558.4 157.4 L 555.4 166.2 L 541.7 185.0 L 549.7 186.9 L 552.5 182.2 L 560.2 178.8 L 562.0 172.3 L 568.1 166.0 L 564.0 158.5 L 567.3 149.7 L 559.6 148.7 L 557.9 141.3 L 563.5 128.1 L 554.4 117.3 L 567.0 108.4 L 565.3 99.0 L 568.8 98.7 L 572.5 106.0 L 569.7 118.8 L 577.2 121.2 L 574.0 111.7 L 585.7 106.5 L 600.3 105.8 L 613.2 113.3 L 607.0 102.3 L 606.3 88.2 L 618.4 85.6 L 635.3 86.2 L 650.4 84.4 L 644.7 77.5 L 652.8 68.9 L 660.9 68.5 L 674.5 62.0 L 692.9 60.2 L 695.3 56.6 L 713.6 55.4 L 719.4 58.3 L 735.1 51.3 L 747.9 51.5 L 749.8 45.8 L 756.5 40.2 L 773.0 34.8 L 785.0 39.1 L 775.5 42.3 L 791.4 44.3 Z"
                    fill="url(#landGrad)"
                    stroke="url(#landStroke)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Сахалин */}
                  <path
                    d="M 1047.9 390.5 L 1055.0 413.9 L 1044.6 409.6 L 1040.3 428.6 L 1047.1 442.2 L 1046.9 451.4 L 1041.6 443.4 L 1037.0 453.6 L 1035.7 442.6 L 1036.5 429.7 L 1035.7 415.5 L 1037.3 405.5 L 1037.6 387.8 L 1033.5 374.9 L 1034.2 356.8 L 1040.6 350.7 L 1037.9 344.6 L 1041.0 342.8 L 1042.8 351.5 L 1045.2 364.2 L 1045.0 377.2 L 1047.9 390.5 Z"
                    fill="url(#landGrad)"
                    stroke="url(#landStroke)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Калининград */}
                  <path
                    d="M 202.1 343.3 L 189.2 343.5 L 180.6 342.0 L 182.2 336.2 L 191.9 331.9 L 199.2 334.2 L 202.3 336.3 L 201.5 339.9 L 202.1 343.3 Z"
                    fill="url(#landGrad)"
                    stroke="url(#landStroke)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Линии широты */}
                  <path d="M 280 200 Q 450 185 650 190 Q 850 200 1000 240" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
                  <path d="M 250 320 Q 450 310 650 315 Q 850 330 980 360" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />
                  <path d="M 300 450 Q 480 440 650 445" fill="none" stroke="#222" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />

                  {regions.map((region) => {
                    const isActive = region.id === activeId
                    return (
                      <g
                        key={region.id}
                        onClick={() => setActiveId(region.id)}
                        style={{ cursor: 'pointer' }}
                        className="interactive-hover"
                      >
                        {isActive && (
                          <>
                            <circle cx={region.coords.x} cy={region.coords.y} r="22" fill="none" stroke="#FF3B30" strokeWidth="1.5" opacity="0.6">
                              <animate attributeName="r" from="10" to="32" dur="1.8s" repeatCount="indefinite" />
                              <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                            </circle>
                            <circle cx={region.coords.x} cy={region.coords.y} r="14" fill="#FF3B30" opacity="0.15" filter="url(#softGlow)" />
                          </>
                        )}

                        <circle
                          cx={region.coords.x}
                          cy={region.coords.y}
                          r={isActive ? 7 : 4.5}
                          fill={isActive ? '#FF3B30' : '#F4F4F0'}
                          stroke={isActive ? '#FF3B30' : 'rgba(244,244,240,0.4)'}
                          strokeWidth={isActive ? 0 : 1}
                          filter={isActive ? 'url(#markerGlow)' : undefined}
                        />

                        {isActive && (
                          <text
                            x={region.coords.x}
                            y={region.coords.y - 20}
                            textAnchor="middle"
                            fill="#F4F4F0"
                            fontSize="12"
                            fontFamily="Manrope, sans-serif"
                            fontWeight="600"
                            style={{ pointerEvents: 'none' }}
                          >
                            {region.short}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </g>
              </svg>

              {active && (
                <div className="absolute bottom-4 right-4 max-w-[220px] sm:bottom-6 sm:right-6 sm:max-w-[280px] bg-ink/95 border border-white/10 p-5 backdrop-blur-md z-20 transition-all duration-500">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-accent mb-1.5">
                    Регион
                  </div>
                  <div className="font-display text-xl font-bold text-paper mb-1 leading-tight">
                    {active.name}
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{active.description}</p>

                  {activeProject ? (
                    <Link
                      to={`/projects/${active.projectSlug}`}
                      className="inline-flex items-center gap-2 text-sm border-b border-paper pb-0.5 hover:text-accent hover:border-accent transition-colors"
                    >
                      {activeProject.title} →
                    </Link>
                  ) : (
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-2 text-sm border-b border-paper pb-0.5 hover:text-accent hover:border-accent transition-colors"
                    >
                      Смотреть проекты →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
