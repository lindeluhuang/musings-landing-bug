const sections = document.querySelectorAll("section")
const bodyTag = document.querySelector("body")

const addMovement = function () {
    const topViewport = window.pageYOffset;
    const midViewport = topViewport + (window.innerHeight / 2);

    sections.forEach((section, index) => {

        // find middle of each section
        const topSection = section.offsetTop;
        const midSection = topSection + (section.offsetHeight / 2);

        // compare how far we've scrolled from middle
        const distanceToSection = midViewport - midSection;

        // pick tags to parallax
        const image = section.querySelector("img");
        const contentTag = section.querySelector("div");

        // weight down the distance
        let rotation = distanceToSection / 100;
        let contentDist = -1 * distanceToSection / 2;

        //not the last one
        if (index < (sections.length - 1)) {
            // for all even sections, rotate the other way
            if (index % 2 == 1) {
                rotation = rotation * -1;
            }

            // apply some parallax
            contentTag.style.top = `${contentDist}px`
            contentTag.style.transform = `rotate(${-1 * rotation}deg)`
            image.style.transform = `rotate(${rotation}deg)`
        }


        // change background color in middle of new section
        if (distanceToSection > -150) {
            const dataBackground = section.getAttribute("data-background")
            bodyTag.style.backgroundColor = dataBackground;
        }
    })
}

// on page load
addMovement()


// on scroll
document.addEventListener("scroll", function () {
    addMovement();
})

// resizing window
window.addEventListener("resize", function () {
    addMovement();
})


