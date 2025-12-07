import React from 'react';

// Une représentation stylisée et interactive du Mali
export const MaliMap: React.FC<{
  onRegionClick?: (region: string) => void;
  className?: string;
}> = ({ onRegionClick, className }) => {
  
  const regions = [
    { id: 'kayes', name: 'Kayes', cx: 100, cy: 150, r: 25 },
    { id: 'bamako', name: 'Bamako', cx: 160, cy: 220, r: 15, isCapital: true },
    { id: 'koulikoro', name: 'Koulikoro', cx: 180, cy: 190, r: 20 },
    { id: 'sikasso', name: 'Sikasso', cx: 200, cy: 260, r: 25 },
    { id: 'segou', name: 'Ségou', cx: 220, cy: 180, r: 22 },
    { id: 'mopti', name: 'Mopti', cx: 260, cy: 160, r: 22 },
    { id: 'tombouctou', name: 'Tombouctou', cx: 300, cy: 100, r: 30 },
    { id: 'gao', name: 'Gao', cx: 350, cy: 140, r: 28 },
    { id: 'kidal', name: 'Kidal', cx: 380, cy: 80, r: 25 },
    { id: 'menaka', name: 'Ménaka', cx: 390, cy: 160, r: 20 },
    { id: 'taoudenit', name: 'Taoudénit', cx: 250, cy: 50, r: 35 },
  ];

  return (
    <div className={`relative bg-green-50 rounded-xl p-4 overflow-hidden shadow-inner ${className}`}>
      <h3 className="text-center font-bold text-arm-green mb-4">Implantation Territoriale</h3>
      <svg viewBox="0 0 500 350" className="w-full h-auto drop-shadow-lg">
        {/* Simplified Mali Shape Outline (Abstract) */}
        <path
          d="M 50,150 L 150,50 L 350,30 L 450,80 L 420,200 L 300,250 L 200,300 L 100,250 Z"
          fill="#e6fffa"
          stroke="#009739"
          strokeWidth="2"
          className="opacity-50"
        />
        
        {/* Regions */}
        {regions.map((region) => (
          <g 
            key={region.id} 
            onClick={() => onRegionClick && onRegionClick(region.name)}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <circle
              cx={region.cx}
              cy={region.cy}
              r={region.r}
              fill={region.isCapital ? "#CE1126" : "#FCD116"}
              stroke="#009739"
              strokeWidth="2"
            />
            <text
              x={region.cx}
              y={region.cy}
              dy={4}
              textAnchor="middle"
              className="text-[10px] font-bold fill-gray-900 pointer-events-none"
            >
              {region.name}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-4 flex justify-center space-x-4 text-xs">
          <div className="flex items-center"><span className="w-3 h-3 bg-red-600 rounded-full mr-1"></span> Siège National</div>
          <div className="flex items-center"><span className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></span> Sections Régionales</div>
      </div>
    </div>
  );
};