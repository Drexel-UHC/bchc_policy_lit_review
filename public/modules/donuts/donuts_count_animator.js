// Counter: https://codepen.io/jshakes/pen/KKpjdYv
// How long you want the animation to take, in ms
 const animationDuration = 1000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
 const frameDuration = 1000 / 200;
// Use that to calculate how many frames we need to complete the animation
 const totalFrames = Math.round(animationDuration / frameDuration);
// An ease-out function that slows the count as it progresses
 const easeOutQuad = (t) => t * (2 - t);

// The animation function, which takes an Element
export const animateCountTo = function (id, target) {
  const el = document.querySelector(`#${id}Counter`);
  let startingNumber = parseInt(el.innerHTML, 10);
  const targetNumber = target;

  const frame = Math.abs(targetNumber - startingNumber);
  var frameCounter = frame;
  if (targetNumber > startingNumber) {
    const counter = setInterval(() => {
      frameCounter++;
      // Calculate our progress as a value between 0 and 1
      // Pass that value to our easing function to get our
      // progress on a curve
      const progress = easeOutQuad(frameCounter / totalFrames);
      // Use the progress value to calculate the current count
      const currentCount = startingNumber + Math.round(frame * progress);

      // If the current count has changed, update the element
      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      // If we’ve reached our last frame, stop the animation
      if (currentCount === targetNumber) {
        clearInterval(counter);
      }
    }, frameDuration);
  } else if (targetNumber < startingNumber) {
    const counter = setInterval(() => {
      frameCounter++;
      // Calculate our progress as a value between 0 and 1
      // Pass that value to our easing function to get our
      // progress on a curve
      const progress = easeOutQuad(frameCounter / totalFrames);
      // Use the progress value to calculate the current count
      const currentCount = startingNumber - Math.round(frame * progress);

      // If the current count has changed, update the element
      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      // If we’ve reached our last frame, stop the animation
      if (currentCount === targetNumber) {
        clearInterval(counter);
      }
    }, frameDuration);
  } else {
    return;
  }
};
