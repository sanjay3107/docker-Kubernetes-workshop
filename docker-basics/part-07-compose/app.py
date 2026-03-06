from flask import Flask, request, jsonify
import psycopg2
import os
from datetime import datetime

app = Flask(__name__)

DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_NAME = os.getenv('DB_NAME', 'myapp')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASS = os.getenv('DB_PASS', 'password')

def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

def init_db():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS visits (
                id SERIAL PRIMARY KEY,
                timestamp TIMESTAMP,
                message TEXT
            )
        ''')
        conn.commit()
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Database error: {e}")
        return False

@app.route('/')
def home():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO visits (timestamp, message) VALUES (%s, %s)",
            (datetime.now(), "Page visited")
        )
        conn.commit()
        cur.execute("SELECT COUNT(*) FROM visits")
        count = cur.fetchone()[0]
        cur.close()
        conn.close()
        
        return f'''
        <html>
            <head>
                <title>Docker Compose App</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        max-width: 600px;
                        margin: 50px auto;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                    }}
                    .container {{
                        background: rgba(255, 255, 255, 0.1);
                        padding: 30px;
                        border-radius: 10px;
                    }}
                    h1 {{ font-size: 2.5em; }}
                    .count {{ font-size: 4em; color: #4CAF50; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🎼 Docker Compose</h1>
                    <p>Total visits: <span class="count">{count}</span></p>
                    <p>✅ App + PostgreSQL running with one command!</p>
                </div>
            </body>
        </html>
        '''
    except Exception as e:
        return f'<h1>Error: {str(e)}</h1>', 500

if __name__ == '__main__':
    import time
    for i in range(30):
        if init_db():
            print("Database ready!")
            break
        print(f"Waiting for database... ({i+1}/30)")
        time.sleep(1)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
