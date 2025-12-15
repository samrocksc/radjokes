document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.container');
  
  // Set initial shadow
  container.style.boxShadow = '10px 10px 0px #000000';
  
  document.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate smooth offset based on mouse position (normalized to -10 to 10 range)
    const offsetX = 10 - (x / windowWidth) * 20;
    const offsetY = 10 - (y / windowHeight) * 20;
    
    // Apply the shadow with smooth transition
    container.style.boxShadow = `${offsetX}px ${offsetY}px 0px #000000`;
  });
});