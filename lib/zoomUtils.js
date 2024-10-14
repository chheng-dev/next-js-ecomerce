// // lib/zoomUtils.js

// export const handleMouseMoveZoom = (event, mainImageSrc) => {
//   const zoomResult = document.getElementById('zoomResult');
//   const { clientX: mouseX, clientY: mouseY } = event;
//   const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = event.target;

//   // Calculate the background position
//   const x = mouseX - offsetLeft;
//   const y = mouseY - offsetTop;

//   const bgX = `${(x / offsetWidth) * 100}%`;
//   const bgY = `${(y / offsetHeight) * 100}%`;

//   zoomResult.style.backgroundImage = `url(${mainImageSrc})`;
//   zoomResult.style.backgroundSize = '200% 200%'; // Zoomed background
//   zoomResult.style.backgroundPosition = `${bgX} ${bgY}`;
//   zoomResult.style.display = 'block';
//   zoomResult.style.left = '720px'; // Adjusted position
//   zoomResult.style.top = '50px'; // Adjusted position
// };

// export const hideZoom = () => {
//   const zoomResult = document.getElementById('zoomResult');
//   zoomResult.style.display = 'none';
// };
