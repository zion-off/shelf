import mongoose from "mongoose";

import CommentModel from "./comment.model";
import ConfigModel from "./config.model";
import FolderModel from "./folder.model";
import FriendRequestModel from "./friendRequest.model";
import FriendshipModel from "./friendship.model";
import ItemModel from "./item.model";
import LikeModel from "./like.model";
import NotificationModel from "./notification.model";
import PostModel from "./post.model";
import UserModel from "./user.model";

const models = {
  Comment: mongoose.models.Comment || CommentModel,
  Config: mongoose.models.Config || ConfigModel,
  Folder: mongoose.models.Folder || FolderModel,
  FriendRequest: mongoose.models.FriendRequest || FriendRequestModel,
  Friendship: mongoose.models.Friendship || FriendshipModel,
  Item: mongoose.models.Item || ItemModel,
  Like: mongoose.models.Like || LikeModel,
  Notification: mongoose.models.Notification || NotificationModel,
  Post: mongoose.models.Post || PostModel,
  User: mongoose.models.User || UserModel,
};

export default models;
export const {
  Comment,
  Config,
  Folder,
  FriendRequest,
  Friendship,
  Item,
  Like,
  Notification,
  Post,
  User,
} = models;
