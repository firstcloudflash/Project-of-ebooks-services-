const express = require('express');
const stripe = require('stripe')('your-secret-key-here');
const app = express();
app.use(express.json());

app.post('/process_payment', async (req, res) => {
    try {
        const { token } = req.body;
        const charge = await stripe.charges.create({
            amount: 5000, // amount in cents
            currency: 'usd',
            source: token,
            description: 'Ebook Purchase'
        });
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
