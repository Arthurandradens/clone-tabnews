export default function status(request, response) {
  response.status(200).json({ chave: "valor" });
}
/**
  * curl http://localhost:3000/api/status -v
  * Host localhost:3000 was resolved.
  * ? O QUE O CURL ESTÁ FAZENDO:
    * IPv6: ::1
    * IPv4: 127.0.0.1
    *   Trying [::1]:3000...
    * Connected to localhost (::1) port 3000
  * ? O QUE FOI REQUISITADO: 
    > GET /api/status HTTP/1.1
    > Host: localhost:3000
    > User-Agent: curl/8.5.0
    > Accept:
    >
  * ? O QUE FOI RESPONDIDO:
    < HTTP/1.1 200 OK
    < Content-Type: application/json; charset=utf-8
    < ETag: "r9fdtfjb3oh"
    < Content-Length: 17
    < Vary: Accept-Encoding
    < Date: Sat, 16 Nov 2024 19:20:52 GMT
    < Connection: keep-alive
    < Keep-Alive: timeout=5
    <
  * ? O QUE FOI RETORNADO: 
    * Connection #0 to host localhost left intact
    {"chave":"valor"}%                                                      
 */
