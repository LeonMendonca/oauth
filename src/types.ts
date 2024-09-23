import mongoose from "mongoose";

interface IUser {
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

type TSignup = {
  name: string;
  password: string;
  email: string;
}

type Tlogin = {
  email: string;
  password: string;
}

type Tpayload = {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
}

//tagged union
type Tpermission = {
  type: 'tpermission',
  user: string;
  email: boolean;
  name: boolean;
}

export type { IUser, TSignup, Tlogin, Tpayload, Tpermission };
