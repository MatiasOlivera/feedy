interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IUser extends ITimestamps {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  username: string;
  email: string;
  bio: string;
}
