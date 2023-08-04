const authUser = require('./authUser');
const canEdit = require('./canEdit');
const canEditComment = require('./canEditComment');
const commentExists = require('./commentExists');
const entryExists = require('./entryExists');
const userExists = require('./userExists');

module.exports = {
    authUser,
    canEdit,
    canEditComment,
    commentExists,
    entryExists,
    userExists,
};
