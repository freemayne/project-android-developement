import * as SQLite from "expo-sqlite";
import Blog from "../models/Blog";

const db = SQLite.openDatabase("bloggen.db");

export const initDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS blog (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        body TEXT NOT NULL)`,
        [],
        (res) => resolve(res),
        (_, error) => reject(error)
      );
    });
  });
};
export const findAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM blog`,
        [],
        (_, res) =>
          resolve(
            res.rows._array.map(
              (row) => new Blog(row.id, row.title, row.imageUri, row.body)
            )
          ),
        (_, err) => reject(err)
      );
    });
  });
};

export const insert = (blog) => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO blog (title,body,imageUri)
        VALUES (?,?,?)`,
        [blog.title, blog.body, blog.imageUri],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `DELETE FROM blog WHERE id = ?`,
        [id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const getTableInfo = () => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `pragma table_info('blog')`,
        [],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};

export const getTableInfo2 = () => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `DROP TABLE blog`,
        [],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
};
