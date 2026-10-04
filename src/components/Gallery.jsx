export default function Gallery({ images = [] }) {
  return (
    <section className="relative w-full bg-[#0a0507] min-h-screen py-20 px-6 overflow-hidden">

      {/* Background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-rose-500/15 text-xs">❤️</div>
        <div className="absolute top-40 right-16 text-rose-500/15 text-xs">❤️</div>
        <div className="absolute bottom-40 right-10 text-rose-500/10 text-xs">❤️</div>
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Header - Only TIMELESS FRAME */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-sm">📸</span>
            <span className="text-[11px] tracking-[0.4em] text-white/60">TIMELESS FRAME</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div key={i} className="relative rounded-[24px] p-[1px] bg-gradient-to-b from-white/15 to-white/5 group">
              <div className="relative rounded-[23px] bg-[#14080d] overflow-hidden border border-white/5">
                <div className="aspect-[4/5] relative overflow-hidden bg-[#0a0507]">
                  <img
                    src={img.url || img}
                    alt={img.caption || `Memory ${i+1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0507] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-4 bg-[#14080d]">
                  <p className="text-[10px] tracking-[0.2em] text-rose-400/70 mb-1">
                    {img.year || `MEMORY ${i+1}`}
                  </p>
                  <h3 className="text-[14px] font-medium text-white/90 tracking-wide leading-snug">
                    {img.caption || "Beautiful Memory"}
                  </h3>
                </div>
                <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
