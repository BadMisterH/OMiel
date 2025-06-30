document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the target is visible
    };

    const metricValues = document.querySelectorAll('.metric-value');

    const animateNumber = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const decimalPlaces = parseInt(element.getAttribute('data-decimal')) || 0;
        const duration = 2000; // Animation duration in milliseconds (2 seconds)
        const start = 0;
        let startTime = null;

        const easeOutQuad = (t) => t * (2 - t); // Easing function

        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeOutQuad(progress);

            let currentValue = start + (easedProgress * (target - start));

            if (decimalPlaces > 0) {
                element.textContent = currentValue.toFixed(decimalPlaces) + suffix;
            } else {
                element.textContent = Math.floor(currentValue) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Ensure the final target value is precisely displayed
                if (decimalPlaces > 0) {
                    element.textContent = target.toFixed(decimalPlaces) + suffix;
                } else {
                    element.textContent = target + suffix;
                }
            }
        };

        requestAnimationFrame(step);
    };

    // Intersection Observer to start animation when element is visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    metricValues.forEach(value => {
        observer.observe(value);
    });
});