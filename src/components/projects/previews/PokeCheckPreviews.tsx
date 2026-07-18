import React from 'react';

const mono = { fontFamily: 'ui-monospace, "JetBrains Mono", Menlo, monospace' };
const bg = { backgroundColor: '#0a0f0d', color: '#d7e0da', ...mono };
const panel = { backgroundColor: '#0f1512', borderColor: 'rgba(52,229,160,0.16)' };
const mint = '#34e5a0';
const mutedC = '#6b7d72';

const Wordmark = () => (
  <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: 'rgba(52,229,160,0.16)' }}>
    <span className="text-[11px] lowercase">pokecheck<span style={{ color: mint }}>_</span></span>
    <span className="text-[9px]" style={{ color: mutedC }}>// records-only</span>
  </div>
);

export const PokeCheckCookbook = () => {
  const recipes = [
    { tag: 'lunch', carbs: '0.4g', title: 'Hamburgers', desc: 'Simple seasoned beef patties pan-fried in their own drippings.', time: '15 min' },
    { tag: 'dinner', carbs: '0.8g', title: 'Marvelous Meatballs', desc: 'Baked beef-and-sausage meatballs bound with pork rinds and cream.', time: '35 min' },
    { tag: 'dessert', carbs: '0.6g', title: 'Cream Cheese, Coconut and Lemon Mounds', desc: 'Baked coconut and cream-cheese bites with lemon zest.', time: '30 min' },
    { tag: 'breakfast', carbs: '', title: 'Scrambled eggs in butter', desc: 'Free-range eggs slowly scrambled in ghee, finished with coarse salt.', time: '8 min' },
  ];
  return (
    <div className="h-full text-[11px]" style={bg}>
      <Wordmark />
      <div className="p-3 space-y-2">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[11px]" style={{ color: mint }}>[01] recipes</div>
            <div className="text-[9px]" style={{ color: mutedC }}>// recipes, low-carb, bernstein method</div>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded border" style={{ borderColor: 'rgba(52,229,160,0.3)', color: mint }}>6 loaded</span>
        </div>
        <div className="space-y-1.5">
          {recipes.map(r => (
            <div key={r.title} className="rounded border p-2" style={panel}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(52,229,160,0.12)', color: mint }}>{r.tag}</span>
                {r.carbs && <span className="text-[9px] px-1.5 py-0.5 rounded border" style={{ borderColor: 'rgba(52,229,160,0.3)', color: mint }}>{r.carbs}</span>}
                <span className="text-[9px] ml-auto" style={{ color: mutedC }}>{r.time}</span>
              </div>
              <div className="text-[10px] font-semibold lowercase">{r.title}</div>
              <div className="text-[9px]" style={{ color: mutedC }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PokeCheckTimeline = () => {
  // Invented demo glucose series: values 90 to 160 range, smooth
  const width = 320;
  const height = 110;
  const points = [95, 110, 125, 140, 150, 138, 122, 108, 100, 115, 132, 148, 158, 150, 135, 118, 102, 96, 105, 120, 140, 155, 145, 128];
  const minY = 60, maxY = 200;
  const toY = (v: number) => height - ((v - minY) / (maxY - minY)) * height;
  const stepX = width / (points.length - 1);
  const path = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${toY(v)}`).join(' ');
  // target band 70-180
  const bandTop = toY(180);
  const bandBottom = toY(70);

  return (
    <div className="h-full text-[11px]" style={bg}>
      <Wordmark />
      <div className="p-3 space-y-2">
        <div>
          <div className="text-[11px]" style={{ color: mint }}>[02] charts</div>
          <div className="text-[9px]" style={{ color: mutedC }}>// glucose, time in range</div>
        </div>
        <div className="rounded border p-2" style={panel}>
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            {/* grid */}
            {[0, 1, 2, 3].map(i => (
              <line key={i} x1="0" x2={width} y1={(height / 3) * i} y2={(height / 3) * i}
                stroke="rgba(52,229,160,0.08)" strokeWidth="1" />
            ))}
            {/* target band */}
            <rect x="0" y={bandTop} width={width} height={bandBottom - bandTop}
              fill="rgba(52,229,160,0.08)" />
            <text x="4" y={bandTop - 2} fontSize="7" fill={mutedC}>70 to 180</text>
            {/* line */}
            <path d={path} fill="none" stroke={mint} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div className="flex items-center justify-between mt-2 text-[10px]">
            <div>
              <span style={{ color: mutedC }}>time in range </span>
              <span style={{ color: mint }} className="font-semibold">78%</span>
            </div>
            <div style={{ color: mutedC }}>target 70 to 180 mg/dL</div>
          </div>
        </div>
        <div className="text-[9px]" style={{ color: mutedC }}>
          records-only. never calculates a dose. demo data shown.
        </div>
      </div>
    </div>
  );
};
