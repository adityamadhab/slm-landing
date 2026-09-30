import { raysFragmentShader } from "../content/rays-shader";

export function initLightRays(container: HTMLElement): () => void {
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "0";

  container.innerHTML = "";
  container.appendChild(canvas);

  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    powerPreference: "high-performance",
  });

  if (!gl) {
    // Fallback: Add rich blue ambient glow gradient if WebGL is unavailable
    container.style.background =
      "radial-gradient(circle at 50% -20%, rgba(63, 111, 255, 0.45) 0%, rgba(32, 96, 223, 0.2) 40%, rgba(0, 0, 0, 0) 70%)";
    return () => {};
  }

  const vsSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // Compile vertex shader
  const vs = gl.createShader(gl.VERTEX_SHADER);
  if (!vs) return () => {};
  gl.shaderSource(vs, vsSource);
  gl.compileShader(vs);

  // Compile fragment shader
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fs) return () => {};
  gl.shaderSource(fs, raysFragmentShader);
  gl.compileShader(fs);

  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(fs));
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return () => {};
  }

  // Create & link program
  const program = gl.createProgram();
  if (!program) return () => {};
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    return () => {};
  }

  gl.useProgram(program);

  // Setup full-screen quad buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );

  const aPositionLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(aPositionLoc);
  gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

  // Uniform locations
  const uResLoc = gl.getUniformLocation(program, "u_resolution");
  const uTimeLoc = gl.getUniformLocation(program, "u_time");
  const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
  const uColorsLoc = gl.getUniformLocation(program, "u_colors");
  const uIntensityLoc = gl.getUniformLocation(program, "u_intensity");
  const uRaysLoc = gl.getUniformLocation(program, "u_rays");
  const uReachLoc = gl.getUniformLocation(program, "u_reach");
  const uRayPos1Loc = gl.getUniformLocation(program, "u_rayPos1");
  const uRayPos2Loc = gl.getUniformLocation(program, "u_rayPos2");

  // Colors: Vibrant electric blue + deep royal blue
  const colorsData = new Float32Array([
    83 / 255, 115 / 255, 229 / 255, 1.0, // #5373e5
    32 / 255, 96 / 255, 223 / 255, 1.0,  // #2060df
  ]);

  let width = 0;
  let height = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = container.clientWidth || window.innerWidth;
    height = container.clientHeight || 800;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };

  resize();
  window.addEventListener("resize", resize);

  let animationFrameId: number;
  const startTime = performance.now();

  const render = (now: number) => {
    const elapsedSeconds = (now - startTime) / 1000;

    gl.useProgram(program);

    if (uResLoc) gl.uniform2f(uResLoc, canvas.width, canvas.height);
    if (uTimeLoc) gl.uniform1f(uTimeLoc, elapsedSeconds * 1.2);
    if (uMouseLoc) gl.uniform2f(uMouseLoc, 0.0, 0.0);
    if (uColorsLoc) gl.uniform4fv(uColorsLoc, colorsData);
    if (uIntensityLoc) gl.uniform1f(uIntensityLoc, 0.12); // rich, glowing volumetric intensity
    if (uRaysLoc) gl.uniform1f(uRaysLoc, 0.1);
    if (uReachLoc) gl.uniform1f(uReachLoc, 0.1);
    if (uRayPos1Loc) gl.uniform2f(uRayPos1Loc, 0.5 * canvas.width, -0.35 * canvas.height);
    if (uRayPos2Loc) gl.uniform2f(uRayPos2Loc, 0.52 * canvas.width, -0.45 * canvas.height);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationFrameId = requestAnimationFrame(render);
  };

  animationFrameId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener("resize", resize);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteBuffer(positionBuffer);
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
}
