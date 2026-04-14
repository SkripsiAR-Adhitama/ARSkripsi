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
    pengertian: "Cabang utama batang tenggorokan yang menuju ke paru-paru kanan dan kiri[cite: 2].",
    caraKerja: [
      "Menerima udara dari trakea[cite: 2].",
      "Membagi aliran udara secara merata ke setiap lobus paru-paru[cite: 2].",
      "Menyaring partikel kecil dengan lapisan mukus[cite: 2]."
    ],
    fungsi: [
      "Menghubungkan trakea dengan jaringan paru-paru[cite: 2].",
      "Menyediakan jalur masuk dan keluar udara[cite: 2].",
      "Menghangatkan dan melembapkan udara yang masuk[cite: 2]."
    ],
    gangguan: [
      "Bronkitis: Peradangan selaput lendir akibat infeksi atau asap[cite: 2].",
      "Asma: Penyempitan bronkus akibat reaksi alergi[cite: 2]."
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
    pengertian: "Tabung lebar yang berfungsi sebagai batang tenggorokan utama[cite: 2].",
    caraKerja: [
      "Menyalurkan udara dari laring menuju bronkus[cite: 2].",
      "Menyaring debu menggunakan silia (rambut halus)[cite: 2].",
      "Mendorong lendir kotor ke atas menuju kerongkongan[cite: 2]."
    ],
    fungsi: [
      "Penyaring utama udara dari kotoran dan kuman[cite: 2].",
      "Menghubungkan sistem pernapasan atas dan bawah[cite: 2].",
      "Menjaga saluran udara tetap terbuka dengan tulang rawan[cite: 2]."
    ],
    gangguan: [
      "Trakeitis: Infeksi bakteri yang menyebabkan pembengkakan saluran udara[cite: 2].",
      "Trakeomalasia: Melemahnya tulang rawan trakea sehingga saluran mudah kolaps[cite: 2]."
    ],
    url_ar: "pernapasan",
    image: "trakea.png",
  },
  {
    category: "Pernapasan",
    name: "Alveolus",
    pengertian: "Kantung udara kecil di ujung bronkiolus tempat pertukaran gas[cite: 3].",
    caraKerja: [
      "Oksigen menembus dinding alveolus masuk ke pembuluh darah[cite: 3].",
      "Karbon dioksida keluar dari darah menuju alveolus untuk dibuang[cite: 3].",
      "Bekerja secara pasif melalui proses difusi[cite: 3]."
    ],
    fungsi: [
      "Pusat pertukaran O2 dan CO2 dalam sistem pernapasan[cite: 3].",
      "Memperluas area permukaan untuk penyerapan oksigen[cite: 3].",
      "Menyuplai oksigen langsung ke sel darah merah[cite: 3]."
    ],
    gangguan: [
      "Emfisema: Kerusakan dinding alveolus akibat polusi atau rokok[cite: 3].",
      "Edema Paru: Penumpukan cairan di alveolus yang menghambat pertukaran gas[cite: 3]."
    ],
    url_ar: "pernapasan",
    image: "alveolus.png",
  },

  {
    category: "Pencernaan",
    name: "Esafogus",
    pengertian: "Saluran berotot yang menghubungkan faring (mulut) ke lambung[cite: 4].",
    caraKerja: [
      "Mendorong makanan menggunakan gerakan peristaltik[cite: 4].",
      "Membuka katup bawah untuk memasukkan makanan ke lambung[cite: 4].",
      "Mencegah makanan kembali naik ke mulut[cite: 4]."
    ],
    fungsi: [
      "Transportasi makanan menuju lambung[cite: 4].",
      "Penyambung saluran pencernaan atas dan tengah[cite: 4].",
      "Mencegah udara berlebih masuk ke lambung[cite: 4]."
    ],
    gangguan: [
      "Ezofagitis: Peradangan akibat iritasi asam lambung[cite: 4].",
      "Disfagia: Kesulitan menelan akibat gangguan otot kerongkongan[cite: 4]."
    ],
    url_ar: "pencernaan",
    image: "esofagus.png",
  },
  {
    category: "Pencernaan",
    name: "Lambung",
    pengertian: "Organ berongga tempat pencernaan mekanik dan kimiawi terjadi[cite: 4].",
    caraKerja: [
      "Mengaduk makanan dengan gerak peristaltik kuat[cite: 4].",
      "Mencampur makanan dengan asam HCL dan enzim pepsin[cite: 4].",
      "Mengubah bolus menjadi bubur halus (kim)[cite: 4]."
    ],
    fungsi: [
      "Membunuh kuman dengan asam klorida[cite: 4].",
      "Mencerna protein menjadi pepton[cite: 4].",
      "Penyimpanan sementara makanan sebelum ke usus[cite: 4]."
    ],
    gangguan: [
      "Gastritis: Iritasi dinding lambung akibat pola makan atau bakteri[cite: 4].",
      "Tukak Lambung: Luka terbuka pada lapisan lambung[cite: 4]."
    ],
    url_ar: "pencernaan",
    image: "lambung.png",
  },
  {
    category: "Pencernaan",
    name: "Hati",
    pengertian: "Kelenjar terbesar dalam tubuh yang menyaring darah pencernaan[cite: 4].",
    caraKerja: [
      "Menyaring racun dan sisa obat dari darah[cite: 4].",
      "Menghasilkan empedu secara terus-menerus[cite: 4].",
      "Menyimpan kelebihan glukosa dalam bentuk glikogen[cite: 4]."
    ],
    fungsi: [
      "Menghasilkan empedu untuk mencerna lemak[cite: 4].",
      "Pusat detoksifikasi zat berbahaya[cite: 4].",
      "Metabolisme karbohidrat, protein, dan lemak[cite: 4]."
    ],
    gangguan: [
      "Hepatitis: Peradangan akibat infeksi virus atau konsumsi alkohol[cite: 4].",
      "Sirosis: Pembentukan jaringan parut yang merusak fungsi hati[cite: 4]."
    ],
    url_ar: "pencernaan",
    image: "hati.png",
  },
  {
    category: "Pencernaan",
    name: "Kantung Empedu",
    pengertian: "Organ kecil di bawah hati yang menyimpan cairan empedu[cite: 5].",
    caraKerja: [
      "Menampung empedu yang diproduksi oleh hati[cite: 5].",
      "Memekatkan cairan empedu[cite: 5].",
      "Berkontraksi melepaskan empedu ke usus saat lemak masuk[cite: 5]."
    ],
    fungsi: [
      "Membantu proses emulsi dan pencernaan lemak[cite: 5].",
      "Membuang limbah metabolisme melalui cairan empedu[cite: 5].",
      "Meningkatkan penyerapan vitamin yang larut lemak[cite: 5]."
    ],
    gangguan: [
      "Batu Empedu: Endapan cairan empedu yang mengeras[cite: 5].",
      "Kolesistitis: Peradangan akibat sumbatan saluran empedu[cite: 5]."
    ],
    url_ar: "pencernaan",
    image: "kantungEmpedu.png",
  },
  {
    category: "Pencernaan",
    name: "Pankreas",
    pengertian: "Organ kelenjar yang menghasilkan enzim pencernaan dan hormon[cite: 5].",
    caraKerja: [
      "Menghasilkan jus pankreas ke dalam usus dua belas jari[cite: 5].",
      "Mengeluarkan insulin langsung ke aliran darah[cite: 5].",
      "Menetralkan asam lambung yang masuk ke usus[cite: 5]."
    ],
    fungsi: [
      "Menghasilkan enzim amilase, lipase, dan tripsin[cite: 5].",
      "Mengatur kadar gula darah dalam tubuh[cite: 5].",
      "Membantu pencernaan kimiawi tingkat lanjut[cite: 5]."
    ],
    gangguan: [
      "Pankreatitis: Peradangan yang merusak jaringan pankreas[cite: 5].",
      "Diabetes Melitus: Kegagalan pankreas memproduksi insulin secara cukup[cite: 5]."
    ],
    url_ar: "pencernaan",
    image: "pankreas.png",
  },
  {
    category: "Pencernaan",
    name: "Usus Besar",
    pengertian: "Bagian usus tempat pengolahan sisa makanan terakhir[cite: 6].",
    caraKerja: [
      "Menyerap air dan elektrolit dari sisa makanan[cite: 6].",
      "Melakukan fermentasi sisa makanan dengan bakteri baik[cite: 6].",
      "Mendorong sisa padat menuju rektum[cite: 6]."
    ],
    fungsi: [
      "Mengatur kadar air dalam feses[cite: 6].",
      "Membantu pembentukan vitamin K melalui bakteri E. coli[cite: 6].",
      "Tempat pembusukan sisa makanan[cite: 6]."
    ],
    gangguan: [
      "Konstipasi (Sembelit): Kurangnya serat sehingga feses sulit keluar[cite: 6].",
      "Diare: Penyerapan air yang tidak sempurna akibat infeksi[cite: 6]."
    ],
    url_ar: "pencernaan",
    image: "ususBesar.png",
  },
  {
    category: "Pencernaan",
    name: "Usus Halus",
    pengertian: "Saluran terpanjang tempat penyerapan nutrisi utama[cite: 6].",
    caraKerja: [
      "Mencampur kim dengan enzim empedu dan pankreas[cite: 6].",
      "Menyerap sari makanan melalui jonjot usus (vili)[cite: 6].",
      "Mendorong sisa makanan ke usus besar[cite: 6]."
    ],
    fungsi: [
      "Pusat utama penyerapan nutrisi ke aliran darah[cite: 6].",
      "Mencerna karbohidrat, lemak, dan protein secara tuntas[cite: 6].",
      "Menjaga keseimbangan cairan selama pencernaan[cite: 6]."
    ],
    gangguan: [
      "Cacingan: Infeksi parasit yang mengambil nutrisi tubuh[cite: 6].",
      "Malabsorbsi: Ketidakmampuan usus menyerap sari makanan dengan benar[cite: 6]."
    ],
    url_ar: "pencernaan",
    image: "ususHalus.png",
  },
  {
    category: "Pencernaan",
    name: "Usus Buntu",
    pengertian: "Organ kecil berbentuk tabung yang menempel di awal usus besar[cite: 7].",
    caraKerja: [
      "Menampung bakteri baik untuk saluran cerna[cite: 7].",
      "Berperan dalam sistem pertahanan tubuh lokal[cite: 7].",
      "Menjaga mikroflora usus setelah diare[cite: 7]."
    ],
    fungsi: [
      "Bagian dari sistem kekebalan tubuh (imunitas)[cite: 7].",
      "Menyimpan bakteri menguntungkan bagi pencernaan[cite: 7].",
      "Fungsi cadangan dalam pemulihan usus[cite: 7]."
    ],
    gangguan: [
      "Apendisitis: Peradangan akibat sumbatan sisa makanan atau kuman[cite: 7].",
      "Tumor Apendiks: Pertumbuhan sel tidak normal di area usus buntu[cite: 7]."
    ],
    url_ar: "pencernaan",
    image: "ususBuntu.png",
  },
  {
    category: "Pencernaan",
    name: "Rektum",
    pengertian: "Bagian akhir usus besar yang berakhir di anus[cite: 7].",
    caraKerja: [
      "Menerima dan menyimpan feses sementara[cite: 7].",
      "Memberikan sinyal ke otak saat feses siap dikeluarkan[cite: 7].",
      "Berkontraksi saat proses buang air besar[cite: 7]."
    ],
    fungsi: [
      "Gudang penyimpanan feses sebelum keluar[cite: 7].",
      "Mengontrol kapan waktu pengosongan usus[cite: 7].",
      "Menyerap sedikit sisa air dan mineral[cite: 7]."
    ],
    gangguan: [
      "Hemoroid (Ambeien): Pembengkakan pembuluh darah di rektum/anus[cite: 7].",
      "Proktitis: Peradangan pada lapisan dinding rektum[cite: 7]."
    ],
    url_ar: "pencernaan",
    image: "rektum.png",
  },

  {
    category: "Peredaran",
    name: "Ventrikel",
    pengertian: "Ruang jantung bagian bawah yang memompa darah keluar[cite: 8].",
    caraKerja: [
      "Ventrikel kanan memompa darah kotor ke paru-paru[cite: 8].",
      "Ventrikel kiri memompa darah bersih ke seluruh tubuh[cite: 8].",
      "Berkontraksi kuat untuk menciptakan tekanan darah tinggi[cite: 8]."
    ],
    fungsi: [
      "Pompa utama aliran darah keluar jantung[cite: 8].",
      "Menjaga distribusi darah ke organ-organ vital[cite: 8].",
      "Bekerja berirama dengan atrium[cite: 8]."
    ],
    gangguan: [
      "Gagal Jantung Ventrikel: Ketidakmampuan memompa darah secara cukup[cite: 8].",
      "Hipertrofi Ventrikel: Penebalan otot bilik jantung yang mengganggu fungsi[cite: 8]."
    ],
    url_ar: "peredaran",
    image: "ventrikel.png",
  },
  {
    category: "Peredaran",
    name: "Atrium",
    pengertian: "Ruang jantung bagian atas yang menerima darah masuk[cite: 8].",
    caraKerja: [
      "Menerima darah dari vena seluruh tubuh dan paru-paru[cite: 8].",
      "Mendorong darah turun menuju ventrikel[cite: 8].",
      "Berkontraksi dengan tekanan yang lebih rendah dari ventrikel[cite: 8]."
    ],
    fungsi: [
      "Tempat penampungan darah awal di jantung[cite: 8].",
      "Mengatur pengisian darah ke bilik jantung[cite: 8].",
      "Menjaga tekanan darah vena tetap rendah[cite: 8]."
    ],
    gangguan: [
      "Atrial Fibrilasi: Irama jantung yang tidak teratur pada serambi[cite: 8].",
      "Jantung Bocor (Atrial Septal Defect): Adanya lubang pada sekat antar serambi[cite: 8]."
    ],
    url_ar: "peredaran",
    image: "atrium.png",
  },
  {
    category: "Peredaran",
    name: "Vena Pulmonalis",
    pengertian: "Pembuluh darah yang membawa darah kaya oksigen dari paru-paru[cite: 9].",
    caraKerja: [
      "Mengalirkan darah dari paru-paru menuju atrium kiri jantung[cite: 9].",
      "Bekerja berlawanan dengan vena biasa karena membawa oksigen[cite: 9].",
      "Menjaga aliran darah bersih lancar kembali ke jantung[cite: 9]."
    ],
    fungsi: [
      "Satu-satunya vena yang membawa darah kaya oksigen[cite: 9].",
      "Penyuplai darah bersih dari sistem pernapasan ke jantung[cite: 9].",
      "Menjaga sirkulasi paru tetap efisien[cite: 9]."
    ],
    gangguan: [
      "Obstruksi Vena Pulmonalis: Penyumbatan aliran darah dari paru ke jantung[cite: 9].",
      "Hipertensi Vena Pulmonalis: Tekanan tinggi pada pembuluh vena paru[cite: 9]."
    ],
    url_ar: "peredaran",
    image: "venaPulmonalis.png",
  },
  {
    category: "Peredaran",
    name: "Aorta",
    pengertian: "Pembuluh darah nadi (arteri) terbesar dalam tubuh manusia[cite: 9].",
    caraKerja: [
      "Menerima darah bersih bertekanan tinggi dari ventrikel kiri[cite: 9].",
      "Menyebarkan darah melalui cabang-cabang arteri ke seluruh tubuh[cite: 9].",
      "Mempertahankan tekanan darah selama jantung istirahat[cite: 9]."
    ],
    fungsi: [
      "Saluran utama distribusi darah oksigen ke organ tubuh[cite: 9].",
      "Penyedia darah untuk otak, tangan, dan organ perut[cite: 9].",
      "Menyuplai nutrisi ke seluruh sel tubuh[cite: 9]."
    ],
    gangguan: [
      "Aneurisma Aorta: Pelebaran abnormal dinding aorta yang berisiko pecah[cite: 9].",
      "Aterosklerosis: Penumpukan plak lemak di dinding aorta[cite: 9]."
    ],
    url_ar: "peredaran",
    image: "aorta.png",
  },
  {
    category: "Peredaran",
    name: "Arteri Pulmonalis",
    pengertian: "Pembuluh darah nadi yang membawa darah kotor ke paru-paru[cite: 9].",
    caraKerja: [
      "Menerima darah kaya CO2 dari ventrikel kanan[cite: 9].",
      "Membawa darah ke jaringan paru-paru untuk dibersihkan[cite: 9].",
      "Bekerja berlawanan dengan arteri biasa karena membawa CO2[cite: 9]."
    ],
    fungsi: [
      "Penyalur utama darah kotor menuju sistem pernapasan[cite: 9].",
      "Membantu proses pembuangan limbah gas CO2[cite: 9].",
      "Bagian krusial dari sirkulasi kecil (pulmonal)[cite: 9]."
    ],
    gangguan: [
      "Emboli Paru: Penyumbatan arteri paru oleh gumpalan darah[cite: 9].",
      "Hipertensi Pulmonal: Tekanan darah tinggi di pembuluh darah paru-paru[cite: 9]."
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