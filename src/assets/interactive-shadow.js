document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.container');
  
  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 768;
  
  // Set initial shadow or border based on device
  if (isMobile) {
    container.style.boxShadow = 'none';
    container.style.border = 'none';
    container.style.backgroundColor = 'transparent';
    container.style.padding = '5%';
    container.style.width = '90%';
    container.style.margin = '0 5%';
  } else {
    container.style.boxShadow = '10px 10px 0px #000000';
    
    // Only add mousemove listener if not on mobile
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
  }
});
