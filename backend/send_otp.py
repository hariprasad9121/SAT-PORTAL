import random
from flask import request, jsonify
from flask_mail import Message
from config import Config

# Already created:
# app = Flask(__name__)
# mail = Mail(app)

# OTP store (in-memory, or use DB if needed)
otp_store = {}

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Generate a 6-digit OTP
    otp = str(random.randint(100000, 999999))
    otp_store[email] = otp  # Store OTP temporarily

    # Create message
    msg = Message('Your OTP for Student Portal',
                  recipients=[email],
                  body=f'Your OTP is: {otp}')

    try:
        mail.send(msg)
        return jsonify({'message': 'OTP sent successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
