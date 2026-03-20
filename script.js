document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for scroll animations (fade up)
    const fadeElements = document.querySelectorAll('.js-fade-up');
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                // Optional: stop observing once activated
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    });

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // Parallax Effect for Hero Images
    // This moves the floating images slightly based on scroll position
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        // Only run parallax if at the top of the document to optimize performance
        if (window.scrollY < window.innerHeight) {
            let offset = window.scrollY;
            
            parallaxLayers.forEach(layer => {
                // Get the data-speed attribute, default to 1 if not set
                let speed = parseFloat(layer.getAttribute('data-speed')) || 1;
                let yPos = -(offset * speed * 0.1); 
                layer.style.transform = `translateY(${yPos}px) ${layer.style.transform.replace(/translateY\([^)]+\)\s*/g, '')}`;  
                // Note: since images also have rotation in CSS, just updating translateY cleanly might require more specific string parsing,
                // but for a simple effect simply prepending translateY keeps the existing transform working partially.
                // A better approach to keep native rotations:
                
                // Read original rotation (stored in a data attribute if needed, or initialized)
                if (!layer.dataset.origRotate) {
                    const computedStyle = window.getComputedStyle(layer);
                    // extract rotation if possible, or just set it manually. 
                    // For simplicity, we assume rotate is static in css, so we'll just handle translation via JS and use CSS wrapper for rotation.
                    // But here we implement a simple translateY matrix fix.
                }
            });
        }
    });

    // Fix parallax transform appending (ensuring rotation from CSS isn't lost randomly)
    // Actually the easiest way to combine CSS rotation and JS translation is using custom CSS properties.
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight * 1.5) {
            parallaxLayers.forEach(layer => {
                let speed = parseFloat(layer.getAttribute('data-speed')) || 1;
                // Update a custom property --translate-y which we can bind in CSS
                layer.style.setProperty('--translate-y', `${-(window.scrollY * speed * 0.1)}px`);
            });
        }
    });

});
