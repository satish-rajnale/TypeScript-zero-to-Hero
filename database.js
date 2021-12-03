// alot of time people are asked to implement a in memory nosqldb/  databse structure
var InMemoryDatabase = /** @class */ (function () {
  function InMemoryDatabase() {
    this.db = {};
  }
  InMemoryDatabase.prototype.get = function (id) {
    return this.db[id];
  };
  InMemoryDatabase.prototype.set = function (id, value) {
    this.db[id] = value;
  };
  return InMemoryDatabase;
})();
var myDB = new InMemoryDatabase();
myDB.set('name', 'Allen');
console.log(myDB.get('name'));
