# Mobicryp Esitlus - Modulaarne Struktuur

## Kausta Struktuur

```
MOBICRYP ESITLUS/
├── presentation.html      ← VALMIS ESITLUS (ava seda brauseris!)
├── build.sh              ← Ehita esitlus pärast muudatusi
├── slides/               ← 20 eraldi slide faili (EDITA NEID!)
│   ├── slide-01.html
│   ├── slide-02.html
│   └── ...
├── css/
│   └── styles.css        ← Kõik stiilid
├── js/
│   └── script.js         ← Navigatsioon ja timer
└── LOGOS/                ← Pildid
```

## Kuidas Kasutada

### 1. Vaata Esitlust
Ava `presentation.html` brauseris

### 2. Muuda Slide'i
Ava näiteks `slides/slide-16.html` ja tee muudatused

### 3. Ehita Uuesti
Käivita Terminalis:
```bash
cd "/Users/vambolatullus/Desktop/MOBICRYP ESITLUS"
./build.sh
```

Või lihtsalt topeltkliki `build.sh` failil Finderis!

### 4. Vaata Tulemust
Ava `presentation.html` uuesti brauseris (refresh)

## Slide'ide Nimekiri

- **slide-01.html** - Tiitelleht
- **slide-02.html** - Tervitus
- **slide-03.html** - Minu Roll
- **slide-04.html** - Statistika
- **slide-05.html** - Founder 1 (Dr. Abhishek)
- **slide-06.html** - Founder 2 (Ankit)
- **slide-07.html** - Founder 3 (Sidharth)
- **slide-08.html** - Tooted (Ecosystem)
- **slide-09.html** - Tuluvoolu
- **slide-10.html** - Mis on Arbitraaž
- **slide-11.html** - Arbitraaži Tabel
- **slide-12.html** - Kuidas Kasum Tekib
- **slide-13.html** - Teised Tuluvoolu
- **slide-14.html** - Kuidas Investor Teenib
- **slide-15.html** - Lepingu Kalkulaator
- **slide-16.html** - Raha Võimendamine
- **slide-17.html** - Dubai Reis
- **slide-18.html** - Miks Dubai
- **slide-19.html** - Lõpusõna
- **slide-20.html** - Järgmised Sammud

## Töö Claude'ga

Nüüd saad öelda:
- "Muuda slide 15" → Claude editeerib ainult `slides/slide-15.html`
- "Lisa slide 16-le tekst" → Claude muudab ainult `slides/slide-16.html`
- Pärast käivita `./build.sh` et ehitada `presentation.html`
