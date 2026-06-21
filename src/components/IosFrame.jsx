export default function IosFrame({ children }) {
  return (
    <div className="min-h-screen w-full bg-sand flex justify-center sm:items-center sm:py-8 sm:px-4">
      <div
        className="w-full bg-offwhite sm:w-[402px] sm:h-[874px] sm:rounded-[48px] sm:border-[8px] sm:border-[#15161a] sm:shadow-[0_30px_60px_rgba(0,0,0,0.35)] sm:overflow-y-auto overflow-x-hidden"
        style={{ fontFamily: "'Almarai', sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}
