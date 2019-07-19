# Copyright Nicholas Buckeridge 

import os
from flask import Flask, redirect, render_template, request, url_for
from pathlib import Path
import json

FRONTEND_PUBLIC_DIR = Path('frontend/build')

def create_app():
    # Setup flask pointing to the static folder
    app = Flask(__name__,
                instance_relative_config=True,
                static_folder=os.path.join('..', FRONTEND_PUBLIC_DIR),
                static_url_path='/'
                )

    # All react routes must be registered here
    @app.route('/')
    @app.route('/axios-example')
    @app.route('/about')
    def index():
        return app.send_static_file('index.html')

    @app.route('/create-file')
    def create_file():

        # Write request to file
        if 'files' not in os.listdir('.'):
            os.mkdir('files')
        # TODO: Make line below more secure
        with open('files/'+request.args['name'], 'w') as fout:
            if 'content' in request.args:
                fout.write(request.args['content'])
            else:
                fout.write('')
        return redirect(url_for('file_list'))
    
    @app.route('/list-files')
    def file_list():
        if 'files' not in os.listdir('.'):
            os.mkdir('files')
        files = [ name for name in os.listdir('files') ]
        result = []
        for name in files:
            if os.path.isfile('files/' + name):
                with open('files/' + name, 'r') as fin:
                    result.append({
                        'name': name,
                        'content': fin.read()
                    })
        return json.dumps(result)

    print(app.url_map) # For console debugging
    return app