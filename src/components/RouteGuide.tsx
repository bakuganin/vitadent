import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Compass, Train, Clock, Car } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

type Language = "et" | "ru" | "fi" | "en";

const routeCopy = {
  et: {
    kicker: "Kuidas tulla",
    title: "Mugav asukoht Tallinna kesklinnas",
    intro:
      "Kliinik Caninus asub aadressil Tatari 6, Tallinn. See on vaid mõne minuti jalutuskäigu kaugusel Vabaduse väljakust.",
    transit: "Transport",
    walk: "Jalgsi",
    car: "Autoga",
    transitTitle: "Buss ja tramm",
    transitIntro: "Lähim peatus on Vabaduse väljak, umbes 3-4 minuti jalutuskäigu kaugusel:",
    transitItems: [
      "Trammid 3, 4, 1 ja 5 peatuvad Vabaduse väljaku lähedal.",
      "Bussid 5, 18, 36, 40 ja teised suuremad Tallinna liinid liiguvad lähedalt.",
      "Minge mööda Tatari tänavat. Meie sissepääs jääb vasakule.",
    ],
    walkTitle: "Jalgsi Vabaduse väljakult",
    walkIntro: "Kiire marsruut Vabaduse väljakult ja vanalinna servast:",
    walkItems: [
      "Alustage Vabaduse väljakult Vabadussõja võidusamba juurest.",
      "Pöörake Tatari tänava suunas, orientiiriks on hotell Palace.",
      "Kõndige mööda Tatari tänavat umbes 180 meetrit. Tatari 6 jääb vasakule.",
    ],
    carTitle: "Parkimine ja ligipääs",
    carIntro: "Sõitke kohale Kaarli puiestee või Pärnu maantee poolt:",
    carItems: [
      "Tatari tänav asub KESKLINN parkimistsoonis.",
      "Lähedal on EP18 Europarki parkla umbes 30 meetri kaugusel.",
      "Tänaval parkides on võimalik kasutada 15 minutit tasuta parkimist parkimiskellaga.",
    ],
    busStop: "Vabaduse väljaku peatus",
    square: "Vabaduse väljak",
    parking: "EP18 parkla",
    hours: "E-R: 8:00 - 17:00",
    center: "Tallinna kesklinn",
  },
  ru: {
    kicker: "Как добраться",
    title: "Удобное расположение в центре Таллина",
    intro:
      "Клиника Caninus расположена по адресу Tatari 6, Tallinn. Это всего в нескольких минутах ходьбы от площади Свободы.",
    transit: "Транспорт",
    walk: "Пешком",
    car: "На машине",
    transitTitle: "Автобус и трамвай",
    transitIntro: "Ближайшая остановка: Vabaduse väljak, всего 3-4 минуты ходьбы:",
    transitItems: [
      "Трамваи 3, 4, 1 и 5 останавливаются рядом с площадью Свободы.",
      "Автобусы 5, 18, 36, 40 и другие ключевые маршруты Таллинна проходят рядом.",
      "Пройдите по улице Tatari. Наша дверь будет слева.",
    ],
    walkTitle: "Пешком от Vabaduse väljak",
    walkIntro: "Максимально быстрый маршрут от площади Свободы и Старого города:",
    walkItems: [
      "Начните с площади Vabaduse väljak у монумента Креста Свободы.",
      "Поверните в сторону улицы Tatari, ориентир: гостиница Palace.",
      "Следуйте по Tatari около 180 метров. Здание Tatari 6 находится слева.",
    ],
    carTitle: "Парковка и подъезд",
    carIntro: "Подъезжайте со стороны Kaarli puiestee или Pärnu mnt:",
    carItems: [
      "Улица Tatari находится в парковочной зоне KESKLINN.",
      "Можно использовать парковку EP18 Europark примерно в 30 метрах.",
      "Вдоль Tatari возможны 15 минут бесплатной парковки с парковочными часами.",
    ],
    busStop: "Остановка Vabaduse väljak",
    square: "Площадь Свободы",
    parking: "Парковка EP18",
    hours: "Пн-Пт: 8:00 - 17:00",
    center: "Таллинн Центр",
  },
  fi: {
    kicker: "Saapuminen",
    title: "Helppo sijainti Tallinnan keskustassa",
    intro:
      "Caninus-klinikka sijaitsee osoitteessa Tatari 6, Tallinna, vain muutaman minuutin kävelymatkan päässä Vabaduse väljakilta.",
    transit: "Julkinen",
    walk: "Kävellen",
    car: "Autolla",
    transitTitle: "Bussi ja raitiovaunu",
    transitIntro: "Lähin pysäkki on Vabaduse väljak, noin 3-4 minuutin kävelymatkan päässä:",
    transitItems: [
      "Raitiovaunut 3, 4, 1 ja 5 pysähtyvät Vabaduse väljakin lähellä.",
      "Bussit 5, 18, 36, 40 ja muut keskeiset Tallinnan linjat kulkevat läheltä.",
      "Kävele Tatari-katua pitkin. Sisäänkäyntimme jää vasemmalle.",
    ],
    walkTitle: "Kävellen Vabaduse väljakilta",
    walkIntro: "Nopea reitti Vabaduse väljakilta ja vanhankaupungin laidalta:",
    walkItems: [
      "Aloita Vabaduse väljakilta vapaudenpatsaan läheltä.",
      "Käänny Tatari-kadulle, maamerkkinä Hotel Palace.",
      "Kävele Tatari-katua noin 180 metriä. Tatari 6 on vasemmalla.",
    ],
    carTitle: "Pysäköinti ja saapuminen",
    carIntro: "Saavu Kaarli puiesteen tai Pärnu maanteen suunnasta:",
    carItems: [
      "Tatari-katu sijaitsee KESKLINN-pysäköintialueella.",
      "Lähellä on EP18 Europark -pysäköintialue noin 30 metrin päässä.",
      "Kadulla voi käyttää 15 minuuttia maksutonta pysäköintiä pysäköintikellolla.",
    ],
    busStop: "Vabaduse väljakin pysäkki",
    square: "Vabaduse väljak",
    parking: "EP18 pysäköinti",
    hours: "Ma-Pe: 8:00 - 17:00",
    center: "Tallinnan keskusta",
  },
  en: {
    kicker: "How to get here",
    title: "Convenient location in central Tallinn",
    intro:
      "Caninus clinic is located at Tatari 6, Tallinn, just a few minutes' walk from Freedom Square.",
    transit: "Transit",
    walk: "Walking",
    car: "By car",
    transitTitle: "Bus and tram",
    transitIntro: "The nearest stop is Vabaduse väljak, about 3-4 minutes away on foot:",
    transitItems: [
      "Trams 3, 4, 1 and 5 stop near Vabaduse väljak.",
      "Buses 5, 18, 36, 40 and other central Tallinn routes pass nearby.",
      "Walk along Tatari street. Our entrance will be on the left.",
    ],
    walkTitle: "Walking from Freedom Square",
    walkIntro: "A quick route from Freedom Square and the edge of the Old Town:",
    walkItems: [
      "Start at Freedom Square near the War of Independence Victory Column.",
      "Turn toward Tatari street, using Hotel Palace as a landmark.",
      "Walk along Tatari street for about 180 meters. Tatari 6 is on the left.",
    ],
    carTitle: "Parking and access",
    carIntro: "Arrive from Kaarli puiestee or Pärnu maantee:",
    carItems: [
      "Tatari street is in the KESKLINN parking zone.",
      "The EP18 Europark parking area is about 30 meters away.",
      "Street parking allows 15 minutes free with a parking clock.",
    ],
    busStop: "Vabaduse väljak stop",
    square: "Freedom Square",
    parking: "EP18 parking",
    hours: "Mon-Fri: 8:00 - 17:00",
    center: "Tallinn city center",
  },
} satisfies Record<Language, Record<string, string | string[]>>;

// Custom tooth marker icon
const customIcon = new L.DivIcon({
  className: "custom-leaflet-marker",
  html: `<div style="width: 30px; height: 30px; background-color: #212121; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); color: white; font-weight: bold; font-size: 14px;">C</div></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const routePointIcon = new L.DivIcon({
  className: "route-leaflet-marker",
  html: `<div style="width: 24px; height: 24px; border-radius: 999px; background: #3b82f6; border: 2px solid white; box-shadow: 0 4px 12px rgba(32,33,36,.22);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -16],
});

// Helper component to smoothly animate map bounds when tab changes
function MapViewUpdater({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.flyToBounds(bounds, { padding: [40, 40], duration: 1.5 });
  }, [bounds, map]);
  return null;
}

export default function RouteGuide({ language }: { language: Language }) {
  const t = routeCopy[language];
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
            {t.kicker}
          </span>
          <h3 className="text-3xl font-extrabold text-stone-900 tracking-tight leading-none">
            {t.title}
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed pb-4">
            {t.intro}
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
            <span>{t.transit}</span>
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
            <span>{t.walk}</span>
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
            <span>{t.car}</span>
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
                  <h4>{t.transitTitle}</h4>
                </div>
                <p className="leading-relaxed">
                  {t.transitIntro}
                </p>
                <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                  {(t.transitItems as string[]).map((item) => <li key={item}>{item}</li>)}
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
                  <h4>{t.walkTitle}</h4>
                </div>
                <p className="leading-relaxed">
                  {t.walkIntro}
                </p>
                <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                  {(t.walkItems as string[]).map((item) => <li key={item}>{item}</li>)}
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
                  <h4>{t.carTitle}</h4>
                </div>
                <p className="leading-relaxed">
                  {t.carIntro}
                </p>
                <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                  {(t.carItems as string[]).map((item) => <li key={item}>{item}</li>)}
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
             <Marker position={busStopCoords} icon={routePointIcon}>
               <Popup className="font-sans font-medium text-xs">{t.busStop}</Popup>
             </Marker>
          )}
          {activeTab === "walk" && (
             <Marker position={vabaduseCoords} icon={routePointIcon}>
               <Popup className="font-sans font-medium text-xs">{t.square}</Popup>
             </Marker>
          )}
          {activeTab === "car" && (
             <Marker position={parkingCoords} icon={routePointIcon}>
               <Popup className="font-sans font-medium text-xs">{t.parking}</Popup>
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
            {t.hours}
          </span>
        </div>

        <div className="absolute top-4 left-4 bg-[#212121] py-1.5 px-3 rounded-full text-[10px] text-white font-sans uppercase tracking-widest flex items-center gap-1.5 shadow-md z-[400] pointer-events-none">
          <MapPin className="w-3 h-3 text-white" />
          {t.center}
        </div>

      </div>
    </div>
  );
}
