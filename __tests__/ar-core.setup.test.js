import { setupARDom } from "../test-utils/ar-core.setup";

describe("AR SETUP", () => {
  test("setupARDom return elements", () => {
    const res = setupARDom();

    expect(res.scene).toBeDefined();
    expect(res.modelGroup).toBeDefined();
    expect(res.reticle).toBeDefined();
  });

  test("scene renderstart event trigger", () => {
    const { scene } = setupARDom();

    const cb = jest.fn();

    scene.addEventListener("renderstart", cb);

    expect(cb).toHaveBeenCalled();
  });

  test("scene event selain renderstart", () => {
    const { scene } = setupARDom();

    const cb = jest.fn();

    scene.addEventListener("click", cb);

    expect(cb).not.toHaveBeenCalled();
  });

  test("navigator.xr mock works", async () => {
  expect(await navigator.xr.isSessionSupported()).toBe(true);
});

test("AFRAME THREE classes", () => {
  const v = new AFRAME.THREE.Vector3(1,2,3);
  const clone = v.clone();

  expect(clone.x).toBe(1);

  const q = new AFRAME.THREE.Quaternion();
  expect(q).toBeDefined();

  const m = new AFRAME.THREE.Matrix4();
  expect(m.fromArray([])).toBe(m);
});
});


describe("SETUP EXTRA COVERAGE", () => {

  test("AFRAME classes dipakai semua", () => {
    const T = AFRAME.THREE;

    const m = new T.Matrix4();
    m.fromArray([]);
    m.decompose();

    const v = new T.Vector3(1,2,3);
    v.add(new T.Vector3(1,1,1));
    v.applyQuaternion();
    v.copy(new T.Vector3(0,0,0));
    v.clone();

    const q = new T.Quaternion();
    q.copy({});
    q.clone();

    const r = new T.Raycaster();
    r.setFromCamera();
    r.intersectObjects([]);

    const c = new T.Color("#fff");

    expect(c.hex).toBe("#fff");
  });

  test("scene.addEventListener branch", () => {
    const { scene } = setupARDom();

    const cb1 = jest.fn();
    const cb2 = jest.fn();

    scene.addEventListener("renderstart", cb1);
    expect(cb1).toHaveBeenCalled();

    scene.addEventListener("click", cb2);
    expect(cb2).not.toHaveBeenCalled();
  });

  test("navigator.xr mock", async () => {
    const res = await navigator.xr.isSessionSupported();
    expect(res).toBe(true);

    navigator.xr.requestSession.mockResolvedValue("session");
    const s = await navigator.xr.requestSession();
    expect(s).toBe("session");
  });

  test("modelGroup & reticle object3D", () => {
    const { modelGroup, reticle } = setupARDom();

    modelGroup.object3D.visible = true;
    expect(modelGroup.object3D.visible).toBe(true);

    reticle.object3D.visible = true;
    expect(reticle.object3D.visible).toBe(true);
  });

  test("Vector3 default constructor", () => {
  const v = new AFRAME.THREE.Vector3();
  expect(v.x).toBe(0);
});

});