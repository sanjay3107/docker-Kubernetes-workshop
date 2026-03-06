from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def hello():
    return '''
    <html>
        <head>
            <title>My First Docker App</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-align: center;
                }
                .container {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 30px;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                }
                h1 { font-size: 2.5em; margin: 0; }
                p { font-size: 1.2em; }
                .emoji { font-size: 3em; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="emoji">🐳</div>
                <h1>Hello from Docker!</h1>
                <p>Your first containerized application is running!</p>
                <p><strong>Container ID:</strong> {}</p>
            </div>
        </body>
    </html>
    '''.format(os.uname().nodename[:12])

@app.route('/health')
def health():
    return {'status': 'healthy', 'message': 'App is running!'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
