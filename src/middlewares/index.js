const authUser = require('./authUser');
const canDeleteEntry = require('./canDeleteEntry');
const canEdit = require('./canEdit');
const canEditComment = require('./canEditComment');
const commentExists = require('./commentExists');
const emailExists = require('./emailExists');
const entryExists = require('./entryExists');
const userExists = require('./userExists');
const userNameExists = require('./usernameExists');

module.exports = {
    authUser,
    canEdit,
    canDeleteEntry,
    canEditComment,
    commentExists,
    emailExists,
    entryExists,
    userExists,
    userNameExists,
};
