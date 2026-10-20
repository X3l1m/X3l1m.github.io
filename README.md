This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Projeler bölümünün durumu

Projeler bölümü, yayınlanacak yeni projeler eklenene kadar geçici olarak kullanım dışıdır.
Ana sayfadaki bölüm, gezinme menüsündeki Projects bağlantısı ve View Projects düğmesi gizlenmiştir.
Kaydırarak gezinme de projeler bölümünü atlar. Mevcut proje verileri ve bileşeni korunmaktadır.

Yeniden açmak için `src/lib/data.ts` içindeki proje listesini güncelleyin ve
`projectsEnabled` değerini `true` yapın. Bu ayar bölümü ve ilgili bağlantıları birlikte açar.

## Ziyaretçi sayımı

Ziyaretler [x3l1m.goatcounter.com](https://x3l1m.goatcounter.com/) hesabına gönderilir.
Portfolyoda görünür sayaç yoktur. İstatistikleri özel tutmak için GoatCounter ayarlarında
**Dashboard viewable by → logged in users** seçilmeli ve
**Allow adding visitor counts on your website** kapalı kalmalıdır. Bu ayarlar GoatCounter
hesabında yönetilir; site kodu panelin erişim ayarlarını değiştirmez.

- Her tarayıcı profili, aynı site adresinde yalnızca bir kez sayım isteği gönderir.
  `localStorage` kaydı süresizdir ve deploy sırasında değişmez.
- Web Locks aynı anda açılan sekmelerin çift sayılmasını engeller. Yenileme, bölüm
  değiştirme, yeni sekme ve tarayıcıyı tekrar açma yeni bir istek oluşturmaz.
- Deploy edilen tüm sürümler aynı sayacı kullanır; beta, dal adı veya domain
  kontrolü yoktur. `next build` beta yayınında da production çıktısı üretir.
  `npm run dev`, iframe ve WebDriver ziyaretleri sayılmaz. Aynı domaindeki
  main/beta geçişi aynı tarayıcıyı tekrar saymaz.
- IP adresi veya kalıcı ziyaretçi kimliği kaydetmeyiz/göndermeyiz; tarayıcıda sadece
  “sayım istendi” işareti tutulur. Ağ isteğinin IP adresini GoatCounter doğal olarak
  görür; GoatCounter kendi gizlilik politikasına göre işler.
- Bu **tarayıcı bazlı yaklaşık sayımdır**, doğrulanmış kişi sayısı değildir. Başka cihaz,
  tarayıcı, gizli pencere veya silinen site verileri yeni ziyaretçi sayılabilir.
- Saklama veya Web Locks kullanılamıyorsa sayım atlanır. Çift sayımı önlemek için işaret
  istekten önce yazılır; reklam engelleyici/ağ hatası ya da sekmenin o sırada kapanması
  eksik sayıma yol açabilir. Belirsiz başarısız istekler otomatik tekrar gönderilmez.

Sayaç adresi `src/lib/unique-visitor.ts` içindedir. Standart GoatCounter
scriptini ayrıca eklemeyin: her ziyarette tekrar sayım yapar. Özel entegrasyon,
[GoatCounter count endpoint](https://www.goatcounter.com/help/pixel) üzerinden tek istek
gönderir; sekmeler arası tekrarı uygulama yönettiği için GoatCounter oturum birleştirmesi
`no_session` (`ns`) ile kapalıdır.

Node 24.5+ ile `npm test`, tekrar ziyaret ve eşzamanlı sekme davranışlarını gerçek
Web Locks API kullanarak doğrular.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Background photos

The background section uses contextual photos of each workplace or school, not personal photos:

- Martin Glas: [Eindhoven location, Eindhovens Dagblad](https://www.ed.nl/eindhoven/martin-glas-neemt-helmondse-concurrent-over~abd804c0/).
- Basic-Fit: [club photography from Basic-Fit](https://www.basic-fit.com/en-de/first-time-at-the-gym).
- Codam: [student photography from Codam Coding College](https://www.codam.nl/).

Local files are in `public/images/background/`. The text-to-photo fade is applied in CSS.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
