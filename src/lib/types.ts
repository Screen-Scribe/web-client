export type T_Screenshot = {
  timestamp: number,
  image: string,
  response: string,
  working: boolean
}

export type T_User = {
  id: string,
  name: string,
  email: string,
  dp: string,
  screenshots: T_Screenshot[]
}

export type T_Users = Record<string, T_User>
