from flask import Flask
import platform
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def hello():
    hostname = platform.node()[:12]
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return f'''
    <html>
        <head>
            <title>My First Docker App</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    max-width: 700px;
                    margin: 80px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                }}

                .container {{
                    background: rgba(255, 255, 255, 0.15);
                    padding: 40px;
                    border-radius: 15px;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                }}

                h1 {{
                    font-size: 2.7em;
                    margin-bottom: 10px;
                }}

                p {{
                    font-size: 1.2em;
                }}

                .emoji {{
                    font-size: 3.5em;
                    margin-bottom: 10px;
                }}

                .info-box {{
                    margin-top: 20px;
                    padding: 12px;
                    background: rgba(0,0,0,0.25);
                    border-radius: 8px;
                    font-size: 1.1em;
                }}

                button {{
                    margin-top: 20px;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    background: white;
                    color: #333;
                    font-weight: bold;
                    cursor: pointer;
                }}

                button:hover {{
                    background: #f0f0f0;
                }}

                .footer {{
                    margin-top: 25px;
                    font-size: 0.9em;
                    opacity: 0.8;
                }}
            </style>
        </head>

        <body>
            <div class="container">

                <div class="emoji">🐳</div>

                <h1>Hello from Docker!</h1>

                <p>Your containerized Flask application is running successfully.</p>

                <div class="info-box">
                    <strong>Container ID:</strong> {hostname}
                </div>

                <div class="info-box">
                    <strong>Server Time:</strong> {current_time}
                </div>

                <button onclick="location.reload()">Refresh Page</button>

                <div class="footer">
                    Flask + Docker Demo Application
                </div>

            </div>
        </body>
    </html>
    '''


@app.route('/health')
def health():
    return {
        'status': 'healthy',
        'message': 'Docker Flask app is running',
        'time': datetime.now().strftime("%H:%M:%S")
    }


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)