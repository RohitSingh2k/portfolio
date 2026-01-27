export function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(response => {
                if (response.ok) {
                    // clear form
                    form.reset();
                    // Show success message
                    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Sent Successfully!';
                    submitBtn.classList.remove('bg-primary', 'hover:bg-secondary');
                    submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnContent;
                        submitBtn.disabled = false;
                        submitBtn.classList.add('bg-primary', 'hover:bg-secondary');
                        submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i> Failed to Send';
                submitBtn.classList.remove('bg-primary', 'hover:bg-secondary');
                submitBtn.classList.add('bg-red-600', 'hover:bg-red-700');

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.disabled = false;
                    submitBtn.classList.add('bg-primary', 'hover:bg-secondary');
                    submitBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
                }, 3000);
            });
    });
}
