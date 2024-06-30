const { Client, types } = require("pg");

// Configure the type parsers for specific PostgreSQL types
types.setTypeParser(20, (val) => {
  return Number(BigInt(val));
});
types.setTypeParser(1700, parseFloat); // Numeric
types.setTypeParser(1082, (val) => val); // For date (leave as string, could use a date library)
types.setTypeParser(1114, (val) => new Date(val)); // For timestamp without time zone
types.setTypeParser(2950, (val) => val); // For uuid (leave as string)

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "venture_mafia_api",
  password: "aPiPAss221",
  database: "venture_mafia",
});

client.connect();

module.exports = client;
