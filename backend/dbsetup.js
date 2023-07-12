const connection = require('./db');

//////////////////////////////////////////////////////
// SETUP DB
//////////////////////////////////////////////////////
const CREATE_TABLE_MESSAGE_SQL = `
    CREATE TABLE message (
        messageId INT NOT NULL AUTO_INCREMENT,
        message TEXT NOT NULL,
        userId INT NOT NULL,
        PRIMARY KEY (messageId)
    );
`;

//////////////////////////////////////////////////////
// CLEAR DB
//////////////////////////////////////////////////////
const DROP_TABLE_MESSAGE_SQL = `
    DROP TABLE IF EXISTS message;
`;

connection.promise().query(
    DROP_TABLE_MESSAGE_SQL
)
.then((response) => {
    console.log(`Tables Dropped`);

    return connection.promise().query(
        CREATE_TABLE_MESSAGE_SQL
    );
})
.then((response) => {
    console.log(`Tables Created`);
})
.catch((error) => {
    console.log(error);
});