type UserID = string;
interface User {
  id: UserID;
  fname: string;
  lname?: string;
  email: string;
  contact: {
    phone: string;
  };
  address: {
    city: string;
    state: string;
    country: string;
  };
}

class InmemoryDB {
  private _db: Map<UserID, User> = new Map();

  constructor() {}
  async insertUser(data: User): Promise<UserID> {
    if (this._db.has(data.id)) {
      throw new Error(`User with id ${data.id} already exists.`);
    }
    this._db.set(data.id, data);
    return data.id;
  }

  updateUser(id: UserID, data: Partial<User>): void {
    if (!this._db.has(id)) {
      throw new Error(`User with id ${id} does not exist.`);
    }
    const existingUser = this._db.get(id)!;
    const updatedUser = { ...existingUser, ...data };
    this._db.set(id, updatedUser);
  }
  getUser(id: UserID): User | undefined {
    if (!this._db.has(id)) {
      throw new Error(`User with id ${id} does not exist.`);
    }
    return this._db.get(id);
  }
}
const db = new InmemoryDB();
db.insertUser({
  id: 'user-123',
  fname: 'John',
  lname: 'Doe',
  email: 'john.doe@example.com',
  contact: {
    phone: '123-456-7890',
  },
  address: {
    city: 'New York',
    state: 'NY',
    country: 'USA',
  },
});
