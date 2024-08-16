const stripe = Stripe('your-publishable-key-here');
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {token, error} = await stripe.createToken(cardElement);

    if (error) {
        document.getElementById('error-message').textContent = error.message;
    } else {
        const response = await fetch('/process_payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token.id })
        });

        const result = await response.json();
        if (result.success) {
            window.location.href = '/thank_you';
        } else {
            document.getElementById('error-message').textContent = result.message;
        }
    }
});
                                    
