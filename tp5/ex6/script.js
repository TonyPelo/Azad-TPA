const sections = document.querySelectorAll(".parallax");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const speed = parseFloat(section.dataset.speed);
    const img = section.querySelector(".bg");

    const y = (window.scrollY - section.offsetTop) * speed;
    img.style.transform = `translate(-50%, ${y}px)`;
  });
});
