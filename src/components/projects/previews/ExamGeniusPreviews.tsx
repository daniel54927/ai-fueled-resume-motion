import React from 'react';
import { GraduationCap, Camera, LayoutDashboard, FileText, BookOpen, Users, ScanLine, ClipboardList, Settings } from 'lucide-react';

const bg = { backgroundColor: '#0e0e18', color: '#e9e9f2' };
const panel = { backgroundColor: '#15151f', borderColor: 'rgba(124,124,220,0.18)' };
const muted = { color: '#8a8a9a' };
const indigo = '#6366f1';

const NavBar = ({ active }: { active: string }) => {
  const items = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Exam Builder', icon: FileText },
    { name: 'Materiais', icon: BookOpen },
    { name: 'Turmas', icon: Users },
    { name: 'Scan', icon: ScanLine },
    { name: 'Notas', icon: ClipboardList },
    { name: 'Settings', icon: Settings },
  ];
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: 'rgba(124,124,220,0.18)' }}>
      <div className="flex items-center gap-1.5 mr-2">
        <GraduationCap className="h-4 w-4" style={{ color: indigo }} />
        <span className="text-xs font-semibold">ExamGenius <span style={{ color: indigo }}>AI</span></span>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {items.map(i => {
          const isActive = i.name === active;
          return (
            <span
              key={i.name}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={isActive
                ? { backgroundColor: indigo, color: 'white' }
                : { color: '#8a8a9a' }}
            >
              {i.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const ExamGeniusDashboard = () => (
  <div className="h-full text-[11px]" style={bg}>
    <NavBar active="Dashboard" />
    <div className="p-4 space-y-3">
      <span className="inline-block text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: indigo, color: indigo }}>
        AI-Powered Exam Creation
      </span>
      <h3 className="text-lg font-bold leading-tight">
        Create, print, and grade exams
        <br />
        <span style={{ background: 'linear-gradient(90deg,#7c9cff,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          with your phone camera
        </span>
      </h3>
      <p className="text-[10px]" style={muted}>
        Build assessments with AI, print per-student PDFs, and scan handwritten answer sheets straight from the camera.
      </p>
      <div className="flex gap-2">
        <button className="text-[10px] px-3 py-1.5 rounded-md font-medium" style={{ backgroundColor: indigo, color: 'white' }}>
          Start creating exams
        </button>
        <button className="text-[10px] px-3 py-1.5 rounded-md border" style={{ borderColor: indigo, color: indigo }}>
          Scan answer sheets
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2 pt-2">
        {[
          ['12', 'Exams created'],
          ['240', 'Pages scanned'],
          ['32', 'Students'],
          ['228', 'Auto-graded'],
        ].map(([n, l]) => (
          <div key={l} className="rounded-md p-2 border text-center" style={panel}>
            <div className="text-sm font-bold" style={{ color: indigo }}>{n}</div>
            <div className="text-[9px]" style={muted}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ExamGeniusScan = () => (
  <div className="h-full text-[11px]" style={bg}>
    <NavBar active="Scan" />
    <div className="p-4 space-y-3">
      <h3 className="text-base font-bold">Scan answer sheets</h3>
      <p className="text-[10px]" style={muted}>Take a sharp photo of a filled-in exam page and it grades it.</p>
      <div className="inline-flex rounded-md overflow-hidden border text-[10px]" style={{ borderColor: 'rgba(124,124,220,0.3)' }}>
        <span className="px-2 py-1" style={{ backgroundColor: indigo, color: 'white' }}>Take photo</span>
        <span className="px-2 py-1" style={muted}>Live camera</span>
        <span className="px-2 py-1" style={muted}>Upload</span>
      </div>
      <div className="rounded-lg border-2 border-dashed p-6 flex flex-col items-center justify-center text-center"
        style={{ borderColor: 'rgba(124,124,220,0.35)' }}>
        <Camera className="h-8 w-8 mb-2" style={{ color: indigo }} />
        <div className="text-xs font-semibold">Take a photo of the sheet</div>
        <div className="text-[10px] mt-1" style={muted}>
          Smooth out wrinkles, fill the frame, all four corners visible, hold steady.
        </div>
      </div>
    </div>
  </div>
);

export const ExamGeniusBuilder = () => (
  <div className="h-full text-[11px]" style={bg}>
    <NavBar active="Exam Builder" />
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold">Exam Builder</h3>
        <button className="text-[10px] px-2 py-1 rounded-md" style={{ backgroundColor: indigo, color: 'white' }}>Generate PDF</button>
      </div>
      <div className="rounded-md border p-3 space-y-2" style={panel}>
        <div className="text-[10px] font-semibold">Generate for a whole class</div>
        <div className="flex gap-2">
          <div className="flex-1 text-[10px] px-2 py-1 rounded border" style={{ borderColor: 'rgba(124,124,220,0.3)' }}>
            Demo, EREF Recife (BR)
          </div>
          <div className="flex-1 text-[10px] px-2 py-1 rounded border" style={{ borderColor: 'rgba(124,124,220,0.3)' }}>
            6 Ano A
          </div>
          <button className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: indigo, color: 'white' }}>Generate for class</button>
        </div>
        <p className="text-[9px]" style={muted}>
          One sheet per student with their name and a unique code pre-printed, shuffle the pile all you want, scans route themselves.
        </p>
      </div>
      <div className="rounded-md border p-3" style={panel}>
        <div className="text-[10px] font-semibold">Generate from material</div>
        <p className="text-[9px]" style={muted}>Upload a book or PDF, then generate questions from it here.</p>
      </div>
      <div className="rounded-md border p-2 text-[10px]" style={panel}>
        <span className="font-semibold">Question 1</span>, Multiple choice: What is the opposite of expensive?
      </div>
    </div>
  </div>
);

export const ExamGeniusNotas = () => {
  const rows = [
    ['Ana Clara F.', '8,0', '2,0', '8,0', '-'],
    ['Beatriz R.', '10,0', '4,0', '10,0', '-'],
    ['Joao S.', '8,0', '2,0', '8,0', '6,0'],
    ['Lucas M.', '2,0', '8,0', '2,0', '-'],
    ['Maria L.', '4,0', '10,0', '4,0*', '-'],
    ['Pedro A.', '8,0*', '2,0', '8,0', '-'],
  ];
  const cols = ['PROVA 1', 'PROVA 2', 'PROVA 3', 'ENGLISH EXAM'];
  return (
    <div className="h-full text-[11px]" style={bg}>
      <NavBar active="Notas" />
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold">Notas</h3>
          <button className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: indigo, color: 'white' }}>Export CSV</button>
        </div>
        <div className="text-[10px]" style={muted}>6 students, 4 exams</div>
        <div className="rounded-md border overflow-hidden" style={panel}>
          <table className="w-full text-[10px]">
            <thead>
              <tr style={{ backgroundColor: 'rgba(124,124,220,0.1)' }}>
                <th className="text-left px-2 py-1 font-semibold">Student</th>
                {cols.map(c => <th key={c} className="text-left px-2 py-1 font-semibold">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r[0]} className="border-t" style={{ borderColor: 'rgba(124,124,220,0.12)' }}>
                  {r.map((cell, i) => {
                    const isReview = typeof cell === 'string' && cell.endsWith('*');
                    const val = isReview ? cell.slice(0, -1) : cell;
                    return (
                      <td key={i} className="px-2 py-1">
                        <span className="inline-flex items-center gap-1">
                          {val}
                          {isReview && <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
