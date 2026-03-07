from flask import Flask, request
import os
import platform

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def hello():
    hostname = platform.node()[:12]
    user_name = "Docker Enthusiast"
    
    # Handle the input if the form is submitted
    if request.method == 'POST':
        user_name = request.form.get('name', 'Stranger')

    return f'''
    <html>
        <head>
            <title>My Interactive Docker App</title>
            <style>
                body {{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    max-width: 600px;
                    margin: 50px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                    color: white;
                    text-align: center;
                }}
                .container {{
                    background: rgba(255, 255, 255, 0.1);
                    padding: 30px;
                    border-radius: 15px;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                }}
                h1 {{ font-size: 2.5em; margin-bottom: 10px; }}
                p {{ font-size: 1.1em; }}
                .emoji {{ font-size: 3em; }}
                
                /* Added Styles for Inputs */
                input[type="text"] {{
                    padding: 10px;
                    border-radius: 5px;
                    border: none;
                    width: 60%;
                    margin-bottom: 10px;
                }}
                button {{
                    padding: 10px 20px;
                    border-radius: 5px;
                    border: none;
                    background-color: #ff9a9e;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                }}
                button:hover {{ background-color: #fecfef; color: #333; }}
                .greeting {{ font-weight: bold; color: #feca57; font-size: 1.4em; margin-top: 15px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="emoji">🐳</div>
                <h1>Hello, {user_name}!</h1>
                <p>Your first containerized application is running!</p>
                
                <form method="POST">
                    <input type="text" name="name" placeholder="Enter your name..." required>
                    <button type="submit">Say Hello</button>
                </form>

                <p><strong>Container ID:</strong> {hostname}</p>
                <div class="greeting">Status: Online</div>
            </div>
        </body>
    </html>
    '''

@app.route('/health')
def health():
    return {'status': 'healthy', 'message': 'App is running!'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)