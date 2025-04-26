'use server';

import mongoose from 'mongoose';
import mongo from '@/lib/mongodb';
import User from '@/models/user.model';
import Config from '@/models/config.model';
import { collectionExists } from '../collection/collectionExists';
import { createNewCollection } from '../collection/createNewCollection';
import { IUser, IConfig } from '@/interfaces/models';
import { User as GoogleUser } from 'next-auth';

export async function createNewUser(user: GoogleUser): Promise<boolean> {
  // TODO: handle this edge case
  if (!user.email) {
    throw new Error('Unable to retrieve email');
  }
  await mongo();
  if (!mongoose.connection.db) {
    throw new Error('Unable to connect to database');
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const usersCollectionExists = await collectionExists('users');
    if (!usersCollectionExists) await createNewCollection('users');
    const configsCollectionExists = await collectionExists('configs');
    if (!configsCollectionExists) await createNewCollection('configs');

    const newUser: IUser = await new User({
      name: user.name,
      email: user.email,
      username: user.email.split('@')[0]
    }).save({ session });

    const newConfig: IConfig = await new Config({
      user: newUser._id,
      default_folder: null
    }).save({ session });

    await session.commitTransaction();

    if (newConfig) {
      return true;
    } else {
      throw new Error('Failed to create new user');
    }
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
