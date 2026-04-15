
global.AFRAME = {
  THREE: {
    Vector3: class { clone() { return this; } },
    Quaternion: class { clone() { return this; } },
    Color: class {},
    Matrix4: class { fromArray() { return this; } decompose() {} },
    Raycaster: class { setFromCamera() {} intersectObjects() { return []; } }
  }
};

document.body.innerHTML = `
  <div id="scene"></div>
  <div id="model-group"></div>
  <div id="reticle"></div>
  <div id="ar-ui" style="display: none">
    <button id="btn-enter-ar"></button>
    <button id="btn-exit-page"></button>
    <button id="btn-back"></button>
    <button id="btn-reset-rot"></button>
    <input id="scale-slider" value="1" />
    <input id="rotation-slider" value="0" />
    <span id="scale-value"></span>
    <span id="rotation-display"></span>
  </div>
  <div id="landing"></div>
  <div id="placement-hint"></div>
  <div id="html-cursor"></div>
  <div id="mode-badge"></div>
  <div id="info-panel"></div>
  <div id="info-title"></div>
  <div id="info-desc"></div>
  <div id="error-modal" class="hidden">
    <div id="modal-message"></div>
    <button id="btn-modal-close"></button>
  </div>
  <div class="organ" data-title="Jantung" data-description="Organ pemompa darah"></div>
`;


const mockObject3D = { 
  visible: true, 
  position: { copy: () => {} }, 
  quaternion: { copy: () => {} } 
};

window.AFRAME = global.AFRAME;
document.getElementById("reticle").object3D = mockObject3D;
document.getElementById("model-group").object3D = mockObject3D;
document.getElementById("scene").renderer = { xr: { enabled: false } };
require('../public/AR/Pages/ar-core.js');

describe('AR-Core Logic Test', () => {
  
  test('Mode Penempatan harus mengubah teks badge dan visibilitas reticle', () => {
    window.setMode('placement');
    
    const modeBadge = document.getElementById('mode-badge');
    const placementHint = document.getElementById('placement-hint');
    
    expect(modeBadge.textContent).toBe('🎯 MODE PENEMPATAN');
    expect(placementHint.classList.contains('hidden')).toBe(false);
  });

  test('Mode Cursor harus menampilkan instruksi ketuk organ', () => {
    window.setMode('cursor');
    
    const modeBadge = document.getElementById('mode-badge');
    expect(modeBadge.textContent).toBe('👆 KETUK ORGAN UNTUK INFO');
  });

  test('Fungsi showInfo harus memperbarui judul dan deskripsi panel', () => {
    const title = "Paru-paru";
    const desc = "Alat pernapasan manusia";
    
    window.showInfo(title, desc);
    
    expect(document.getElementById('info-title').textContent).toBe(title);
    expect(document.getElementById('info-desc').textContent).toBe(desc);
  });

  test('Slider skala harus memperbarui teks nilai skala', () => {
    const slider = document.getElementById('scale-slider');
    const scaleValue = document.getElementById('scale-value');
    
    slider.value = "1.5";
    slider.dispatchEvent(new Event('input'));
    
    expect(scaleValue.textContent).toBe("1.5");
  });

});

