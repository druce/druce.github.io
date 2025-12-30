/**
 * Animated Wave Background for About Page
 * Creates a smooth, animated wave background using HTML5 Canvas
 * Optimized for performance with debouncing and visibility detection
 */
(function() {
  'use strict';

  // Configuration
  const config = {
    baseColor: '#f0f4f8',        // Light blue-gray base
    waveColor1: '#dbeafe',       // Very light blue
    waveColor2: '#e0e7ff',       // Very light indigo
    waveSpeed: 0.0005,           // Slow animation (3-5 second period)
    waveAmplitude: 50,           // Wave height
    waveFrequency: 0.002,        // Wave frequency
    numWaves: 3,                 // Number of wave layers
    maxCanvasWidth: 2560,        // Max width for performance
    maxCanvasHeight: 1440,       // Max height for performance
    resizeDebounce: 150          // Resize debounce delay (ms)
  };

  // Canvas and context
  let canvas, ctx, width, height;
  let animationId;
  let time = 0;
  let resizeTimeout;

  /**
   * Initialize canvas and start animation
   */
  function init() {
    canvas = document.getElementById('wave-canvas');
    if (!canvas) {
      console.warn('Wave canvas element not found');
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Draw static background instead of animating
      ctx = canvas.getContext('2d');
      resize();
      drawStaticBackground();
      return;
    }

    ctx = canvas.getContext('2d');
    resize();

    // Event listeners
    window.addEventListener('resize', debouncedResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Start animation
    animate();
  }

  /**
   * Resize canvas to fill window (with max limits for performance)
   */
  function resize() {
    width = canvas.width = Math.min(window.innerWidth, config.maxCanvasWidth);
    height = canvas.height = Math.min(window.innerHeight, config.maxCanvasHeight);
  }

  /**
   * Debounced resize handler for performance
   */
  function debouncedResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, config.resizeDebounce);
  }

  /**
   * Draw a single wave layer
   * @param {number} offset - Phase offset for wave variation
   * @param {number} amplitude - Wave amplitude
   * @param {string} color - Wave color
   * @param {number} alpha - Wave opacity
   */
  function drawWave(offset, amplitude, color, alpha) {
    ctx.beginPath();
    ctx.moveTo(0, height);

    // Generate sine wave
    for (let x = 0; x <= width; x++) {
      const y = height * 0.5 +
                Math.sin((x * config.waveFrequency) + (time + offset)) * amplitude;
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.closePath();

    // Fill with color and opacity
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  /**
   * Main animation loop
   * @param {number} currentTime - Current animation timestamp
   */
  function animate(currentTime) {
    // Clear with base color
    ctx.fillStyle = config.baseColor;
    ctx.fillRect(0, 0, width, height);

    // Draw multiple wave layers with different parameters
    drawWave(0, config.waveAmplitude, config.waveColor1, 0.5);
    drawWave(1, config.waveAmplitude * 0.8, config.waveColor2, 0.3);
    drawWave(2, config.waveAmplitude * 0.6, config.waveColor1, 0.2);

    // Increment time for animation
    time += config.waveSpeed;

    // Continue animation loop
    animationId = requestAnimationFrame(animate);
  }

  /**
   * Draw static background (used when reduced motion is preferred)
   */
  function drawStaticBackground() {
    ctx.fillStyle = config.baseColor;
    ctx.fillRect(0, 0, width, height);

    // Draw static gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, config.waveColor1);
    gradient.addColorStop(1, config.waveColor2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  /**
   * Handle visibility change (pause when tab is hidden)
   */
  function handleVisibilityChange() {
    if (document.hidden) {
      // Pause animation when tab is hidden
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else {
      // Resume animation when tab is visible
      if (!animationId) {
        animate();
      }
    }
  }

  /**
   * Cleanup function
   */
  function cleanup() {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', debouncedResize);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', cleanup);
})();
