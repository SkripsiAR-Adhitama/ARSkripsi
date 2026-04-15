
const getBadge = (score) => {
  if (score >= 90) return { title: "Quiz Master", icon: "🏆", desc: "Sangat Baik" };
  else if (score >= 80) return { title: "Expert", icon: "🥇", desc: "Baik" };
  else if (score >= 70) return { title: "Learner", icon: "🥈", desc: "Cukup" };
  else return { title: "Beginner", icon: "🥉", desc: "Perlu Bimbingan" };
};

describe("getBadge()", () => {

  test("skor 100 → Quiz Master", () => {
    expect(getBadge(100)).toEqual({ title: "Quiz Master", icon: "🏆", desc: "Sangat Baik" });
  });

  test("skor tepat 90 → Quiz Master", () => {
    expect(getBadge(90)).toEqual({ title: "Quiz Master", icon: "🏆", desc: "Sangat Baik" });
  });

  test("skor 89 tidak masuk Quiz Master", () => {
    expect(getBadge(89).title).not.toBe("Quiz Master");
  });

  test("skor tepat 80 → Expert", () => {
    expect(getBadge(80)).toEqual({ title: "Expert", icon: "🥇", desc: "Baik" });
  });

  test("skor 85 → Expert", () => {
    expect(getBadge(85).title).toBe("Expert");
  });

  test("skor 79 tidak masuk Expert", () => {
    expect(getBadge(79).title).not.toBe("Expert");
  });


  test("skor tepat 70 → Learner", () => {
    expect(getBadge(70)).toEqual({ title: "Learner", icon: "🥈", desc: "Cukup" });
  });

  test("skor 75 → Learner", () => {
    expect(getBadge(75).title).toBe("Learner");
  });

  test("skor 69 tidak masuk Learner", () => {
    expect(getBadge(69).title).not.toBe("Learner");
  });


  test("skor 50 → Beginner", () => {
    expect(getBadge(50)).toEqual({ title: "Beginner", icon: "🥉", desc: "Perlu Bimbingan" });
  });

  test("skor 0 → Beginner", () => {
    expect(getBadge(0).title).toBe("Beginner");
  });


  test("selalu mengembalikan objek dengan key title, icon, desc", () => {
    [100, 85, 72, 40].forEach((score) => {
      const badge = getBadge(score);
      expect(badge).toHaveProperty("title");
      expect(badge).toHaveProperty("icon");
      expect(badge).toHaveProperty("desc");
    });
  });
});