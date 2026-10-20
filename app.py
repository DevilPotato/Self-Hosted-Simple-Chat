from flask import Flask, render_template, request, jsonify
import textwrap


app = Flask(__name__)

history = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api', methods=['POST'])
def api():
    data = request.get_json(force=True)

    username = data.get('username')
    message = textwrap.fill(data.get('message'), width=50)

    stress_signal = data.get('signal')

    new_message = {'username':username,'message':message}
    history.append(new_message)

    if message == '/clear':
        history.clear()

    return {'Status':'Success'}

@app.route('/api/chat_history')
def chat_history():
    return jsonify(history)

app.run(debug=True)
