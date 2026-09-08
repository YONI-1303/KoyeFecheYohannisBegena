import http.server
import ssl

PORT = 5500

server = http.server.ThreadingHTTPServer(
    ("0.0.0.0", PORT),
    http.server.SimpleHTTPRequestHandler
)

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)

context.load_cert_chain(
    certfile="localhost+2.pem",
    keyfile="localhost+2-key.pem"
)

server.socket = context.wrap_socket(
    server.socket,
    server_side=True
)

print(f"HTTPS server running on https://192.168.1.3:{PORT}")

server.serve_forever()