if (!localStorage.getItem('surveySubmitted')) {
            // Show popup after 5 seconds (changed from 10 seconds)
            setTimeout(() => {
            document.getElementById('popupOverlay').style.display = 'block';
            }, 15000);
        }

        document.getElementById('surveyForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const errorMessage = document.getElementById('errorMessage');
            const formData = new FormData(e.target);
            const selectedStyle = formData.get('styleChoice');

            if (!selectedStyle) {
                errorMessage.style.display = 'block';
                return;
            }

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        access_key: '2def5933-b1c7-4028-8655-c2c6b2bf08e2',
                        style_choice: selectedStyle,
                    }),
                });

                if (response.ok) {
                    localStorage.setItem('surveySubmitted', 'true');
                    document.getElementById('popupOverlay').style.display = 'none';
                    const successMessage = document.getElementById('successMessage');
                    successMessage.classList.add('show');
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 2500);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                errorMessage.textContent = 'Submission error - please try again';
                errorMessage.style.display = 'block';
            }
        });
