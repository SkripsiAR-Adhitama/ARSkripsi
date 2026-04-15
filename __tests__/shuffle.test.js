import shuffle from "../src/quiz/arrays/shuffle";

describe("shuffle()", () => {

  test("mengembalikan array dengan panjang yang sama", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).toHaveLength(input.length);
  });

  test("mengembalikan array baru (tidak mutasi array asli)", () => {
    const input = [1, 2, 3];
    const original = [...input];
    shuffle(input);
    expect(input).toEqual(original);
  });

  test("array hasil shuffle mengandung semua elemen yang sama", () => {
    const input = ["a", "b", "c", "d"];
    const result = shuffle(input);
    expect(result.sort()).toEqual(input.sort());
  });


  test("array kosong mengembalikan array kosong", () => {
    expect(shuffle([])).toEqual([]);
  });

  test("array satu elemen mengembalikan array satu elemen yang sama", () => {
    expect(shuffle([42])).toEqual([42]);
  });

  test("array dua elemen mengembalikan kedua elemen", () => {
    const input = ["x", "y"];
    const result = shuffle(input);
    expect(result).toHaveLength(2);
    expect(result).toContain("x");
    expect(result).toContain("y");
  });


  test("shuffle menghasilkan urutan yang berbeda (probabilistik)", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = Array.from({ length: 10 }, () => shuffle(input));
    const allSame = results.every(
      (r) => JSON.stringify(r) === JSON.stringify(input)
    );
    expect(allSame).toBe(false);
  });
});