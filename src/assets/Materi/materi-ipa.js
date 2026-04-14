import he from "he";

let materiIpa = [
  {
    category: "Pernapasan",
    name: "Paru-Paru",
    pengertian: "Organ utama pernapasan manusia yang berfungsi sebagai tempat pertukaran oksigen dan karbon dioksida.",
    caraKerja: [
      "Menampung udara yang masuk dari trakea dan bronkus.",
      "Melakukan pertukaran gas di alveolus.",
      "Mengembang dan mengempis sesuai gerakan otot pernapasan."
    ],
    fungsi: [
      "Menyuplai oksigen ke seluruh tubuh.",
      "Mengeluarkan karbon dioksida sebagai sisa metabolisme.",
      "Menjaga keseimbangan asam basa dalam darah."
    ],
    gangguan: [
      "Pneumonia: Infeksi bakteri atau virus yang menyebabkan kantong udara meradang.",
      "Kanker Paru-paru: Pertumbuhan sel abnormal akibat asap rokok atau polusi.",
      "TBC: Infeksi bakteri Mycobacterium tuberculosis yang merusak jaringan paru."
    ],
    url_ar: "pernapasan",
    image: "paru.png",
  },
  {
    category: "Pernapasan",
    name: "Diafragma",
    pengertian: "Otot utama berbentuk kubah yang membatasi rongga dada dan rongga perut.",
    caraKerja: [
      "Berkontraksi menjadi datar saat menghirup udara.",
      "Relaksasi menjadi melengkung saat mengembuskan napas.",
      "Mengatur tekanan udara di dalam rongga dada."
    ],
    fungsi: [
      "Memungkinkan paru-paru mengembang maksimal saat bernapas.",
      "Membantu proses batuk dan bersin.",
      "Membantu meningkatkan tekanan perut untuk buang air."
    ],
    gangguan: [
      "Cegukan: Kontraksi tiba-tiba akibat iritasi pada saraf diafragma.",
      "Hernia Diafragma: Adanya celah yang membuat organ perut naik ke rongga dada."
    ],
    url_ar: "pernapasan",
    image: "diafragma.png",
  },
  {
    category: "Pernapasan",
    name: "Bronkus",
    pengertian: "Cabang utama batang tenggorokan yang menuju ke paru-paru kanan dan kiri.",
    caraKerja: [
      "Menerima udara dari trakea.",
      "Membagi aliran udara secara merata ke setiap lobus paru-paru.",
      "Menyaring partikel kecil dengan lapisan mukus."
    ],
    fungsi: [
      "Menghubungkan trakea dengan jaringan paru-paru.",
      "Menyediakan jalur masuk dan keluar udara.",
      "Menghangatkan dan melembapkan udara yang masuk."
    ],
    gangguan: [
      "Bronkitis: Peradangan selaput lendir akibat infeksi atau asap.",
      "Asma: Penyempitan bronkus akibat reaksi alergi."
    ],
    url_ar: "pernapasan",
    image: "bronkus.png",
  },
  {
    category: "Pernapasan",
    name: "Bronkiolus",
    pengertian: "Cabang-cabang kecil dari bronkus yang berakhir di alveolus.",
    caraKerja: [
      "Menyalurkan udara dari bronkus ke kantong udara.",
      "Mengatur volume udara yang masuk ke alveolus.",
      "Melakukan dilatasi dan konstriksi sesuai kebutuhan oksigen."
    ],
    fungsi: [
      "Jalur udara paling akhir sebelum pertukaran gas.",
      "Mencegah partikel asing masuk lebih dalam ke paru-paru.",
      "Mengontrol aliran udara melalui kontraksi otot polos."
    ],
    gangguan: [
      "Bronkiolitis: Infeksi virus yang menyebabkan peradangan cabang paru kecil.",
      "Bronkiektasis: Pelebaran permanen yang menyebabkan penumpukan lendir."
    ],
    url_ar: "pernapasan",
    image: "bronkiolus.png",
  },
  {
    category: "Pernapasan",
    name: "Trakea",
    pengertian: "Tabung lebar yang berfungsi sebagai batang tenggorokan utama.",
    caraKerja: [
      "Menyalurkan udara dari laring menuju bronkus.",
      "Menyaring debu menggunakan silia (rambut halus.",
      "Mendorong lendir kotor ke atas menuju kerongkongan."
    ],
    fungsi: [
      "Penyaring utama udara dari kotoran dan kuman.",
      "Menghubungkan sistem pernapasan atas dan bawah.",
      "Menjaga saluran udara tetap terbuka dengan tulang rawan."
    ],
    gangguan: [
      "Trakeitis: Infeksi bakteri yang menyebabkan pembengkakan saluran udara.",
      "Trakeomalasia: Melemahnya tulang rawan trakea sehingga saluran mudah kolaps."
    ],
    url_ar: "pernapasan",
    image: "trakea.png",
  },
  {
    category: "Pernapasan",
    name: "Alveolus",
    pengertian: "Kantung udara kecil di ujung bronkiolus tempat pertukaran gas.",
    caraKerja: [
      "Oksigen menembus dinding alveolus masuk ke pembuluh darah.",
      "Karbon dioksida keluar dari darah menuju alveolus untuk dibuang.",
      "Bekerja secara pasif melalui proses difusi."
    ],
    fungsi: [
      "Pusat pertukaran O2 dan CO2 dalam sistem pernapasan.",
      "Memperluas area permukaan untuk penyerapan oksigen.",
      "Menyuplai oksigen langsung ke sel darah merah."
    ],
    gangguan: [
      "Emfisema: Kerusakan dinding alveolus akibat polusi atau rokok.",
      "Edema Paru: Penumpukan cairan di alveolus yang menghambat pertukaran gas."
    ],
    url_ar: "pernapasan",
    image: "alveolus.png",
  },

  {
    category: "Pencernaan",
    name: "Esafogus",
    pengertian: "Saluran berotot yang menghubungkan faring (mulut) ke lambung.",
    caraKerja: [
      "Mendorong makanan menggunakan gerakan peristaltik.",
      "Membuka katup bawah untuk memasukkan makanan ke lambung.",
      "Mencegah makanan kembali naik ke mulut."
    ],
    fungsi: [
      "Transportasi makanan menuju lambung.",
      "Penyambung saluran pencernaan atas dan tengah.",
      "Mencegah udara berlebih masuk ke lambung."
    ],
    gangguan: [
      "Ezofagitis: Peradangan akibat iritasi asam lambung.",
      "Disfagia: Kesulitan menelan akibat gangguan otot kerongkongan."
    ],
    url_ar: "pencernaan",
    image: "esofagus.png",
  },
  {
    category: "Pencernaan",
    name: "Lambung",
    pengertian: "Organ berongga tempat pencernaan mekanik dan kimiawi terjadi.",
    caraKerja: [
      "Mengaduk makanan dengan gerak peristaltik kuat.",
      "Mencampur makanan dengan asam HCL dan enzim pepsin.",
      "Mengubah bolus menjadi bubur halus (kim)."
    ],
    fungsi: [
      "Membunuh kuman dengan asam klorida.",
      "Mencerna protein menjadi pepton.",
      "Penyimpanan sementara makanan sebelum ke usus."
    ],
    gangguan: [
      "Gastritis: Iritasi dinding lambung akibat pola makan atau bakteri.",
      "Tukak Lambung: Luka terbuka pada lapisan lambung."
    ],
    url_ar: "pencernaan",
    image: "lambung.png",
  },
  {
    category: "Pencernaan",
    name: "Hati",
    pengertian: "Kelenjar terbesar dalam tubuh yang menyaring darah pencernaan.",
    caraKerja: [
      "Menyaring racun dan sisa obat dari darah.",
      "Menghasilkan empedu secara terus-menerus.",
      "Menyimpan kelebihan glukosa dalam bentuk glikogen."
    ],
    fungsi: [
      "Menghasilkan empedu untuk mencerna lemak.",
      "Pusat detoksifikasi zat berbahaya.",
      "Metabolisme karbohidrat, protein, dan lemak."
    ],
    gangguan: [
      "Hepatitis: Peradangan akibat infeksi virus atau konsumsi alkohol.",
      "Sirosis: Pembentukan jaringan parut yang merusak fungsi hati."
    ],
    url_ar: "pencernaan",
    image: "hati.png",
  },
  {
    category: "Pencernaan",
    name: "Kantung Empedu",
    pengertian: "Organ kecil di bawah hati yang menyimpan cairan empedu.",
    caraKerja: [
      "Menampung empedu yang diproduksi oleh hati.",
      "Memekatkan cairan empedu.",
      "Berkontraksi melepaskan empedu ke usus saat lemak masuk."
    ],
    fungsi: [
      "Membantu proses emulsi dan pencernaan lemak.",
      "Membuang limbah metabolisme melalui cairan empedu.",
      "Meningkatkan penyerapan vitamin yang larut lemak."
    ],
    gangguan: [
      "Batu Empedu: Endapan cairan empedu yang mengeras.",
      "Kolesistitis: Peradangan akibat sumbatan saluran empedu."
    ],
    url_ar: "pencernaan",
    image: "kantungEmpedu.png",
  },
  {
    category: "Pencernaan",
    name: "Pankreas",
    pengertian: "Organ kelenjar yang menghasilkan enzim pencernaan dan hormon.",
    caraKerja: [
      "Menghasilkan jus pankreas ke dalam usus dua belas jari.",
      "Mengeluarkan insulin langsung ke aliran darah.",
      "Menetralkan asam lambung yang masuk ke usus."
    ],
    fungsi: [
      "Menghasilkan enzim amilase, lipase, dan tripsin.",
      "Mengatur kadar gula darah dalam tubuh.",
      "Membantu pencernaan kimiawi tingkat lanjut."
    ],
    gangguan: [
      "Pankreatitis: Peradangan yang merusak jaringan pankreas.",
      "Diabetes Melitus: Kegagalan pankreas memproduksi insulin secara cukup."
    ],
    url_ar: "pencernaan",
    image: "pankreas.png",
  },
  {
    category: "Pencernaan",
    name: "Usus Besar",
    pengertian: "Bagian usus tempat pengolahan sisa makanan terakhir.",
    caraKerja: [
      "Menyerap air dan elektrolit dari sisa makanan.",
      "Melakukan fermentasi sisa makanan dengan bakteri baik.",
      "Mendorong sisa padat menuju rektum."
    ],
    fungsi: [
      "Mengatur kadar air dalam feses.",
      "Membantu pembentukan vitamin K melalui bakteri E. coli.",
      "Tempat pembusukan sisa makanan."
    ],
    gangguan: [
      "Konstipasi (Sembelit): Kurangnya serat sehingga feses sulit keluar.",
      "Diare: Penyerapan air yang tidak sempurna akibat infeksi."
    ],
    url_ar: "pencernaan",
    image: "ususBesar.png",
  },
  {
    category: "Pencernaan",
    name: "Usus Halus",
    pengertian: "Saluran terpanjang tempat penyerapan nutrisi utama.",
    caraKerja: [
      "Mencampur kim dengan enzim empedu dan pankreas.",
      "Menyerap sari makanan melalui jonjot usus (vili).",
      "Mendorong sisa makanan ke usus besar."
    ],
    fungsi: [
      "Pusat utama penyerapan nutrisi ke aliran darah.",
      "Mencerna karbohidrat, lemak, dan protein secara tuntas.",
      "Menjaga keseimbangan cairan selama pencernaan."
    ],
    gangguan: [
      "Cacingan: Infeksi parasit yang mengambil nutrisi tubuh.",
      "Malabsorbsi: Ketidakmampuan usus menyerap sari makanan dengan benar."
    ],
    url_ar: "pencernaan",
    image: "ususHalus.png",
  },
  {
    category: "Pencernaan",
    name: "Usus Buntu",
    pengertian: "Organ kecil berbentuk tabung yang menempel di awal usus besar.",
    caraKerja: [
      "Menampung bakteri baik untuk saluran cerna.",
      "Berperan dalam sistem pertahanan tubuh lokal.",
      "Menjaga mikroflora usus setelah diare."
    ],
    fungsi: [
      "Bagian dari sistem kekebalan tubuh (imunitas).",
      "Menyimpan bakteri menguntungkan bagi pencernaan.",
      "Fungsi cadangan dalam pemulihan usus."
    ],
    gangguan: [
      "Apendisitis: Peradangan akibat sumbatan sisa makanan atau kuman.",
      "Tumor Apendiks: Pertumbuhan sel tidak normal di area usus buntu."
    ],
    url_ar: "pencernaan",
    image: "ususBuntu.png",
  },
  {
    category: "Pencernaan",
    name: "Rektum",
    pengertian: "Bagian akhir usus besar yang berakhir di anus.",
    caraKerja: [
      "Menerima dan menyimpan feses sementara.",
      "Memberikan sinyal ke otak saat feses siap dikeluarkan.",
      "Berkontraksi saat proses buang air besar."
    ],
    fungsi: [
      "Gudang penyimpanan feses sebelum keluar.",
      "Mengontrol kapan waktu pengosongan usus.",
      "Menyerap sedikit sisa air dan mineral."
    ],
    gangguan: [
      "Hemoroid (Ambeien): Pembengkakan pembuluh darah di rektum/anus.",
      "Proktitis: Peradangan pada lapisan dinding rektum."
    ],
    url_ar: "pencernaan",
    image: "rektum.png",
  },

  {
    category: "Peredaran",
    name: "Ventrikel",
    pengertian: "Ruang jantung bagian bawah yang memompa darah keluar.",
    caraKerja: [
      "Ventrikel kanan memompa darah kotor ke paru-paru.",
      "Ventrikel kiri memompa darah bersih ke seluruh tubuh.",
      "Berkontraksi kuat untuk menciptakan tekanan darah tinggi."
    ],
    fungsi: [
      "Pompa utama aliran darah keluar jantung.",
      "Menjaga distribusi darah ke organ-organ vital.",
      "Bekerja berirama dengan atrium."
    ],
    gangguan: [
      "Gagal Jantung Ventrikel: Ketidakmampuan memompa darah secara cukup.",
      "Hipertrofi Ventrikel: Penebalan otot bilik jantung yang mengganggu fungsi."
    ],
    url_ar: "peredaran",
    image: "ventrikel.png",
  },
  {
    category: "Peredaran",
    name: "Atrium",
    pengertian: "Ruang jantung bagian atas yang menerima darah masuk.",
    caraKerja: [
      "Menerima darah dari vena seluruh tubuh dan paru-paru.",
      "Mendorong darah turun menuju ventrikel.",
      "Berkontraksi dengan tekanan yang lebih rendah dari ventrikel."
    ],
    fungsi: [
      "Tempat penampungan darah awal di jantung.",
      "Mengatur pengisian darah ke bilik jantung.",
      "Menjaga tekanan darah vena tetap rendah."
    ],
    gangguan: [
      "Atrial Fibrilasi: Irama jantung yang tidak teratur pada serambi.",
      "Jantung Bocor (Atrial Septal Defect): Adanya lubang pada sekat antar serambi."
    ],
    url_ar: "peredaran",
    image: "atrium.png",
  },
  {
    category: "Peredaran",
    name: "Vena Pulmonalis",
    pengertian: "Pembuluh darah yang membawa darah kaya oksigen dari paru-paru.",
    caraKerja: [
      "Mengalirkan darah dari paru-paru menuju atrium kiri jantung.",
      "Bekerja berlawanan dengan vena biasa karena membawa oksigen.",
      "Menjaga aliran darah bersih lancar kembali ke jantung."
    ],
    fungsi: [
      "Satu-satunya vena yang membawa darah kaya oksigen.",
      "Penyuplai darah bersih dari sistem pernapasan ke jantung.",
      "Menjaga sirkulasi paru tetap efisien."
    ],
    gangguan: [
      "Obstruksi Vena Pulmonalis: Penyumbatan aliran darah dari paru ke jantung.",
      "Hipertensi Vena Pulmonalis: Tekanan tinggi pada pembuluh vena paru."
    ],
    url_ar: "peredaran",
    image: "venaPulmonalis.png",
  },
  {
    category: "Peredaran",
    name: "Aorta",
    pengertian: "Pembuluh darah nadi (arteri) terbesar dalam tubuh manusia.",
    caraKerja: [
      "Menerima darah bersih bertekanan tinggi dari ventrikel kiri.",
      "Menyebarkan darah melalui cabang-cabang arteri ke seluruh tubuh.",
      "Mempertahankan tekanan darah selama jantung istirahat."
    ],
    fungsi: [
      "Saluran utama distribusi darah oksigen ke organ tubuh.",
      "Penyedia darah untuk otak, tangan, dan organ perut.",
      "Menyuplai nutrisi ke seluruh sel tubuh."
    ],
    gangguan: [
      "Aneurisma Aorta: Pelebaran abnormal dinding aorta yang berisiko pecah.",
      "Aterosklerosis: Penumpukan plak lemak di dinding aorta."
    ],
    url_ar: "peredaran",
    image: "aorta.png",
  },
  {
    category: "Peredaran",
    name: "Arteri Pulmonalis",
    pengertian: "Pembuluh darah nadi yang membawa darah kotor ke paru-paru.",
    caraKerja: [
      "Menerima darah kaya CO2 dari ventrikel kanan.",
      "Membawa darah ke jaringan paru-paru untuk dibersihkan.",
      "Bekerja berlawanan dengan arteri biasa karena membawa CO2."
    ],
    fungsi: [
      "Penyalur utama darah kotor menuju sistem pernapasan.",
      "Membantu proses pembuangan limbah gas CO2.",
      "Bagian krusial dari sirkulasi kecil (pulmonal)."
    ],
    gangguan: [
      "Emboli Paru: Penyumbatan arteri paru oleh gumpalan darah.",
      "Hipertensi Pulmonal: Tekanan darah tinggi di pembuluh darah paru-paru."
    ],
    url_ar: "peredaran",
    image: "arteriPulmonalis.png",
  },
  {
    category: "Peredaran",
    name: "Katup Bikuspid",
    pengertian: "Katup yang memisahkan serambi kiri dan bilik kiri jantung].",
    caraKerja: [
      "Terbuka saat darah mengalir dari atrium ke ventrikel].",
      "Menutup rapat saat bilik memompa darah keluar].",
      "Mencegah darah bersih kembali naik ke serambi]."
    ],
    fungsi: [
      "Menjaga aliran darah tetap satu arah].",
      "Mencegah kebocoran darah di sisi kiri jantung].",
      "Memastikan tekanan pompa ventrikel kiri maksimal]."
    ],
    gangguan: [
      "Regurgitasi Mitral: Kebocoran katup yang membuat darah kembali ke serambi].",
      "Stenosis Mitral: Katup menjadi kaku sehingga aliran darah terhambat]."
    ],
    url_ar: "peredaran",
    image: "katupBikuspid.png",
  },
];

materiIpa = materiIpa.map((item) => {
  return {
    ...item,
    url_ar: he.decode(item.url_ar),
  };
});

export default materiIpa;