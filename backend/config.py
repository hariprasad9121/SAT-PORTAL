import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Email configuration
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'anil172900@gmail.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'kfsa nvkp ntmj fgxh')
    
    # Auto-detect email provider and configure SMTP settings
    email_domain = MAIL_USERNAME.split('@')[-1].lower() if '@' in MAIL_USERNAME else 'gmail.com'
    
    if 'gmail.com' in email_domain:
        MAIL_SERVER = 'smtp.gmail.com'
        MAIL_PORT = 587
        MAIL_USE_TLS = True
    elif 'outlook.com' in email_domain or 'hotmail.com' in email_domain:
        MAIL_SERVER = 'smtp-mail.outlook.com'
        MAIL_PORT = 587
        MAIL_USE_TLS = True
    elif 'yahoo.com' in email_domain:
        MAIL_SERVER = 'smtp.mail.yahoo.com'
        MAIL_PORT = 587
        MAIL_USE_TLS = True
    else:
        # For institutional emails, use Gmail SMTP as default
        # You may need to update these settings based on your institution's SMTP server
        MAIL_SERVER = 'smtp.gmail.com'
        MAIL_PORT = 587
        MAIL_USE_TLS = True
    
    # Database configuration
    SQLALCHEMY_DATABASE_URI = 'sqlite:///sat_portal.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Secret key
    SECRET_KEY = '1d3c5f9e1a2b4d6f8c9e0b7a3e4f6d1c9a2e4b5f6d7c8a9e1f2b3c4d5e6f7a8b'

    
    # Upload folder
    UPLOAD_FOLDER = 'uploads' 
