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
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    color: cyan;
                    text-align: center;
                }}
                .container {{
                    background: rgba(255, 255, 255, 0.1);
                    padding: 30px;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                }}
                h1 {{ font-size: 2.5em; margin: 0; }}
                p {{ font-size: 1.2em; }}
                .emoji {{ font-size: 3em; }}
                .badge {{
                    background: #4CAF50;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.8em;
                    display: inline-block;
                    margin: 10px 0;
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
