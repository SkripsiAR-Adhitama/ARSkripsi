
import { setupARDom } from "../test-utils/ar-core.setup";

const mockHighlightOrgan = jest.fn();

let infoTitle;
let infoDesc;
let infoPanel;

function showInfo(title, desc) {
  infoTitle.textContent = title;
  infoDesc.textContent = desc;
  infoPanel.classList.add("flash");
  setTimeout(() => infoPanel.classList.remove("flash"), 600);
  mockHighlightOrgan(title);
}

describe("showInfo()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    setupARDom();

    infoTitle = document.getElementById("info-title");
    infoDesc = document.getElementById("info-desc");
    infoPanel = document.getElementById("info-panel");

    mockHighlightOrgan.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  
  test("mengisi info-title dengan judul organ yang diberikan", () => {
    showInfo("Paru-Paru", "Organ pernapasan utama.");
    expect(infoTitle.textContent).toBe("Paru-Paru");
  });

  test("mengisi info-desc dengan deskripsi yang diberikan", () => {
    showInfo("Paru-Paru", "Organ pernapasan utama.");
    expect(infoDesc.textContent).toBe("Organ pernapasan utama.");
  });

  test("mengisi judul dan deskripsi yang panjang dengan benar", () => {
    const longDesc = "Kelenjar terbesar dalam tubuh dengan lebih dari 500 fungsi. Menghasilkan empedu, memetabolisme nutrisi.";
    showInfo("Hati (Liver)", longDesc);
    expect(infoTitle.textContent).toBe("Hati (Liver)");
    expect(infoDesc.textContent).toBe(longDesc);
  });

  
  test("menambah class 'flash' ke info-panel saat dipanggil", () => {
    showInfo("Bronkus", "Percabangan trakea.");
    expect(infoPanel.classList.contains("flash")).toBe(true);
  });

  test("class 'flash' dihapus setelah 600ms", () => {
    showInfo("Bronkus", "Percabangan trakea.");
    expect(infoPanel.classList.contains("flash")).toBe(true);
    jest.advanceTimersByTime(600);
    expect(infoPanel.classList.contains("flash")).toBe(false);
  });

  test("class 'flash' masih ada sebelum 600ms berlalu", () => {
    showInfo("Bronkus", "Percabangan trakea.");
    jest.advanceTimersByTime(599);
    expect(infoPanel.classList.contains("flash")).toBe(true);
  });

  test("memanggil highlightOrgan dengan judul organ yang benar", () => {
    showInfo("Aorta", "Arteri terbesar dalam tubuh.");
    expect(mockHighlightOrgan).toHaveBeenCalledWith("Aorta");
  });

  test("highlightOrgan dipanggil tepat sekali per showInfo", () => {
    showInfo("Lambung", "Organ pencernaan berbentuk kantong.");
    expect(mockHighlightOrgan).toHaveBeenCalledTimes(1);
  });


  test("info diperbarui jika showInfo dipanggil dua kali berturut-turut", () => {
    showInfo("Organ A", "Deskripsi A");
    showInfo("Organ B", "Deskripsi B");
    expect(infoTitle.textContent).toBe("Organ B");
    expect(infoDesc.textContent).toBe("Deskripsi B");
  });

  test("flash direset ulang jika showInfo dipanggil kedua kali", () => {
    showInfo("Organ A", "Deskripsi A");
    jest.advanceTimersByTime(300); // belum selesai flash pertama
    showInfo("Organ B", "Deskripsi B"); // flash baru
    expect(infoPanel.classList.contains("flash")).toBe(true);
    jest.advanceTimersByTime(600); // flash kedua selesai
    expect(infoPanel.classList.contains("flash")).toBe(false);
  });
});