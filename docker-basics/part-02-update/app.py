from flask import Flask
import os
import platform
import datetime

app = Flask(__name__)

@app.route('/')
def hello():
    hostname = platform.node()[:12]
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f'''
    <html>
        <head>
            <title>My Docker App v2.0</title>
            <style>
                body {{
                    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    color: #f0f8ff;
                    text-align: center;
                }}
                .container {{
                    background: rgba(255, 255, 255, 0.15);
                    padding: 40px;
                    border-radius: 16px;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                }}
                h1 {{ font-size: 2.8em; margin: 0; font-weight: 700; color: #ffffff; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); }}
                p {{ font-size: 1.25em; line-height: 1.6; }}
                .emoji {{ font-size: 3.5em; margin-bottom: 15px; }}
                .badge {{
                    background: linear-gradient(90deg, #ff8a00, #e52e71);
                    padding: 8px 18px;
                    border-radius: 25px;
                    font-size: 0.85em;
                    font-weight: bold;
                    color: white;
                    display: inline-block;
                    margin: 15px 0;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    box-shadow: 0 4px 15px rgba(229, 46, 113, 0.4);
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="emoji">🚀</div>
                <h1>Hello from Docker v2.0!</h1>
                <div class="badge">UPDATED VERSION</div>
                <p>Your application has been updated and rebuilt!</p>
                <p><strong>Container ID:</strong> {hostname}</p>
                <p><strong>Current Time:</strong> {now}</p>
            </div>
        </body>
    </html>
    '''

@app.route('/health')
def health():
    return {'status': 'healthy', 'version': '2.0', 'message': 'Updated app is running!'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
