**GAME OF LIFE**
<hr>
The game "Life" in the form of client-server architecture. The frontend is constantly asking the backend for a new “generation."

Backend: python3, Flask, Gunicorn.\
Frontend: Native JavaScript.
<hr>

Installation:\
`python -m venv venv`\
`pip install -r requirements.txt`\
`gunicorn app:app`