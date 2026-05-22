import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Compass, Train, Clock, Car } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

// Custom tooth marker icon
const customIcon = new L.DivIcon({
  className: "custom-leaflet-marker",
  html: `<div style="width: 30px; height: 30px; background-color: #212121; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); color: white; font-weight: bold; font-size: 14px;">C</div></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Helper component to smoothly animate map bounds when tab changes
function MapViewUpdater({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.flyToBounds(bounds, { padding: [40, 40], duration: 1.5 });
  }, [bounds, map]);
  return null;
}

export default function RouteGuide() {
  const [activeTab, setActiveTab] = useState<"car" | "walk" | "transit">("transit");

  // Accurate Coordinates following Tallinn streets
  const clinicCoords: [number, number] = [59.4319, 24.7459]; // Tatari 6
  const vabaduseCoords: [number, number] = [59.4336, 24.7443]; // Freedom Square
  const busStopCoords: [number, number] = [59.4342, 24.7451]; // Vabaduse väljak bus stop (Pärnu mnt)
  const parkingCoords: [number, number] = [59.4321, 24.7465]; // Europark near Tatari
  const carStartCoords: [number, number] = [59.4333, 24.7410]; // Kaarli puiestee

  // Key intersection for routing
  const parnuTatariIntersection: [number, number] = [59.4326, 24.7461];

  // Precise Routes following roads
  const walkRoute: [number, number][] = [
    vabaduseCoords, 
    parnuTatariIntersection, 
    clinicCoords
  ];
  
  const transitRoute: [number, number][] = [
    busStopCoords, 
    parnuTatariIntersection, 
    clinicCoords
  ];
  
  const carRoute: [number, number][] = [
    carStartCoords, 
    [59.4331, 24.7438], // Vabaduse intersection
    parnuTatariIntersection, 
    parkingCoords
  ];

  const currentBounds =
    activeTab === "walk"
      ? L.latLngBounds(walkRoute)
      : activeTab === "transit"
      ? L.latLngBounds(transitRoute)
      : L.latLngBounds([carRoute[0], clinicCoords]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
      {/* Route Selector Info (Left) */}
      <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
        <div className="space-y-4">
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-stone-400 font-bold">
            Как добраться
          </span>
          <h3 className="text-3xl font-extrabold text-stone-900 tracking-tight leading-none">
            Удобное расположение в центре Таллина
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed pb-4">
            Клиника <strong>Caninus</strong> расположена по адресу <strong>Tatari 6, Tallinn</strong> (1-й этаж, отдельный вход со стороны тихой улицы Татари). Это всего в нескольких минутах ходьбы от площади Свободы (Vabaduse väljak).
          </p>
        </div>

        {/* Dynamic Route Info Tab Triggers (Pill Style) */}
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-max bg-stone-100/80 p-1.5 rounded-full border border-stone-200/50 mb-6">
          <button
            onClick={() => setActiveTab("transit")}
            className={`relative flex-1 sm:flex-none px-3 sm:px-6 py-2.5 text-[13px] sm:text-sm font-sans font-medium transition-colors duration-300 flex items-center justify-center gap-2 rounded-full cursor-pointer z-10 ${
              activeTab === "transit" ? "text-stone-900" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {activeTab === "transit" && (
              <motion.div layoutId="tab-pill" className="absolute inset-0 bg-white rounded-full shadow-sm border border-stone-200/40 -z-10" />
            )}
            <Train className="w-4 h-4" />
            <span>Транспорт</span>
          </button>

          <button
            onClick={() => setActiveTab("walk")}
            className={`relative flex-1 sm:flex-none px-3 sm:px-6 py-2.5 text-[13px] sm:text-sm font-sans font-medium transition-colors duration-300 flex items-center justify-center gap-2 rounded-full cursor-pointer z-10 ${
              activeTab === "walk" ? "text-stone-900" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {activeTab === "walk" && (
              <motion.div layoutId="tab-pill" className="absolute inset-0 bg-white rounded-full shadow-sm border border-stone-200/40 -z-10" />
            )}
            <Compass className="w-4 h-4" />
            <span>Пешком</span>
          </button>

          <button
            onClick={() => setActiveTab("car")}
            className={`relative flex-1 sm:flex-none px-3 sm:px-6 py-2.5 text-[13px] sm:text-sm font-sans font-medium transition-colors duration-300 flex items-center justify-center gap-2 rounded-full cursor-pointer z-10 ${
              activeTab === "car" ? "text-stone-900" : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {activeTab === "car" && (
              <motion.div layoutId="tab-pill" className="absolute inset-0 bg-white rounded-full shadow-sm border border-stone-200/40 -z-10" />
            )}
            <Car className="w-4 h-4" />
            <span>На машине</span>
          </button>
        </div>

        {/* Tab content view - Flexible height container prevents jumping but allows expansion */}
        <div className="relative min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            {activeTab === "transit" && (
              <motion.div
                key="transit"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 text-sm text-stone-600 pt-4"
              >
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <Train className="w-4 h-4 text-stone-800" />
                  <h4>Автобус и Трамвай</h4>
                </div>
                <p className="leading-relaxed">
                  Ближайшая остановка — <strong>Vabaduse väljak</strong> (всего 3-4 минуты ходьбы):
                </p>
                <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                  <li>Трамваи: <strong>3, 4, 1, 5</strong> останавливаются прямо на площади Свободы.</li>
                  <li>Автобусы: Практически все ключевые маршруты Таллинна (например, <strong>5, 18, 36, 40</strong> и другие).</li>
                  <li>Пройдите по улице <strong>Tatari</strong> мимо здания Колледжа английского языка. Наша дверь слева.</li>
                </ul>
              </motion.div>
            )}

            {activeTab === "walk" && (
              <motion.div
                key="walk"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 text-sm text-stone-600 pt-4"
              >
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <Compass className="w-4 h-4 text-stone-800" />
                  <h4>Пешком от Vabaduse väljak</h4>
                </div>
                <p className="leading-relaxed">
                  Максимально быстрый маршрут от Ратушной площади и Старого города:
                </p>
                <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                  <li>Начните с площади <strong>Vabaduse väljak</strong> у монумента Креста Свободы.</li>
                  <li>Поверните на перекресток в сторону улицы <strong>Tatari</strong> (ориентир — гостиница Palace).</li>
                  <li>Следуйте по Tatari буквально <strong>180 метров</strong>. Здание <strong>Tatari 6</strong> находится слева.</li>
                </ol>
              </motion.div>
            )}

            {activeTab === "car" && (
              <motion.div
                key="car"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 text-sm text-stone-600 pt-4"
              >
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <Car className="w-4 h-4 text-stone-800" />
                  <h4>Парковка и Подъезд</h4>
                </div>
                <p className="leading-relaxed">
                  Подъезжайте со стороны бульвара Kaarli puiestee или Pärnu mnt:
                </p>
                <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                  <li>Улица Tatari находится в парковочной зоне <strong>KESKLINN</strong>.</li>
                  <li>Вы можете использовать парковочную зону <strong>EP18</strong> (коммерческая стоянка Europark в 30м).</li>
                  <li>Доступна парковка вдоль трассы Tatari. Возможны <strong>15 минут бесплатной парковки</strong> с часами!</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Map Showcase (Right) */}
      <div className="lg:col-span-7 relative h-[400px] sm:h-[480px] bg-stone-100 rounded-3xl overflow-hidden shadow-sm border border-stone-200/50">
        
        <MapContainer 
          bounds={currentBounds}
          zoom={16} 
          scrollWheelZoom={false} 
          className="w-full h-full z-0"
          zoomControl={true}
          attributionControl={false}
        >
          {/* Aesthetic light map tiles */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          <MapViewUpdater bounds={currentBounds} />

          {/* Dynamic Polylines (Using single component to prevent SVG offset bugs during flight animation) */}
          <Polyline 
            positions={activeTab === "walk" ? walkRoute : activeTab === "transit" ? transitRoute : []} 
            color={activeTab === "walk" ? "#212121" : "#3b82f6"} 
            weight={activeTab === "walk" ? 4 : 5} 
            dashArray={activeTab === "walk" ? "8, 8" : undefined} 
            opacity={activeTab === "walk" ? 0.7 : activeTab === "transit" ? 0.8 : 0} 
          />

          {/* Pins for context */}
          {activeTab === "transit" && (
             <Marker position={busStopCoords}>
               <Popup className="font-sans font-medium text-xs">Остановка Vabaduse väljak</Popup>
             </Marker>
          )}
          {activeTab === "walk" && (
             <Marker position={vabaduseCoords}>
               <Popup className="font-sans font-medium text-xs">Площадь Свободы</Popup>
             </Marker>
          )}
          {activeTab === "car" && (
             <Marker position={parkingCoords}>
               <Popup className="font-sans font-medium text-xs">Парковка EP18</Popup>
             </Marker>
          )}

          {/* Main Clinic Pin */}
          <Marker position={clinicCoords} icon={customIcon}>
            <Popup className="font-sans font-bold">CANINUS<br/><span className="font-normal text-stone-500">Tatari 6</span></Popup>
          </Marker>
        </MapContainer>

        {/* Floating Action Controls */}
        <div className="absolute bottom-4 right-4 bg-white py-2.5 px-4 rounded-xl shadow-lg border border-stone-100 flex items-center gap-2 z-[400] pointer-events-none">
          <Clock className="w-4 h-4 text-[#8DA2B3]" />
          <span className="text-xs font-sans font-bold text-stone-800 tracking-wide">
            Пн-Пт: 9:00 - 18:00
          </span>
        </div>

        <div className="absolute top-4 left-4 bg-[#212121] py-1.5 px-3 rounded-full text-[10px] text-white font-sans uppercase tracking-widest flex items-center gap-1.5 shadow-md z-[400] pointer-events-none">
          <MapPin className="w-3 h-3 text-white" />
          Таллинн Центр
        </div>

      </div>
    </div>
  );
}
