from flask import Flask
import os
import platform
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    now = datetime.now().strftime("%H:%M:%S")
    hostname = platform.node()[:12]
    return f'''
    <html>
        <head>
            <title>Bind Mount Demo</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    max-width: 700px;
                    margin: 50px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    color: white;
                    text-align: center;
                }}
                .container {{
                    background: rgba(255, 255, 255, 0.1);
                    padding: 30px;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                }}
                h1 {{ font-size: 2.5em; margin: 0; }}
                .badge {{
                    background: #4CAF50;
                    padding: 5px 15px;
                    border-radius: 20px;
                    display: inline-block;
                    margin: 10px 0;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🔄 I edited it live</h1>
                <div class="badge">EDIT app.py AND SEE CHANGES INSTANTLY!</div>
                <p>Current time: {now}</p>
                <p>Container ID: {hostname}</p>
                <p><em>Try editing this file while the container runs!</em></p>
            </div>
        </body>
    </html>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
