// Initialize Three.js scene for hero section
const initHero3D = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    const heroContainer = document.getElementById('hero-3d');
    renderer.setSize(heroContainer.offsetWidth, heroContainer.offsetHeight);
    heroContainer.appendChild(renderer.domElement);

    // Create an abstract geometric shape
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6C63FF,
        wireframe: true,
        wireframeLinewidth: 2
    });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0x00F5FF, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = heroContainer.offsetWidth;
        const height = heroContainer.offsetHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
};

// Initialize counters animation
const initCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(counter);
    });
};

// Scroll reveal animation
const initScrollReveal = () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    reveals.forEach(reveal => observer.observe(reveal));
};

// Timeline animation
const initTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    };

    const observer = new IntersectionObserver(timelineCallback, {
        threshold: 0.5
    });

    timelineItems.forEach(item => observer.observe(item));
};

// Navbar scroll effect
const initNavbarEffect = () => {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
            return;
        }

        if (currentScroll > lastScroll) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }

        lastScroll = currentScroll;
    });
};

// Smooth scroll for navigation links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
};

// Initialize all animations and effects
window.addEventListener('load', () => {
    // Add reveal class to elements
    document.querySelectorAll('.skill-card, .project-card, .testimonial-card').forEach(el => {
        el.classList.add('reveal');
    });

    // Initialize all features
    initHero3D();
    initCounters();
    initScrollReveal();
    initTimeline();
    initNavbarEffect();
    initSmoothScroll();
});