from flask import Flask, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)

# File to store visit data (will be in a volume)
DATA_FILE = '/app/data/visits.json'

def load_visits():
    """Load visit count from file"""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return {'count': 0, 'history': []}

def save_visits(data):
    """Save visit count to file"""
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/')
def home():
    data = load_visits()
    data['count'] += 1
    data['history'].append({
        'visit': data['count'],
        'timestamp': datetime.now().isoformat()
    })
    # Keep only last 10 visits
    data['history'] = data['history'][-10:]
    save_visits(data)
    
    return '''
    <html>
        <head>
            <title>Persistent Data Demo</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    max-width: 700px;
                    margin: 50px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }}
                .container {{
                    background: rgba(255, 255, 255, 0.1);
                    padding: 30px;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                }}
                h1 {{ font-size: 2.5em; margin: 0; }}
                .count {{ font-size: 3em; color: #4CAF50; }}
                .history {{
                    background: rgba(0, 0, 0, 0.2);
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 20px;
                    text-align: left;
                }}
                .history-item {{
                    padding: 5px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>💾 Persistent Data Demo</h1>
                <p>Total visits: <span class="count">{}</span></p>
                <p><em>This data survives container restarts!</em></p>
                <div class="history">
                    <strong>Recent visits:</strong>
                    {}
                </div>
            </div>
        </body>
    </html>
    '''.format(
        data['count'],
        ''.join([f'<div class="history-item">Visit #{h["visit"]} at {h["timestamp"]}</div>' 
                 for h in data['history']])
    )

@app.route('/reset', methods=['POST'])
def reset():
    save_visits({'count': 0, 'history': []})
    return jsonify({'message': 'Counter reset!'})

@app.route('/data')
def show_data():
    return jsonify(load_visits())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
