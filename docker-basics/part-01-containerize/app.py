from flask import Flask
import os
import platform
import datetime

app = Flask(__name__)

@app.route('/')
def hello():
    hostname = platform.node()[:12]
    os_name = platform.system()
    python_version = platform.python_version()
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    return f'''
    <html>
        <head>
            <title>My First Docker App</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    max-width: 700px;
                    margin: 50px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                }}

                .container {{
                    background: rgba(255, 255, 255, 0.1);
                    padding: 30px;
                    border-radius: 12px;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                }}

                h1 {{
                    font-size: 2.5em;
                    margin-bottom: 10px;
                }}

                p {{
                    font-size: 1.2em;
                }}

                .emoji {{
                    font-size: 3em;
                }}

                .info {{
                    margin-top: 20px;
                    padding: 15px;
                    background: rgba(255,255,255,0.15);
                    border-radius: 8px;
                }}

                footer {{
                    margin-top: 20px;
                    font-size: 0.9em;
                    opacity: 0.8;
                }}
            </style>
        </head>

        <body>

            <div class="container">

                <div class="emoji">🐳</div>

                <h1>Hello from Docker!</h1>

                <p>Your containerized Flask application is running successfully!</p>

                <div class="info">
                    <p><strong>Container ID:</strong> {hostname}</p>
                    <p><strong>Operating System:</strong> {os_name}</p>
                    <p><strong>Python Version:</strong> {python_version}</p>
                    <p><strong>Server Time:</strong> {current_time}</p>
                </div>

                <footer>
                    Developed by Vedant Shah 🚀
                </footer>

            </div>

        </body>
    </html>
    '''


@app.route('/health')
def health():
    return {
        'status': 'healthy',
        'message': 'App is running!',
        'container': platform.node()
    }


@app.route('/info')
def info():
    return {
        "hostname": platform.node(),
        "os": platform.system(),
        "python_version": platform.python_version(),
        "platform": platform.platform()
    }


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)