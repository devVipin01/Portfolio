#!/usr/bin/env python3
import http.server
import json
import os

PORT = int(os.environ.get('PORT', 3000))


class Handler(http.server.SimpleHTTPRequestHandler):

    def do_POST(self):
        if self.path == '/api/save':
            try:
                length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(length)
                data = json.loads(body)
                with open('data.json', 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                self._json(200, {'ok': True})
            except Exception as e:
                self._json(500, {'error': str(e)})
        else:
            self.send_response(404)
            self.end_headers()

    def _json(self, status, obj):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(obj).encode())

    # Silence default request logging
    def log_message(self, fmt, *args):
        pass


if __name__ == '__main__':
    server = http.server.HTTPServer(('0.0.0.0', PORT), Handler)
    print(f' Portfolio server at http://localhost:{PORT}')
    print(' Press Ctrl+C to stop')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
        print('\n Stopped.')
