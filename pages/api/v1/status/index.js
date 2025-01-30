import database from "../../../../infra/database.js";

export default async function status(request, response) {
  const updatedAt = new Date().toISOString();

    const databaseVersion = await database.query("SHOW server_version");
    const databaseVersionValue = databaseVersion.rows[0].server_version;

    const databaseMaxConnections = await database.query("SHOW max_connections");
    const databaseMaxConnectionsValue = databaseMaxConnections.rows[0].max_connections;
    
    const databaseName = process.env.POSTGRES_DB
    const databaseOpenedConnectionsResult = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName]
    });
    const databaseOpenedConnectionsValue = databaseOpenedConnectionsResult.rows[0].count

    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: databaseVersionValue,
          max_connections: parseInt(databaseMaxConnectionsValue),
          opened_connections: databaseOpenedConnectionsValue
        },
      },
    });
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
