// task.js
const dynamoDB = require('../dynamodb');

function find(callback) {
  const params = {
    TableName: 'Tasks',
  };

  dynamoDB.scan(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data.Items);
    }
  });
}

function create(task, callback) {
  const params = {
    TableName: 'Tasks',
    Item: task,
  };

  dynamoDB.put(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, task);
    }
  });
}

function findById(id, callback) {
  const params = {
    TableName: 'Tasks',
    Key: {
      id: id,
    },
  };

  dynamoDB.get(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data.Item);
    }
  });
}

function update(id, update, callback) {
  const params = {
    TableName: 'Tasks',
    Key: {
      id: id,
    },
    UpdateExpression: 'set #s = :s',
    ExpressionAttributeNames: {
      '#s': 'status',
    },
    ExpressionAttributeValues: {
      ':s': update.status,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  dynamoDB.update(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data.Attributes);
    }
  });
}

function remove(id, callback) {
  const params = {
    TableName: 'Tasks',
    Key: {
      id: id,
    },
  };

  dynamoDB.delete(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, { success: true });
    }
  });
}

const model = {
  find,
  create,
  findById,
  update,
  remove,
};

module.exports = model;
