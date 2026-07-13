import { useState, useEffect } from "react";
import { MapPin, Train, Clock, Car, ExternalLink, LocateFixed, PersonStanding, type LucideIcon } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

type Language = "et" | "ru" | "fi" | "en";
type TravelMode = "transit" | "walking" | "driving";

const routeCopy = {
  et: {
    kicker: "Kuidas tulla",
    title: "Mugav asukoht Tallinna kesklinnas",
    intro:
      "Vitadenti kliinik asub aadressil Tatari 6, Tallinn. See on vaid mõne minuti jalutuskäigu kaugusel Vabaduse väljakust.",
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
    hours: "E-N: 8:00 - 15:00\nR: 9:00 - 15:00\nL: kokkuleppel\nP: suletud",
    center: "Tallinna kesklinn",
  },
  ru: {
    kicker: "Как добраться",
    title: "Удобное расположение в центре Таллина",
    intro:
      "Клиника Vitadent расположена по адресу Tatari 6, Tallinn. Это всего в нескольких минутах ходьбы от площади Свободы.",
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
    hours: "Пн-Чт: 8:00 - 15:00\nПт: 9:00 - 15:00\nСб: по договоренности\nВс: закрыто",
    center: "Таллинн Центр",
  },
  fi: {
    kicker: "Saapuminen",
    title: "Helppo sijainti Tallinnan keskustassa",
    intro:
      "Vitadent-klinikka sijaitsee osoitteessa Tatari 6, Tallinna, vain muutaman minuutin kävelymatkan päässä Vabaduse väljakilta.",
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
    hours: "Ma-To: 8:00 - 15:00\nPe: 9:00 - 15:00\nLa: sopimuksen mukaan\nSu: suljettu",
    center: "Tallinnan keskusta",
  },
  en: {
    kicker: "How to get here",
    title: "Convenient location in central Tallinn",
    intro:
      "Vitadent clinic is located at Tatari 6, Tallinn, just a few minutes' walk from Freedom Square.",
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
    hours: "Mon-Thu: 8:00 - 15:00\nFri: 9:00 - 15:00\nSat: by appointment\nSun: closed",
    center: "Tallinn city center",
  },
} satisfies Record<Language, Record<string, string | string[]>>;

const routeIntroCopy = {
  et: [
    ["Aadress:", " Tatari 6 Tallinna kesklinnas, Vabaduse valjaku ja peamiste uhistranspordi peatuste lahedal."],
    ["Parkimine:", " KESKLINN parkimistsoon, EP18 Europark umbes 30 meetri kaugusel ning 15 minutit tasuta tanavaparkimist parkimiskellaga."],
    ["Vastuvotuajad:", " E-N 8:00 - 15:00, R 9:00 - 15:00, L kokkuleppel, P suletud."],
  ],
  ru: [
    ["Адрес:", " Tatari 6 в центре Таллина, рядом с площадью Свободы и удобными остановками общественного транспорта."],
    ["Парковка:", " зона KESKLINN, парковка EP18 Europark примерно в 30 метрах, вдоль Tatari возможны 15 минут бесплатной парковки с парковочными часами."],
    ["Часы работы:", " пн-чт 8:00 - 15:00, пт 9:00 - 15:00, суббота по договоренности, воскресенье закрыто."],
  ],
  fi: [
    ["Osoite:", " Tatari 6 Tallinnan keskustassa, lahella Vabaduse valjakia ja hyvia julkisen liikenteen yhteyksia."],
    ["Pysakointi:", " KESKLINN-pysakointialue, EP18 Europark noin 30 metrin paassa seka 15 minuutin maksuton katupysakointi pysakointikellolla."],
    ["Aukioloajat:", " ma-to 8:00 - 15:00, pe 9:00 - 15:00, la sopimuksen mukaan, su suljettu."],
  ],
  en: [
    ["Address:", " Tatari 6 in central Tallinn, close to Freedom Square and convenient public transport stops."],
    ["Parking:", " KESKLINN parking zone, EP18 Europark about 30 meters away, and 15 minutes of free street parking with a parking clock."],
    ["Opening hours:", " Mon-Thu 8:00 - 15:00, Fri 9:00 - 15:00, Sat by appointment, Sun closed."],
  ],
} satisfies Record<Language, [string, string][]>;

const vitadentRouteIntro = {
  et: [["Aadress:", " Haigla tn 6, 20104 Narva."], ["Parkimine:", " Parkimise tingimused palume täpsustada kliinikuga enne visiiti."], ["Vastuvõtuajad:", " Palume broneerida aeg telefoni või e-posti teel."]],
  ru: [["Адрес:", " Haigla tn 6, 20104 Нарва."], ["Парковка:", " Условия парковки уточняйте у клиники перед визитом."], ["Часы приема:", " Запишитесь на прием по телефону или e-mail."]],
  fi: [["Osoite:", " Haigla tn 6, 20104 Narva."], ["Pysäköinti:", " Tarkista pysäköintiehdot klinikalta ennen käyntiä."], ["Vastaanottoajat:", " Varaa aika puhelimitse tai sähköpostilla."]],
  en: [["Address:", " Haigla tn 6, 20104 Narva."], ["Parking:", " Please confirm parking arrangements with the clinic before your visit."], ["Opening hours:", " Book an appointment by phone or email."]],
} as const;

const vitadentRouteIntroPhone = {
  et: [["Aadress:", " Haigla tn 6, 20104 Narva."], ["Vastuvõtule:", " Helistage +372 58 508 890."]],
  ru: [["Адрес:", " Haigla tn 6, 20104 Нарва."], ["Запись:", " Только по телефону +372 58 508 890."]],
  fi: [["Osoite:", " Haigla tn 6, 20104 Narva."], ["Ajanvaraus:", " Vain puhelimitse +372 58 508 890."]],
  en: [["Address:", " Haigla tn 6, 20104 Narva."], ["Appointments:", " By phone only: +372 58 508 890."]],
} as const;

const vitadentLocationCopy = {
  et: { title: "Vitadent Narvas", center: "Narva", hours: "Vastuvõtt\nkokkuleppel", description: "Hoolitseme teie naeratuse ja hammaste tervise eest, pakkudes kaasaegseid hambaraviteenuseid kogu perele." },
  ru: { title: "Vitadent в Нарве", center: "Нарва", hours: "Прием\nпо записи", description: "Мы заботимся о вашей улыбке и здоровье зубов, предлагая современные стоматологические услуги для всей семьи." },
  fi: { title: "Vitadent Narvassa", center: "Narva", hours: "Vastaanotto\najanvarauksella", description: "Huolehdimme hymystäsi ja hampaidesi terveydestä tarjoamalla moderneja hammashoitopalveluja koko perheelle." },
  en: { title: "Vitadent in Narva", center: "Narva", hours: "By appointment", description: "We care for your smile and dental health with modern dental services for the whole family." },
} as const;

const directionsCopy = {
  et: {
    title: "Marsruut teie asukohast",
    intro: "Valige sobiv liikumisviis. Brauser küsib teie asukohta ja avab marsruudi Google Mapsis.",
    locating: "Küsin teie asukohta...",
    fallback: "Asukohta ei õnnestunud saada. Avame Google Mapsi sihtkohaga Tatari 6.",
    transit: "Ühistransport",
    walking: "Jalgsi",
    driving: "Autoga",
    open: "Ava marsruut",
  },
  ru: {
    title: "Маршрут от вашего местоположения",
    intro: "Выберите способ передвижения. Браузер запросит геолокацию и откроет маршрут в Google Maps.",
    locating: "Запрашиваем ваше местоположение...",
    fallback: "Не удалось получить геолокацию. Откроем Google Maps с адресом Tatari 6.",
    transit: "На транспорте",
    walking: "Пешком",
    driving: "На машине",
    open: "Открыть маршрут",
  },
  fi: {
    title: "Reitti sijainnistasi",
    intro: "Valitse kulkutapa. Selain kysyy sijaintisi ja avaa reitin Google Mapsissa.",
    locating: "Pyydetään sijaintiasi...",
    fallback: "Sijaintia ei saatu. Avaamme Google Mapsin osoitteella Tatari 6.",
    transit: "Julkinen",
    walking: "Kävellen",
    driving: "Autolla",
    open: "Avaa reitti",
  },
  en: {
    title: "Route from your location",
    intro: "Choose how you are coming. Your browser will ask for location and open the route in Google Maps.",
    locating: "Requesting your location...",
    fallback: "Could not get your location. Opening Google Maps with Tatari 6 as the destination.",
    transit: "Transit",
    walking: "Walking",
    driving: "By car",
    open: "Open route",
  },
} satisfies Record<Language, Record<string, string>>;

// Custom Vitadent marker icon
const customIcon = new L.DivIcon({
  className: "custom-leaflet-marker",
  html: `<div style="width: 30px; height: 30px; background-color: #212121; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); color: white; font-weight: bold; font-size: 14px;">V</div></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function MapViewUpdater({ center }: { center: L.LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 18, { animate: false });
  }, [center, map]);
  return null;
}

export default function RouteGuide({ language }: { language: Language }) {
  const t = { ...routeCopy[language], ...vitadentLocationCopy[language] };
  const routeIntro = vitadentRouteIntroPhone[language];
  const directions = directionsCopy[language];
  const [routeStatus, setRouteStatus] = useState<"idle" | "locating" | "fallback">("idle");

  // Haigla tn 6, Narva — the Vitadent clinic building.
  const clinicCoords: [number, number] = [59.363250859866, 28.193329261393];
  const mapCenter = clinicCoords;

  const buildDirectionsUrl = (mode: TravelMode, origin?: GeolocationCoordinates) => {
    const params = new URLSearchParams({
      api: "1",
      destination: "Haigla tn 6, 20104 Narva, Estonia",
      travelmode: mode,
    });

    if (origin) {
      params.set("origin", `${origin.latitude},${origin.longitude}`);
    }

    return `https://www.google.com/maps/dir/?${params.toString()}`;
  };

  const openDirections = (mode: TravelMode) => {
    const mapsWindow = window.open("about:blank", "_blank");

    if (!mapsWindow) {
      setRouteStatus("fallback");
      return;
    }

    if (!navigator.geolocation) {
      setRouteStatus("fallback");
      mapsWindow.location.href = buildDirectionsUrl(mode);
      return;
    }

    setRouteStatus("locating");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setRouteStatus("idle");
        mapsWindow.location.href = buildDirectionsUrl(mode, coords);
      },
      () => {
        setRouteStatus("fallback");
        mapsWindow.location.href = buildDirectionsUrl(mode);
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 },
    );
  };

  const routeModes: { mode: TravelMode; label: string; Icon: LucideIcon }[] = [
    { mode: "transit", label: directions.transit, Icon: Train },
    { mode: "walking", label: directions.walking, Icon: PersonStanding },
    { mode: "driving", label: directions.driving, Icon: Car },
  ];

  return (
    <div className="w-full grid grid-cols-1 gap-8 lg:gap-10">
      {/* Route Selector Info (Left) */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,0.9fr)] lg:items-start">
        <div className="space-y-4">
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-stone-400 font-bold">
            {t.kicker}
          </span>
          <h3 className="text-3xl font-extrabold text-stone-900 tracking-tight leading-none">
            {t.title}
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-stone-600">{t.description}</p>
          <div className="space-y-2 pb-4 text-sm leading-relaxed text-stone-500">
            {routeIntro.map(([label, text]) => (
              <p key={label}>
                <strong className="font-extrabold text-stone-800">{label}</strong>
                {text}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex min-h-36 flex-col gap-3 rounded-lg border border-stone-200/70 bg-white/72 p-4 shadow-sm">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-stone-900 text-white">
              <LocateFixed className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-sm font-extrabold text-stone-900">{directions.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-stone-500">{directions.intro}</p>
            </div>
            {routeStatus !== "idle" && (
              <p className="mt-auto text-xs leading-relaxed text-stone-500" role="status">
                {routeStatus === "locating" ? directions.locating : directions.fallback}
              </p>
            )}
          </div>

          {routeModes.map(({ mode, label, Icon }) => (
            <button
              key={mode}
              type="button"
              onClick={() => openDirections(mode)}
              className="group flex min-h-36 w-full flex-col items-start justify-between gap-4 rounded-lg border border-stone-200/70 bg-white/72 p-4 text-left text-sm font-bold text-stone-800 shadow-sm transition-all hover:border-stone-300 hover:bg-white hover:shadow-md"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-stone-100 text-stone-700">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
                <span>{label}</span>
              </span>

              <span className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-stone-400">
                {directions.open}
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Showcase */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[560px] bg-stone-100 rounded-3xl overflow-hidden shadow-sm border border-stone-200/50">
        
        <MapContainer 
          center={mapCenter}
          zoom={18} 
          scrollWheelZoom={false} 
          className="w-full h-full z-0"
          zoomControl={true}
          attributionControl={false}
        >
          {/* Aesthetic light map tiles */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          <MapViewUpdater center={mapCenter} />

          {/* Main Clinic Pin */}
          <Marker position={clinicCoords} icon={customIcon}>
            <Popup className="font-sans font-bold">VITADENT<br/><span className="font-normal text-stone-500">Haigla tn 6, Narva</span></Popup>
          </Marker>
        </MapContainer>

        {/* Floating Action Controls */}
        <div className="absolute bottom-4 right-4 bg-white py-2.5 px-4 rounded-xl shadow-lg border border-stone-100 flex items-start gap-2 z-[400] pointer-events-none">
          <Clock className="w-4 h-4 text-[#8DA2B3]" />
          <span className="whitespace-pre-line text-left text-xs font-sans font-bold leading-tight text-stone-800 tracking-wide">
            {t.hours}
          </span>
        </div>

        <div className="absolute top-4 right-4 bg-[#212121] py-1.5 px-3 rounded-full text-[10px] text-white font-sans uppercase tracking-widest flex items-center gap-1.5 shadow-md z-[400] pointer-events-none">
          <MapPin className="w-3 h-3 text-white" />
          {t.center}
        </div>

      </div>
    </div>
  );
}
