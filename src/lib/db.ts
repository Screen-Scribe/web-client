"use server"

import { T_User, T_Users, type T_Screenshot } from "./types"
import fs from "fs"

const CurrentData = JSON.parse(
  fs.readFileSync("./db.json", "utf-8") || "{}"
)

const persistData = () => {
  fs.writeFileSync("./db.json", JSON.stringify(Data))
}

const Data: {
  users: T_Users
} = CurrentData

export const createUser = async (user: T_User) => {
  Data.users[user.id] = user
  persistData()
}

export const updateUser = async (id: string, user: Partial<T_User>) => {
  Data.users[id] = {
    ...Data.users[id],
    ...user
  }
  persistData()
}

export const addScreenshot = async (id: string, screenshot: T_Screenshot) => {
  Data.users[id] = {
    ...Data.users[id],
    screenshots: [
      ...Data.users[id].screenshots,
      screenshot
    ]
  }
  persistData()
}

export const deleteUser = async (id: string) => {
  delete Data.users[id]
  persistData()
}

export const getUsers = async () => {
  return Data.users
}

export const getUser = async (id: string) => {
  return Data.users[id]
}
