export const FinderIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 12v4m-2-2h4" strokeLinecap="round" />
    </svg>
  </div>
)

export const SafariIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeLinecap="round" />
      <path d="M12 3v2m0 14v2M3 12h2m14 0h2" strokeLinecap="round" />
      <path d="M8 8l8 8M16 8l-8 8" strokeLinecap="round" strokeWidth="1" />
    </svg>
  </div>
)

export const MessagesIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="white">
      <path d="M12 3C6.5 3 2 6.58 2 11c0 2.4 1.2 4.55 3.1 6.05v3.3l3.2-1.75c1.1.3 2.3.45 3.7.45 5.5 0 10-3.58 10-8S17.5 3 12 3z" />
    </svg>
  </div>
)

export const CalendarIcon = () => {
  const today = new Date().getDate()
  return (
    <div className="w-full h-full rounded-[22%] bg-black flex flex-col overflow-hidden">
      <div className="h-1/4 bg-white/90" />
      <div className="flex-1 flex items-center justify-center">
        <span className="text-3xl md:text-4xl font-bold text-white">{today}</span>
      </div>
    </div>
  )
}

export const PhotosIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="white" />
      <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const MusicIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" strokeLinecap="round" />
      <circle cx="18" cy="16" r="3" strokeLinecap="round" />
    </svg>
  </div>
)

export const NotesIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M16 13H8m8 4H8m2-8H8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const VSCodeIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="white">
      <path d="M16.5 3L7 12l-3.5-3L2 10.5 7 15.5l11-11L16.5 3zM22 10.5L20.5 9l-4 4 1.5 1.5 4-4z" />
    </svg>
  </div>
)

export const TerminalIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="2" strokeLinecap="round" />
      <path d="M6 9l4 3-4 3m6 0h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const DockerIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="white">
      <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5z" />
      <path d="M21 11c-.5-.3-1.6-.5-2.5-.5-.5-1.5-1.8-2.5-3.5-2.5h-.5c-.3-1.5-1.5-2.5-3-2.5H9c-1.5 0-2.7 1-3 2.5H5.5C3.8 8 2.5 9 2 10.5c-.9 0-2 .2-2.5.5-.3.2-.5.5-.5.9 0 1.5 1.5 3.1 4 3.1h13c2.5 0 4-1.6 4-3.1 0-.4-.2-.7-.5-.9z" />
    </svg>
  </div>
)

export const GitIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" strokeLinecap="round" />
      <path d="M12 3v6m0 6v6M3 12h6m6 0h6" strokeLinecap="round" />
      <circle cx="12" cy="5" r="1" fill="white" />
      <circle cx="12" cy="19" r="1" fill="white" />
      <circle cx="5" cy="12" r="1" fill="white" />
      <circle cx="19" cy="12" r="1" fill="white" />
    </svg>
  </div>
)

export const SettingsIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" strokeLinecap="round" />
      <path
        d="M12 1v3m0 16v3M4.22 4.22l2.12 2.12m11.32 11.32l2.12 2.12M1 12h3m16 0h3M4.22 19.78l2.12-2.12m11.32-11.32l2.12-2.12"
        strokeLinecap="round"
      />
    </svg>
  </div>
)

export const LaunchpadIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center p-2.5">
    <div className="grid grid-cols-3 gap-1.5 w-full h-full">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="bg-white rounded-sm" />
      ))}
    </div>
  </div>
)

export const FolderIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

export const DocumentsIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const DownloadsIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 11v6m-3-3l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

// CU.app Service Icons

export const EmployeeHandbookIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const MCCAdminIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" />
      <path d="M8 7h8M8 11h8M8 15h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const OneScopeIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" />
      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const MarketingCMSIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const AppSimulatorIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)

export const DesignSystemIcon = () => (
  <div className="w-full h-full rounded-[22%] bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" stroke="white" strokeWidth="1.5">
      <path d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197m0 0h4.102c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.102M10.5 8.197V21m10.125-12.75h-2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
)
